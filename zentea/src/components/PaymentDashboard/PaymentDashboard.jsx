import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const PaymentDashboard = () => {
  const [payments, setPayments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("payments")) || [];
    setPayments(data);
  }, []);

  return (
    <div style={{ 
      padding: 20, 
      marginLeft: "250px", 
      marginTop: "-200px", 
      width: "1000px",
      maxHeight: "500px", // Set a fixed height for the container
      overflowY: "auto", // Enable vertical scrolling
      border: "1px solid #ddd", // Optional: Add border for visual clarity
      borderRadius: "8px" // Optional: Rounded corners
    }}>
      <h1>Payment Dashboard</h1>

      <table style={{ 
        width: "100%", 
        borderCollapse: "collapse", 
        marginTop: 20 
      }}>
        <thead style={{ position: "sticky", top: 0, zIndex: 1 }}>
          <tr style={{ backgroundColor: "rgb(4, 245, 64)", color: "white" }}>
            <th style={thStyle}>Amount</th>
            <th style={thStyle}>Card Number</th>
            <th style={thStyle}>Name on Card</th>
            <th style={thStyle}>CVV Code</th>
            <th style={thStyle}>Expiration Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => (
            <tr key={index} style={{ backgroundColor: "#f9f9f9" }}>
              <td style={tdStyle}>{payment.amount}</td>
              <td style={tdStyle}>{payment.cardNumber}</td>
              <td style={tdStyle}>{payment.cardName}</td>
              <td style={tdStyle}>{payment.cvv}</td>
              <td style={tdStyle}>{payment.expiry}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const thStyle = { 
  padding: "10px", 
  border: "1px solid #ddd",
  backgroundColor: "rgb(4, 245, 64)" // Ensure header background persists
};

const tdStyle = { 
  padding: "10px", 
  border: "1px solid #ddd" 
};

export default PaymentDashboard;