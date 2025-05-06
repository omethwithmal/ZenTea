import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ZenTeaEmployeeTable = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateError, setUpdateError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const API_URL = 'http://localhost:8070/ZenTeaEmployees';
  const UPDATE_URL = 'http://localhost:8070/ZenTeaEmployees/update';
  const DELETE_URL = 'http://localhost:8070/ZenTeaEmployees/delete';

  // Fetch employee data from backend
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(API_URL);
        // Map backend data to match frontend structure
        const formattedData = response.data.map((employee, index) => ({
          id: employee._id || index + 1, // Use _id from MongoDB or fallback to index
          firstName: employee.firstName,
          lastName: employee.lastName,
          employeeId: employee.employeeID, // Match backend attribute
          birthday: employee.birthday ? employee.birthday.split('T')[0] : '', // Format date if exists
          contactNumber: employee.contactNumber,
          email: employee.email,
          homeAddress: employee.homeAddress,
          nationalId: employee.nationalID, // Match backend attribute
          startDate: employee.startDate ? employee.startDate.split('T')[0] : '', // Format date if exists
          jobTitle: employee.jobTitle,
          department: employee.department,
        }));
        setEmployeeData(formattedData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch employee data');
        setLoading(false);
        console.error('Fetch error:', err);
      }
    };
    fetchEmployees();
  }, []);

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      const employee = employeeData.find((emp) => emp.id === id);
      await axios.delete(`${DELETE_URL}/${employee.id}`);
      setEmployeeData(employeeData.filter((emp) => emp.id !== id));
      setSuccessMessage('Employee deleted successfully!');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error('Failed to delete employee:', err.response || err.message);
      setUpdateError('Failed to delete employee. Please try again.');
    }
  };

  // Handle Update (Open Modal)
  const handleUpdate = (employee) => {
    setEditingEmployee({ ...employee });
    setShowModal(true);
    setUpdateError(null); // Clear any previous update errors
  };

  // Handle Form Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validate required fields
  const validateEmployeeData = (employee) => {
    const requiredFields = [
      'firstName',
      'lastName',
      'employeeId',
      'birthday',
      'contactNumber',
      'email',
      'homeAddress',
      'nationalId',
      'startDate',
      'jobTitle',
      'department',
    ];
    for (const field of requiredFields) {
      if (!employee[field] || employee[field].trim() === '') {
        return `Please fill in the ${field} field.`;
      }
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(employee.email)) {
      return 'Please enter a valid email address.';
    }
    
    return null;
  };

  // Handle Save (Update employee in backend)
  const handleSave = async () => {
    try {
      // Validate data before sending
      const validationError = validateEmployeeData(editingEmployee);
      if (validationError) {
        setUpdateError(validationError);
        return;
      }

      const updatedEmployee = {
        firstName: editingEmployee.firstName,
        lastName: editingEmployee.lastName,
        employeeID: editingEmployee.employeeId, // Match backend attribute
        birthday: editingEmployee.birthday,
        contactNumber: editingEmployee.contactNumber,
        email: editingEmployee.email,
        homeAddress: editingEmployee.homeAddress,
        nationalID: editingEmployee.nationalId, // Match backend attribute
        startDate: editingEmployee.startDate,
        jobTitle: editingEmployee.jobTitle,
        department: editingEmployee.department,
      };

      await axios.put(`${UPDATE_URL}/${editingEmployee.id}`, updatedEmployee);
      
      setEmployeeData((prevData) =>
        prevData.map((employee) =>
          employee.id === editingEmployee.id ? { ...editingEmployee } : employee
        )
      );
      setShowModal(false);
      setEditingEmployee(null);
      setUpdateError(null);
      setSuccessMessage('Employee updated successfully!');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      const errorMessage = err.response
        ? `Failed to update employee: ${err.response.status} - ${err.response.data.message || err.response.data}`
        : `Failed to update employee: ${err.message}`;
      console.error('Update error details:', err.response || err);
      setUpdateError(errorMessage);
    }
  };

  // Handle Cancel (Close Modal)
  const handleCancel = () => {
    setShowModal(false);
    setEditingEmployee(null);
    setUpdateError(null);
  };

  if (loading) return <div style={styles.loading}>Loading...</div>;
  if (error) return <div style={styles.error}>{error}</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Employee Details</h1>
      {updateError && <div style={styles.errorMessage}>{updateError}</div>}
      {successMessage && (
        <div style={styles.successMessage}>
          {successMessage}
          <button 
            onClick={() => setSuccessMessage(null)} 
            style={styles.closeSuccessButton}
          >
            ×
          </button>
        </div>
      )}
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>First Name</th>
              <th style={styles.th}>Last Name</th>
              <th style={styles.th}>Employee ID</th>
              <th style={styles.th}>Birthday</th>
              <th style={styles.th}>Contact Number</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Home Address</th>
              <th style={styles.th}>National ID</th>
              <th style={styles.th}>Start Date</th>
              <th style={styles.th}>Job Title</th>
              <th style={styles.th}>Department</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {employeeData.map((employee) => (
              <tr key={employee.id} style={styles.tr}>
                <td style={styles.td}>{employee.firstName}</td>
                <td style={styles.td}>{employee.lastName}</td>
                <td style={styles.td}>{employee.employeeId}</td>
                <td style={styles.td}>{employee.birthday}</td>
                <td style={styles.td}>{employee.contactNumber}</td>
                <td style={styles.td}>{employee.email}</td>
                <td style={styles.td}>{employee.homeAddress}</td>
                <td style={styles.td}>{employee.nationalId}</td>
                <td style={styles.td}>{employee.startDate}</td>
                <td style={styles.td}>{employee.jobTitle}</td>
                <td style={styles.td}>{employee.department}</td>
                <td style={styles.td}>
                  <div style={styles.actionButtons}>
                    <button
                      style={{ ...styles.actionButton, background: '#2a5c42' }}
                      onClick={() => handleUpdate(employee)}
                    >
                      Update
                    </button>
                    <button
                      style={{ ...styles.actionButton, background: '#d32f2f' }}
                      onClick={() => handleDelete(employee.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Update */}
      {showModal && (
        <div style={styles.modalBackdrop}>
          <div style={styles.modal}>
            <h2 style={styles.modalTitle}>Update Employee</h2>
            {updateError && <div style={styles.errorMessage}>{updateError}</div>}
            <div style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={editingEmployee.firstName || ''}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={editingEmployee.lastName || ''}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Employee ID</label>
                <input
                  type="text"
                  name="employeeId"
                  value={editingEmployee.employeeId || ''}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Birthday</label>
                <input
                  type="date"
                  name="birthday"
                  value={editingEmployee.birthday || ''}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Contact Number</label>
                <input
                  type="text"
                  name="contactNumber"
                  value={editingEmployee.contactNumber || ''}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Email</label>
                <input
                  type="email"
                  name="email"
                  value={editingEmployee.email || ''}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Home Address</label>
                <input
                  type="text"
                  name="homeAddress"
                  value={editingEmployee.homeAddress || ''}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>National ID</label>
                <input
                  type="text"
                  name="nationalId"
                  value={editingEmployee.nationalId || ''}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={editingEmployee.startDate || ''}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Job Title</label>
                <input
                  type="text"
                  name="jobTitle"
                  value={editingEmployee.jobTitle || ''}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Department</label>
                <input
                  type="text"
                  name="department"
                  value={editingEmployee.department || ''}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>
            </div>
            <div style={styles.modalActions}>
              <button style={{ ...styles.modalButton, background: '#00cc00' }} onClick={handleSave}>
                Save
              </button>
              <button style={{ ...styles.modalButton, background: '#888' }} onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Arial', sans-serif",
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: '#f5f5f5',
    padding: '40px 20px',
    width: '1550px',
  },
  title: {
    fontSize: '2.5rem',
    color: '#00cc00',
    textAlign: 'center',
    marginBottom: '30px',
    fontWeight: 'bold',
  },
  loading: {
    fontSize: '1.2rem',
    textAlign: 'center',
    margin: '50px',
    color: '#00cc00',
  },
  error: {
    fontSize: '1.2rem',
    textAlign: 'center',
    margin: '50px',
    color: '#d32f2f',
  },
  tableWrapper: {
    width: '1450px',
    overflowX: 'auto',
    background: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    scrollbarWidth: 'thin',
    scrollbarColor: '#888 #f5f5f5',
  },
  table: {
    width: '100%',
    minWidth: '1200px',
    borderCollapse: 'collapse',
  },
  th: {
    background: 'linear-gradient(45deg, hsl(130, 100%, 37%) 0%, rgb(53, 211, 0) 100%)',
    color: '#ffffff',
    fontSize: '1rem',
    fontWeight: 'bold',
    padding: '12px',
    textAlign: 'left',
    whiteSpace: 'nowrap',
  },
  tr: {
    ':hover': {
      background: '#f0f0f0',
    },
  },
  td: {
    fontSize: '0.95rem',
    color: '#333333',
    padding: '12px',
    borderBottom: '1px solid #e0e0e0',
    whiteSpace: 'nowrap',
  },
  actionButtons: {
    display: 'flex',
    gap: '10px',
  },
  actionButton: {
    padding: '8px 16px',
    fontSize: '0.9rem',
    fontWeight: '500',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
    },
    ':active': {
      transform: 'scale(0.95)',
    },
  },
  modalBackdrop: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '1000',
  },
  modal: {
    background: '#ffffff',
    borderRadius: '12px',
    padding: '20px',
    width: '100%',
    maxWidth: '500px',
    maxHeight: '80vh',
    overflowY: 'auto',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
  },
  modalTitle: {
    fontSize: '1.8rem',
    color: '#00cc00',
    textAlign: 'center',
    marginBottom: '20px',
    fontWeight: 'bold',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  label: {
    fontSize: '1rem',
    color: '#333333',
    fontWeight: '500',
  },
  input: {
    padding: '8px',
    fontSize: '1rem',
    background: '#ffffff',
    color: '#000000',
    border: '1px solid #e0e0e0',
    borderRadius: '6px',
    outline: 'none',
    ':focus': {
      borderColor: '#00cc00',
      boxShadow: '0 0 5px rgba(0, 204, 0, 0.3)',
    },
  },
  modalActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
    marginTop: '20px',
  },
  modalButton: {
    padding: '10px 20px',
    fontSize: '1rem',
    fontWeight: '500',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
    },
    ':active': {
      transform: 'scale(0.95)',
    },
  },
  errorMessage: {
    color: '#d32f2f',
    fontSize: '0.9rem',
    textAlign: 'center',
    marginBottom: '10px',
    padding: '10px',
    backgroundColor: '#ffebee',
    borderRadius: '4px',
  },
  successMessage: {
    color: '#155724',
    fontSize: '1rem',
    textAlign: 'center',
    marginBottom: '20px',
    padding: '15px',
    backgroundColor: '#d4edda',
    borderRadius: '4px',
    position: 'relative',
    width: '100%',
    maxWidth: '500px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  closeSuccessButton: {
    position: 'absolute',
    right: '10px',
    top: '10px',
    background: 'transparent',
    border: 'none',
    fontSize: '1.2rem',
    cursor: 'pointer',
    color: '#155724',
    ':hover': {
      color: '#0c3d1e',
    },
  },
};

export default ZenTeaEmployeeTable;