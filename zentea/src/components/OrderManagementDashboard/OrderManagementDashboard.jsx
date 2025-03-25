import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEdit, 
  faTrashAlt, 
  faBoxOpen, 
  faClock, 
  faCheckCircle, 
  faExclamationTriangle,
  faTachometerAlt,
  faTruck,
  faUsers,
  faCoins,
  faChartBar,
  faCog
} from '@fortawesome/free-solid-svg-icons';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const OrderManagementDashboard = () => {
    const [reportGenerated, setReportGenerated] = useState(false);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingOrder, setEditingOrder] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    // Fetch orders from backend
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:8070/order');
                const data = await response.json();
                if (data.orders) {
                    setOrders(data.orders);
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching orders:", error);
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    // Handle report generation
    const handleGenerateReport = () => {
        setReportGenerated(true);
        alert("Report Generated Successfully!");
    };

    // Handle report download
    const handleDownloadReport = () => {
        if (!reportGenerated) return;

        const reportContent = `
            Order Management Report - ${new Date().getFullYear()}
            ------------------------
            Total Orders: ${orders.length}
            Pending Orders: ${orders.filter(o => o.status === 'Pending').length}
            Completed Orders: ${orders.filter(o => o.status === 'Completed').length}
            Delayed Orders: ${orders.filter(o => o.status === 'Delayed').length}

            This report was generated on ${new Date().toLocaleString()}.
        `;

        const blob = new Blob([reportContent], { type: "text/plain" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "order_management_report.txt";
        document.body.appendChild(a);
        a.click();

        a.remove();
        URL.revokeObjectURL(url);
    };

    // Handle update order
    const handleUpdate = (orderId) => {
        const orderToUpdate = orders.find(order => order._id === orderId);
        if (orderToUpdate) {
            setEditingOrder(orderToUpdate);
            setShowEditModal(true);
        }
    };

    // Handle update form submission
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8070/order/updateOrder/${editingOrder._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editingOrder)
            });
            
            if (response.ok) {
                // Update the order in state
                setOrders(orders.map(order => 
                    order._id === editingOrder._id ? editingOrder : order
                ));
                setShowEditModal(false);
                alert("Order updated successfully");
            } else {
                const errorData = await response.json();
                alert(errorData.message || "Failed to update order");
            }
        } catch (error) {
            console.error("Error updating order:", error);
            alert("Error updating order");
        }
    };

    // Handle input changes in edit form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditingOrder({
            ...editingOrder,
            [name]: value
        });
    };

    // Handle delete order
    const handleDelete = async (orderId) => {
        if (window.confirm("Are you sure you want to delete this order?")) {
            try {
                const response = await fetch(`http://localhost:8070/order/deleteOrder/${orderId}`, {
                    method: 'DELETE'
                });
                
                if (response.ok) {
                    // Remove the order from state
                    setOrders(orders.filter(order => order._id !== orderId));
                    alert("Order deleted successfully");
                } else {
                    const errorData = await response.json();
                    alert(errorData.message || "Failed to delete order");
                }
            } catch (error) {
                console.error("Error deleting order:", error);
                alert("Error deleting order");
            }
        }
    };

    // Data for the Doughnut Chart (Order Status)
    const orderStatusData = {
        labels: ["Completed", "Pending", "Delayed"],
        datasets: [
            {
                label: "Order Status",
                data: [
                    orders.filter(o => o.status === 'Completed').length,
                    orders.filter(o => o.status === 'Pending').length,
                    orders.filter(o => o.status === 'Delayed').length
                ],
                backgroundColor: ["hsl(130, 100%, 37%)", "hsl(210, 100%, 50%)", "hsl(0, 100%, 60%)"],
                hoverOffset: 4,
            },
        ],
    };

    // Data for the Bar Chart (Monthly Orders)
    const monthlyOrdersData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: "Monthly Orders",
                data: [120, 150, 180, 200, 220, 250],
                backgroundColor: "hsl(130, 100%, 37%)",
                borderColor: "hsl(130, 100%, 37%)",
                borderWidth: 1,
            },
        ],
    };

    if (loading) {
        return <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            fontSize: '18px'
        }}>Loading orders...</div>;
    }

    return (
        <div style={{ display: "flex", height: "100vh", fontFamily: "Arial, sans-serif" }}>
            {/* Sidebar */}
            <aside style={{
                width: "250px",
                background: "#2c3e50",
                color: "#fff",
                padding: "20px",
                boxSizing: "border-box"
            }}>
                <div style={{ marginBottom: "20px" }}>
                    <FontAwesomeIcon icon={faBoxOpen} style={{ fontSize: "24px" }} />
                    <h1 style={{ fontSize: "20px", margin: "10px 0" }}>Order</h1>
                    <h2 style={{ fontSize: "20px" }}>Dashboard</h2>
                </div>
                <nav>
                    <a href="#" style={{
                        display: "flex",
                        alignItems: "center",
                        color: "#fff",
                        textDecoration: "none",
                        padding: "10px",
                        background: "#34495e",
                        borderRadius: "5px",
                        marginBottom: "10px"
                    }}>
                        <FontAwesomeIcon icon={faTachometerAlt} style={{ marginRight: "10px" }} />
                        <span>Dashboard</span>
                    </a>
                    <a href="#" style={{ display: "flex", alignItems: "center", color: "#fff", textDecoration: "none", padding: "10px", marginBottom: "10px" }}>
                        <FontAwesomeIcon icon={faTruck} style={{ marginRight: "10px" }} />
                        <span>Orders</span>
                    </a>
                    <a href="#" style={{ display: "flex", alignItems: "center", color: "#fff", textDecoration: "none", padding: "10px", marginBottom: "10px" }}>
                        <FontAwesomeIcon icon={faUsers} style={{ marginRight: "10px" }} />
                        <span>Customers</span>
                    </a>
                    <a href="#" style={{ display: "flex", alignItems: "center", color: "#fff", textDecoration: "none", padding: "10px", marginBottom: "10px" }}>
                        <FontAwesomeIcon icon={faCoins} style={{ marginRight: "10px" }} />
                        <span>Payments</span>
                    </a>
                    <a href="#" style={{ display: "flex", alignItems: "center", color: "#fff", textDecoration: "none", padding: "10px", marginBottom: "10px" }}>
                        <FontAwesomeIcon icon={faChartBar} style={{ marginRight: "10px" }} />
                        <span>Analytics</span>
                    </a>
                    <a href="#" style={{ display: "flex", alignItems: "center", color: "#fff", textDecoration: "none", padding: "10px" }}>
                        <FontAwesomeIcon icon={faCog} style={{ marginRight: "10px" }} />
                        <span>Settings</span>
                    </a>
                </nav>
            </aside>

            {/* Main Content */}
            <main style={{
                flex: 1,
                padding: "20px",
                background: "#f4f4f4",
                overflowY: "auto"
            }}>
                <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                    <div>
                        <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Order Overview</h1>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <button
                            id="generateReportBtn"
                            style={{
                                padding: "10px 20px",
                                background: "#3498db",
                                color: "#fff",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                                marginRight: "10px"
                            }}
                            onClick={handleGenerateReport}
                        >
                            Generate Report
                        </button>
                        <button
                            id="downloadReportBtn"
                            style={{
                                padding: "10px 20px",
                                background: "#2ecc71",
                                color: "#fff",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                                opacity: reportGenerated ? 1 : 0.5,
                                pointerEvents: reportGenerated ? "auto" : "none"
                            }}
                            onClick={handleDownloadReport}
                        >
                            Download Report
                        </button>
                        <div style={{ marginLeft: "20px", display: "flex", alignItems: "center" }}>
                            <img src="profile.jpg" alt="Profile Picture" style={{ width: "40px", height: "40px", borderRadius: "50%" }} />
                            <span style={{ marginLeft: "10px", fontSize: "16px" }}>John Doe</span>
                        </div>
                    </div>
                </header>

                {/* Dashboard Cards */}
                <section style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "20px" }}>
                    <div style={{
                        background: "#fff",
                        padding: "20px",
                        borderRadius: "5px",
                        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                        textAlign: "center"
                    }}>
                        <FontAwesomeIcon icon={faBoxOpen} style={{ fontSize: "24px", marginBottom: "10px", color: "#3498db" }} />
                        <h3 style={{ fontSize: "18px", margin: "10px 0" }}>Total Orders</h3>
                        <p style={{ fontSize: "20px", fontWeight: "bold" }}>{orders.length}</p>
                    </div>
                    <div style={{
                        background: "#fff",
                        padding: "20px",
                        borderRadius: "5px",
                        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                        textAlign: "center"
                    }}>
                        <FontAwesomeIcon icon={faClock} style={{ fontSize: "24px", marginBottom: "10px", color: "#f1c40f" }} />
                        <h3 style={{ fontSize: "18px", margin: "10px 0" }}>Pending Orders</h3>
                        <p style={{ fontSize: "20px", fontWeight: "bold" }}>{orders.filter(o => o.status === 'Pending').length}</p>
                    </div>
                    <div style={{
                        background: "#fff",
                        padding: "20px",
                        borderRadius: "5px",
                        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                        textAlign: "center"
                    }}>
                        <FontAwesomeIcon icon={faCheckCircle} style={{ fontSize: "24px", marginBottom: "10px", color: "#2ecc71" }} />
                        <h3 style={{ fontSize: "18px", margin: "10px 0" }}>Completed Orders</h3>
                        <p style={{ fontSize: "20px", fontWeight: "bold" }}>{orders.filter(o => o.status === 'Completed').length}</p>
                    </div>
                    <div style={{
                        background: "#fff",
                        padding: "20px",
                        borderRadius: "5px",
                        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                        textAlign: "center"
                    }}>
                        <FontAwesomeIcon icon={faExclamationTriangle} style={{ fontSize: "24px", marginBottom: "10px", color: "#e74c3c" }} />
                        <h3 style={{ fontSize: "18px", margin: "10px 0" }}>Delayed Orders</h3>
                        <p style={{ fontSize: "20px", fontWeight: "bold" }}>{orders.filter(o => o.status === 'Delayed').length}</p>
                    </div>
                </section>

                {/* Charts Section */}
                <section style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
                    <div style={{ flex: 1, background: "#fff", padding: "20px", borderRadius: "5px", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)" }}>
                        <Doughnut data={orderStatusData} options={{ responsive: true, plugins: { legend: { position: "top" } } }} />
                    </div>
                    <div style={{ flex: 1, background: "#fff", padding: "20px", borderRadius: "5px", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)" }}>
                        <Bar data={monthlyOrdersData} options={{ responsive: true, plugins: { legend: { position: "top" } } }} />
                    </div>
                </section>

                {/* Order Table */}
                <section style={{ background: "#fff", padding: "20px", borderRadius: "5px", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)" }}>
                    <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "20px" }}>Recent Orders</h2>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr>
                                <th style={{ padding: "10px", background: "#f4f4f4", textAlign: "left" }}>Full Name</th>
                                <th style={{ padding: "10px", background: "#f4f4f4", textAlign: "left" }}>Delivery Address</th>
                                <th style={{ padding: "10px", background: "#f4f4f4", textAlign: "left" }}>Contact Number</th>
                                <th style={{ padding: "10px", background: "#f4f4f4", textAlign: "left" }}>Email Address</th>
                                <th style={{ padding: "10px", background: "#f4f4f4", textAlign: "left" }}>Tea Type</th>
                                <th style={{ padding: "10px", background: "#f4f4f4", textAlign: "left" }}>Quantity</th>
                                <th style={{ padding: "10px", background: "#f4f4f4", textAlign: "left" }}>Price</th>
                                <th style={{ padding: "10px", background: "#f4f4f4", textAlign: "left" }}>Status</th>
                                <th style={{ padding: "10px", background: "#f4f4f4", textAlign: "left" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{order.Full_Name}</td>
                                    <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{order.Delivery_Address}</td>
                                    <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{order.Contact_Number}</td>
                                    <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{order.Email_Address}</td>
                                    <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{order.Select_Tea_Type}</td>
                                    <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{order.Quantity}</td>
                                    <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{order.Price}</td>
                                    <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{order.status || 'Pending'}</td>
                                    <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                                        <button 
                                            onClick={() => handleUpdate(order._id)}
                                            style={{
                                                background: "none",
                                                border: "none",
                                                color: "#3498db",
                                                cursor: "pointer",
                                                marginRight: "15px",
                                                fontSize: "16px"
                                            }}
                                            title="Edit Order"
                                        >
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(order._id)}
                                            style={{
                                                background: "none",
                                                border: "none",
                                                color: "#e74c3c",
                                                cursor: "pointer",
                                                fontSize: "16px"
                                            }}
                                            title="Delete Order"
                                        >
                                            <FontAwesomeIcon icon={faTrashAlt} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

                {/* Edit Order Modal */}
                {showEditModal && editingOrder && (
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1000
                    }}>
                        <div style={{
                            backgroundColor: 'white',
                            padding: '20px',
                            borderRadius: '5px',
                            width: '500px',
                            maxWidth: '90%'
                        }}>
                            <h2 style={{ marginBottom: '20px' }}>Edit Order</h2>
                            <form onSubmit={handleUpdateSubmit}>
                                <div style={{ marginBottom: '15px' }}>
                                    <label style={{ display: 'block', marginBottom: '5px' }}>Full Name</label>
                                    <input
                                        type="text"
                                        name="Full_Name"
                                        value={editingOrder.Full_Name || ''}
                                        onChange={handleInputChange}
                                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                                    />
                                </div>
                                
                                <div style={{ marginBottom: '15px' }}>
                                    <label style={{ display: 'block', marginBottom: '5px' }}>Delivery Address</label>
                                    <input
                                        type="text"
                                        name="Delivery_Address"
                                        value={editingOrder.Delivery_Address || ''}
                                        onChange={handleInputChange}
                                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                                    />
                                </div>
                                
                                <div style={{ marginBottom: '15px' }}>
                                    <label style={{ display: 'block', marginBottom: '5px' }}>Contact Number</label>
                                    <input
                                        type="text"
                                        name="Contact_Number"
                                        value={editingOrder.Contact_Number || ''}
                                        onChange={handleInputChange}
                                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                                    />
                                </div>
                                
                                <div style={{ marginBottom: '15px' }}>
                                    <label style={{ display: 'block', marginBottom: '5px' }}>Email Address</label>
                                    <input
                                        type="email"
                                        name="Email_Address"
                                        value={editingOrder.Email_Address || ''}
                                        onChange={handleInputChange}
                                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                                    />
                                </div>
                                
                                <div style={{ marginBottom: '15px' }}>
                                    <label style={{ display: 'block', marginBottom: '5px' }}>Tea Type</label>
                                    <select
                                        name="Select_Tea_Type"
                                        value={editingOrder.Select_Tea_Type || ''}
                                        onChange={handleInputChange}
                                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                                    >
                                        <option value="">Select Tea Type</option>
                                        <option value="Green Tea">Green Tea</option>
                                        <option value="Black Tea">Black Tea</option>
                                        <option value="Oolong Tea">Oolong Tea</option>
                                        <option value="White Tea">White Tea</option>
                                    </select>
                                </div>
                                
                                <div style={{ marginBottom: '15px' }}>
                                    <label style={{ display: 'block', marginBottom: '5px' }}>Quantity</label>
                                    <input
                                        type="number"
                                        name="Quantity"
                                        value={editingOrder.Quantity || ''}
                                        onChange={handleInputChange}
                                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                                    />
                                </div>
                                
                                <div style={{ marginBottom: '15px' }}>
                                    <label style={{ display: 'block', marginBottom: '5px' }}>Price</label>
                                    <input
                                        type="number"
                                        name="Price"
                                        value={editingOrder.Price || ''}
                                        onChange={handleInputChange}
                                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                                    />
                                </div>
                    
                                
                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                    <button
                                        type="button"
                                        onClick={() => setShowEditModal(false)}
                                        style={{
                                            padding: '8px 16px',
                                            backgroundColor: '#e74c3c',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        style={{
                                            padding: '8px 16px',
                                            backgroundColor: '#2ecc71',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Update Order
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default OrderManagementDashboard;