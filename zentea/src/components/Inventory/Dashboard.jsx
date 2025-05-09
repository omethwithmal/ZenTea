import React from 'react';
import { useNavigate } from "react-router-dom";
import { 
  FaTh, FaCommentAlt, FaCalendarAlt, FaEnvelope, 
  FaSignOutAlt, FaChartLine, FaCog, FaBell, FaBoxes 
} from 'react-icons/fa';

const Dashboard = () => {
  const navigate = useNavigate();

  // Service data with navigation paths
  const services = [
    {
      title: "Inventory Overview",
      icon: <FaBoxes size={24} />,
      description: "View and manage all inventory items",
      stats: "245 items",
      color: "#28a745",
      path: "/inventory-form" // Changed to lowercase for consistency
    },
    {
      title: "Analytics Dashboard",
      icon: <FaChartLine size={24} />,
      description: "View inventory analytics and reports",
      stats: "15 reports",
      color: "#28a745",
      path: "/analyze"
    },
    {
      title: "add item cart",
      icon: <FaCog size={24} />,
      description: "Configure inventory preferences",
      stats: "8 categories",
      color: "#28a745",
      path: "/add-tea-item"
    },
    {
      title: "Alerts",
      icon: <FaBell size={24} />,
      description: "Manage inventory alerts",
      stats: "5 new",
      color: "#28a745",
      path: "/alerts"
    }
  ];

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <div style={{ 
      display: 'flex',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f5f5f5'
    }}>
      {/* Sidebar */}
      <div style={{
        width: '250px',
        backgroundColor: '#28a745',
        color: 'white',
        padding: '20px 0',
        position: 'fixed',
        height: '100vh'
      }}>
        <div style={{
          padding: '0 20px',
          marginBottom: '30px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <FaBoxes size={28} />
          <h2 style={{
            color: 'white',
            fontSize: '20px',
            margin: 0
          }}>
            Inventory Management
          </h2>
        </div>
        
        <nav>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0
          }}>
            <li style={{
              padding: '12px 20px',
              backgroundColor: '#218838',
              borderLeft: '4px solid white'
            }}>
              <div style={{
                color: 'white',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                cursor: 'pointer'
              }}>
                <FaTh /> Dashboard
              </div>
            </li>
            <li style={{ 
              padding: '12px 20px',
              ':hover': {
                backgroundColor: '#218838'
              }
            }}>
              <div style={{
                color: 'rgba(255,255,255,0.8)',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                cursor: 'pointer'
              }}>
                <FaCommentAlt /> Categories
              </div>
            </li>
            <li style={{ 
              padding: '12px 20px',
              ':hover': {
                backgroundColor: '#218838'
              }
            }}>
              <div style={{
                color: 'rgba(255,255,255,0.8)',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                cursor: 'pointer'
              }}>
                <FaCalendarAlt /> Orders
              </div>
            </li>
            <li style={{ 
              padding: '12px 20px',
              ':hover': {
                backgroundColor: '#218838'
              }
            }}>
              <div style={{
                color: 'rgba(255,255,255,0.8)',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                cursor: 'pointer'
              }}>
                <FaEnvelope /> Notifications
              </div>
            </li>
          </ul>
        </nav>
        
        <div style={{
          padding: '20px',
          position: 'absolute',
          bottom: '0',
          width: '210px'
        }}>
          <div style={{
            color: 'rgba(255,255,255,0.8)',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            ':hover': {
              color: 'white',
              cursor: 'pointer'
            }
          }}>
            <FaSignOutAlt /> Logout
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ 
        flex: 1,
        padding: '30px',
        marginLeft: '250px' // To account for fixed sidebar
      }}>
        <h1 style={{
          color: '#333',
          fontSize: '28px',
          fontWeight: 'bold',
          marginBottom: '30px'
        }}>Inventory Dashboard</h1>
        
        {/* Services Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }}>
          {services.map((service, index) => (
            <div 
              key={index}
              onClick={() => handleCardClick(service.path)}
              style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                padding: '20px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
                borderTop: `4px solid ${service.color}`,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                ':hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                  cursor: 'pointer'
                }
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '15px'
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: `${service.color}20`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '15px',
                  color: service.color
                }}>
                  {service.icon}
                </div>
                <h3 style={{
                  margin: 0,
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#333'
                }}>{service.title}</h3>
              </div>
              <p style={{
                color: '#666',
                marginBottom: '15px',
                fontSize: '14px'
              }}>{service.description}</p>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{
                  fontSize: '12px',
                  color: '#999'
                }}>STATS</span>
                <span style={{
                  fontWeight: 'bold',
                  color: '#333'
                }}>{service.stats}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity Section */}
        <div style={{ 
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '20px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
        }}>
          <h2 style={{
            color: '#333',
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '20px',
            paddingBottom: '10px',
            borderBottom: '1px solid #eee'
          }}>Recent Inventory Activity</h2>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            padding: '15px 0',
            borderBottom: '1px solid #f5f5f5'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#e8f5e9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '15px',
              color: '#28a745'
            }}>
              <FaBoxes />
            </div>
            <div>
              <p style={{ margin: 0, fontWeight: '500' }}>New inventory items added</p>
              <p style={{ margin: 0, fontSize: '12px', color: '#999' }}>5 minutes ago</p>
            </div>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            padding: '15px 0'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#e8f5e9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '15px',
              color: '#28a745'
            }}>
              <FaChartLine />
            </div>
            <div>
              <p style={{ margin: 0, fontWeight: '500' }}>Inventory report generated</p>
              <p style={{ margin: 0, fontSize: '12px', color: '#999' }}>2 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;