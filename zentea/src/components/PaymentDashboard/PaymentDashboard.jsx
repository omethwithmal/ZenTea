import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const PaymentDashboard = () => {
  const [payments, setPayments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPayments = () => {
      const data = JSON.parse(localStorage.getItem("payments")) || [];
      const sortedPayments = data.sort((a, b) => 
        new Date(b.date) - new Date(a.date)
      );
      setPayments(sortedPayments);
    };
    
    loadPayments();
    window.addEventListener('storage', loadPayments);
    return () => window.removeEventListener('storage', loadPayments);
  }, []);

  const handleRefresh = () => {
    const data = JSON.parse(localStorage.getItem("payments")) || [];
    setPayments(data);
  };

  const handleDeletePayment = (index) => {
    if (window.confirm("Are you sure you want to delete this payment record?")) {
      const updatedPayments = [...payments];
      updatedPayments.splice(index, 1);
      localStorage.setItem("payments", JSON.stringify(updatedPayments));
      setPayments(updatedPayments);
    }
  };

  return (
    <div style={{ 
      padding: 20, 
      marginLeft: "250px", 
      marginBottom: "300px", 
      width: "1000px",
      maxHeight: "80vh",
      overflowY: "auto",
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ 
          background: 'linear-gradient(135deg, hsl(130, 100%, 37%) 0%, #99ff00 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          display: 'inline-block'
        }}>
          Payment Dashboard
        </h1>
        <button 
          onClick={handleRefresh}
          style={{
            padding: "8px 16px",
            background: 'linear-gradient(135deg, hsl(130, 100%, 37%) 0%, #99ff00 100%)',
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: 'bold',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            transition: 'transform 0.2s',
            ':hover': {
              transform: 'scale(1.05)'
            }
          }}
        >
          Refresh
        </button>
      </div>

      <table style={{ 
        width: "100%", 
        borderCollapse: "collapse", 
        marginTop: 20,
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        <thead>
          <tr style={{ 
            background: 'linear-gradient(135deg, hsl(130, 100%, 37%) 0%, #99ff00 100%)',
            color: "white",
            textShadow: '0 1px 2px rgba(0,0,0,0.2)'
          }}>
            <th style={thStyle}>Amount</th>
            <th style={thStyle}>Card Number</th>
            <th style={thStyle}>Name on Card</th>
            <th style={thStyle}>Expiration Date</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.length > 0 ? (
            payments.map((payment, index) => (
              <tr 
                key={index} 
                style={{ 
                  backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff",
                  transition: 'all 0.3s ease',
                  ':hover': {
                    background: 'linear-gradient(135deg, hsla(130, 100%, 37%, 0.1) 0%, hsla(80, 100%, 50%, 0.1) 100%)'
                  }
                }}
              >
                <td style={tdStyle}>{payment.amount || 'N/A'}</td>
                <td style={tdStyle}>{payment.cardNumber || 'N/A'}</td>
                <td style={tdStyle}>{payment.cardName || 'N/A'}</td>
                <td style={tdStyle}>{payment.expiry || 'N/A'}</td>
                <td style={{ 
                  ...tdStyle, 
                  color: payment.status === "Completed" ? "hsl(130, 100%, 37%)" : "#99ff00",
                  fontWeight: 'bold'
                }}>
                  {payment.status || 'Pending'}
                </td>
                <td style={tdStyle}>
                  <button
                    onClick={() => handleDeletePayment(index)}
                    style={{
                      padding: "6px 12px",
                      background: 'linear-gradient(135deg, hsl(130, 100%, 37%) 0%, #99ff00 100%)',
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontWeight: 'bold',
                      transition: 'all 0.3s',
                      ':hover': {
                        transform: 'scale(1.05)',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
                      }
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ 
                textAlign: "center", 
                padding: "20px",
                color: "hsl(130, 100%, 37%)",
                fontStyle: 'italic'
              }}>
                No payment records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const thStyle = { 
  padding: "12px", 
  textAlign: "left",
  fontWeight: 'bold',
  letterSpacing: '0.5px'
};

const tdStyle = { 
  padding: "12px", 
  borderBottom: "1px solid #e0e0e0",
  verticalAlign: "top",
  transition: 'all 0.3s ease'
};

export default PaymentDashboard; 