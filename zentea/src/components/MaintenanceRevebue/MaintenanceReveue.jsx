import React from "react";

const MaintenanceRevenue = () => {
  const revenues = [
    { id: 1, date: "2025-03-27", amount: 5000, description: "Monthly Maintenance Fee" },
    { id: 2, date: "2025-03-26", amount: 3000, description: "Repair Service Charge" },
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Maintenance Revenue</h2>

      <table style={styles.table}>
        <thead>
          <tr style={styles.headerRow}>
            <th style={styles.th}>Date</th>
            <th style={styles.th}>Amount (Rs.)</th>
            <th style={styles.th}>Description</th>
          </tr>
        </thead>
        <tbody>
          {revenues.map((revenue) => (
            <tr key={revenue.id} style={styles.row}>
              <td style={styles.td}>{revenue.date}</td>
              <td style={{ ...styles.td, fontWeight: "bold", color: "#28A745" }}>
                Rs. {revenue.amount}
              </td>
              <td style={styles.td}>{revenue.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "'Poppins', sans-serif",
    background: "linear-gradient(135deg, #F0F4F8, #D9E4F5)",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
     marginLeft: "500px"
  },
  heading: {
    textAlign: "center",
    fontSize: "26px",
    color: "#2D2D2D",
    fontWeight: "600",
    marginBottom: "20px",
    textShadow: "1px 1px 3px rgba(0,0,0,0.2)",
  },
  table: {
    width: "90%",
    maxWidth: "800px",
    borderCollapse: "collapse",
    background: "rgba(255, 255, 255, 0.9)",
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
};

export default MaintenanceRevenue;
