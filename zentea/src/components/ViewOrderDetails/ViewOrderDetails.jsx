import React, { useState } from "react";

const ViewOrderDetails = () => {
  const orders = [
    {
      id: 1,
      customerName: "Alice Johnson",
      date: "2025-03-27",
      items: [
        { itemName: "Green Tea", unitPrice: 10, quantity: 5 },
        { itemName: "Black Tea", unitPrice: 12, quantity: 2 },
      ],
    },
    {
      id: 2,
      customerName: "Bob Smith",
      date: "2025-03-26",
      items: [{ itemName: "Herbal Tea", unitPrice: 15, quantity: 3 }],
    },
  ];

  const [amounts, setAmounts] = useState({});

  const calculateAmount = (orderId, itemIndex, unitPrice, quantity) => {
    setAmounts((prev) => ({
      ...prev,
      [`${orderId}-${itemIndex}`]: unitPrice * quantity,
    }));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>View Order Details</h2>
      <table style={styles.table}>
        <thead>
          <tr style={styles.headerRow}>
            <th style={styles.th}>Customer Name</th>
            <th style={styles.th}>Date</th>
            <th style={styles.th}>Item</th>
            <th style={styles.th}>Unit Price</th>
            <th style={styles.th}>Quantity</th>
            <th style={styles.th}>Amount</th>
            <th style={styles.th}>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) =>
            order.items.map((item, index) => (
              <tr key={`${order.id}-${index}`} style={styles.row}>
                <td style={styles.td}>{index === 0 ? order.customerName : ""}</td>
                <td style={styles.td}>{index === 0 ? order.date : ""}</td>
                <td style={styles.td}>{item.itemName}</td>
                <td style={styles.td}>Rs. {item.unitPrice}</td>
                <td style={styles.td}>{item.quantity}</td>
                <td style={styles.td} className="fade-in">
                  {amounts[`${order.id}-${index}`] !== undefined ? (
                    <span style={styles.amount}>Rs. {amounts[`${order.id}-${index}`]}</span>
                  ) : (
                    "-----"
                  )}
                </td>
                <td style={styles.td}>
                  <button
                    style={styles.button}
                    onClick={() => calculateAmount(order.id, index, item.unitPrice, item.quantity)}
                  >
                    Calculate
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "'Poppins', sans-serif",
    background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
     marginLeft: "350px"
  },
  heading: {
    textAlign: "center",
    fontSize: "26px",
    color: "#333",
    fontWeight: "600",
    marginBottom: "20px",
    textShadow: "1px 1px 3px rgba(0,0,0,0.2)",
  },
  table: {
    width: "90%",
    maxWidth: "1000px",
    borderCollapse: "collapse",
    background: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(10px)",
    borderRadius: "12px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
  },
  headerRow: {
    backgroundColor: "#4A90E2",
    color: "#fff",
    borderBottom: "2px solid #ddd",
  },
  th: {
    padding: "12px",
    textAlign: "left",
    fontSize: "14px",
    fontWeight: "bold",
  },
  row: {
    backgroundColor: "#fff",
    transition: "all 0.3s ease-in-out",
  },
  td: {
    padding: "12px",
    borderBottom: "1px solid #ddd",
    fontSize: "14px",
    color: "#333",
  },
  amount: {
    fontWeight: "bold",
    color: "#28A745",
    transition: "opacity 0.5s ease-in-out",
  },
  button: {
    padding: "8px 12px",
    background: "linear-gradient(135deg, #FF512F, #DD2476)",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "bold",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
};

export default ViewOrderDetails;
