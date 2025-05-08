import React from "react";
import { Link } from "react-router-dom";
import { FaQuestionCircle, FaSignOutAlt, FaBoxes, FaExclamationTriangle, FaLeaf } from "react-icons/fa";
import { Bar } from "react-chartjs-2";
import Logo from '../../assets/home.jpg';
import { Chart as ChartJS } from 'chart.js/auto';

const AnalyzePage = () => {
  // Sample inventory data for tea factory
  const inventoryData = [
    { name: "Green Tea", stock: 150, reorderLevel: 50 },
    { name: "Black Tea", stock: 300, reorderLevel: 100 },
    { name: "Oolong Tea", stock: 25, reorderLevel: 30 }, // Low stock
    { name: "White Tea", stock: 80, reorderLevel: 40 },
    { name: "Herbal Tea", stock: 200, reorderLevel: 80 },
    { name: "Matcha Powder", stock: 15, reorderLevel: 20 }, // Low stock
  ];

  // Calculate total stock
  const totalStock = inventoryData.reduce((total, item) => total + item.stock, 0);

  // Calculate low stock alerts
  const lowStockAlerts = inventoryData.filter((item) => item.stock <= item.reorderLevel).length;

  // Data for the Bar Chart
  const chartData = {
    labels: inventoryData.map(item => item.name),
    datasets: [
      {
        label: 'Stock Levels (kg)',
        data: inventoryData.map(item => item.stock),
        backgroundColor: inventoryData.map(item => 
          item.stock <= item.reorderLevel ? '#D35400' : '#27AE60' // Brown for low stock, green otherwise
        ),
        borderColor: 'rgba(0,0,0,0.1)',
        borderWidth: 1,
        borderRadius: 4,
      }
    ]
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Tea Inventory Stock Levels',
        font: {
          size: 18,
          family: "'Helvetica Neue', sans-serif"
        },
        color: '#34495E'
      },
      tooltip: {
        callbacks: {
          afterLabel: function(context) {
            const index = context.dataIndex;
            return `Reorder Level: ${inventoryData[index].reorderLevel}kg`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Quantity (kg)',
          color: '#34495E'
        },
        grid: {
          color: 'rgba(0,0,0,0.05)'
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#34495E'
        }
      }
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#F5F5F5", overflow: "hidden" }}>
      {/* Fixed Sidebar */}
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
            <Link to="/analyze" style={{ ...navLinkStyle, backgroundColor: "rgba(255,255,255,0.2)" }}>
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

      {/* Scrollable Main Content */}
      <main style={containerStyle}>
        <div style={contentWrapper}>
          <div style={headerContainer}>
            <h2 style={headingStyle}>Tea Inventory Analysis</h2>
            <p style={subHeadingStyle}>Current stock levels and inventory health</p>
          </div>

          {/* Low Stock Warning Message */}
          {lowStockAlerts > 0 && (
            <div style={alertStyle}>
              <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                <FaExclamationTriangle style={{ fontSize: "28px", color: "#D35400" }} />
                <div>
                  <strong style={{ fontSize: "18px", color: "#D35400" }}>Stock Alert: {lowStockAlerts} tea varieties low!</strong>
                  <p style={{ marginTop: "6px", fontSize: "14px", color: "#7B7D7D" }}>
                    These items are below reorder level and need attention.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div style={cardContainer}>
            <div style={{ ...cardStyle, borderLeft: "6px solid #27AE60" }}>
              <div style={cardIconContainer}>
                <FaBoxes style={{ ...cardIcon, color: "#27AE60" }} />
              </div>
              <h3 style={cardTitle}>Total Tea Stock</h3>
              <p style={{ ...cardData, color: "#27AE60" }}>{totalStock}kg</p>
              <p style={cardSubText}>Across all tea varieties</p>
            </div>

            <div style={{ ...cardStyle, borderLeft: "6px solid #D35400" }}>
              <div style={cardIconContainer}>
                <FaExclamationTriangle style={{ ...cardIcon, color: "#D35400" }} />
              </div>
              <h3 style={cardTitle}>Low Stock Items</h3>
              <p style={{ ...cardData, color: "#D35400" }}>{lowStockAlerts}</p>
              <p style={cardSubText}>Require immediate attention</p>
            </div>

            <div style={{ ...cardStyle, borderLeft: "6px solid #3498DB" }}>
              <div style={cardIconContainer}>
                <FaLeaf style={{ ...cardIcon, color: "#3498DB" }} />
              </div>
              <h3 style={cardTitle}>Tea Varieties</h3>
              <p style={{ ...cardData, color: "#3498DB" }}>{inventoryData.length}</p>
              <p style={cardSubText}>Different types in stock</p>
            </div>
          </div>

          {/* Bar Chart for Inventory Data */}
          <div style={chartContainer}>
            <div style={chartWrapper}>
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

/* Styles */
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
  overflowY: "auto",
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
  overflowY: "auto",
  padding: "40px",
};

const contentWrapper = {
  maxWidth: "1400px",
  margin: "0 auto",
};

const headerContainer = {
  marginBottom: "30px",
  textAlign: "left",
};

const headingStyle = {
  color: "#2C3E50",
  fontSize: "36px",
  fontWeight: "700",
  marginBottom: "8px",
};

const subHeadingStyle = {
  fontSize: "16px",
  color: "#7F8C8D",
  marginBottom: "0",
};

const cardContainer = {
  display: "flex",
  justifyContent: "space-between",
  gap: "30px",
  margin: "40px 0",
  flexWrap: "wrap",
};

const cardStyle = {
  background: "white",
  padding: "30px 25px",
  borderRadius: "12px",
  boxShadow: "0 5px 25px rgba(0,0,0,0.08)",
  textAlign: "center",
  width: "350px",
  minHeight: "220px",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  ':hover': {
    transform: "translateY(-5px)",
    boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
  },
};

const cardIconContainer = {
  width: "70px",
  height: "70px",
  borderRadius: "50%",
  backgroundColor: "rgba(39, 174, 96, 0.1)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto 20px",
};

const cardIcon = {
  fontSize: "30px",
};

const cardTitle = {
  fontSize: "20px",
  color: "#7F8C8D",
  marginBottom: "15px",
  fontWeight: "600",
};

const cardData = {
  fontSize: "42px",
  fontWeight: "700",
  marginBottom: "8px",
};

const cardSubText = {
  fontSize: "15px",
  color: "#95A5A6",
  marginTop: "8px",
};

const alertStyle = {
  backgroundColor: "#FEF5E7",
  padding: "20px 25px",
  borderRadius: "10px",
  margin: "30px 0",
  textAlign: "left",
  borderLeft: "6px solid #D35400",
  display: "flex",
  alignItems: "center",
  boxShadow: "0 3px 15px rgba(211, 84, 0, 0.1)",
};

const chartContainer = {
  marginTop: "50px",
  background: "white",
  borderRadius: "12px",
  padding: "30px",
  boxShadow: "0 5px 25px rgba(0,0,0,0.08)",
};

const chartWrapper = {
  maxWidth: "1000px",
  margin: "0 auto",
};

export default AnalyzePage;