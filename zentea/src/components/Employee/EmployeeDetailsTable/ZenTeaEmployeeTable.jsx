import React, { useState } from 'react';

const ZenTeaEmployeeTable = () => {
  const [employeeData, setEmployeeData] = useState([
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      employeeId: 'EMP-001',
      birthday: '1990-01-01',
      contactNumber: '+94 71 123 4567',
      email: 'john.doe@zentea.com',
      homeAddress: '123 Tea Lane, Colombo',
      nationalId: '123456789V',
      startDate: '2023-01-01',
      jobTitle: 'Tea Specialist',
      department: 'Production',
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      employeeId: 'EMP-002',
      birthday: '1992-05-15',
      contactNumber: '+94 71 234 5678',
      email: 'jane.smith@zentea.com',
      homeAddress: '456 Green Road, Kandy',
      nationalId: '987654321V',
      startDate: '2023-02-01',
      jobTitle: 'Administrator',
      department: 'Management',
    },
    {
      id: 3,
      firstName: 'Alex',
      lastName: 'Brown',
      employeeId: 'EMP-003',
      birthday: '1988-11-20',
      contactNumber: '+94 71 345 6789',
      email: 'alex.brown@zentea.com',
      homeAddress: '789 Leaf Street, Galle',
      nationalId: '456789123V',
      startDate: '2023-03-01',
      jobTitle: 'Tea Specialist',
      department: 'Production',
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  // Handle Delete
  const handleDelete = (id) => {
    const updatedData = employeeData.filter((employee) => employee.id !== id);
    setEmployeeData(updatedData);
  };

  // Handle Update (Open Modal)
  const handleUpdate = (employee) => {
    setEditingEmployee({ ...employee });
    setShowModal(true);
  };

  // Handle Form Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Save
  const handleSave = () => {
    setEmployeeData((prevData) =>
      prevData.map((employee) =>
        employee.id === editingEmployee.id ? editingEmployee : employee
      )
    );
    setShowModal(false);
    setEditingEmployee(null);
  };

  // Handle Cancel (Close Modal)
  const handleCancel = () => {
    setShowModal(false);
    setEditingEmployee(null);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Employee Details</h1>
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
            <div style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={editingEmployee.firstName}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={editingEmployee.lastName}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Employee ID</label>
                <input
                  type="text"
                  name="employeeId"
                  value={editingEmployee.employeeId}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Birthday</label>
                <input
                  type="date"
                  name="birthday"
                  value={editingEmployee.birthday}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Contact Number</label>
                <input
                  type="text"
                  name="contactNumber"
                  value={editingEmployee.contactNumber}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Email</label>
                <input
                  type="email"
                  name="email"
                  value={editingEmployee.email}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Home Address</label>
                <input
                  type="text"
                  name="homeAddress"
                  value={editingEmployee.homeAddress}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>National ID</label>
                <input
                  type="text"
                  name="nationalId"
                  value={editingEmployee.nationalId}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={editingEmployee.startDate}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Job Title</label>
                <input
                  type="text"
                  name="jobTitle"
                  value={editingEmployee.jobTitle}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Department</label>
                <input
                  type="text"
                  name="department"
                  value={editingEmployee.department}
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
    width:'1550px'
  },
  title: {
    fontSize: '2.5rem',
    color: '#00cc00',
    textAlign: 'center',
    marginBottom: '30px',
    fontWeight: 'bold',
  },
  tableWrapper: {
    width:'1450px',
    
    overflowX: 'auto',
    background: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    scrollbarWidth: 'thin',
    scrollbarColor: '#888 #f5f5f5',
    '&::-webkit-scrollbar': {
      width: '8px',
      height: '8px',
    },
    '&::-webkit-scrollbar-track': {
      background: '#f5f5f5',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#888',
      borderRadius: '4px',
      '&:hover': {
        backgroundColor: '#555',
      },
    },
  },
  table: {
    width: '100%',
    minWidth: '1200px',
    borderCollapse: 'collapse',
  },
  th: {
    background: 'linear-gradient(45deg, hsl(130, 100%, 37%) 0%, #99ff00 100%)',
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
    '::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: '0',
      height: '0',
      background: 'rgba(255, 255, 255, 0.3)',
      borderRadius: '50%',
      transform: 'translate(-50%, -50%)',
      transition: 'width 0.4s ease, height 0.4s ease',
    },
    ':active::after': {
      width: '100px',
      height: '100px',
      animation: 'ripple 0.4s ease-out forwards',
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
    background: '#ffffff', // White background
    color: '#000000', // Black text
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
};

// Define keyframes for ripple animation
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes ripple {
    from {
      width: 0;
      height: 0;
      opacity: 1;
    }
    to {
      width: 100px;
      height: 100px;
      opacity: 0;
    }
  }
`, styleSheet.cssRules.length);

export default ZenTeaEmployeeTable;