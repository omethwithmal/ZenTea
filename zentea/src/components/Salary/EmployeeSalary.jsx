import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EmployeeSalary = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    employeeID: "",
    jobTitle: "",
    department: "",
    workHours: 160,
    otHours: 0,
    basicSalary: 0
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch employees from API
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:8070/user/display");
        
        // Transform the API data to match our expected structure
        const transformedData = response.data.map(employee => ({
          _id: employee._id || employee.id,
          firstName: employee.name || employee.firstName || "Unknown",
          employeeID: employee.employeeID || employee.empId || `EMP${Math.floor(1000 + Math.random() * 9000)}`,
          jobTitle: employee.position || employee.jobTitle || "",
          department: employee.department || "",
          workHours: employee.workHours || 160,
          otHours: employee.otHours || 0,
          basicSalary: employee.basicSalary || employee.salary || 0
        }));
        
        setEmployees(transformedData);
      } catch (error) {
        console.error("Error fetching employees:", error);
        setErrorMessage("Failed to load employee data. Using local data instead.");
        const localData = localStorage.getItem('employeeSalaries');
        if (localData) {
          setEmployees(JSON.parse(localData));
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  // Save to local storage when employees change
  useEffect(() => {
    if (employees.length > 0) {
      localStorage.setItem('employeeSalaries', JSON.stringify(employees));
    }
  }, [employees]);

  // Calculate salary components
  const calculateSalaries = (employee) => {
    const workHours = parseFloat(employee.workHours) || 160;
    const otHours = parseFloat(employee.otHours) || 0;
    const basicSalary = parseFloat(employee.basicSalary) || 0;

    const calculatedBaseSalary = ((basicSalary / 160) * workHours).toFixed(2);
    const otPayment = (otHours * 250).toFixed(2);
    const grossSalary = (parseFloat(calculatedBaseSalary) + parseFloat(otPayment)).toFixed(2);
    const epf = (grossSalary * 0.08).toFixed(2);
    const etf = (grossSalary * 0.03).toFixed(2);
    const finalSalary = (grossSalary - epf - etf).toFixed(2);

    return {
      workHours,
      otHours,
      calculatedBaseSalary,
      otPayment,
      grossSalary,
      epf,
      etf,
      finalSalary,
    };
  };

  // Handle update button click
  const handleUpdateClick = (employee) => {
    setSelectedEmployee(employee);
    setFormData({
      firstName: employee.firstName || "",
      employeeID: employee.employeeID || "",
      jobTitle: employee.jobTitle || "",
      department: employee.department || "",
      workHours: employee.workHours || 160,
      otHours: employee.otHours || 0,
      basicSalary: employee.basicSalary || 0
    });
    setShowUpdateModal(true);
    setErrorMessage("");
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'firstName' || name === 'employeeID' || name === 'jobTitle' || name === 'department' 
        ? value 
        : parseFloat(value) || 0
    });
  };

  // Update salary
  const updateSalary = async () => {
    if (!selectedEmployee) return;

    setIsUpdating(true);
    setErrorMessage("");

    try {
      const salaryDetails = calculateSalaries({
        ...selectedEmployee,
        ...formData
      });

      const updatedEmployee = {
        ...selectedEmployee,
        ...formData,
        ...salaryDetails
      };

      // Try API update first
      try {
        await axios.put(`http://localhost:8070/user/update/${selectedEmployee._id}`, updatedEmployee);
      } catch (apiError) {
        console.error("API update failed, using local storage:", apiError);
      }

      // Update local state
      const updatedEmployees = employees.map(emp => 
        emp._id === selectedEmployee._id ? updatedEmployee : emp
      );
      setEmployees(updatedEmployees);

      setShowUpdateModal(false);
      alert("Salary updated successfully!");
    } catch (error) {
      console.error("Update error:", error);
      setErrorMessage("Failed to update salary. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  // Delete employee
  const deleteEmployee = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    try {
      // Try API delete first
      try {
        await axios.delete(`http://localhost:8070/user/delete/${id}`);
      } catch (apiError) {
        console.error("API delete failed, using local storage:", apiError);
      }

      // Update local state
      const updatedEmployees = employees.filter(emp => emp._id !== id);
      setEmployees(updatedEmployees);
      alert("Employee deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete employee.");
    }
  };

  // Navigate to payment page
  const navigateToPayment = (employee) => {
    const salaryDetails = calculateSalaries(employee);
    navigate("/EmployeeSalaryPayment", {
      state: {
        employee: {
          ...employee,
          ...salaryDetails,
        },
      },
    });
  };

  // Add new employee
  const addNewEmployee = () => {
    const newEmployee = {
      _id: Date.now().toString(),
      firstName: 'New Employee',
      employeeID: `EMP${employees.length + 1000}`,
      jobTitle: '',
      department: '',
      workHours: 160,
      otHours: 0,
      basicSalary: 0
    };

    setEmployees([...employees, newEmployee]);
    handleUpdateClick(newEmployee);
  };

  // Filter employees based on search term
  const filteredEmployees = employees.filter(employee =>
    Object.values(employee).some(
      value =>
        value &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Update Modal Component
  const UpdateModal = () => {
    if (!selectedEmployee) return null;

    const calculatedValues = calculateSalaries({ 
      ...selectedEmployee, 
      ...formData 
    });

    return (
      <div style={modalStyles.overlay}>
        <div style={modalStyles.modal}>
          <div style={modalStyles.header}>
            <h2>Update Employee Salary</h2>
            <button 
              onClick={() => setShowUpdateModal(false)} 
              style={modalStyles.closeButton}
              disabled={isUpdating}
            >
              &times;
            </button>
          </div>
          
          {errorMessage && (
            <div style={modalStyles.error}>
              {errorMessage}
            </div>
          )}

          <div style={modalStyles.form}>
            <div style={modalStyles.formGroup}>
              <label>First Name:</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                style={modalStyles.input}
                disabled={isUpdating}
              />
            </div>

            <div style={modalStyles.formGroup}>
              <label>Employee ID:</label>
              <input
                type="text"
                name="employeeID"
                value={formData.employeeID}
                onChange={handleInputChange}
                style={modalStyles.input}
                disabled={isUpdating}
              />
            </div>

            <div style={modalStyles.formGroup}>
              <label>Job Title:</label>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleInputChange}
                style={modalStyles.input}
                disabled={isUpdating}
              />
            </div>

            <div style={modalStyles.formGroup}>
              <label>Department:</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                style={modalStyles.input}
                disabled={isUpdating}
              />
            </div>

            <div style={modalStyles.formGroup}>
              <label>Work Hours:</label>
              <input
                type="number"
                name="workHours"
                value={formData.workHours}
                onChange={handleInputChange}
                min="0"
                style={modalStyles.input}
                disabled={isUpdating}
              />
            </div>

            <div style={modalStyles.formGroup}>
              <label>OT Hours:</label>
              <input
                type="number"
                name="otHours"
                value={formData.otHours}
                onChange={handleInputChange}
                min="0"
                style={modalStyles.input}
                disabled={isUpdating}
              />
            </div>

            <div style={modalStyles.formGroup}>
              <label>Basic Salary (Rs):</label>
              <input
                type="number"
                name="basicSalary"
                value={formData.basicSalary}
                onChange={handleInputChange}
                step="0.01"
                min="0"
                style={modalStyles.input}
                disabled={isUpdating}
              />
            </div>

            <div style={modalStyles.calculations}>
              <h3>Calculated Values:</h3>
              <p>Base Salary: Rs {calculatedValues.calculatedBaseSalary}</p>
              <p>OT Payment: Rs {calculatedValues.otPayment}</p>
              <p>Gross Salary: Rs {calculatedValues.grossSalary}</p>
              <p>EPF (8%): Rs {calculatedValues.epf}</p>
              <p>ETF (3%): Rs {calculatedValues.etf}</p>
              <p style={{ fontWeight: 'bold' }}>Final Salary: Rs {calculatedValues.finalSalary}</p>
            </div>

            <div style={modalStyles.footer}>
              <button
                type="button"
                onClick={() => setShowUpdateModal(false)}
                style={modalStyles.cancelButton}
                disabled={isUpdating}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={updateSalary}
                style={{
                  ...modalStyles.submitButton,
                  opacity: isUpdating ? 0.7 : 1
                }}
                disabled={isUpdating}
              >
                {isUpdating ? 'Updating...' : 'Update Salary'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return <div style={styles.loading}>Loading employee data...</div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Employee Salary Management</h2>
      
      {errorMessage && !showUpdateModal && (
        <div style={styles.error}>{errorMessage}</div>
      )}
      
      <div style={styles.controls}>
        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
        </div>
        <button 
          onClick={addNewEmployee}
          style={styles.addButton}
        >
          + Add New Employee
        </button>
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.headerRow}>
              <th style={styles.th}>First Name</th>
              <th style={styles.th}>Employee ID</th>
              <th style={styles.th}>Job Title</th>
              <th style={styles.th}>Department</th>
              <th style={styles.th}>Work Hours</th>
              <th style={styles.th}>OT Hours</th>
              <th style={styles.th}>OT Payment</th>
              <th style={styles.th}>Basic Salary</th>
              <th style={styles.th}>Gross Salary</th>
              <th style={styles.th}>EPF (8%)</th>
              <th style={styles.th}>ETF (3%)</th>
              <th style={styles.th}>Final Salary</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((emp, index) => {
                const salaryDetails = calculateSalaries(emp);
                const rowStyle = index % 2 === 0 ? styles.evenRow : styles.oddRow;
                
                return (
                  <tr key={emp._id} style={rowStyle}>
                    <td style={styles.td}>{emp.firstName}</td>
                    <td style={styles.td}>{emp.employeeID}</td>
                    <td style={styles.td}>{emp.jobTitle}</td>
                    <td style={styles.td}>{emp.department}</td>
                    <td style={styles.td}>{salaryDetails.workHours}</td>
                    <td style={styles.td}>{salaryDetails.otHours}</td>
                    <td style={styles.td}>Rs {salaryDetails.otPayment}</td>
                    <td style={styles.td}>Rs {emp.basicSalary}</td>
                    <td style={styles.td}>Rs {salaryDetails.grossSalary}</td>
                    <td style={styles.td}>Rs {salaryDetails.epf}</td>
                    <td style={styles.td}>Rs {salaryDetails.etf}</td>
                    <td style={{ ...styles.td, ...styles.finalSalary }}>
                      Rs {salaryDetails.finalSalary}
                    </td>
                    <td style={styles.td}>
                      <div style={styles.actionButtons}>
                        <button 
                          style={styles.updateButton}
                          onClick={() => handleUpdateClick(emp)}
                        >
                          Update
                        </button>
                        <button 
                          style={styles.deleteButton}
                          onClick={() => deleteEmployee(emp._id)}
                        >
                          Delete
                        </button>
                        <button 
                          style={styles.paymentButton}
                          onClick={() => navigateToPayment(emp)}
                        >
                          Add Payment
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="13" style={styles.noResults}>
                  {searchTerm ? 'No matching employees found' : 'No employee data available'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <button 
        style={styles.backButton}
        onClick={() => navigate("/FinancialDashboard")}
      >
        Back to Dashboard
      </button>

      {showUpdateModal && <UpdateModal />}
    </div>
  );
};

// Styles remain the same as in your original code
const styles = {
  container: {
    maxWidth: "1400px",
    margin: "20px auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  loading: {
    textAlign: "center",
    padding: "50px",
    fontSize: "18px",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#0a8700",
    fontWeight: "bold",
    fontSize: "24px"
  },
  error: {
    color: "red",
    padding: "10px",
    margin: "10px 0",
    backgroundColor: "#ffebee",
    borderRadius: "4px",
    textAlign: "center"
  },
  controls: {
    marginBottom: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  searchContainer: {
    flex: 1,
    marginRight: "20px"
  },
  searchInput: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    fontSize: "16px"
  },
  addButton: {
    padding: "10px 20px",
    backgroundColor: "#0a8700",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px"
  },
  tableContainer: {
    overflowX: "auto",
    margin: "20px 0",
    borderRadius: "4px",
    border: "1px solid #e0e0e0"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "14px"
  },
  headerRow: {
    backgroundColor: "#0a8700",
    color: "white"
  },
  th: {
    padding: "12px",
    textAlign: "left",
    borderBottom: "1px solid #e0e0e0"
  },
  evenRow: {
    backgroundColor: "#fff"
  },
  oddRow: {
    backgroundColor: "#f5f5f5"
  },
  td: {
    padding: "12px",
    textAlign: "left",
    borderBottom: "1px solid #e0e0e0"
  },
  noResults: {
    padding: "20px",
    textAlign: "center",
    color: "#666"
  },
  finalSalary: {
    color: "green",
    fontWeight: "bold"
  },
  actionButtons: {
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },
  updateButton: {
    padding: "8px 12px",
    backgroundColor: "#2196F3",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px"
  },
  deleteButton: {
    padding: "8px 12px",
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px"
  },
  paymentButton: {
    padding: "8px 12px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px"
  },
  backButton: {
    display: "block",
    margin: "20px auto 0",
    padding: "10px 20px",
    backgroundColor: "#6c757d",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px"
  }
};

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 0 20px rgba(0,0,0,0.2)',
    width: '500px',
    maxWidth: '90%',
    maxHeight: '90vh',
    overflowY: 'auto'
  },
  header: {
    padding: '20px',
    borderBottom: '1px solid #eee',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#666'
  },
  error: {
    color: 'red',
    padding: '10px',
    margin: '0 20px',
    backgroundColor: '#ffebee',
    borderRadius: '4px'
  },
  form: {
    padding: '20px'
  },
  formGroup: {
    marginBottom: '15px'
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px'
  },
  calculations: {
    padding: '15px',
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
    margin: '15px 0'
  },
  footer: {
    padding: '20px',
    borderTop: '1px solid #eee',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px'
  },
  cancelButton: {
    padding: '10px 20px',
    backgroundColor: '#f5f5f5',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#0a8700',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default EmployeeSalary;