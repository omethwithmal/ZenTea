import React from 'react';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';

const FinancialDashboard = () => {
  const navigate = useNavigate();

  // Function to generate PDF with the necessary content
  const generatePDF = () => {
    const doc = new jsPDF();
    const content = document.querySelector(".dashboard"); // Get the entire dashboard content

    doc.html(content, {
      callback: function (doc) {
        doc.save('Financial_Dashboard.pdf');
      },
      x: 10,
      y: 10,
      width: 180, // You can adjust the width as needed
    });
  };

  return (
    <div className="dashboard" style={{
      display: 'flex',
      width: '200px',
      minHeight: '100vh',
      background: 'rgb(255, 0, 0)',
      fontFamily: "'Poppins', sans-serif",
       marginLeft: "500px"
      
    }}>
      {/* Sidebar */}
      <aside style={{
        background: 'linear-gradient(45deg, hsl(130, 100%, 37%) 0%, #99ff00 100%)',
        padding: '30px',
        color: 'rgb(255, 255, 255)',
        width: '280px',
        position: 'fixed',
        height: '100vh',
        marginLeft: '-500px',
      }}>
        <div style={{
          marginBottom: '30px',
          textAlign: 'center'
        }}>
          <i className="fas fa-cogs" style={{ fontSize: '48px', marginBottom: '10px' }}></i>
          <h1 style={{ margin: 0, fontWeight: 600, letterSpacing: '1px', fontSize: '40px' }}>Financial</h1>
          <h2 style={{ margin: 0, fontWeight: 600, letterSpacing: '1px' }}>Dashboard</h2>
        </div>
        <nav>
          {[ 
            { icon: 'fa-users', text: 'Financial', active: true },
            { icon: 'fa-wallet', text: 'Notification' },
            { icon: 'fa-truck', text: 'Financialdetails', path: '/FinancialDetails' },
            { icon: 'fa-boxes', text: 'Settings' },
            { icon: 'fa-tools', text: 'Log Out' }
          ].map((item, index) => (
            
            <a
              key={index}
              href="#"
              onClick={item.path ? () => navigate(item.path) : undefined}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '15px 20px',
                margin: '10px 0',
                borderRadius: '8px',
                color: 'rgba(255, 255, 255, 0.8)',
                transition: 'all 0.3s ease',
                textDecoration: 'none',
                fontWeight: 'bold',
                background: item.active ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                ':hover': {
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: 'white'
                }
              }}
            >
              <i className={`fas ${item.icon}`} style={{ marginRight: '15px' }}></i>
              <span>{item.text}</span>
            </a>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{
        marginLeft: '-150px',
        padding: '25px',
        background: 'rgb(255, 255, 255)',
        flex: 1
      }}>
        {/* Generate PDF Button */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <button
            onClick={generatePDF}
            style={{
              padding: '15px 25px',
              background: 'linear-gradient(135deg, #4CAF50, #8BC34A)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '18px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          >
            Generate PDF
          </button>
        </div>

        <h1 style={{
          fontSize: '36px',
          color: '#1a1a1a',
          marginBottom: '30px',
          fontWeight: 700,
          textShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>Financial Dashboard</h1>

        {/* Widgets Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '150px',
          marginBottom: '40px'
        }}>
          {[ 
            { title: 'Income', value: 'Rs125,430', color: '#4CAF50' },
            { title: 'Outcome', value: 'RS 78,230', color: '#F44336' },
            { title: 'Profit', value: 'RS 47,200', color: '#2196F3' }
          ].map((widget, index) => (
            <div key={index} style={{
              background: 'white',
              padding: '25px',
              borderRadius: '15px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease',
              ':hover': { transform: 'translateY(-5px)' }
            }}>
              <h3 style={{ color: '#666', margin: 0, fontSize: '18px' }}>{widget.title}</h3>
              <p style={{
                fontSize: '32px',
                fontWeight: 600,
                color: widget.color,
                margin: '10px 0 0'
              }}>{widget.value}</p>
            </div>
          ))}
        </div>

        {/* Calculation Section */}
        <section style={{
          background: 'white',
          padding: '30px',
          borderRadius: '15px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          marginBottom: '40px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '24px', color: '#1a1a1a', margin: 0 }}>Calculations</h2>
            <button
              onClick={() => navigate('/calculation')}
              style={{
                padding: '12px 25px',
                background: 'linear-gradient(135deg, #2196F3, #21CBF3)',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                ':hover': { transform: 'scale(1.05)', boxShadow: '0 4px 15px rgba(33,150,243,0.4)' }
              }}
            >
              Calculation Page
            </button>
          </div>
          <div style={{ marginTop: '20px' }}>
            <input
              type="date"
              defaultValue="2025-03-24"
              style={{
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '16px'
              }}
            />
          </div>
        </section>

        {/* Navigation Buttons */}
        <div style={{
          display: 'flex',
          gap: '20px'
        }}>
          {[ 
            { text: 'View Employee Salary', path: '/EmployeeSalary' },
            { text: 'Order Revenue', path: '/ViewOrderDetails' },
            { text: 'Maintenance Revenue', path: '/MaintenanceRevenue' }
          ].map((btn, index) => (
            <button
              key={index}
              onClick={() => navigate(btn.path)}
              style={{
                flex: 1,
                padding: '15px',
                background: 'linear-gradient(135deg, #6D4AFF, #8A65FF)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 10px rgba(109,74,255,0.2)',
                ':hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 5px 15px rgba(109,74,255,0.4)'
                }
              }}
            >
              {btn.text}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default FinancialDashboard;
