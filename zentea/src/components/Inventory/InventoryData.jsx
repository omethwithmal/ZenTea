import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaQuestionCircle, FaSignOutAlt, FaFilePdf, FaExclamationTriangle } from "react-icons/fa";
import Logo from '../../assets/home.jpg';
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import axios from "axios";

const InventoryTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showLowStockWarning, setShowLowStockWarning] = useState(false);
  const [lowStockItems, setLowStockItems] = useState([]);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get("http://localhost:8070/api/getInventory");
        const formattedData = Array.isArray(response.data.response)
          ? response.data.response.map(item => ({
              id: item._id || '',
              teaType: item.teaType || '',
              quantity: item.quantity || 0,
              supplier: item.supplier || '',
              reorderLevel: item.reorderLevel || 0,
              date: item.date || '',
              status: item.status || ''
            }))
          : [];

        setInventory(formattedData);
        
        // Check for low stock items
        const lowStock = formattedData.filter(item => 
          item.quantity <= item.reorderLevel && item.quantity > 0
        );
        setLowStockItems(lowStock);
        setShowLowStockWarning(lowStock.length > 0);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8070/api/deleteInventory/${id}`);
      setInventory(inventory.filter((item) => item.id !== id));
      // Update low stock items after deletion
      const updatedLowStock = lowStockItems.filter(item => item.id !== id);
      setLowStockItems(updatedLowStock);
      setShowLowStockWarning(updatedLowStock.length > 0);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdate = async () => {
    if (!selectedItem) return;

    const { id, teaType, quantity, supplier, reorderLevel, date, status } = selectedItem;

    try {
      const response = await axios.put(`http://localhost:8070/api/updateInventory/${id}`, {
        teaType,
        quantity,
        supplier,
        reorderLevel,
        date,
        status,
      });

      // Update the inventory list with the updated item
      const updatedInventory = inventory.map(item => item.id === id ? selectedItem : item);
      setInventory(updatedInventory);

      // Update low stock items
      const updatedLowStock = updatedInventory.filter(item => 
        item.quantity <= item.reorderLevel && item.quantity > 0
      );
      setLowStockItems(updatedLowStock);
      setShowLowStockWarning(updatedLowStock.length > 0);

      // Close the modal
      setSelectedItem(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const generatePDFReport = () => {
    const filteredData = inventory.filter((item) =>
      item.teaType.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.setTextColor(40);
    doc.text("Tea Inventory Report", 14, 15);
    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 22);

    // Add low stock warning to PDF if applicable
    if (lowStockItems.length > 0) {
      doc.setFontSize(10);
      doc.setTextColor(255, 0, 0);
      doc.text(`Warning: ${lowStockItems.length} item(s) below reorder level!`, 14, 30);
      doc.setTextColor(100);
    }

    autoTable(doc, {
      startY: lowStockItems.length > 0 ? 40 : 30,
      head: [['Tea Type', 'Quantity', 'Supplier', 'Reorder Level', 'Date Added', 'Status']],
      body: filteredData.map((item) => [
        item.teaType,
        item.quantity,
        item.supplier,
        item.reorderLevel,
        item.date,
        item.status,
      ]),
      theme: 'grid',
      headStyles: { fillColor: [76, 175, 80], textColor: 255, fontSize: 11 },
      styles: { cellPadding: 4, fontSize: 10, valign: 'middle' },
      columnStyles: { 1: { halign: 'center' }, 3: { halign: 'center' } },
      willDrawCell: (data) => {
        const item = filteredData[data.row.index];
        if (item && item.quantity <= item.reorderLevel) {
          doc.setTextColor(255, 0, 0);
        } else {
          doc.setTextColor(0, 0, 0);
        }
      }
    });

    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text("© 2025 Tea Inventory Management System", 14, doc.internal.pageSize.height - 10);
    doc.save(`Tea_Inventory_Report_${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  const handleSelectItemForUpdate = (item) => {
    setSelectedItem(item);
  };

  if (loading) {
    return <div style={{ padding: "20px" }}>Loading inventory data...</div>;
  }

  if (error) {
    return <div style={{ padding: "20px", color: "red" }}>Error: {error}</div>;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside style={sidebarStyle}>
        <div>
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <img src={Logo} alt="Logo" style={logoStyle} />
          </div>
          <nav>
            <Link to="/Dashboard" style={navLinkStyle}>📊 Dashboard</Link>
            <Link to="/InventoryForm" style={navLinkStyle}>🗳 Inventory</Link>
            <Link to="/AnalyzePage" style={navLinkStyle}>📶 Analyze</Link>
            <Link to="/help" style={navLinkStyle}><FaQuestionCircle /> Help</Link>
          </nav>
        </div>
        <button style={signOutButtonStyle}><FaSignOutAlt /> Sign out</button>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h2>Inventory Data</h2>
          <button onClick={generatePDFReport} style={reportButtonStyle}>
            <FaFilePdf /> Generate PDF Report
          </button>
        </div>

        {/* Low Stock Warning Banner */}
        {showLowStockWarning && (
          <div style={warningBannerStyle}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <FaExclamationTriangle style={{ marginRight: "10px", fontSize: "20px" }} />
              <div>
                <strong>Low Stock Warning:</strong> {lowStockItems.length} item(s) are below or at reorder level.
                <div style={{ fontSize: "14px", marginTop: "5px" }}>
                  Items affected: {lowStockItems.map(item => item.teaType).join(", ")}
                </div>
              </div>
            </div>
            <button 
              onClick={() => setShowLowStockWarning(false)} 
              style={closeWarningButtonStyle}
              aria-label="Close warning"
            >
              ×
            </button>
          </div>
        )}

        <input 
          type="text" 
          placeholder="Search Inventory..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          style={searchBarStyle} 
        />

        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Tea Type</th>
              <th style={thStyle}>Quantity</th>
              <th style={thStyle}>Supplier</th>
              <th style={thStyle}>Reorder Level</th>
              <th style={thStyle}>Date Added</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>
          <tbody>
            {inventory.length > 0 ? (
              inventory
                .filter((item) => 
                  item.teaType.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((item) => {
                  const isLowStock = item.quantity <= item.reorderLevel;
                  const isOutOfStock = item.quantity === 0;
                  return (
                    <tr 
                      key={item.id} 
                      style={isLowStock ? 
                        (isOutOfStock ? { backgroundColor: "#f8d7da" } : { backgroundColor: "#fff3cd" }) 
                        : {}}
                    >
                      <td style={tdStyle}>
                        {item.teaType}
                        {isLowStock && (
                          <FaExclamationTriangle 
                            style={{ 
                              color: isOutOfStock ? "#dc3545" : "#ffc107", 
                              marginLeft: "5px" 
                            }} 
                            title={isOutOfStock ? "Out of stock" : "Low stock warning"}
                          />
                        )}
                      </td>
                      <td style={{ 
                        ...tdStyle, 
                        color: isOutOfStock ? "#dc3545" : (isLowStock ? "#856404" : "inherit"),
                        fontWeight: isLowStock ? "bold" : "normal"
                      }}>
                        {item.quantity}
                      </td>
                      <td style={tdStyle}>{item.supplier}</td>
                      <td style={tdStyle}>{item.reorderLevel}</td>
                      <td style={tdStyle}>{item.date}</td>
                      <td style={tdStyle}>{item.status}</td>
                      <td style={tdStyle}>
                        <button 
                          style={updateButtonStyle} 
                          onClick={() => handleSelectItemForUpdate(item)}
                        >
                          Update
                        </button>
                        <button 
                          style={deleteButtonStyle} 
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
                  No inventory items found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Update Modal */}
        {selectedItem && (
          <div style={updateModalStyle}>
            <div style={modalContentStyle}>
              <h3 style={modalTitleStyle}>Update Inventory Item</h3>
              <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }} style={formStyle}>
                <select 
                  value={selectedItem.teaType} 
                  onChange={(e) => setSelectedItem({ ...selectedItem, teaType: e.target.value })}
                  style={inputStyle} 
                  required
                >
                  <option value="">Select Tea Type</option>
                  <option value="Green Tea">Green Tea</option>
                  <option value="Black Tea">Black Tea</option>
                  <option value="Herbal Tea">Herbal Tea</option>
                  <option value="Oolong Tea">Oolong Tea</option>
                  <option value="White Tea">White Tea</option>
                </select>

                <input 
                  type="number" 
                  value={selectedItem.quantity} 
                  onChange={(e) => setSelectedItem({ ...selectedItem, quantity: e.target.value })}
                  placeholder="Quantity" 
                  style={inputStyle} 
                  required
                  min="0"
                />

                <input 
                  type="text" 
                  value={selectedItem.supplier} 
                  onChange={(e) => setSelectedItem({ ...selectedItem, supplier: e.target.value })}
                  placeholder="Supplier" 
                  style={inputStyle} 
                  required
                />

                <input 
                  type="number" 
                  value={selectedItem.reorderLevel} 
                  onChange={(e) => setSelectedItem({ ...selectedItem, reorderLevel: e.target.value })}
                  placeholder="Reorder Level" 
                  style={inputStyle} 
                  required
                  min="0"
                />

                <input 
                  type="date" 
                  value={selectedItem.date} 
                  onChange={(e) => setSelectedItem({ ...selectedItem, date: e.target.value })}
                  style={inputStyle}
                />

                <select 
                  value={selectedItem.status} 
                  onChange={(e) => setSelectedItem({ ...selectedItem, status: e.target.value })}
                  style={inputStyle} 
                  required
                >
                  <option value="">Select Status</option>
                  <option value="In Stock">In Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                  <option value="Low Stock">Low Stock</option>
                </select>

                <div style={buttonContainerStyle}>
                  <button type="submit" style={saveButtonStyle}>Save</button>
                  <button type="button" onClick={() => setSelectedItem(null)} style={cancelButtonStyle}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

// Styles
const sidebarStyle = { 
  width: "250px", 
  height: "100vh", 
  background: "linear-gradient(to bottom, #28a745, #004d00)", 
  color: "white", 
  padding: "16px", 
  display: "flex", 
  flexDirection: "column", 
  justifyContent: "space-between" 
};

const logoStyle = { 
  width: "96px", 
  height: "96px", 
  borderRadius: "50%", 
  backgroundColor: "white", 
  padding: "8px" 
};

const navLinkStyle = { 
  display: "block", 
  padding: "12px", 
  backgroundColor: "white", 
  color: "black", 
  borderRadius: "8px", 
  textDecoration: "none", 
  marginBottom: "10px", 
  transition: "all 0.3s ease" 
};

const signOutButtonStyle = { 
  padding: "12px", 
  backgroundColor: "black", 
  color: "white", 
  borderRadius: "8px", 
  border: "none", 
  cursor: "pointer", 
  width: "100%" 
};

const searchBarStyle = { 
  width: "100%", 
  padding: "10px", 
  margin: "10px 0", 
  border: "1px solid #ccc", 
  borderRadius: "4px", 
  fontSize: "16px" 
};

const tableStyle = { 
  width: "100%", 
  borderCollapse: "collapse", 
  marginTop: "20px" 
};

const thStyle = { 
  backgroundColor: "#4CAF50", 
  color: "white", 
  padding: "12px", 
  textAlign: "center", 
  borderBottom: "2px solid #ddd" 
};

const tdStyle = { 
  padding: "10px", 
  borderBottom: "1px solid #eee", 
  textAlign: "center" 
};

const updateButtonStyle = { 
  padding: "6px 12px", 
  backgroundColor: "#ffc107", 
  color: "black", 
  borderRadius: "4px", 
  cursor: "pointer",
  marginRight: "5px"
};

const deleteButtonStyle = { 
  padding: "6px 12px", 
  backgroundColor: "#dc3545", 
  color: "white", 
  borderRadius: "4px", 
  cursor: "pointer" 
};

const reportButtonStyle = { 
  padding: "10px 15px", 
  backgroundColor: "#dc3545", 
  color: "white", 
  borderRadius: "4px", 
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "5px"
};

const updateModalStyle = { 
  position: "fixed", 
  top: "0", 
  left: "0", 
  right: "0", 
  bottom: "0", 
  backgroundColor: "rgba(0, 0, 0, 0.5)", 
  display: "flex", 
  justifyContent: "center", 
  alignItems: "center",
  zIndex: 1000
};

const modalContentStyle = { 
  backgroundColor: "white", 
  padding: "30px", 
  borderRadius: "8px", 
  width: "400px", 
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" 
};

const modalTitleStyle = { 
  fontSize: "18px", 
  marginBottom: "20px", 
  textAlign: "center" 
};

const formStyle = { 
  display: "flex", 
  flexDirection: "column" 
};

const inputStyle = { 
  padding: "10px", 
  marginBottom: "12px", 
  borderRadius: "4px", 
  border: "1px solid #ccc" 
};

const buttonContainerStyle = { 
  display: "flex", 
  justifyContent: "space-between",
  marginTop: "10px"
};

const saveButtonStyle = { 
  padding: "10px 15px", 
  backgroundColor: "#28a745", 
  color: "white", 
  borderRadius: "4px", 
  cursor: "pointer",
  width: "48%"
};

const cancelButtonStyle = { 
  padding: "10px 15px", 
  backgroundColor: "#6c757d", 
  color: "white", 
  borderRadius: "4px", 
  cursor: "pointer",
  width: "48%"
};

const warningBannerStyle = {
  backgroundColor: "#fff3cd",
  color: "#856404",
  padding: "15px",
  borderRadius: "4px",
  marginBottom: "20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderLeft: "5px solid #ffc107",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
};

const closeWarningButtonStyle = {
  background: "transparent",
  border: "none",
  color: "#856404",
  fontSize: "20px",
  cursor: "pointer",
  marginLeft: "15px",
  padding: "0 5px"
};

export default InventoryTable;