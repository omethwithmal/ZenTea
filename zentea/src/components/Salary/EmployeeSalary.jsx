import React, { useState } from "react";

const EmployeeSalary = () => {
  const employees = [
    { id: 1, name: "John Doe", contact: "123-456-7890", basicSalary: 50000, workHour: 160, otHour: 10 },
    { id: 2, name: "Jane Smith", contact: "987-654-3210", basicSalary: 55000, workHour: 170, otHour: 8 },
  ];

  const [amounts, setAmounts] = useState({});

  const calculateAmount = (employee) => {
    const otRate = 500; // Example OT rate per hour
    const otAmount = employee.otHour * otRate;
    const basicSalaryWithOT = employee.basicSalary + otAmount;

    // ETF and EPF deductions
    const ETF = (5 / 100) * employee.basicSalary; // 5% ETF
    const EPF = (10 / 100) * employee.basicSalary; // 10% EPF

    // Total salary after ETF and EPF deductions
    const totalSalary = basicSalaryWithOT - ETF - EPF;
    
    return {
      otAmount,
      ETF,
      EPF,
      totalSalary,
    };
  };

  const handlePayClick = (id, employee) => {
    const calculatedAmount = calculateAmount(employee);
    setAmounts((prev) => ({ ...prev, [id]: calculatedAmount }));
  };

  const handleShareClick = (employee) => {
    const calculatedAmount = amounts[employee.id];
    const message = `
      Employee Salary Details
      Name: ${employee.name}
      Contact: ${employee.contact}
      Basic Salary: Rs. ${employee.basicSalary}
      OT Amount: Rs. ${calculatedAmount ? calculatedAmount.otAmount : "-----"}
      ETF: Rs. ${calculatedAmount ? calculatedAmount.ETF : "-----"}
      EPF: Rs. ${calculatedAmount ? calculatedAmount.EPF : "-----"}
      Total Salary: Rs. ${calculatedAmount ? calculatedAmount.totalSalary : "-----"}
    `;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Employee Salary</h2>
      <table style={styles.table}>
        <thead>
          <tr style={styles.headerRow}>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Contact No</th>
            <th style={styles.th}>Basic Salary</th>
            <th style={styles.th}>Work Hour</th>
            <th style={styles.th}>OT Hour</th>
            <th style={styles.th}>OT Amount</th>
            <th style={styles.th}>ETF (5%)</th>
            <th style={styles.th}>EPF (10%)</th>
            <th style={styles.th}>Total Salary</th>
            <th style={styles.th}>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <React.Fragment key={employee.id}>
              <tr style={styles.row}>
                <td style={styles.td}>{employee.name}</td>
                <td style={styles.td}>{employee.contact}</td>
                <td style={styles.td}>Rs. {employee.basicSalary}</td>
                <td style={styles.td}>{employee.workHour}</td>
                <td style={styles.td}>{employee.otHour}</td>
                <td style={styles.td}>
                  {amounts[employee.id] !== undefined ? `Rs. ${amounts[employee.id].otAmount}` : "-----"}
                </td>
                <td style={styles.td}>
                  {amounts[employee.id] !== undefined ? `Rs. ${amounts[employee.id].ETF}` : "-----"}
                </td>
                <td style={styles.td}>
                  {amounts[employee.id] !== undefined ? `Rs. ${amounts[employee.id].EPF}` : "-----"}
                </td>
                <td style={styles.td}>
                  {amounts[employee.id] !== undefined ? `Rs. ${amounts[employee.id].totalSalary}` : "-----"}
                </td>
                <td style={styles.td}>
                  <button
                    style={styles.button}
                    onClick={() => handlePayClick(employee.id, employee)}
                  >
                    Pay
                  </button>
                  <button
                    style={{ ...styles.button, marginLeft: "10px", background: "linear-gradient(135deg, #FF4500, #FF6347)" }}
                    onClick={() => handleShareClick(employee)}
                  >
                    Share
                  </button>
                </td>
              </tr>
            </React.Fragment>
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
    marginLeft: "250px"
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
    maxWidth: "1000px",
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
  button: {
    padding: "8px 12px",
    background: "linear-gradient(135deg, #32CD32, #228B22)",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "bold",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
};

export default EmployeeSalary;
