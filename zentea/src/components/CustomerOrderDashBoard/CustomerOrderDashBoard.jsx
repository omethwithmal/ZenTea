import React from "react";

const CustomerOrderManagement = () => {
 
  const orders = [
    {
      id: 1,
      fullName: "John Doe",
      nationalId: "123456789",
      deliveryAddress: "123 Main St, Springfield",
      contactNumber: "+1234567890",
      email: "johndoe@example.com",
      teaType: "Green Tea",
      quantity: 5,
      status: "Pending",
    },
    {
      id: 2,
      fullName: "Jane Smith",
      nationalId: "987654321",
      deliveryAddress: "456 Elm St, Shelbyville",
      contactNumber: "+0987654321",
      email: "janesmith@example.com",
      teaType: "Black Tea",
      quantity: 3,
      status: "Shipped",
    },
    {
      id: 3,
      fullName: "Alice Johnson",
      nationalId: "456789123",
      deliveryAddress: "789 Oak St, Capital City",
      contactNumber: "+1122334455",
      email: "alicejohnson@example.com",
      teaType: "Herbal Tea",
      quantity: 10,
      status: "Delivered",
    },
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Customer Order Management Dashboard</h1>
      <table style={styles.table}>
        <thead>
          <tr style={styles.tableHeaderRow}>
            <th style={styles.tableHeaderCell}>Full Name</th>
            <th style={styles.tableHeaderCell}>National ID</th>
            <th style={styles.tableHeaderCell}>Delivery Address</th>
            <th style={styles.tableHeaderCell}>Contact Number</th>
            <th style={styles.tableHeaderCell}>Email Address</th>
            <th style={styles.tableHeaderCell}>Tea Type</th>
            <th style={styles.tableHeaderCell}>Quantity</th>
            <th style={styles.tableHeaderCell}>Status</th>
            <th style={styles.tableHeaderCell}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} style={styles.tableRow}>
              <td style={styles.tableCell}>{order.fullName}</td>
              <td style={styles.tableCell}>{order.nationalId}</td>
              <td style={styles.tableCell}>{order.deliveryAddress}</td>
              <td style={styles.tableCell}>{order.contactNumber}</td>
              <td style={styles.tableCell}>{order.email}</td>
              <td style={styles.tableCell}>{order.teaType}</td>
              <td style={styles.tableCell}>{order.quantity}</td>
              <td style={styles.tableCell}>
                <span
                  style={{
                    ...styles.status,
                    backgroundColor:
                      order.status === "Pending"
                        ? "#FFD700"
                        : order.status === "Shipped"
                        ? "#00BFFF"
                        : "#32CD32",
                    color: "#fff",
                    padding: "5px 10px",
                    borderRadius: "5px",
                  }}
                >
                  {order.status}
                </span>
              </td>
              <td style={styles.tableCell}>
                {/* Stack Edit and Delete buttons vertically */}
                <div style={styles.actionContainer}>
                  <button style={styles.actionButton}>Edit</button>
                  <button style={styles.actionButton}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Inline CSS styles
const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    marginLeft:'180px',
  },
  heading: {
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
    fontSize: "24px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#fff",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  tableHeaderRow: {
    backgroundColor: "#007BFF",
    color: "#fff",
    textAlign: "left",
  },
  tableHeaderCell: {
    padding: "12px",
    fontWeight: "bold",
  },
  tableRow: {
    borderBottom: "1px solid #ddd",
  },
  tableCell: {
    padding: "12px",
    textAlign: "left",
  },
  status: {
    display: "inline-block",
    fontWeight: "bold",
    fontSize: "12px",
    textTransform: "uppercase",
  },
  actionButton: {
    padding: "5px 10px",
    backgroundColor: "#28a745", 
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "12px",
    margin: "2px 0", 
  },
  actionContainer: {
    display: "flex",
    flexDirection: "column", 
    alignItems: "center", 
  },
};

export default CustomerOrderManagement;