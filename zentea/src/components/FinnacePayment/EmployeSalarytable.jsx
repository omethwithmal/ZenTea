import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmployeeSalaryTable = () => {
  const [salaries, setSalaries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedSalary, setSelectedSalary] = useState(null);
  const navigate = useNavigate();

  // Fetch all salaries on component mount
  useEffect(() => {
    fetchSalaries();
  }, []);

  const fetchSalaries = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8070/esalarys/displaySalary');
      setSalaries(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching salaries:', err);
      setError('Failed to fetch salary records. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Filter salaries based on search term
  const filteredSalaries = salaries.filter(salary => 
    salary.employeename.toLowerCase().includes(searchTerm.toLowerCase()) ||
    salary.employeeID.toLowerCase().includes(searchTerm.toLowerCase()) ||
    salary.accountNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpdateClick = (salary) => {
    setSelectedSalary(salary);
    setShowUpdateModal(true);
  };

  const handleUpdateSuccess = () => {
    setSuccess('Salary record updated successfully!');
    fetchSalaries();
    setShowUpdateModal(false);
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleDelete = async (salaryId) => {
    if (window.confirm('Are you sure you want to delete this salary record?')) {
      try {
        await axios.delete(`http://localhost:8070/esalarys/delete/${salaryId}`);
        setSuccess('Salary record deleted successfully!');
        fetchSalaries();
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        setError('Failed to delete salary record. Please try again.');
        setTimeout(() => setError(''), 3000);
      }
    }
  };

  const handleAddNew = () => {
    navigate('/add-salary');
  };

  const handleBackToDashboard = () => {
    navigate('/FinancialDashboard');
  };

  // Update Salary Modal Component
  const UpdateSalaryModal = ({ salary, onClose, onUpdateSuccess }) => {
    const [formData, setFormData] = useState({
      employeename: '',
      employeeID: '',
      accountNumber: '',
      finalSalary: '',
      otHours: '',
      date: ''
    });
    const [modalError, setModalError] = useState('');
    const [modalLoading, setModalLoading] = useState(false);
  
    useEffect(() => {
      if (salary) {
        // Properly format the date for the date input
        const formattedDate = salary.date 
          ? new Date(salary.date).toISOString().split('T')[0] 
          : new Date().toISOString().split('T')[0];
        
        setFormData({
          employeename: salary.employeename || '',
          employeeID: salary.employeeID || '',
          accountNumber: salary.accountNumber || '',
          basicSalary: salary.finalSalarySalary?.toString() || '',
          otHours: salary.otHours?.toString() || '',
          date: formattedDate
        });
      }
    }, [salary]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setModalLoading(true);
      setModalError('');
  
      try {
        // Prepare the data with proper types
        const updateData = {
          employeename: formData.employeename,
          employeeID: formData.employeeID,
          accountNumber: formData.accountNumber,
          basicSalary: parseFloat(formData.finalSalarySalary),
          otHours: parseInt(formData.otHours),
          date: formData.date
        };
        
        const response = await axios.put(
          `http://localhost:8070/esalarys/update/${salary._id}`,
          updateData,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        
        if (response.status === 200) {
          onUpdateSuccess();
        }
      } catch (err) {
        console.error('Error updating salary:', err);
        const errorMessage = err.response?.data?.message || 
                           err.response?.data?.error || 
                           err.message || 
                           'Failed to update salary record. Please try again.';
        setModalError(errorMessage);
      } finally {
        setModalLoading(false);
      }
    };
  
    return (
      <div style={modalStyles.overlay}>
        <div style={modalStyles.modal}>
          <div style={modalStyles.header}>
            <h2>Update Salary Record</h2>
            <button 
              onClick={onClose} 
              style={modalStyles.closeButton}
              disabled={modalLoading}
            >
              &times;
            </button>
          </div>
          
          {modalError && (
            <div style={modalStyles.error}>
              {modalError}
            </div>
          )}
  
          <form onSubmit={handleSubmit} style={modalStyles.form}>
            <div style={modalStyles.formGroup}>
              <label>Employee Name:</label>
              <input
                type="text"
                name="employeename"
                value={formData.employeename}
                onChange={handleChange}
                required
                style={modalStyles.input}
                disabled={modalLoading}
              />
            </div>
  
            <div style={modalStyles.formGroup}>
              <label>Employee ID:</label>
              <input
                type="text"
                name="employeeID"
                value={formData.employeeID}
                onChange={handleChange}
                required
                style={modalStyles.input}
                disabled={modalLoading}
              />
            </div>
  
            <div style={modalStyles.formGroup}>
              <label>Account Number:</label>
              <input
                type="text"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                required
                style={modalStyles.input}
                disabled={modalLoading}
              />
            </div>
  
            <div style={modalStyles.formGroup}>
              <label>Basic Salary ($):</label>
              <input
                type="number"
                name="basicSalary"
                value={formData.basicSalary}
                onChange={handleChange}
                step="0.01"
                min="0"
                required
                style={modalStyles.input}
                disabled={modalLoading}
              />
            </div>
  
            <div style={modalStyles.formGroup}>
              <label>OT Hours:</label>
              <input
                type="number"
                name="otHours"
                value={formData.otHours}
                onChange={handleChange}
                min="0"
                required
                style={modalStyles.input}
                disabled={modalLoading}
              />
            </div>
  
            <div style={modalStyles.formGroup}>
              <label>Date:</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                style={modalStyles.input}
                disabled={modalLoading}
              />
            </div>
  
            <div style={modalStyles.footer}>
              <button
                type="button"
                onClick={onClose}
                style={modalStyles.cancelButton}
                disabled={modalLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={modalLoading}
                style={{
                  ...modalStyles.submitButton,
                  opacity: modalLoading ? 0.7 : 1
                }}
              >
                {modalLoading ? (
                  <>
                    <span style={{ marginRight: '8px' }}>
                      <i className="fa fa-spinner fa-spin"></i>
                    </span>
                    Updating...
                  </>
                ) : (
                  'Update Salary'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <button
          onClick={handleBackToDashboard}
          style={{
            padding: '8px 16px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}
        >
          <span>←</span> Back to Dashboard
        </button>
        <h2 style={{ textAlign: 'center', color: '#0a8700', margin: '0' }}>
          Employee Salary Records
        </h2>
        <div style={{ width: '100px' }}></div>
      </div>
      
      {error && (
        <div style={{
          color: 'red',
          padding: '15px',
          marginBottom: '20px',
          border: '1px solid red',
          borderRadius: '4px',
          backgroundColor: '#ffebee'
        }}>
          {error}
        </div>
      )}
      
      {success && (
        <div style={{
          color: 'green',
          padding: '15px',
          marginBottom: '20px',
          border: '1px solid green',
          borderRadius: '4px',
          backgroundColor: '#e8f5e9'
        }}>
          {success}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ flex: '1', maxWidth: '400px' }}>
          <input
            type="text"
            placeholder="Search by name, ID or account..."
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '16px'
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          onClick={handleAddNew}
          style={{
            padding: '10px 20px',
            backgroundColor: '#0a8700',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span>+</span> Add New Salary
        </button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p>Loading salary records...</p>
          </div>
        ) : (
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            overflow: 'hidden'
          }}>
            <thead>
              <tr style={{ backgroundColor: '#0a8700', color: 'white' }}>
                <th style={{ padding: '15px', textAlign: 'left' }}>#</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Employee Name</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Employee ID</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Account Number</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Basic Salary</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>OT Hours</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Date</th>
                <th style={{ padding: '15px', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSalaries.length > 0 ? (
                filteredSalaries.map((salary, index) => (
                  <tr 
                    key={salary._id} 
                    style={{ 
                      backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white',
                      borderBottom: '1px solid #e0e0e0'
                    }}
                  >
                    <td style={{ padding: '15px' }}>{index + 1}</td>
                    <td style={{ padding: '15px' }}>{salary.employeename}</td>
                    <td style={{ padding: '15px' }}>{salary.employeeID}</td>
                    <td style={{ padding: '15px' }}>{salary.accountNumber}</td>
                    <td style={{ padding: '15px' }}>${parseFloat(salary.finalSalary || 0).toFixed(2)}</td>
                    <td style={{ padding: '15px' }}>{salary.otHours || '0'}</td>
                    <td style={{ padding: '15px' }}>
                      {salary.date ? new Date(salary.date).toLocaleDateString() : 'N/A'}
                    </td>
                    <td style={{ padding: '15px', textAlign: 'center' }}>
                      <button
                        onClick={() => handleUpdateClick(salary)}
                        style={{
                          padding: '8px 12px',
                          marginRight: '8px',
                          backgroundColor: '#3a86ff',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '14px'
                        }}
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(salary._id)}
                        style={{
                          padding: '8px 12px',
                          backgroundColor: '#ff6b6b',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '14px'
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" style={{ padding: '20px', textAlign: 'center' }}>
                    {searchTerm ? 'No matching records found' : 'No salary records available'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {showUpdateModal && selectedSalary && (
        <UpdateSalaryModal
          salary={selectedSalary}
          onClose={() => setShowUpdateModal(false)}
          onUpdateSuccess={handleUpdateSuccess}
        />
      )}
    </div>
  );
};

// Modal styles
const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)',
    width: '500px',
    maxWidth: '90%',
    maxHeight: '90vh',
    overflowY: 'auto'
  },
  header: {
    padding: '20px',
    borderBottom: '1px solid #eee',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#666',
    '&:hover': {
      color: '#333'
    }
  },
  form: {
    padding: '20px'
  },
  formGroup: {
    marginBottom: '15px',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px'
  },
  input: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px',
    '&:focus': {
      outline: 'none',
      borderColor: '#0a8700',
      boxShadow: '0 0 0 2px rgba(10, 135, 0, 0.2)'
    },
    '&:disabled': {
      backgroundColor: '#f5f5f5'
    }
  },
  error: {
    color: 'red',
    padding: '10px 20px',
    backgroundColor: '#ffebee',
    margin: '0 20px 20px',
    borderRadius: '4px'
  },
  footer: {
    padding: '20px',
    borderTop: '1px solid #eee',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px'
  },
  cancelButton: {
    padding: '10px 20px',
    backgroundColor: '#f5f5f5',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    '&:hover': {
      backgroundColor: '#e0e0e0'
    },
    '&:disabled': {
      opacity: 0.7,
      cursor: 'not-allowed'
    }
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#0a8700',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      backgroundColor: '#087700'
    },
    '&:disabled': {
      backgroundColor: '#cccccc',
      cursor: 'not-allowed'
    }
  }
};

export default EmployeeSalaryTable;4