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
    basicSalary: "",
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";
    
    switch (name) {
      case "firstName":
      case "lastName":
      case "homeAddress":
      case "jobTitle":
        if (!value.trim()) error = "This field is required";
        break;
      case "employeeID":
      case "nationalID":
        if (!value.trim()) error = "This field is required";
        else if (!/^[a-zA-Z0-9]+$/.test(value)) error = "Invalid format";
        break;
      case "contactNumber":
        if (!value.trim()) error = "This field is required";
        else if (!/^\d{10}$/.test(value)) error = "Must be 10 digits";
        break;
      case "email":
        if (!value.trim()) error = "This field is required";
        else if (!/\S+@\S+\.\S+/.test(value)) error = "Invalid email format";
        break;
      case "department":
        if (!value) error = "Please select a department";
        break;
      case "basicSalary":
        if (!value) error = "This field is required";
        else if (isNaN(value.replace(/,/g, ""))) error = "Must be a number";
        break;
      case "birthday":
      case "startDate":
        if (!value) error = "This field is required";
        break;
      default:
        break;
    }
    
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Validate the field
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
    
    // Format the basicSalary field with commas for better readability
    if (name === "basicSalary") {
      const numericValue = value.replace(/[^0-9]/g, "");
      const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      setFormData(prev => ({ ...prev, [name]: formattedValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields before submission
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      alert("Please fix the errors in the form before submitting.");
      return;
    }

    try {
      const formattedFormData = {
        ...formData,
        basicSalary: formData.basicSalary.replace(/,/g, ""),
      };

      const response = await axios.post("http://localhost:8070/user/add", formattedFormData);
      alert(response.data.message || "Employee added successfully!");
      navigate('/employees'); // Redirect after successful submission
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
              onBlur={handleBlur}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: `1px solid ${errors.firstName ? "#dc3545" : "#ccc"}`,
                borderRadius: "6px",
                fontSize: "14px",
                backgroundColor: "#e8e8e8",
                color: "black",
              }}
            />
            {errors.firstName && (
              <div style={{ color: "#dc3545", fontSize: "12px", marginTop: "5px" }}>
                {errors.firstName}
              </div>
            )}
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
              onBlur={handleBlur}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: `1px solid ${errors.lastName ? "#dc3545" : "#ccc"}`,
                borderRadius: "6px",
                fontSize: "14px",
                backgroundColor: "#e8e8e8",
                color: "black",
              }}
            />
            {errors.lastName && (
              <div style={{ color: "#dc3545", fontSize: "12px", marginTop: "5px" }}>
                {errors.lastName}
              </div>
            )}
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
              onBlur={handleBlur}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: `1px solid ${errors.employeeID ? "#dc3545" : "#ccc"}`,
                borderRadius: "6px",
                fontSize: "14px",
                backgroundColor: "#e8e8e8",
                color: "black",
              }}
            />
            {errors.employeeID && (
              <div style={{ color: "#dc3545", fontSize: "12px", marginTop: "5px" }}>
                {errors.employeeID}
              </div>
            )}
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
              onBlur={handleBlur}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: `1px solid ${errors.birthday ? "#dc3545" : "#ccc"}`,
                borderRadius: "6px",
                fontSize: "14px",
                backgroundColor: "#e8e8e8",
                color: "black",
              }}
            />
            {errors.birthday && (
              <div style={{ color: "#dc3545", fontSize: "12px", marginTop: "5px" }}>
                {errors.birthday}
              </div>
            )}
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
              onBlur={handleBlur}
              required
              placeholder="10 digits (e.g., 0771234567)"
              style={{
                width: "100%",
                padding: "10px",
                border: `1px solid ${errors.contactNumber ? "#dc3545" : "#ccc"}`,
                borderRadius: "6px",
                fontSize: "14px",
                backgroundColor: "#e8e8e8",
                color: "black",
              }}
            />
            {errors.contactNumber && (
              <div style={{ color: "#dc3545", fontSize: "12px", marginTop: "5px" }}>
                {errors.contactNumber}
              </div>
            )}
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
              onBlur={handleBlur}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: `1px solid ${errors.email ? "#dc3545" : "#ccc"}`,
                borderRadius: "6px",
                fontSize: "14px",
                backgroundColor: "#e8e8e8",
                color: "black",
              }}
            />
            {errors.email && (
              <div style={{ color: "#dc3545", fontSize: "12px", marginTop: "5px" }}>
                {errors.email}
              </div>
            )}
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
              onBlur={handleBlur}
              rows="3"
              required
              style={{
                width: "100%",
                padding: "10px",
                border: `1px solid ${errors.homeAddress ? "#dc3545" : "#ccc"}`,
                borderRadius: "6px",
                fontSize: "14px",
                resize: "none",
                backgroundColor: "#e8e8e8",
                color: "black",
              }}
            ></textarea>
            {errors.homeAddress && (
              <div style={{ color: "#dc3545", fontSize: "12px", marginTop: "5px" }}>
                {errors.homeAddress}
              </div>
            )}
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
              onBlur={handleBlur}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: `1px solid ${errors.nationalID ? "#dc3545" : "#ccc"}`,
                borderRadius: "6px",
                fontSize: "14px",
                backgroundColor: "#e8e8e8",
                color: "black",
              }}
            />
            {errors.nationalID && (
              <div style={{ color: "#dc3545", fontSize: "12px", marginTop: "5px" }}>
                {errors.nationalID}
              </div>
            )}
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
              onBlur={handleBlur}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: `1px solid ${errors.startDate ? "#dc3545" : "#ccc"}`,
                borderRadius: "6px",
                fontSize: "14px",
                backgroundColor: "#e8e8e8",
                color: "black",
              }}
            />
            {errors.startDate && (
              <div style={{ color: "#dc3545", fontSize: "12px", marginTop: "5px" }}>
                {errors.startDate}
              </div>
            )}
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
              onBlur={handleBlur}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: `1px solid ${errors.jobTitle ? "#dc3545" : "#ccc"}`,
                borderRadius: "6px",
                fontSize: "14px",
                backgroundColor: "#e8e8e8",
                color: "black",
              }}
            />
            {errors.jobTitle && (
              <div style={{ color: "#dc3545", fontSize: "12px", marginTop: "5px" }}>
                {errors.jobTitle}
              </div>
            )}
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
              onBlur={handleBlur}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: `1px solid ${errors.department ? "#dc3545" : "#ccc"}`,
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
            {errors.department && (
              <div style={{ color: "#dc3545", fontSize: "12px", marginTop: "5px" }}>
                {errors.department}
              </div>
            )}
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
              onBlur={handleBlur}
              required
              placeholder="Enter salary in LKR (e.g., 100,000)"
              style={{
                width: "100%",
                padding: "10px",
                border: `1px solid ${errors.basicSalary ? "#dc3545" : "#ccc"}`,
                borderRadius: "6px",
                fontSize: "14px",
                backgroundColor: "#e8e8e8",
                color: "black",
              }}
            />
            {errors.basicSalary && (
              <div style={{ color: "#dc3545", fontSize: "12px", marginTop: "5px" }}>
                {errors.basicSalary}
              </div>
            )}
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

            onClick={() => navigate('/EmployeeDetailsTable')}

          >
            Save
          </button>
          <button
            type="button"
            onClick={() => {
              setFormData({
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
                basicSalary: "",
              });
              setErrors({});
            }}
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