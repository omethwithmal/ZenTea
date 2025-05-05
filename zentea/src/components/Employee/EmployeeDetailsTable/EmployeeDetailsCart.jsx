import React from 'react';
import { useNavigate } from 'react-router-dom';

const EmployeeDetailsCart = () => {
  const navigate = useNavigate();

  // Fetch employee data from localStorage
  const allUsers = JSON.parse(localStorage.getItem('zentea_users') || '[]');

  // Simulate admin-added employees (since no admin form exists)
  const adminUsers = [
    { email: 'admin1@zentea.com', fullName: 'Admin User 1', role: 'admin', source: 'admin' },
    { email: 'admin2@zentea.com', fullName: 'Admin User 2', role: 'employee', source: 'admin' },
  ];

  // Filter employee-added users (from EmpSignUp or EmployeeRegistrationForm)
  const employeeUsers = allUsers.filter((user) => !user.source || user.source === 'employee');

  // Handle click on Employee-Added Cart
  const handleEmployeeCartClick = () => {
    navigate('/ZenTeaEmployeeTable', {
      state: { type: 'employee', employees: employeeUsers },
    });
  };

  // Handle click on Admin-Added Cart
  const handleAdminCartClick = () => {
    navigate('/EmployeeDetailsTable', {
      state: { type: 'admin', employees: adminUsers },
    });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>ZenTea Employee Details</h1>
      <div style={styles.cartWrapper}>
        {/* Employee-Added Cart */}
        <div style={styles.cart} onClick={handleEmployeeCartClick}>
          <img
            src="https://images.unsplash.com/photo-1528747045269-390fe33c19f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
            alt="Employee Cover"
            style={styles.coverPhoto}
          />
          <div style={styles.cartContent}>
            <h2 style={styles.cartTitle}>Employee-Added Profiles</h2>
            <p style={styles.cartDescription}>
              View details of {employeeUsers.length} employees registered by themselves.
            </p>
            <p style={styles.cartSample}>
              {employeeUsers.length > 0
                ? `E.g., ${employeeUsers[0].fullName}, ${employeeUsers.length > 1 ? employeeUsers[1].fullName : ''}`
                : 'No employees yet.'}
            </p>
            <button style={styles.cartButton}>Explore Employee Profiles</button>
          </div>
        </div>

        {/* Admin-Added Cart */}
        <div style={styles.cart} onClick={handleAdminCartClick}>
          <img
            src="https://images.unsplash.com/photo-1528747045269-390fe33c19f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
            alt="Admin Cover"
            style={styles.coverPhoto}
          />
          <div style={styles.cartContent}>
            <h2 style={styles.cartTitle}>Admin-Added Profiles</h2>
            <p style={styles.cartDescription}>
              View details of {adminUsers.length} employees added by administrators.
            </p>
            <p style={styles.cartSample}>
              E.g., {adminUsers[0].fullName}, {adminUsers[1].fullName}
            </p>
            <button style={styles.cartButton}>Explore Admin Profiles</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'linear-gradient(135deg, rgb(255, 255, 255) 0%, #f9f9f9 100%)',
    padding: '40px 20px',
    position: 'relative',
    overflow: 'hidden',
    width:"1525px"
  },
  title: {
    fontSize: '2.5rem',
    color: '#2a5c42',
    textAlign: 'center',
    marginBottom: '40px',
    fontWeight: '300',
    animation: 'fadeSlideUp 0.8s ease-out forwards',
  },
  cartWrapper: {
    display: 'flex',
    gap: '30px',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: '1200px',
  },
  cart: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    width: '100%',
    maxWidth: '500px',
    overflow: 'hidden',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    animation: 'fadeSlideUp 0.8s ease-out forwards',
    ':hover': {
      transform: 'scale(1.03)',
      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3)',
    },
  },
  coverPhoto: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderTopLeftRadius: '16px',
    borderTopRightRadius: '16px',
  },
  cartContent: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  cartTitle: {
    fontSize: '1.8rem',
    color: '#2a5c42',
    fontWeight: '400',
    margin: '0',
  },
  cartDescription: {
    fontSize: '1rem',
    color: '#333',
    margin: '0',
    lineHeight: '1.5',
  },
  cartSample: {
    fontSize: '0.9rem',
    color: '#666',
    fontStyle: 'italic',
    margin: '0',
  },
  cartButton: {
    background: 'linear-gradient(45deg, hsl(130, 100%, 37%) 0%, #99ff00 100%)',
    color: 'white',
    padding: '12px',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginTop: '10px',
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    },
  },
};

// Define keyframes for animations
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes fadeSlideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`, styleSheet.cssRules.length);

export default EmployeeDetailsCart;