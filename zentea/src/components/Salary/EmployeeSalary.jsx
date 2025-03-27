import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const EmployeeSalary = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [paymentData, setPaymentData] = useState({
    paymentDate: "",
    paymentMethod: "",
    notes: "",
    bonus: 0,
    deductions: 0,
    netSalary: 0
  });

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

  // Calculate net salary whenever bonus or deductions change
  useEffect(() => {
    if (selectedEmployee) {
      const basicSalary = parseFloat(selectedEmployee.basicSalary) || 0;
      const bonus = parseFloat(paymentData.bonus) || 0;
      const deductions = parseFloat(paymentData.deductions) || 0;
      const netSalary = basicSalary + bonus - deductions;
      
      setPaymentData(prev => ({
        ...prev,
        netSalary: netSalary.toFixed(2)
      }));
    }
  }, [paymentData.bonus, paymentData.deductions, selectedEmployee]);

  // Open Pay Modal
  const openPayModal = (employee) => {
    setSelectedEmployee(employee);
    setPaymentData({
      paymentDate: new Date().toISOString().split('T')[0],
      paymentMethod: "bank",
      notes: "",
      bonus: 0,
      deductions: 0,
      netSalary: employee.basicSalary
    });
    setIsModalOpen(true);
  };

  // Close Pay Modal
  const closePayModal = () => {
    setSelectedEmployee(null);
    setIsModalOpen(false);
  };

  // Handle input changes for payment data
  const handlePaymentInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle Pay Action
  const handlePay = async (e) => {
    e.preventDefault();
    try {
      // Prepare payment data to send to backend
      const paymentDetails = {
        employeeId: selectedEmployee._id,
        employeeName: selectedEmployee.firstName,
        employeeID: selectedEmployee.employeeID,
        basicSalary: selectedEmployee.basicSalary,
        paymentDate: paymentData.paymentDate,
        paymentMethod: paymentData.paymentMethod,
        bonus: paymentData.bonus,
        deductions: paymentData.deductions,
        netSalary: paymentData.netSalary,
        notes: paymentData.notes
      };

      // Here you would typically send the payment data to your backend
      // For example:
      // await axios.post("http://localhost:8070/salary/pay", paymentDetails);
      
      alert(`Payment of $${paymentData.netSalary} processed for ${selectedEmployee.firstName}!`);
      closePayModal();
    } catch (error) {
      console.error("Error processing payment:", error.message);
      alert("Failed to process payment.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "1300px",
        margin: "50px auto",
        marginLeft: "100px",
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
              background: 'linear-gradient(45deg, hsl(130, 100%, 37%) 0%, #99ff00 100%)',
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
            <tr
              key={employee._id}
              style={{
                backgroundColor: "#fff",
                borderBottom: "1px solid #ddd",
              }}
            >
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {employee.firstName}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {employee.employeeID}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {employee.jobTitle}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {employee.department}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                ${employee.basicSalary}
              </td>
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
                  onClick={() => openPayModal(employee)}
                >
                  Process Payment
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Payment Modal */}
      {isModalOpen && selectedEmployee && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "1000",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "12px",
              width: "500px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3
              style={{
                textAlign: "center",
                marginBottom: "20px",
                color: "#333",
                fontWeight: "bold",
              }}
            >
              Process Salary Payment
            </h3>
            <div style={{ marginBottom: "15px" }}>
              <p><strong>Employee:</strong> {selectedEmployee.firstName} ({selectedEmployee.employeeID})</p>
              <p><strong>Department:</strong> {selectedEmployee.department}</p>
              <p><strong>Basic Salary:</strong> ${selectedEmployee.basicSalary}</p>
            </div>

            <form onSubmit={handlePay}>
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
                  Payment Date
                </label>
                <input
                  type="date"
                  name="paymentDate"
                  value={paymentData.paymentDate}
                  onChange={handlePaymentInputChange}
                  required
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "4px"
                  }}
                />
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
                  Payment Method
                </label>
                <select
                  name="paymentMethod"
                  value={paymentData.paymentMethod}
                  onChange={handlePaymentInputChange}
                  required
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "4px"
                  }}
                >
                  <option value="bank">Bank Transfer</option>
                  <option value="cash">Cash</option>
                  <option value="check">Check</option>
                </select>
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
                  Bonus ($)
                </label>
                <input
                  type="number"
                  name="bonus"
                  value={paymentData.bonus}
                  onChange={handlePaymentInputChange}
                  min="0"
                  step="0.01"
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "4px"
                  }}
                />
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
                  Deductions ($)
                </label>
                <input
                  type="number"
                  name="deductions"
                  value={paymentData.deductions}
                  onChange={handlePaymentInputChange}
                  min="0"
                  step="0.01"
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "4px"
                  }}
                />
              </div>

              <div style={{ 
                marginBottom: "15px",
                padding: "10px",
                backgroundColor: "#f8f8f8",
                borderRadius: "4px"
              }}>
                <p style={{ margin: "0", fontWeight: "bold" }}>
                  Net Salary: ${paymentData.netSalary}
                </p>
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
                  Notes (Optional)
                </label>
                <textarea
                  name="notes"
                  value={paymentData.notes}
                  onChange={handlePaymentInputChange}
                  rows="3"
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    resize: "vertical"
                  }}
                ></textarea>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "20px"
                }}
              >
                <button
                  type="button"
                  onClick={closePayModal}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#f44336",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    transition: "background-color 0.3s"
                  }}
                  onMouseOver={(e) => (e.target.style.backgroundColor = "#d32f2f")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "#f44336")}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    transition: "background-color 0.3s"
                  }}
                  onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
                >
                  Confirm Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeSalary;