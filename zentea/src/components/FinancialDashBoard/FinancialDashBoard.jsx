import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faWallet, faBell, faFilePdf, faEnvelope, faPlus, faShare } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const EmployeeSalaryDashboard = () => {
  const navigate = useNavigate();
  
  // Salary Data State
  const [salaries, setSalaries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedSalary, setSelectedSalary] = useState(null);
  
  // Notification State
  const [notificationCount, setNotificationCount] = useState(3);

  // Fetch salary data
  useEffect(() => {
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
    fetchSalaries();
  }, []);

  // Filter salaries based on search term
  const filteredSalaries = salaries.filter(salary => 
    salary.employeename.toLowerCase().includes(searchTerm.toLowerCase()) ||
    salary.employeeID.toLowerCase().includes(searchTerm.toLowerCase()) ||
    salary.accountNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate financial metrics
  const totalIncome = salaries.reduce((sum, salary) => sum + (salary.basicSalary || 0), 0);
  const fixedExpenses = salaries.length * 1000; // Assuming 1000 per employee as expense
  const netProfit = totalIncome - fixedExpenses;

  // Salary CRUD Operations
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

  // Navigate to Employee Salary page
  const handleAddNew = () => {
    navigate('/EmployeeSalary');
  };

  // WhatsApp share function
  const handleWhatsAppShare = (salary) => {
    const message = `Salary Details for ${salary.employeename}:
Employee ID: ${salary.employeeID}
Account Number: ${salary.accountNumber}
Basic Salary: Rs ${salary.basicSalary?.toFixed(2) || '0.00'}
OT Hours: ${salary.otHours || '0'}
Date: ${salary.date ? new Date(salary.date).toLocaleDateString() : 'N/A'}`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
  };

  // PDF Report Generation
  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(20);
    doc.text('Employee Salary Report', 105, 20, { align: 'center' });
    
    // Date
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 105, 30, { align: 'center' });
    
    // Summary
    doc.setFontSize(14);
    doc.text('Financial Summary', 14, 45);
    
    // Data
    doc.setFontSize(12);
    doc.text(`Total Income: Rs ${totalIncome.toFixed(2)}`, 14, 55);
    doc.text(`Fixed Expenses: Rs ${fixedExpenses.toFixed(2)}`, 14, 65);
    doc.text(`Net Profit: Rs ${netProfit.toFixed(2)}`, 14, 75);
    
    // Table Header
    doc.setFontSize(14);
    doc.text('Employee Salary Details', 14, 95);
    
    // Table Data
    let yPosition = 105;
    doc.setFontSize(10);
    filteredSalaries.slice(0, 20).forEach((salary, index) => {
      if (yPosition > 280) {
        doc.addPage();
        yPosition = 20;
      }
      doc.text(`${index + 1}. ${salary.employeename} (${salary.employeeID})`, 14, yPosition);
      doc.text(`Rs ${salary.basicSalary?.toFixed(2) || '0.00'}`, 150, yPosition);
      yPosition += 7;
    });
    
    // Save PDF
    doc.save('employee_salary_report.pdf');
  };

  // Notification Handler
  const handleNotificationClick = () => {
    window.location.href = "mailto:?subject=Salary Notifications&body=Here are your latest salary notifications:";
    setNotificationCount(0);
  };

  // Quick Navigation Buttons
  const quickNavButtons = [
    { text: 'Employee Salaries', path: '/EmployeeSalary' },
    { text: 'Order Details', path: '/ViewOrderDetails' },
    { text: 'Maintenance', path: '/MaintenanceRevenue' }
  ];

  // Update Salary Modal Component
  const UpdateSalaryModal = ({ salary, onClose, onUpdateSuccess }) => {
    const [formData, setFormData] = useState({
      employeename: '',
      employeeID: '',
      accountNumber: '',
      basicSalary: '',
      otHours: '',
      date: ''
    });
    const [modalError, setModalError] = useState('');
    const [modalLoading, setModalLoading] = useState(false);
  
    useEffect(() => {
      if (salary) {
        setFormData({
          employeename: salary.employeename || '',
          employeeID: salary.employeeID || '',
          accountNumber: salary.accountNumber || '',
          basicSalary: salary.basicSalary || '',
          otHours: salary.otHours || '',
          date: salary.date ? salary.date.split('T')[0] : ''
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
        const response = await axios.put(
          `http://localhost:8070/esalarys/update/${salary._id}`,
          formData
        );
        
        if (response.status === 200) {
          onUpdateSuccess();
        }
      } catch (err) {
        console.error('Error updating salary:', err);
        setModalError(err.response?.data?.message || 'Failed to update salary record');
      } finally {
        setModalLoading(false);
      }
    };
  
    return (
      <div style={modalStyles.overlay}>
        <div style={modalStyles.modal}>
          <div style={modalStyles.header}>
            <h2>Update Salary Record</h2>
            <button onClick={onClose} style={modalStyles.closeButton}>
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
              />
            </div>
  
            <div style={modalStyles.footer}>
              <button
                type="button"
                onClick={onClose}
                style={modalStyles.cancelButton}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={modalLoading}
                style={modalStyles.submitButton}
              >
                {modalLoading ? 'Updating...' : 'Update Salary'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px',
        fontFamily: "'Poppins', sans-serif",
        background: '#f8f9fa'
      }}>
        Loading employee salary data...
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      fontFamily: "'Poppins', sans-serif",
      backgroundColor: '#f8f9fa'
    }}>
      {/* Sidebar Navigation */}
      <div style={{
        width: '250px',
        backgroundColor: '#2c3e50',
        color: 'white',
        padding: '20px',
        position: 'fixed',
        height: '100vh',
        boxShadow: '2px 0 5px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          textAlign: 'center',
          padding: '20px 0',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '600' }}>Employee</h1>
          <h2 style={{ margin: '5px 0 0', fontSize: '18px', fontWeight: '400' }}>Salary System</h2>
        </div>
        
        <nav style={{ marginTop: '30px' }}>
          {[
            { icon: faUsers, text: 'Dashboard', active: true },
            { 
              icon: faBell, 
              text: 'Notifications', 
              onClick: handleNotificationClick,
              badge: notificationCount > 0 ? notificationCount : null
            },
            { icon: faWallet, text: 'Setting' }
          ].map((item, index) => (
            <div
              key={index}
              onClick={item.onClick || (() => {})}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px 15px',
                margin: '8px 0',
                borderRadius: '5px',
                backgroundColor: item.active ? 'rgba(255,255,255,0.1)' : 'transparent',
                cursor: 'pointer',
                transition: 'all 0.3s',
                position: 'relative',
                ':hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              <FontAwesomeIcon icon={item.icon} style={{ marginRight: '10px' }} />
              <span>{item.text}</span>
              
              {item.badge && (
                <span style={{
                  position: 'absolute',
                  right: '15px',
                  backgroundColor: '#e74c3c',
                  color: 'white',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px'
                }}>
                  {item.badge}
                </span>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content Area */}
      <div style={{
        marginLeft: '250px',
        padding: '30px',
        flex: 1,
        maxWidth: 'calc(100% - 250px)'
      }}>
        {/* Header with Actions */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px'
        }}>
          <h1 style={{
            fontSize: '28px',
            fontWeight: '600',
            color: '#2c3e50',
            margin: 0
          }}>Employee Salary Management</h1>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            {/* Notification Button */}
            <button
              onClick={handleNotificationClick}
              style={{
                padding: '10px',
                backgroundColor: 'transparent',
                color: '#2c3e50',
                border: 'none',
                borderRadius: '50%',
                cursor: 'pointer',
                position: 'relative',
                transition: 'all 0.3s',
                ':hover': {
                  backgroundColor: 'rgba(0,0,0,0.05)'
                }
              }}
            >
              <FontAwesomeIcon icon={faEnvelope} size="lg" />
              {notificationCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-5px',
                  backgroundColor: '#e74c3c',
                  color: 'white',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px'
                }}>
                  {notificationCount}
                </span>
              )}
            </button>
            
            {/* PDF Report Button */}
            <button
              onClick={generatePDF}
              style={{
                padding: '10px 20px',
                backgroundColor: '#e74c3c',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                fontSize: '14px',
                transition: 'all 0.3s',
                ':hover': {
                  backgroundColor: '#c0392b',
                  transform: 'translateY(-2px)'
                }
              }}
            >
              <FontAwesomeIcon icon={faFilePdf} style={{ marginRight: '8px' }} />
              Generate Report
            </button>
          </div>
        </div>

        {/* Financial Metrics Cards */}
        <div style={{
          display: 'flex',
          gap: '20px',
          marginBottom: '30px'
        }}>
          {/* Total Income Card */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
            transition: 'transform 0.3s',
            flex: 1,
            ':hover': {
              transform: 'translateY(-5px)'
            }
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#7f8c8d',
              margin: '0 0 15px 0'
            }}>Total Income</h3>
            <p style={{
              fontSize: '28px',
              fontWeight: '700',
              color: '#2ecc71',
              margin: '5px 0'
            }}>
              Rs {totalIncome.toLocaleString('en-IN', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}
            </p>
            <p style={{
              fontSize: '14px',
              color: '#95a5a6',
              margin: 0
            }}>From all employee salaries</p>
          </div>

          {/* Fixed Expenses Card */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
            transition: 'transform 0.3s',
            flex: 1,
            ':hover': {
              transform: 'translateY(-5px)'
            }
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#7f8c8d',
              margin: '0 0 15px 0'
            }}>Fixed Expenses</h3>
            <p style={{
              fontSize: '28px',
              fontWeight: '700',
              color: '#e74c3c',
              margin: '5px 0'
            }}>
              Rs {fixedExpenses.toLocaleString('en-IN', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}
            </p>
            <p style={{
              fontSize: '14px',
              color: '#95a5a6',
              margin: 0
            }}>Monthly operational costs</p>
          </div>

          {/* Net Profit Card */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
            transition: 'transform 0.3s',
            flex: 1,
            ':hover': {
              transform: 'translateY(-5px)'
            }
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#7f8c8d',
              margin: '0 0 15px 0'
            }}>Net Profit</h3>
            <p style={{
              fontSize: '28px',
              fontWeight: '700',
              color: '#3498db',
              margin: '5px 0'
            }}>
              Rs {netProfit.toLocaleString('en-IN', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}
            </p>
            <p style={{
              fontSize: '14px',
              color: '#95a5a6',
              margin: 0
            }}>Income minus expenses</p>
          </div>
        </div>

        {/* Quick Navigation Buttons */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '15px',
          marginBottom: '30px'
        }}>
          {quickNavButtons.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              style={{
                padding: '12px',
                backgroundColor: '#3498db',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '15px',
                fontWeight: '500',
                transition: 'all 0.3s',
                ':hover': {
                  backgroundColor: '#2980b9',
                  transform: 'translateY(-3px)',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                }
              }}
            >
              {item.text}
            </button>
          ))}
        </div>

        {/* Salary Table Section */}
        <div style={{ marginBottom: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            {/* Search Input */}
            <div style={{ flex: '1', maxWidth: '400px' }}>
              <input
                type="text"
                placeholder="Search employees..."
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
            
            {/* Add New Button */}
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
                gap: '8px',
                transition: 'all 0.3s',
                ':hover': {
                  backgroundColor: '#087500',
                  transform: 'translateY(-2px)'
                }
              }}
            >
              <FontAwesomeIcon icon={faPlus} />
              Add New Salary
            </button>
          </div>

          {/* Error/Success Messages */}
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

          {/* Salary Table */}
          <div style={{ overflowX: 'auto' }}>
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
                        borderBottom: '1px solid #e0e0e0',
                        transition: 'background-color 0.3s',
                        ':hover': {
                          backgroundColor: '#f0f0f0'
                        }
                      }}
                    >
                      <td style={{ padding: '15px' }}>{index + 1}</td>
                      <td style={{ padding: '15px' }}>{salary.employeename}</td>
                      <td style={{ padding: '15px' }}>{salary.employeeID}</td>
                      <td style={{ padding: '15px' }}>{salary.accountNumber}</td>
                      <td style={{ padding: '15px' }}>${salary.basicSalary?.toFixed(2) || '0.00'}</td>
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
                            fontSize: '14px',
                            transition: 'all 0.3s',
                            ':hover': {
                              backgroundColor: '#2a76ee'
                            }
                          }}
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(salary._id)}
                          style={{
                            padding: '8px 12px',
                            marginRight: '8px',
                            backgroundColor: '#ff6b6b',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            transition: 'all 0.3s',
                            ':hover': {
                              backgroundColor: '#ee5b5b'
                            }
                          }}
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => handleWhatsAppShare(salary)}
                          style={{
                            padding: '8px 12px',
                            backgroundColor: '#25D366',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            transition: 'all 0.3s',
                            ':hover': {
                              backgroundColor: '#128C7E'
                            }
                          }}
                        >
                          <FontAwesomeIcon icon={faShare} style={{ marginRight: '5px' }} />
                          Share
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
          </div>
        </div>

        {/* Update Salary Modal */}
        {showUpdateModal && (
          <UpdateSalaryModal
            salary={selectedSalary}
            onClose={() => setShowUpdateModal(false)}
            onUpdateSuccess={handleUpdateSuccess}
          />
        )}
      </div>
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
    color: '#666'
  },
  form: {
    padding: '20px'
  },
  formGroup: {
    marginBottom: '15px'
  },
  error: {
    color: 'red',
    padding: '10px 20px',
    backgroundColor: '#ffebee',
    margin: '0 20px 20px'
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
    transition: 'all 0.3s',
    ':hover': {
      backgroundColor: '#e5e5e5'
    }
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#0a8700',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    ':hover': {
      backgroundColor: '#087500'
    }
  }
};

export default EmployeeSalaryDashboard;