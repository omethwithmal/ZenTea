import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaWhatsapp } from "react-icons/fa";


const OrderDashboard1 = () => {
  const [orders, setOrders] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null);
  const [formData, setFormData] = useState({
    Full_Name: "",
    Delivery_Address: "",
    Contact_Number: "",
    Email_Address: "",
    Select_Tea_Type: "",
    Quantity: "",
    Price: ""
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:8070/order");
      const formattedOrders = res.data.orders || [];
      setOrders(formattedOrders);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8070/order/deleteOrder/${id}`);
      setOrders((prev) => prev.filter((order) => order._id !== id));
    } catch (err) {
      console.error("Error deleting order:", err);
    }
  };

  const handleEdit = (order) => {
    setEditingOrder(order._id);
    setFormData({
      Full_Name: order.Full_Name,
      Delivery_Address: order.Delivery_Address,
      Contact_Number: order.Contact_Number,
      Email_Address: order.Email_Address,
      Select_Tea_Type: order.Select_Tea_Type,
      Quantity: order.Quantity,
      Price: order.Price
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8070/order/updateOrder/${editingOrder}`, formData);
      setOrders((prev) =>
        prev.map((order) =>
          order._id === editingOrder ? { ...formData, _id: editingOrder } : order
        )
      );
      setEditingOrder(null);
      setFormData({
        Full_Name: "",
        Delivery_Address: "",
        Contact_Number: "",
        Email_Address: "",
        Select_Tea_Type: "",
        Quantity: "",
        Price: ""
      });
    } catch (err) {
      console.error("Error updating order:", err);
    }
  };

  const shareOnWhatsApp = (order) => {
    const message = `Order Details:\n\n` +
      `Name: ${order.Full_Name}\n` +
      `Address: ${order.Delivery_Address}\n` +
      `Contact: ${order.Contact_Number}\n` +
      `Email: ${order.Email_Address}\n` +
      `Tea Type: ${order.Select_Tea_Type}\n` +
      `Quantity: ${order.Quantity}\n` +
      `Price: ${order.Price}`;
    
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div style={dashboardContainer}>
      <div style={cardContainer}>
        <h1 style={title}>Order Dashboard</h1>

        {editingOrder && (
          <form onSubmit={handleUpdate} style={formStyle}>
            {Object.keys(formData).map((key) => (
              <div key={key} style={{ marginBottom: "10px" }}>
                <input
                  type={["Quantity", "Price"].includes(key) ? "number" : "text"}
                  name={key}
                  value={formData[key]}
                  onChange={handleInputChange}
                  placeholder={key.replace(/_/g, " ")}
                  required
                  style={inputStyle}
                />
              </div>
            ))}
            <div style={{ textAlign: "right" }}>
              <button type="submit" style={buttonStyle("#3498db")}>Update</button>
              <button type="button" onClick={() => setEditingOrder(null)} style={buttonStyle("#e74c3c")}>Cancel</button>
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
                <td style={tdStyle}>{order.Full_Name}</td>
                <td style={tdStyle}>{order.Delivery_Address}</td>
                <td style={tdStyle}>{order.Contact_Number}</td>
                <td style={tdStyle}>{order.Email_Address}</td>
                <td style={tdStyle}>{order.Select_Tea_Type}</td>
                <td style={tdStyle}>{order.Quantity}</td>
                <td style={tdStyle}>{order.Price}</td>
                <td style={tdStyle}>
                  
                <button onClick={() => handleEdit(order)} style={buttonStyle("#2ecc71")}>Edit</button>
                <button onClick={() => handleDelete(order._id)} style={buttonStyle("#e74c3c")}>Delete</button>
                    <a
                          href={`https://wa.me/?text=${encodeURIComponent(
                          `Order Details:\nName: ${order.Full_Name}\nAddress: ${order.Delivery_Address}\nContact: ${order.Contact_Number}\nEmail: ${order.Email_Address}\nTea Type: ${order.Select_Tea_Type}\nQuantity: ${order.Quantity}\nPrice: ${order.Price}`
                     )}`}
                           target="_blank"
                           rel="noopener noreferrer"
                           style={{ marginLeft: "5px", color: "#25D366", fontSize: "1.5em" }}
                     >
                               <FaWhatsapp />
                     </a>
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
  marginLeft:"140px"
};

const cardContainer = {
  maxWidth: "1200px",
  margin: "0 auto",
  backgroundColor: "#fff",
  borderRadius: "12px",
  boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
  padding: "20px"
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
  background: 'linear-gradient(135deg, hsl(130, 100%, 37%) 0%, #99ff00 100%)',
  borderRadius: "8px"
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "6px",
  fontSize: "1em"
};

const buttonStyle = (bgColor) => ({
  padding: "8px 15px",
  margin: "5px",
  backgroundColor: bgColor,
  background: 'linear-gradient(135deg, hsl(130, 100%, 37%) 0%, #99ff00 100%)',
  border: "none",
  borderRadius: "4px",
  cursor: "pointer"
});

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  backgroundColor: "#fff",
  borderRadius: "8px",
  overflow: "hidden"
};

const headerRowStyle = {
  background: 'linear-gradient(135deg, hsl(130, 100%, 37%) 0%, #99ff00 100%)',
  color: "#fff"
};

const thStyle = {
  padding: "15px",
  border: "1px solid #ddd",
  textAlign: "left"
};

const tdStyle = {
  padding: "15px",
  border: "1px solid #ddd",
  textAlign: "left"
};

export default OrderDashboard1;
