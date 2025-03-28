import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faWallet, faTruck, faBoxes, faTools, faFilePdf } from '@fortawesome/free-solid-svg-icons';

const FinancialDashboard = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalIncome, setTotalIncome] = useState(0);
  const [fixedOutcome] = useState(78230);
  const [profit, setProfit] = useState(0);

  // Fetch orders and calculate financials
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:8070/order');
        const data = await response.json();
        if (data.orders) {
          setOrders(data.orders);
          
          // Calculate total income (price × quantity for each order)
          const calculatedIncome = data.orders.reduce((sum, order) => {
            const price = parseFloat(order.Price) || 0;
            const quantity = parseInt(order.Quantity) || 1;
            return sum + (price * quantity);
          }, 0);
          
          setTotalIncome(calculatedIncome);
          setProfit(calculatedIncome - fixedOutcome);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };
    fetchOrders();
  }, [fixedOutcome]);

  // Generate PDF report
  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(20);
    doc.text('Financial Dashboard Report', 105, 20, { align: 'center' });
    
    // Date
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 105, 30, { align: 'center' });
    
    // Financial Summary
    doc.setFontSize(14);
    doc.text('Financial Summary', 14, 45);
    
    // Data
    doc.setFontSize(12);
    doc.text(`Total Orders: ${orders.length}`, 14, 55);
    doc.text(`Total Income: Rs ${totalIncome.toFixed(2)}`, 14, 65);
    doc.text(`Fixed Costs: Rs ${fixedOutcome.toFixed(2)}`, 14, 75);
    doc.text(`Net Profit: Rs ${profit.toFixed(2)}`, 14, 85);
    
    // Save PDF
    doc.save('financial_report.pdf');
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
        Loading financial data...
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
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '600' }}>Financial</h1>
          <h2 style={{ margin: '5px 0 0', fontSize: '18px', fontWeight: '400' }}>Dashboard</h2>
        </div>
        
        <nav style={{ marginTop: '30px' }}>
          {[
            { icon: faUsers, text: 'Dashboard', active: true },
            { icon: faWallet, text: 'Notification' },
        
            { icon: faTools, text: 'Settings' }
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
                ':hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              <FontAwesomeIcon icon={item.icon} style={{ marginRight: '10px' }} />
              <span>{item.text}</span>
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
        {/* Header with PDF Button */}
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
          }}>Financial Overview</h1>
          
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

        {/* Financial Metrics Cards */}
        <div style={{
          display: 'flex',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }}>
          {/* Income Card */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
            transition: 'transform 0.3s',
            ':hover': {
              transform: 'translateY(-5px)'
            }
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '15px'
            }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#7f8c8d',
                margin: 0
              }}>Total Income</h3>
              <div style={{
                backgroundColor: '#2ecc71',
                color: 'white',
                borderRadius: '12px',
                padding: '4px 10px',
                fontSize: '12px',
                fontWeight: '600'
              }}>
                {orders.length} orders
              </div>
            </div>
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
            }}>From all completed orders</p>
          </div>

          {/* Expenses Card */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
            transition: 'transform 0.3s',
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
              Rs {fixedOutcome.toLocaleString('en-IN', {
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

          {/* Profit Card */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
            transition: 'transform 0.3s',
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
              Rs {profit.toLocaleString('en-IN', {
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
          marginTop: '30px'
        }}>
          {[
            { text: 'Employee Salaries', path: '/EmployeeSalary' },
            { text: 'Order Details', path: '/ViewOrderDetails' },
            { text: 'Maintenance', path: '/MaintenanceRevenue' }
          ].map((item, index) => (
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
      </div>
    </div>
  );
};

export default FinancialDashboard;