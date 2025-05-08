import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaQuestionCircle, FaSignOutAlt, FaBoxes, FaExclamationTriangle, FaLeaf } from "react-icons/fa";
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

  const [errors, setErrors] = useState({});
  const [totalItems, setTotalItems] = useState(0);
  const [lowStockItems, setLowStockItems] = useState(0);
  const [availableItems, setAvailableItems] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.teaType) newErrors.teaType = "Tea type is required";
    if (!formData.quantity) newErrors.quantity = "Quantity is required";
    if (formData.quantity <= 0) newErrors.quantity = "Must be greater than zero";
    if (!formData.supplier) newErrors.supplier = "Supplier is required";
    if (!formData.reorderLevel) newErrors.reorderLevel = "Reorder level is required";
    if (formData.reorderLevel <= 0) newErrors.reorderLevel = "Must be greater than zero";
    if (!formData.date) newErrors.date = "Date is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const currentDate = new Date().toISOString().split('T')[0];
    const dateToSend = formData.date || currentDate;

    try {
      const response = await axios.post("http://localhost:8070/api/addInventory", {
        ...formData,
        date: dateToSend,
      });

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
        setTotalItems(prev => prev + 1);
        if (parseInt(formData.quantity) <= parseInt(formData.reorderLevel)) {
          setLowStockItems(prev => prev + 1);
        }
        if (formData.status === "Available") {
          setAvailableItems(prev => prev + 1);
        }
      }
    } catch (error) {
      console.error("Error adding inventory:", error.message);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      {/* Sidebar */}
      <aside style={sidebarStyle}>
        <div style={sidebarContent}>
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <img src={Logo} alt="Logo" style={logoStyle} />
            <h3 style={{ marginTop: "10px", color: "white", fontWeight: "600", fontSize: "20px" }}>Tea Factory Manager</h3>
          </div>
          <nav style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Link to="/Dashboard" style={navLinkStyle}>
              <span style={iconStyle}>📊</span> Dashboard
            </Link>
            <Link to="/InventoryTable" style={navLinkStyle}>
              <span style={iconStyle}>🗳</span> Inventory
            </Link>
            <Link to="/AnalyzePage" style={navLinkStyle}>
              <span style={iconStyle}>📶</span> Analyze
            </Link>
            <Link to="/help" style={navLinkStyle}>
              <FaQuestionCircle style={iconStyle} /> Help
            </Link>
          </nav>
        </div>
        <button style={signOutButtonStyle}>
          <FaSignOutAlt style={iconStyle} /> Sign out
        </button>
      </aside>

      {/* Main Content */}
      <main style={containerStyle}>
        <div style={contentWrapper}>
          {/* Summary Cards */}
          <div style={cardContainer}>
            <div style={{ ...cardStyle, borderLeft: "6px solid #27AE60" }}>
              <div style={cardIconContainer}>
                <FaBoxes style={{ ...cardIcon, color: "#27AE60" }} />
              </div>
              <h3 style={cardTitle}>Total Items</h3>
              <p style={{ ...cardData, color: "#27AE60" }}>{totalItems}</p>
              <p style={cardSubText}>Tea varieties</p>
            </div>

            <div style={{ ...cardStyle, borderLeft: "6px solid #D35400" }}>
              <div style={cardIconContainer}>
                <FaExclamationTriangle style={{ ...cardIcon, color: "#D35400" }} />
              </div>
              <h3 style={cardTitle}>Low Stock</h3>
              <p style={{ ...cardData, color: "#D35400" }}>{lowStockItems}</p>
              <p style={cardSubText}>Need restocking</p>
            </div>

            <div style={{ ...cardStyle, borderLeft: "6px solid #3498DB" }}>
              <div style={cardIconContainer}>
                <FaLeaf style={{ ...cardIcon, color: "#3498DB" }} />
              </div>
              <h3 style={cardTitle}>Available</h3>
              <p style={{ ...cardData, color: "#3498DB" }}>{availableItems}</p>
              <p style={cardSubText}>Ready for sale</p>
            </div>
          </div>

          {/* Compact Form */}
          <div style={formContainer}>
            <h2 style={formHeader}>Add Tea Inventory</h2>
            <form onSubmit={handleSubmit} style={formStyle}>
              <div style={formRow}>
                <FormGroup label="Tea Type" error={errors.teaType} style={{ flex: 1 }}>
                  <select
                    name="teaType"
                    value={formData.teaType}
                    onChange={handleChange}
                    style={inputStyle}
                  >
                    <option value="">Select Tea Type</option>
                    <option value="Green Tea">Green Tea</option>
                    <option value="Black Tea">Black Tea</option>
                    <option value="Herbal Tea">Herbal Tea</option>
                    <option value="White Tea">White Tea</option>
                  </select>
                </FormGroup>

                <FormGroup label="Status" error={errors.status} style={{ flex: 1 }}>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    style={inputStyle}
                  >
                    <option value="Available">Available</option>
                    <option value="Out of Stock">Out of Stock</option>
                    <option value="Pending Restock">Pending Restock</option>
                  </select>
                </FormGroup>
              </div>

              <div style={formRow}>
                <FormGroup label="Quantity (kg)" error={errors.quantity} style={{ flex: 1 }}>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    style={inputStyle}
                    min="1"
                  />
                </FormGroup>

                <FormGroup label="Reorder Level (kg)" error={errors.reorderLevel} style={{ flex: 1 }}>
                  <input
                    type="number"
                    name="reorderLevel"
                    value={formData.reorderLevel}
                    onChange={handleChange}
                    style={inputStyle}
                    min="1"
                  />
                </FormGroup>
              </div>

              {/* Supplier field - full width */}
              <div style={fullWidthRow}>
                <FormGroup label="Supplier" error={errors.supplier}>
                  <input
                    type="text"
                    name="supplier"
                    value={formData.supplier}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </FormGroup>
              </div>

              {/* Date field - full width */}
              <div style={fullWidthRow}>
                <FormGroup label="Date Added" error={errors.date}>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </FormGroup>
              </div>

              <button type="submit" style={submitButton}>
                Add Inventory
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

// FormGroup component with error handling
const FormGroup = ({ label, children, error, style }) => (
  <div style={{ ...formGroupStyle, ...style }}>
    <label style={labelStyle}>{label}</label>
    {children}
    {error && <span style={errorStyle}>{error}</span>}
  </div>
);

// Styles
const sidebarStyle = {
  width: "280px",
  height: "100vh",
  background: "linear-gradient(135deg, #2C5E1A, #4A8C2B)",
  color: "white",
  padding: "24px 16px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  boxShadow: "2px 0 15px rgba(0,0,0,0.1)",
  position: "fixed",
  top: 0,
  left: 0,
};

const sidebarContent = {
  display: "flex",
  flexDirection: "column",
  height: "100%",
};

const logoStyle = {
  width: "90px",
  height: "90px",
  borderRadius: "50%",
  backgroundColor: "white",
  padding: "8px",
  objectFit: "cover",
  border: "3px solid rgba(255,255,255,0.2)",
};

const iconStyle = {
  fontSize: "18px",
  width: "24px",
  display: "flex",
  justifyContent: "center",
};

const navLinkStyle = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "14px 16px",
  backgroundColor: "rgba(255,255,255,0.1)",
  color: "white",
  borderRadius: "8px",
  textDecoration: "none",
  marginBottom: "8px",
  transition: "all 0.3s ease",
  fontSize: "15px",
  fontWeight: "500",
  ':hover': {
    backgroundColor: "rgba(255,255,255,0.2)",
  },
};

const signOutButtonStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  padding: "14px",
  backgroundColor: "rgba(0,0,0,0.2)",
  color: "white",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  width: "100%",
  fontSize: "15px",
  fontWeight: "500",
  transition: "all 0.3s ease",
  ':hover': {
    backgroundColor: "rgba(0,0,0,0.3)",
  },
};

const containerStyle = {
  flexGrow: 1,
  background: "#F5F5F5",
  marginLeft: "280px",
  minHeight: "100vh",
  padding: "40px",
};

const contentWrapper = {
  maxWidth: "1200px",
  margin: "0 auto",
};

const cardContainer = {
  display: "flex",
  justifyContent: "space-between",
  gap: "30px",
  marginBottom: "40px",
  flexWrap: "wrap",
};

const cardStyle = {
  background: "white",
  padding: "25px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  textAlign: "center",
  flex: "1 1 300px",
  minHeight: "200px",
  transition: "transform 0.3s ease",
  ':hover': {
    transform: "translateY(-5px)",
  },
};

const cardIconContainer = {
  width: "60px",
  height: "60px",
  borderRadius: "50%",
  backgroundColor: "rgba(39, 174, 96, 0.1)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto 15px",
};

const cardIcon = {
  fontSize: "24px",
};

const cardTitle = {
  fontSize: "18px",
  color: "#7F8C8D",
  marginBottom: "10px",
  fontWeight: "600",
};

const cardData = {
  fontSize: "36px",
  fontWeight: "700",
  marginBottom: "5px",
};

const cardSubText = {
  fontSize: "14px",
  color: "#95A5A6",
};

const formContainer = {
  background: "white",
  borderRadius: "12px",
  padding: "30px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
};

const formHeader = {
  color: "#2C3E50",
  fontSize: "24px",
  fontWeight: "700",
  marginBottom: "25px",
  textAlign: "center",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

const formRow = {
  display: "flex",
  gap: "20px",
  marginBottom: "15px",
  '@media (max-width: 768px)': {
    flexDirection: "column",
    gap: "15px",
  },
};

const fullWidthRow = {
  marginBottom: "15px",
};

const formGroupStyle = {
  marginBottom: "0",
};

const labelStyle = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#34495E",
  display: "block",
  marginBottom: "8px",
};

const inputStyle = {
  width: "100%",
  padding: "12px 15px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  fontSize: "14px",
  transition: "all 0.3s ease",
  ':focus': {
    borderColor: "#27AE60",
    outline: "none",
    boxShadow: "0 0 0 2px rgba(39, 174, 96, 0.2)",
  },
};

const errorStyle = {
  color: "#E74C3C",
  fontSize: "12px",
  marginTop: "5px",
  display: "block",
};

const submitButton = {
  width: "100%",
  padding: "14px",
  backgroundColor: "#27AE60",
  color: "white",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "600",
  transition: "all 0.3s ease",
  marginTop: "10px",
  ':hover': {
    backgroundColor: "#219653",
  },
};

export default InventoryForm;