import React from 'react';
import { useNavigate } from 'react-router-dom';

const AttendanceRecordCard = () => {
  const navigate = useNavigate();

  // Fetch employee data from localStorage
  const allUsers = JSON.parse(localStorage.getItem('zentea_users') || '[]');

  // Simulate admin-added employees
  const adminUsers = [
    { email: 'admin1@zentea.com', fullName: 'Admin User 1', role: 'admin', source: 'admin' },
    { email: 'admin2@zentea.com', fullName: 'Admin User 2', role: 'employee', source: 'admin' },
  ];

  const employeeUsers = allUsers.filter((user) => !user.source || user.source === 'employee');

  const handleEmployeeCartClick = () => {
    navigate('/attendanceForm', {
      state: { type: 'employee', employees: employeeUsers },
    });
  };

  const handleAdminCartClick = () => {
    navigate('/QRCodeScanner', {
      state: { type: 'admin', employees: adminUsers },
    });
  };

  return (
    <div style={styles.mainLayout}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <i className="fas fa-cogs" style={{ fontSize: '40px', marginBottom: '10px' }}></i>
          <h1 style={{ margin: '5px 0', fontSize: '35px' }}>Employee</h1>
          <h2 style={{ margin: '5px 0', fontSize: '25px', fontWeight: 'normal' }}>Dashboard</h2>
        </div>
        <nav style={{ marginTop: '20px' }}>
          <a href="#" style={styles.sidebarLink} onClick={() => navigate('/EmployeeDashboard')}>
            <i className="fas fa-users" style={{ marginRight: '10px' }}></i>
            <span>Employee Task</span>
          </a>

          <a href="#" style={styles.sidebarLink} onClick={() => navigate('/NotificationDashboard')}>
            <i className="fas fa-wallet" style={{ marginRight: '10px' }}></i>
            <span>Notification</span>
          </a>

          <a href="#" style={styles.sidebarLink} onClick={() => navigate('/AttendanceRecordCard')}>
            <i className="fas fa-wallet" style={{ marginRight: '10px' }}></i>
            <span>Mark Attendance</span>
          </a>


          <a href="#" style={styles.sidebarLink} onClick={() => navigate('/AttendanceDashboard')}>
            <i className="fas fa-truck" style={{ marginRight: '10px' }}></i>
            <span>Employee Attendance</span>
          </a>
          <a href="#" style={styles.sidebarLink} onClick={() => navigate('/EmployeeDetailsCart')}>
            <i className="fas fa-id-badge" style={{ marginRight: '10px' }}></i>
            <span>Employee Details</span>
          </a>
          <a href="#" style={styles.sidebarLink}>
            <i className="fas fa-boxes" style={{ marginRight: '10px' }}></i>
            <span>Settings</span>
          </a>
          <a href="#" style={styles.sidebarLink} onClick={() => navigate('/')}>
            <i className="fas fa-sign-out-alt" style={{ marginRight: '10px' }}></i>
            <span>Log Out</span>
          </a>
        </nav>
      </aside>

      {/* Content Area */}
      <div style={styles.container}>
        <h1 style={styles.title}>ZenTea Employee Attendance</h1>
        <div style={styles.cartWrapper}>
          {/* Employee Manual Entry */}
          <div style={styles.cart} onClick={handleEmployeeCartClick}>
            <img
              src="../src/assets/Manual Add Employee.jpg"
              alt="Employee Cover"
              style={styles.coverPhoto}
            />
            <div style={styles.cartContent}>
              <h2 style={styles.cartTitle}>Manual Add Employee</h2>
              <p style={styles.cartDescription}>
                Add attendance Manually...
              </p>
              <button style={styles.cartButton}>Go</button>
            </div>
          </div>

          {/* QR Scanner */}
          <div style={styles.cart} onClick={handleAdminCartClick}>
            <img
              src="../src/assets/Scan QR Code.jpg"
              alt="Admin Cover"
              style={styles.coverPhoto}
            />
            <div style={styles.cartContent}>
              <h2 style={styles.cartTitle}>Scan QR Code</h2>
              <p style={styles.cartDescription}>
                Scan ID via QR...
              </p>
              <button style={styles.cartButton}>Go</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Styling
const styles = {
  mainLayout: {
    display: 'flex',
    minHeight: '100vh',
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
  },
  sidebar: {
    width: '250px',
    background: 'linear-gradient(45deg, hsl(130, 100%, 37%) 0%, #99ff00 100%)',
    color: 'white',
    padding: '20px 0',
  },
  sidebarHeader: {
    textAlign: 'center',
    padding: '20px 0',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  },
  sidebarLink: {
    display: 'block',
    padding: '15px 20px',
    color: 'white',
    textDecoration: 'none',
    borderLeft: '4px solid transparent',
    
    cursor: 'pointer',
  },
  container: {
    flex: 1,
    background: 'linear-gradient(135deg, rgb(255, 255, 255) 0%, #f9f9f9 100%)',
    padding: '40px 20px',
    overflowY: 'auto',
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
    maxWidth: '1200px',
    margin: '0 auto',
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
    margin: 0,
  },
  cartDescription: {
    fontSize: '1rem',
    color: '#333',
    margin: 0,
    lineHeight: '1.5',
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

export default AttendanceRecordCard;
