import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const AddEmployeeForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    employeeID: "",
    birthday: "",
    contactNumber: "",
    email: "",
    homeAddress: "",
    nationalID: "",
    startDate: "",
    jobTitle: "",
    department: "",
    basicSalary: "", // Salary in LKR
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Format the basicSalary field with commas for better readability
    if (name === "basicSalary") {
      const formattedValue = value.replace(/[^0-9]/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      setFormData((prevData) => ({
        ...prevData,
        [name]: formattedValue,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Remove commas from basicSalary before sending to the backend
      const formattedFormData = {
        ...formData,
        basicSalary: formData.basicSalary.replace(/,/g, ""),
      };

      const response = await axios.post("http://localhost:8070/user/add", formattedFormData);
      alert(response.data.message || "Employee added successfully!");
    } catch (error) {
      alert(error.response?.data?.error || "Failed to add employee");
    }
  };

  return (
    <div
      style={{
        width: "700px",
        margin: "100px",
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
          color: "#0ec400",
          fontWeight: "bold",
        }}
      >
        Add Employee
      </h2>
      <form onSubmit={handleSubmit}>
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
              value={formData.firstName}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                fontSize: "14px",
                backgroundColor: "#e8e8e8",
                color: "black",
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
              value={formData.lastName}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                fontSize: "14px",
                backgroundColor: "#e8e8e8",
                color: "black",
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
              value={formData.employeeID}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                fontSize: "14px",
                backgroundColor: "#e8e8e8",
                color: "black",
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
              value={formData.birthday}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                fontSize: "14px",
                backgroundColor: "#e8e8e8",
                color: "black",
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
              value={formData.contactNumber}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                fontSize: "14px",
                backgroundColor: "#e8e8e8",
                color: "black",
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
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                fontSize: "14px",
                backgroundColor: "#e8e8e8",
                color: "black",
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
              value={formData.homeAddress}
              onChange={handleChange}
              rows="3"
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                fontSize: "14px",
                resize: "none",
                backgroundColor: "#e8e8e8",
                color: "black",
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
              value={formData.nationalID}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                fontSize: "14px",
                backgroundColor: "#e8e8e8",
                color: "black",
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
              value={formData.startDate}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                fontSize: "14px",
                backgroundColor: "#e8e8e8",
                color: "black",
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
              value={formData.jobTitle}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                fontSize: "14px",
                backgroundColor: "#e8e8e8",
                color: "black",
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
              value={formData.department}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                fontSize: "14px",
                backgroundColor: "#e8e8e8",
                color: "black",
              }}
            >
              <option value="">Select Department</option>
              <option value="HR">Plantation Department</option>
              <option value="IT">Production & Processing Department</option>
              <option value="Finance">Quality Control Department</option>
              <option value="Marketing">Finance Department</option>
              <option value="Development">Development Department</option>
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
              Basic Salary (LKR)
            </label>
            <input
              type="text"
              name="basicSalary"
              value={formData.basicSalary}
              onChange={handleChange}
              required
              placeholder="Enter salary in LKR (e.g., 100,000)"
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                fontSize: "14px",
                backgroundColor: "#e8e8e8",
                color: "black",
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
              background: 'linear-gradient(45deg, hsl(130, 100%, 37%) 0%, #99ff00 100%)',
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
            Save
          </button>
          <button
            type="button"
            onClick={() => setFormData({})}
            style={{
              padding: "10px 20px",
              background: 'linear-gradient(45deg, hsl(4, 100.00%, 37.10%) 0%,rgb(255, 0, 0) 100%)',
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "16px",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#c82333")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#dc3545")}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployeeForm;