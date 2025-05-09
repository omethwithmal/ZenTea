import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faVenusMars, faKey, faUserTag, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const ProfilePage = () => {
  const navigate = useNavigate();
  
 
  const user = {
    fullName: "Alex Johnson",
    email: "alex.johnson@example.com",
    gender: "Male",
    role: "Customer",
    joinDate: "May 2025"
  };

  const handleLogout = () => {
   
    console.log("User logged out");
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <div style={styles.profileCard}>
        <div style={styles.header}>
          <div style={styles.avatar}>
            <FontAwesomeIcon icon={faUser} style={styles.avatarIcon} />
          </div>
          <h1 style={styles.title}>Profile Details</h1>
        </div>
        
        <div style={styles.detailsContainer}>
          {/* Full Name */}
          <div style={styles.detailItem}>
            <div style={styles.detailLabel}>
              <FontAwesomeIcon icon={faUser} style={styles.icon} />
              <span>Full Name</span>
            </div>
            <div style={styles.detailValue}>{user.fullName}</div>
          </div>
          
          {/* Email */}
          <div style={styles.detailItem}>
            <div style={styles.detailLabel}>
              <FontAwesomeIcon icon={faEnvelope} style={styles.icon} />
              <span>Email Address</span>
            </div>
            <div style={styles.detailValue}>{user.email}</div>
          </div>
          
          {/* Gender */}
          <div style={styles.detailItem}>
            <div style={styles.detailLabel}>
              <FontAwesomeIcon icon={faVenusMars} style={styles.icon} />
              <span>Gender</span>
            </div>
            <div style={styles.detailValue}>{user.gender}</div>
          </div>
          
          {/* Role */}
          <div style={styles.detailItem}>
            <div style={styles.detailLabel}>
              <FontAwesomeIcon icon={faUserTag} style={styles.icon} />
              <span>User Role</span>
            </div>
            <div style={styles.detailValue}>{user.role}</div>
          </div>
          
          {/* Member Since */}
          <div style={styles.detailItem}>
            <div style={styles.detailLabel}>
              <FontAwesomeIcon icon={faKey} style={styles.icon} />
              <span>Member Since</span>
            </div>
            <div style={styles.detailValue}>{user.joinDate}</div>
          </div>
        </div>
        
        <button onClick={handleLogout} style={styles.logoutButton}>
          <FontAwesomeIcon icon={faSignOutAlt} style={styles.logoutIcon} />
          Logout
        </button>
      </div>
    </div>
  );
};


const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    padding: '20px',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    marginLeft: "",
  },
  profileCard: {
    width: '100%',
    maxWidth: '500px',
    background: 'rgba(255, 255, 255, 0.85)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    padding: '40px',
    boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    animation: 'fadeIn 0.5s ease-out'
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px'
  },
  avatar: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    background: 'linear-gradient(45deg, #6a11cb 0%, #2575fc 100%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto 20px',
    boxShadow: '0 4px 15px rgba(106, 17, 203, 0.3)'
  },
  avatarIcon: {
    color: 'white',
    fontSize: '40px'
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#2c3e50',
    margin: '0'
  },
  detailsContainer: {
    marginBottom: '30px'
  },
  detailItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 0',
    borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
  },
  detailLabel: {
    display: 'flex',
    alignItems: 'center',
    color: '#7f8c8d',
    fontSize: '16px',
    fontWeight: '500'
  },
  detailValue: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#2c3e50'
  },
  icon: {
    marginRight: '10px',
    color: '#6a11cb',
    width: '20px',
    textAlign: 'center'
  },
  logoutButton: {
    width: '100%',
    padding: '15px',
    background: 'linear-gradient(45deg, #ff4d4d 0%, #f94444 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(249, 68, 68, 0.3)',
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 20px rgba(249, 68, 68, 0.4)'
    }
  },
  logoutIcon: {
    fontSize: '18px'
  },
  '@keyframes fadeIn': {
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' }
  }
};

export default ProfilePage;