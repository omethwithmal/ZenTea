import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderDashboard1 = () => {
  const [orders, setOrders] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    deliveryAddress: "",
    contactNumber: "",
    emailAddress: "",
    teaType: "",
    quantity: "",
    Price: ""
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:8070/order");
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8070/order/delete/${id}`);
      setOrders((prev) => prev.filter((order) => order._id !== id));
    } catch (err) {
      console.error("Error deleting order:", err);
    }
  };

  const handleEdit = (order) => {
    setEditingOrder(order._id);
    setFormData(order);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8070/order/update/${editingOrder}`, formData);
      setOrders((prev) =>
        prev.map((order) =>
          order._id === editingOrder ? { ...formData, _id: editingOrder } : order
        )
      );
      setEditingOrder(null);
      setFormData({
        fullName: "",
        deliveryAddress: "",
        contactNumber: "",
        emailAddress: "",
        teaType: "",
        quantity: "",
        rs: ""
      });
    } catch (err) {
      console.error("Error updating order:", err);
    }
  };

  return (
    <div style={dashboardContainer}>
      <div style={cardContainer}>
        <h1 style={title}>Order Dashboard</h1>

        {editingOrder && (
          <form onSubmit={handleUpdate} style={formStyle}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
              {Object.keys(formData).map((key) => (
                <input
                  key={key}
                  type={["quantity", "rs"].includes(key) ? "number" : "text"}
                  name={key}
                  value={formData[key]}
                  onChange={handleInputChange}
                  placeholder={key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                  required
                  style={inputStyle}
                />
              ))}
            </div>
            <div style={{ marginTop: "15px", textAlign: "right" }}>
              <button type="submit" style={buttonStyle("#3498db")}>Update</button>
              <button type="button" onClick={() => setEditingOrder(null)} style={buttonStyle("#e74c3c")}>
                Cancel
              </button>
            </div>
          </form>
        )}

        <table style={tableStyle}>
          <thead>
            <tr style={headerRowStyle}>
              <th style={thStyle}>Full Name</th>
              <th style={thStyle}>Delivery Address</th>
              <th style={thStyle}>Contact Number</th>
              <th style={thStyle}>Email Address</th>
              <th style={thStyle}>Tea Type</th>
              <th style={thStyle}>Quantity</th>
              <th style={thStyle}>Price</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id} style={{ backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff" }}>
                <td style={tdStyle}>{order.fullName}</td>
                <td style={tdStyle}>{order.deliveryAddress}</td>
                <td style={tdStyle}>{order.contactNumber}</td>
                <td style={tdStyle}>{order.emailAddress}</td>
                <td style={tdStyle}>{order.teaType}</td>
                <td style={tdStyle}>{order.quantity}</td>
                <td style={tdStyle}>{order.rs}</td>
                <td style={tdStyle}>
                  <button onClick={() => handleEdit(order)} style={buttonStyle("#2ecc71")}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(order._id)} style={buttonStyle("#e74c3c")}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Styles
const dashboardContainer = {
  padding: "30px",
  background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
  minHeight: "100vh",
  fontFamily: "Arial, sans-serif",
  marginLeft: "250px"
};

const cardContainer = {
  maxWidth: "1200px",
  margin: "0 auto",
  backgroundColor: "#fff",
  borderRadius: "12px",
  boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
  padding: "20px",
  maxHeight: "600px",
  overflowY: "auto"
};

const title = {
  textAlign: "center",
  color: "#2c3e50",
  marginBottom: "30px",
  fontSize: "2.5em",
  fontWeight: "700"
};

const formStyle = {
  marginBottom: "20px",
  padding: "20px",
  backgroundColor: "#f1f3f5",
  borderRadius: "8px"
};

const inputStyle = {
  flex: "1 1 200px",
  padding: "10px",
  border: "1px solid #ddd",
  borderRadius: "6px",
  fontSize: "1em",
  outline: "none"
};

const buttonStyle = (bgColor) => ({
  padding: "8px 15px",
  marginLeft: "10px",
  backgroundColor: bgColor,
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  transition: "background-color 0.3s"
});

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  backgroundColor: "#fff",
  borderRadius: "8px",
  overflow: "hidden"
};

const headerRowStyle = {
  backgroundColor: "#3498db",
  color: "#fff"
};

const thStyle = {
  padding: "15px",
  border: "1px solid #ddd",
  textAlign: "left",
  fontWeight: "600"
};

const tdStyle = {
  padding: "15px",
  border: "1px solid #ddd",
  textAlign: "left"
};

export default OrderDashboard1;
