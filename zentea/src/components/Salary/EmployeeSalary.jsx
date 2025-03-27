import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
                                                         
const EmployeeSalary = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);

  // Fetch employees from the backend
  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:8070/user/display");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error.message);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Function to navigate to payment page
  const navigateToPayment = (employee) => {
    navigate("/EmployeeSalaryPayment", { state: { employee } });
  };

  return (
    <div
      style={{
        maxWidth: "1300px",
        margin: "50px auto",
        marginLeft: "400px",
        padding: "30px",
        backgroundColor: "#f9f9f9",
        borderRadius: "12px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "20px",
          color: "#0fcf00",
          fontWeight: "bold",
        }}
      >
        Employee Salary Management
      </h2>

      {/* Table to display employees */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "14px",
          textAlign: "left",
        }}
      >
        <thead>
          <tr
            style={{
              background: "linear-gradient(45deg, hsl(130, 100%, 37%) 0%, #99ff00 100%)",
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>First Name</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Employee ID</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Job Title</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Department</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Basic Salary</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id} style={{ backgroundColor: "#fff", borderBottom: "1px solid #ddd" }}>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{employee.firstName}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{employee.employeeID}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{employee.jobTitle}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>{employee.department}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>${employee.basicSalary}</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                <button
                  style={{
                    padding: "8px 12px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
                  onClick={() => navigateToPayment(employee)}
                >
                  Add Payment
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Button to navigate back */}
      <button
        style={{
          marginTop: "20px",
          padding: "10px 15px",
          backgroundColor: "#008CBA",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }}
        onClick={() => navigate("/FinancialDashboard")}
      >
        Back to Home
      </button>
    </div>
  );
};

export default EmployeeSalary;