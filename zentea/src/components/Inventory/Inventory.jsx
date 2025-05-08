import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaQuestionCircle, FaSignOutAlt } from "react-icons/fa";
import Logo from '../../assets/home.jpg';
import axios from "axios";

const InventoryForm = () => {
  const [formData, setFormData] = useState({
    teaType: "",
    quantity: "",
    supplier: "",
    reorderLevel: "",
    date: "",
    status: "Available",
  });

  const [errors, setErrors] = useState({}); // Initialize errors state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.teaType) newErrors.teaType = "Tea type is required.";
    if (!formData.quantity) newErrors.quantity = "Quantity is required.";
    if (formData.quantity <= 0) newErrors.quantity = "Quantity must be greater than zero.";
    if (!formData.supplier) newErrors.supplier = "Supplier is required.";
    if (!formData.reorderLevel) newErrors.reorderLevel = "Reorder level is required.";
    if (formData.reorderLevel <= 0) newErrors.reorderLevel = "Reorder level must be greater than zero.";
    if (!formData.date) newErrors.date = "Date is required.";
    if (!formData.status) newErrors.status = "Status is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form before submission
    if (!validateForm()) return;

    // Check if date is empty and set a default date if necessary
    const currentDate = new Date().toISOString().split('T')[0]; // Get the current date in 'YYYY-MM-DD' format
    const dateToSend = formData.date || currentDate; // If date is empty, use the current date

    const updatedFormData = {
      ...formData,
      date: dateToSend, // Ensure the date is valid and formatted correctly
    };

    try {
      const response = await axios.post("http://localhost:8070/api/addInventory", updatedFormData);

      if (response.status === 200) {
        alert("Inventory added successfully!");
        setFormData({
          teaType: "",
          quantity: "",
          supplier: "",
          reorderLevel: "",
          date: "",
          status: "Available",
        });
      }
    } catch (error) {
      console.error("Error adding inventory:", error.message);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", flexWrap: "wrap" }}>
      {/* Sidebar */}
      <aside style={sidebarStyle}>
        <div>
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <img src={Logo} alt="Logo" style={logoStyle} />
          </div>
          <nav>
            <Link to="/Dashboard" style={navLinkStyle}>📊 Dashboard</Link>
            <Link to="/InventoryTable" style={navLinkStyle}>🗳 Inventory Data</Link>
            <Link to="/AnalyzePage" style={navLinkStyle}>📶 Analyze</Link>
            <Link to="/help" style={navLinkStyle}> <FaQuestionCircle /> Help </Link>
          </nav>
        </div>
        <button style={signOutButtonStyle}> <FaSignOutAlt /> Sign out </button>
      </aside>

      {/* Form Section */}
      <main style={mainStyle}>
        <div style={formContainerStyle}>
          <h2 style={{ textAlign: "center" }}>Inventory Management</h2>
          <form onSubmit={handleSubmit} autoComplete="off">
            <FormGroup label="Tea Type">
              <select
                name="teaType"
                value={formData.teaType}
                onChange={handleChange}
                required
                style={inputStyle}
              >
                <option value="">Select Tea Type</option>
                <option value="Green Tea">Green Tea</option>
                <option value="Black Tea">Black Tea</option>
                <option value="Herbal Tea">Herbal Tea</option>
                <option value="White Tea">White Tea</option>
              </select>
              {errors.teaType && <p style={{ color: 'red' }}>{errors.teaType}</p>}
            </FormGroup>

            <FormGroup label="Quantity">
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
                style={inputStyle}
              />
              {errors.quantity && <p style={{ color: 'red' }}>{errors.quantity}</p>}
            </FormGroup>

            <FormGroup label="Supplier">
              <input
                type="text"
                name="supplier"
                value={formData.supplier}
                onChange={handleChange}
                required
                style={inputStyle}
              />
              {errors.supplier && <p style={{ color: 'red' }}>{errors.supplier}</p>}
            </FormGroup>

            <FormGroup label="Reorder Level">
              <input
                type="number"
                name="reorderLevel"
                value={formData.reorderLevel}
                onChange={handleChange}
                required
                style={inputStyle}
              />
              {errors.reorderLevel && <p style={{ color: 'red' }}>{errors.reorderLevel}</p>}
            </FormGroup>

            <FormGroup label="Date Added">
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                style={inputStyle}
              />
              {errors.date && <p style={{ color: 'red' }}>{errors.date}</p>}
            </FormGroup>

            <FormGroup label="Status">
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                style={inputStyle}
              >
                <option value="Available">Available</option>
                <option value="Out of Stock">Out of Stock</option>
                <option value="Pending Restock">Pending Restock</option>
              </select>
              {errors.status && <p style={{ color: 'red' }}>{errors.status}</p>}
            </FormGroup>

            <button type="submit" style={submitButtonStyle}>Submit</button>
          </form>
        </div>
      </main>
    </div>
  );
};

// Reusable FormGroup Component
const FormGroup = ({ label, children }) => (
  <div style={{ marginBottom: "15px" }}>
    <label style={{ fontSize: "14px", fontWeight: "600", display: "block" }}>{label}:</label>
    {children}
  </div>
);

// Styles
const sidebarStyle = {
  width: "250px",
  height: "100vh",
  background: "linear-gradient(to bottom, #28a745, #004d00)",
  color: "white",
  padding: "16px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

const logoStyle = {
  width: "96px",
  height: "96px",
  borderRadius: "50%",
  backgroundColor: "white",
  padding: "8px",
};

const navLinkStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "12px",
  backgroundColor: "white",
  color: "black",
  borderRadius: "8px",
  textDecoration: "none",
  marginBottom: "10px",
};

const signOutButtonStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  padding: "12px",
  backgroundColor: "black",
  color: "white",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  width: "100%",
};

const mainStyle = {
  flex: 1,
  padding: "20px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexWrap: "wrap",
};

const formContainerStyle = {
  width: "100%",
  maxWidth: "600px",
  padding: "20px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  backgroundColor: "#f9f9f9",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  fontSize: "16px",
};

const submitButtonStyle = {
  width: "100%",
  padding: "10px",
  backgroundColor: "#28a745",
  color: "white",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
};

export default InventoryForm;