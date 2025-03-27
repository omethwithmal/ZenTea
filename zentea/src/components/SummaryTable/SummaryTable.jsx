import React, { useState } from "react";

const SummaryTable = () => {
  // Static records data
  const [records] = useState([
    { date: "2025-03-01", finalIncome: 5000, outcome: 4000, status: "Profit" },
    { date: "2025-03-02", finalIncome: 3000, outcome: 3500, status: "Loss" },
    { date: "2025-03-03", finalIncome: 6000, outcome: 5000, status: "Profit" },
  ]);

  const styles = {
    container: {
      padding: "30px",
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f4f6f8",
      minHeight: "100vh",
      textAlign: "center",
       marginLeft: "500px"
    },
    title: {
      fontSize: "28px",
      fontWeight: "700",
      color: "#2c3e50",
      marginBottom: "20px",
    },
    table: {
      width: "70%",
      margin: "0 auto",
      borderCollapse: "collapse",
      marginTop: "30px",
    },
    tableHeader: {
      backgroundColor: "#2c3e50",
      color: "#fff",
      fontWeight: "bold",
      padding: "10px",
      textAlign: "center",
    },
    tableCell: {
      padding: "10px",
      textAlign: "center",
      border: "1px solid #ddd",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Summary</h1>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Date</th>
            <th style={styles.tableHeader}>Final Income (LKR)</th>
            <th style={styles.tableHeader}>Outcome (LKR)</th>
            <th style={styles.tableHeader}>Status</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <tr key={index}>
              <td style={styles.tableCell}>{record.date}</td>
              <td style={styles.tableCell}>LKR {record.finalIncome}</td>
              <td style={styles.tableCell}>LKR {record.outcome}</td>
              <td style={styles.tableCell}>{record.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SummaryTable;
