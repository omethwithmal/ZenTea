import React from 'react';
import { useNavigate } from 'react-router-dom';

const EmployeeDetailsCart = () => {
  const navigate = useNavigate();

  const allUsers = JSON.parse(localStorage.getItem('zentea_users') || '[]');

  const adminUsers = [
    { email: 'admin1@zentea.com', fullName: 'Admin User 1', role: 'admin', source: 'admin' },
    { email: 'admin2@zentea.com', fullName: 'Admin User 2', role: 'employee', source: 'admin' },
  ];

  const employeeUsers = allUsers.filter((user) => !user.source || user.source === 'employee');

  const handleEmployeeCartClick = () => {
    navigate('/ZenTeaEmployeeTable', {
      state: { type: 'employee', employees: employeeUsers },
    });
  };

  const handleAdminCartClick = () => {
    navigate('/EmployeeDetailsTable', {
      state: { type: 'admin', employees: adminUsers },
    });
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <i className="fas fa-cogs" style={{ fontSize: '40px', marginBottom: '10px' }}></i>
          <h1 style={{ margin: '5px 0', fontSize: '35px' }}>Employee</h1>
          <h2 style={{ margin: '5px 0', fontSize: '25px', fontWeight: 'normal' }}>Dashboard</h2>
        </div>
        <nav style={{ marginTop: '20px' }}>
          <a href="#" style={styles.navItem} onClick={() => navigate('/EmployeeDashboard')}>
            <i className="fas fa-users" style={{ marginRight: '10px' }}></i>
            <span>Employee Task</span>
          </a>
          <a href="#" style={styles.navItem} onClick={() => navigate('/NotificationDashboard')}>
            <i className="fas fa-wallet" style={{ marginRight: '10px' }}></i>
            <span>Notification</span>
          </a>
          <a href="#" style={styles.navItem} onClick={() => navigate('/AttendanceRecordCard')}>
            <i className="fas fa-truck" style={{ marginRight: '10px' }}></i>
            <span>Mark Attendance</span>
          </a>
          <a href="#" style={styles.navItem} onClick={() => navigate('/AttendanceDashboard')}>
            <i className="fas fa-truck" style={{ marginRight: '10px' }}></i>
            <span>Employee Attendance</span>
          </a>
          <a href="#" style={styles.navItem} onClick={() => navigate('/EmployeeDetailsCart')}>
            <i className="fas fa-truck" style={{ marginRight: '10px' }}></i>
            <span>Employee Details</span>
          </a>
          <a href="#" style={styles.navItem}>
            <i className="fas fa-boxes" style={{ marginRight: '10px' }}></i>
            <span>Settings</span>
          </a>
          <a href="#" style={styles.navItem} onClick={() => navigate('/')}>
            <i className="fas fa-tools" style={{ marginRight: '10px' }}></i>
            <span>Log Out</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div style={styles.container}>
        <h1 style={styles.title}>ZenTea Employee Details</h1>
        <div style={styles.cartWrapper}>
          {/* Employee-Added Cart */}
          <div style={styles.cart} onClick={handleEmployeeCartClick}>
            <img
              src="../src/assets/Employee-Added Profiles.jpg"
              alt="Employee Cover"
              style={styles.coverPhoto}
            />
            <div style={styles.cartContent}>
              <h2 style={styles.cartTitle}>Employee-Added Profiles</h2>
              <p style={styles.cartDescription}>
                View details of {employeeUsers.length} employees registered by themselves.
              </p>
             
              <button style={styles.cartButton}>Explore Employee Profiles</button>
            </div>
          </div>

          {/* Admin-Added Cart */}
          <div style={styles.cart} onClick={handleAdminCartClick}>
            <img
              src="../src/assets/Admin-Added Profiles.jpg"
              alt="Admin Cover"
              style={styles.coverPhoto}
            />
            <div style={styles.cartContent}>
              <h2 style={styles.cartTitle}>Admin-Added Profiles</h2>
              <p style={styles.cartDescription}>
                View details of {adminUsers.length} employees added by administrators.
              </p>
              
              <button style={styles.cartButton}>Explore Admin Profiles</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  sidebar: {
    width: '250px',
    background: 'linear-gradient(45deg, hsl(130, 100%, 37%) 0%, #99ff00 100%)',
    color: 'white',
    padding: '20px 0',
    minHeight: '100vh',
  },
  sidebarHeader: {
    textAlign: 'center',
    padding: '20px 0',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  },
  navItem: {
    display: 'block',
    padding: '15px 20px',
    color: 'white',
    textDecoration: 'none',
    borderLeft: '4px solid transparent',
  },
  container: {
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    flex: 1,
    padding: '40px 20px',
    background: 'linear-gradient(135deg, rgb(255, 255, 255) 0%, #f9f9f9 100%)',
    minHeight: '100vh',
    width:'1300px'
  },
  title: {
    fontSize: '2.5rem',
    color: '#2a5c42',
    textAlign: 'center',
    marginBottom: '40px',
    fontWeight: '300',
  },
  cartWrapper: {
    display: 'flex',
    gap: '30px',
    flexWrap: 'wrap',
    justifyContent: 'center',
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
  },
};

export default EmployeeDetailsCart;
