import React, { useState, useEffect } from "react";
import axios from "axios";

const EmployeeDetailsTable = () => {
  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

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

  // Handle Delete Action
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await axios.delete(`http://localhost:8070/user/delete/${id}`);
        alert("Employee deleted successfully!");
        fetchEmployees(); // Refresh the table
      } catch (error) {
        console.error("Error deleting employee:", error.message);
        alert("Failed to delete employee.");
      }
    }
  };

  // Open Update Modal
  const openUpdateModal = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  // Close Update Modal
  const closeUpdateModal = () => {
    setSelectedEmployee(null);
    setIsModalOpen(false);
  };

  // Handle Update Action
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8070/user/update/${selectedEmployee._id}`,
        selectedEmployee
      );
      alert("Employee updated successfully!");
      closeUpdateModal();
      fetchEmployees(); // Refresh the table
    } catch (error) {
      console.error("Error updating employee:", error.message);
      alert("Failed to update employee.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "50px auto",
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
          color: "#333",
          fontWeight: "bold",
        }}
      >
        Employee Details
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
              backgroundColor: "#007bff",
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>First Name</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Last Name</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Employee ID</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Birthday</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Contact Number</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Email</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Home Address</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>National ID</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Start Date</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Job Title</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Department</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Basic Salary</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Actions</th>
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
                {employee.lastName}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {employee.employeeID}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {new Date(employee.birthday).toLocaleDateString()}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {employee.contactNumber}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {employee.email}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {employee.homeAddress}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {employee.nationalID}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {new Date(employee.startDate).toLocaleDateString()}
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
                    backgroundColor: "#ffc107",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    marginRight: "5px",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseOver={(e) => (e.target.style.backgroundColor = "#e0a800")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "#ffc107")}
                  onClick={() => openUpdateModal(employee)}
                >
                  Update
                </button>
                <button
                  style={{
                    padding: "8px 12px",
                    backgroundColor: "#dc3545",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseOver={(e) => (e.target.style.backgroundColor = "#c82333")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "#dc3545")}
                  onClick={() => handleDelete(employee._id)}
                >
                  Delete
                </button>

                  {/* View Profile Button */}
                <button
                  style={{
                    padding: "8px 12px",
                    backgroundColor: "#0d6efd",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    marginRight: "5px",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseOver={(e) => (e.target.style.backgroundColor = "#0b5ed7")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "#0d6efd")}
                  onClick={() => navigate(`/employeeprofile/${employee._id}`)} // Navigate to profile page
                >
                  Profile
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Update Modal */}
      {isModalOpen && (
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
              backgroundColor: "#fff",
              padding: "30px",
              borderRadius: "12px",
              width: "800px",
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
              Update Employee
            </h3>
            <form onSubmit={handleUpdate}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "20px",
                }}
              >
                {/* First Name */}
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      color: "#555",
                      fontWeight: "500",
                    }}
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={selectedEmployee?.firstName || ""}
                    onChange={(e) =>
                      setSelectedEmployee({
                        ...selectedEmployee,
                        firstName: e.target.value,
                      })
                    }
                    required
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      fontSize: "14px",
                    }}
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      color: "#555",
                      fontWeight: "500",
                    }}
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={selectedEmployee?.lastName || ""}
                    onChange={(e) =>
                      setSelectedEmployee({
                        ...selectedEmployee,
                        lastName: e.target.value,
                      })
                    }
                    required
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      fontSize: "14px",
                    }}
                  />
                </div>

                {/* Employee ID */}
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      color: "#555",
                      fontWeight: "500",
                    }}
                  >
                    Employee ID
                  </label>
                  <input
                    type="text"
                    name="employeeID"
                    value={selectedEmployee?.employeeID || ""}
                    onChange={(e) =>
                      setSelectedEmployee({
                        ...selectedEmployee,
                        employeeID: e.target.value,
                      })
                    }
                    required
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      fontSize: "14px",
                    }}
                  />
                </div>

                {/* Birthday */}
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      color: "#555",
                      fontWeight: "500",
                    }}
                  >
                    Birthday
                  </label>
                  <input
                    type="date"
                    name="birthday"
                    value={selectedEmployee?.birthday || ""}
                    onChange={(e) =>
                      setSelectedEmployee({
                        ...selectedEmployee,
                        birthday: e.target.value,
                      })
                    }
                    required
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      fontSize: "14px",
                    }}
                  />
                </div>

                {/* Contact Number */}
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      color: "#555",
                      fontWeight: "500",
                    }}
                  >
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    name="contactNumber"
                    value={selectedEmployee?.contactNumber || ""}
                    onChange={(e) =>
                      setSelectedEmployee({
                        ...selectedEmployee,
                        contactNumber: e.target.value,
                      })
                    }
                    required
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      fontSize: "14px",
                    }}
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      color: "#555",
                      fontWeight: "500",
                    }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={selectedEmployee?.email || ""}
                    onChange={(e) =>
                      setSelectedEmployee({
                        ...selectedEmployee,
                        email: e.target.value,
                      })
                    }
                    required
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      fontSize: "14px",
                    }}
                  />
                </div>

                {/* Home Address */}
                <div style={{ gridColumn: "span 2" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      color: "#555",
                      fontWeight: "500",
                    }}
                  >
                    Home Address
                  </label>
                  <textarea
                    name="homeAddress"
                    value={selectedEmployee?.homeAddress || ""}
                    onChange={(e) =>
                      setSelectedEmployee({
                        ...selectedEmployee,
                        homeAddress: e.target.value,
                      })
                    }
                    rows="3"
                    required
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      fontSize: "14px",
                      resize: "none",
                    }}
                  ></textarea>
                </div>

                {/* National ID */}
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      color: "#555",
                      fontWeight: "500",
                    }}
                  >
                    National ID
                  </label>
                  <input
                    type="text"
                    name="nationalID"
                    value={selectedEmployee?.nationalID || ""}
                    onChange={(e) =>
                      setSelectedEmployee({
                        ...selectedEmployee,
                        nationalID: e.target.value,
                      })
                    }
                    required
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      fontSize: "14px",
                    }}
                  />
                </div>

                {/* Start Date */}
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      color: "#555",
                      fontWeight: "500",
                    }}
                  >
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={selectedEmployee?.startDate || ""}
                    onChange={(e) =>
                      setSelectedEmployee({
                        ...selectedEmployee,
                        startDate: e.target.value,
                      })
                    }
                    required
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      fontSize: "14px",
                    }}
                  />
                </div>

                {/* Job Title */}
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      color: "#555",
                      fontWeight: "500",
                    }}
                  >
                    Job Title
                  </label>
                  <input
                    type="text"
                    name="jobTitle"
                    value={selectedEmployee?.jobTitle || ""}
                    onChange={(e) =>
                      setSelectedEmployee({
                        ...selectedEmployee,
                        jobTitle: e.target.value,
                      })
                    }
                    required
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      fontSize: "14px",
                    }}
                  />
                </div>

                {/* Department */}
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      color: "#555",
                      fontWeight: "500",
                    }}
                  >
                    Department
                  </label>
                  <select
                    name="department"
                    value={selectedEmployee?.department || ""}
                    onChange={(e) =>
                      setSelectedEmployee({
                        ...selectedEmployee,
                        department: e.target.value,
                      })
                    }
                    required
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      fontSize: "14px",
                    }}
                  >
                    <option value="">Select Department</option>
                    <option value="HR">Human Resources</option>
                    <option value="IT">Information Technology</option>
                    <option value="Finance">Finance</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>

                {/* Basic Salary */}
                <div>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      color: "#555",
                      fontWeight: "500",
                    }}
                  >
                    Basic Salary
                  </label>
                  <input
                    type="number"
                    name="basicSalary"
                    value={selectedEmployee?.basicSalary || ""}
                    onChange={(e) =>
                      setSelectedEmployee({
                        ...selectedEmployee,
                        basicSalary: e.target.value,
                      })
                    }
                    required
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      fontSize: "14px",
                    }}
                  />
                </div>
              </div>

              {/* Actions */}
              <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  justifyContent: "center",
                  gap: "15px",
                }}
              >
                <button
                  type="submit"
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#28a745",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "16px",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseOver={(e) => (e.target.style.backgroundColor = "#218838")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "#28a745")}
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={closeUpdateModal}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#6c757d",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "16px",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseOver={(e) => (e.target.style.backgroundColor = "#5a6268")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "#6c757d")}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeDetailsTable;