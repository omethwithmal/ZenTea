import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const [showWhatsAppPopup, setShowWhatsAppPopup] = useState(false);
  const [showEmailPopup, setShowEmailPopup] = useState(false);

  // Chart data
  const notificationData = [
    { name: 'Jan', whatsapp: 15, email: 30 },
    { name: 'Feb', whatsapp: 25, email: 42 },
    { name: 'Mar', whatsapp: 18, email: 35 },
    { name: 'Apr', whatsapp: 32, email: 28 },
    { name: 'May', whatsapp: 28, email: 40 },
    { name: 'Jun', whatsapp: 40, email: 33 },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside style={{
                width: '250px',
                backgroundColor: '#2c3e50',
                color: 'white',
                padding: '20px 0',
                minHeight: '100vh',
                background: 'linear-gradient(45deg, hsl(130, 100%, 37%) 0%, #99ff00 100%)'
            }}>
                <div style={{
                    textAlign: 'center',
                    padding: '20px 0',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                    <i className="fas fa-cogs" style={{ fontSize: '40px', marginBottom: '10px' }}></i>
                    <h1 style={{ margin: '5px 0', fontSize: '35px' }}>Employee</h1>
                    <h2 style={{ margin: '5px 0', fontSize: '25px', fontWeight: 'normal' }}>Dashboard</h2>
                </div>
                <nav style={{ marginTop: '20px' }}>
                    <a href="#" style={{
                        display: 'block',
                        padding: '15px 20px',
                        color: 'white',
                        textDecoration: 'none',
                        borderLeft: '4px solid transparent',
                        
                    }} 
                    onClick={() => navigate('/EmployeeDashboard')}
                    >
                        <i className="fas fa-users" style={{ marginRight: '10px' }}></i>
                        <span>Employee Task</span>
                    </a>
                    <a href="#" style={{
                        display: 'block',
                        padding: '15px 20px',
                        color: 'white',
                        textDecoration: 'none',
                        borderLeft: '4px solid transparent',
                        backgroundColor: 'rgba(255, 255, 255, 0.28)'
                    }}>
                        <i className="fas fa-wallet" style={{ marginRight: '10px' }}></i>
                        <span>Notification</span>
                    </a>

                    <a href="#" style={{
                        display: 'block',
                        padding: '15px 20px',
                        color: 'white',
                        textDecoration: 'none',
                        borderLeft: '4px solid transparent',
                       
                    }}
                    onClick={() => navigate('/AttendanceDashboard')}
                    >
                        <i className="fas fa-truck" style={{ marginRight: '10px' }}></i>
                        <span>Employee Attendance</span>
                    </a>

                    <a
                        href="#"
                        style={{
                            display: 'block',
                            padding: '15px 20px',
                            color: 'white',
                            textDecoration: 'none',
                            borderLeft: '4px solid transparent'
                        }}
                        onClick={() => navigate('/EmployeeDetailsTable')}
                    >
                        <i className="fas fa-truck" style={{ marginRight: '10px' }}></i>
                        <span>Employee details</span>
                    </a>
                    <a href="#" style={{
                        display: 'block',
                        padding: '15px 20px',
                        color: 'white',
                        textDecoration: 'none',
                        borderLeft: '4px solid transparent'
                    }}>
                        <i className="fas fa-boxes" style={{ marginRight: '10px' }}></i>
                        <span>Settings</span>
                    </a>
                    <a href="#" style={{
                        display: 'block',
                        padding: '15px 20px',
                        color: 'white',
                        textDecoration: 'none',
                        borderLeft: '4px solid transparent'
                    }}>
                        <i className="fas fa-tools" style={{ marginRight: '10px' }}></i>
                        <span>Log Out</span>
                    </a>
                </nav>
            </aside>


      {/* Main Content */}
      <div style={{ marginLeft: '100px', padding: '30px', width: 'calc(100% - 280px)' }}>
        {/* Notification Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '20px',
          marginBottom: '40px'
        }}>
          {/* WhatsApp Card */}
          <div 
            style={{
              background: 'linear-gradient(135deg,rgb(75, 250, 0) 0%,rgb(0, 100, 0) 100%)',
              borderRadius: '15px',
              padding: '25px',
              color: 'white',
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
              boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
            }}
            onClick={() => setShowWhatsAppPopup(true)}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <i className="fab fa-whatsapp" style={{ fontSize: '2rem', marginBottom: '15px' }}></i>
            <h3 style={{ margin: '10px 0', fontSize: '1.5rem' }}>WhatsApp Notifications</h3>
            <p style={{ opacity: 0.9 }}>Unread Messages: 5</p>
          </div>

          {/* Email Card */}
          <div 
            style={{
              background: 'linear-gradient(135deg, #EA4335 0%, #BB001B 100%)',
              borderRadius: '15px',
              padding: '25px',
              color: 'white',
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
              boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
            }}
            onClick={() => setShowEmailPopup(true)}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <i className="fas fa-envelope" style={{ fontSize: '2rem', marginBottom: '15px' }}></i>
            <h3 style={{ margin: '10px 0', fontSize: '1.5rem' }}>Email Notifications</h3>
            <p style={{ opacity: 0.9 }}>Unread Emails: 12</p>
          </div>
        </div>

        {/* Notification Chart */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '20px',
          padding: '25px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          height: '500px'
        }}>
          <h2 style={{ 
            marginBottom: '20px', 
            color: '#2c3e50',
            fontSize: '1.8rem',
            fontWeight: '600'
          }}>
            Notification Trends
          </h2>
          <div style={{ height: 'calc(100% - 40px)' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={notificationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: '#2c3e50' }}
                  axisLine={{ stroke: '#2c3e50' }}
                />
                <YAxis 
                  tick={{ fill: '#2c3e50' }}
                  axisLine={{ stroke: '#2c3e50' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                />
                <Legend />
                <Bar 
                  dataKey="whatsapp" 
                  name="WhatsApp Notifications"
                  fill="#25D366" 
                />
                <Bar 
                  dataKey="email" 
                  name="Email Notifications"
                  fill="#EA4335" 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Popup Modals */}
        {showWhatsAppPopup && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000
          }}>
            <div style={{
              background: 'white',
              padding: '30px',
              borderRadius: '15px',
              textAlign: 'center',
              maxWidth: '400px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
            }}>
              <h3 style={{ marginBottom: '15px', fontSize: '1.5rem' }}>Continue to WhatsApp?</h3>
              <p style={{ marginBottom: '25px', color: '#666' }}>You'll be redirected to the WhatsApp application</p>
              <div>
                <button 
                  onClick={() => window.open('https://web.whatsapp.com/', '_blank')}
                  style={{
                    background: '#25D366',
                    color: 'white',
                    border: 'none',
                    padding: '12px 25px',
                    borderRadius: '8px',
                    margin: '0 10px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    transition: 'transform 0.2s ease'
                  }}
                >
                  Continue
                </button>
                <button 
                  onClick={() => setShowWhatsAppPopup(false)}
                  style={{
                    background: '#f0f0f0',
                    color: '#333',
                    border: 'none',
                    padding: '12px 25px',
                    borderRadius: '8px',
                    margin: '0 10px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    transition: 'transform 0.2s ease'
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {showEmailPopup && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000
          }}>
            <div style={{
              background: 'white',
              padding: '30px',
              borderRadius: '15px',
              textAlign: 'center',
              maxWidth: '400px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
            }}>
              <h3 style={{ marginBottom: '15px', fontSize: '1.5rem' }}>Continue to Email?</h3>
              <p style={{ marginBottom: '25px', color: '#666' }}>You'll be redirected to your email client</p>
              <div>
                <button 
                  onClick={() => window.open('https://mail.google.com/', '_blank')}
                  style={{
                    background: '#EA4335',
                    color: 'white',
                    border: 'none',
                    padding: '12px 25px',
                    borderRadius: '8px',
                    margin: '0 10px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    transition: 'transform 0.2s ease'
                  }}
                >
                  Continue
                </button>
                <button 
                  onClick={() => setShowEmailPopup(false)}
                  style={{
                    background: '#f0f0f0',
                    color: '#333',
                    border: 'none',
                    padding: '12px 25px',
                    borderRadius: '8px',
                    margin: '0 10px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    transition: 'transform 0.2s ease'
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeDashboard;