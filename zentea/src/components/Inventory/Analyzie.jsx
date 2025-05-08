import React from "react";
import { Link } from "react-router-dom";
import { FaQuestionCircle, FaSignOutAlt } from "react-icons/fa";
import { Bar } from "react-chartjs-2";
import Logo from '../../assets/home.jpg';
import { Chart as ChartJS } from 'chart.js/auto'; // Automatically registers all necessary chart.js components
 // Make sure to replace this with the correct image path.

const AnalyzePage = () => {
  // Sample inventory data
  const inventoryData = [
    { name: "Item A", stock: 100, reorderLevel: 50 },
    { name: "Item B", stock: 200, reorderLevel: 30 },
    { name: "Item C", stock: 10, reorderLevel: 20 }, // Low stock
    { name: "Item D", stock: 500, reorderLevel: 100 },
    { name: "Item E", stock: 75, reorderLevel: 40 },
    { name: "Item F", stock: 20, reorderLevel: 30 }, // Low stock
  ];

  // Calculate total stock
  const totalStock = inventoryData.reduce((total, item) => total + item.stock, 0);

  // Calculate low stock alerts
  const lowStockAlerts = inventoryData.filter((item) => item.stock <= item.reorderLevel).length;

  // Data for the Bar Chart
  const chartData = {
    labels: inventoryData.map(item => item.name), // Item names as labels
    datasets: [
      {
        label: 'Stock Levels',
        data: inventoryData.map(item => item.stock), // Stock values for each item
        backgroundColor: inventoryData.map(item => item.stock <= item.reorderLevel ? '#FF5733' : '#4CAF50'), // Red for low stock, green otherwise
        borderColor: 'rgba(0,0,0,0.1)',
        borderWidth: 1
      }
    ]
  };

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <aside style={sidebarStyle}>
        <div>
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <img src={Logo} alt="Logo" style={logoStyle} />
          </div>
          <nav>
            <Link to="/Dashboard" style={navLinkStyle}>📊 Dashboard</Link>
            <Link to="/InventoryTable" style={navLinkStyle}>🗳 Inventory Data</Link>
            <Link to="/analyze" style={navLinkStyle}>📶 Analyze</Link>
            <Link to="/help" style={navLinkStyle}> <FaQuestionCircle /> Help </Link>
          </nav>
        </div>
        <button style={signOutButtonStyle}> <FaSignOutAlt /> Sign out </button>
      </aside>

      {/* Main Content */}
      <main style={containerStyle}>
        <h2 style={headingStyle}>Inventory Analysis</h2>

        {/* Low Stock Warning Message */}
        {lowStockAlerts > 0 && (
          <div style={alertStyle}>
            <strong>{lowStockAlerts} item(s) have low stock!</strong>
            <p style={{ marginTop: "10px" }}>Please review the items highlighted in red.</p>
          </div>
        )}

        <div style={cardContainer}>
          <div style={cardStyle}>
            <h3 style={cardTitle}>Total Stock</h3>
            <p style={cardData}>{totalStock}</p>
          </div>

          <div style={cardStyle}>
            <h3 style={cardTitle}>Low Stock Alerts</h3>
            <p style={cardData}>{lowStockAlerts}</p>
          </div>
        </div>

        {/* Bar Chart for Inventory Data */}
        <div style={{ marginTop: "30px", maxWidth: "800px", margin: "0 auto" }}>
          <Bar data={chartData} />
        </div>
      </main>
    </div>
  );
};

/* Sidebar Styles */
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

/* Main Content Styles */
const containerStyle = {
  padding: "20px",
  textAlign: "center",
  background: "#f4f4f4",
  minHeight: "100vh",
  flexGrow: 1, // Allows main content to take up remaining space
};

const headingStyle = {
  color: "#333",
  fontSize: "24px",
};

const textStyle = {
  fontSize: "16px",
  color: "#666",
};

const cardContainer = {
  display: "flex",
  justifyContent: "center",
  gap: "20px",
  marginTop: "20px",
};

const cardStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  textAlign: "center",
  width: "200px",
};

const cardTitle = {
  fontSize: "16px",
  color: "#333",
  marginBottom: "10px",
};

const cardData = {
  fontSize: "18px",
  fontWeight: "bold",
  color: "#007bff",
};

const alertStyle = {
  backgroundColor: "#ff5733", // Red alert
  color: "white",
  padding: "15px",
  borderRadius: "5px",
  marginBottom: "20px",
  textAlign: "center",
  fontWeight: "bold",
};

export default AnalyzePage;
