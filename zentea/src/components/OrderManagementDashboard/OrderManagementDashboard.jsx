import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
import { Doughnut, Bar, Pie } from "react-chartjs-2";
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
  faCog,
  faSearch,
  faShare // Added Share Icon
} from '@fortawesome/free-solid-svg-icons';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const OrderManagementDashboard = () => {

    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingOrder, setEditingOrder] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    // Fetch orders from backend
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:8070/order');
                const data = await response.json();
                if (data.orders) {
                    setOrders(data.orders);
                    setFilteredOrders(data.orders);
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching orders:", error);
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    // Handle search functionality
    useEffect(() => {
        const results = orders.filter(order =>
            Object.values(order).some(val =>
                String(val).toLowerCase().includes(searchTerm.toLowerCase()))
        );
        setFilteredOrders(results);
    }, [searchTerm, orders]);

    // Handle PDF report download
    const handleDownloadPDFReport = () => {
        const doc = new jsPDF();
        // Add title
        doc.setFontSize(20);
        doc.text('Order Management Report', 105, 15, { align: 'center' });
        // Add date
        doc.setFontSize(12);
        doc.text(`Generated on: ${new Date().toLocaleString()}`, 105, 25, { align: 'center' });
        // Add summary statistics
        doc.setFontSize(14);
        doc.text('Summary Statistics', 14, 40);
        doc.setFontSize(12);
        doc.text(`Total Orders: ${orders.length}`, 14, 50);
        doc.text(`Pending Orders: ${orders.filter(o => o.status === 'Pending').length}`, 14, 60);
        doc.text(`Completed Orders: ${orders.filter(o => o.status === 'Completed').length}`, 14, 70);
        doc.text(`Delayed Orders: ${orders.filter(o => o.status === 'Delayed').length}`, 14, 80);
        // Add order table
        doc.setFontSize(14);
        doc.text('Order Details', 14, 100);
        // Prepare data for the table
        const tableData = filteredOrders.map(order => [
            order.Full_Name,
            order.Delivery_Address,
            order.Contact_Number,
            order.Email_Address,
            order.Select_Tea_Type,
            order.Quantity,
            order.Price,
            order.status
        ]);
        // Add the table using autoTable
        autoTable(doc, {
            head: [['Name', 'Address', 'Contact', 'Email', 'Tea Type', 'Quantity', 'Price', 'Status']],
            body: tableData,
            startY: 110,
            styles: { fontSize: 8 },
            headStyles: { fillColor: [52, 152, 219] }
        });
        // Save the PDF
        doc.save('order_management_report.pdf');
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
                const updatedOrders = orders.map(order => 
                    order._id === editingOrder._id ? editingOrder : order
                );
                setOrders(updatedOrders);
                setFilteredOrders(updatedOrders);
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
                    const updatedOrders = orders.filter(order => order._id !== orderId);
                    setOrders(updatedOrders);
                    setFilteredOrders(updatedOrders);
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

    // WhatsApp Share Functionality
    const handleShare = (order) => {
        const message = `Order Details:\n\nName: ${order.Full_Name}\nAddress: ${order.Delivery_Address}\nContact: ${order.Contact_Number}\nEmail: ${order.Email_Address}\nTea Type: ${order.Select_Tea_Type}\nQuantity: ${order.Quantity}\nPrice: $${order.Price}\nStatus: ${order.status}`;
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
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

    // Data for Tea Type Distribution
    const teaTypeData = {
        labels: ["Green Tea", "Black Tea", "Oolong Tea", "White Tea"],
        datasets: [
            {
                label: "Tea Type Distribution",
                data: [
                    orders.filter(o => o.Select_Tea_Type === 'Green Tea').length,
                    orders.filter(o => o.Select_Tea_Type === 'Black Tea').length,
                    orders.filter(o => o.Select_Tea_Type === 'Oolong Tea').length,
                    orders.filter(o => o.Select_Tea_Type === 'White Tea').length
                ],
                backgroundColor: [
                    "hsl(120, 60%, 50%)",
                    "hsl(0, 60%, 50%)",
                    "hsl(30, 60%, 50%)",
                    "hsl(60, 60%, 50%)"
                ],
                hoverOffset: 4,
            },
        ],
    };

    // Data for Price Analysis
    const priceAnalysisData = {
        labels: ["< $10", "$10-$20", "$20-$30", "$30+"],
        datasets: [
            {
                label: "Price Range Distribution",
                data: [
                    orders.filter(o => o.Price < 10).length,
                    orders.filter(o => o.Price >= 10 && o.Price < 20).length,
                    orders.filter(o => o.Price >= 20 && o.Price < 30).length,
                    orders.filter(o => o.Price >= 30).length
                ],
                backgroundColor: "hsl(117, 86.90%, 47.80%)",
                borderColor: "hsl(106, 90.30%, 48.60%)",
                borderWidth: 1,
            },
        ],
    };

    if (loading) {
        return <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '90vh',
            fontSize: '18px'
        }}>Loading orders...</div>;
    }

    return (
        <div style={{ display: "flex", height: "100vh", fontFamily: "Arial, sans-serif" }}>
            {/* Sidebar */}
            <aside style={{
                width: '250px',
                backgroundColor: '#2c3e50',
                color: 'white',
                padding: '20px 0',
                minHeight: '100vh',
                background: 'linear-gradient(45deg, hsl(130, 100%, 37%) 0%, #99ff00 100%)'
            }}>
                <div style={{
                    textAlign: 'center',
                    padding: '20px 0',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                    <i className="fas fa-cogs" style={{ fontSize: '40px', marginBottom: '10px' }}></i>
                    <h1 style={{ margin: '5px 0', fontSize: '35px' }}>Order</h1>
                    <h2 style={{ margin: '5px 0', fontSize: '25px', fontWeight: 'normal' }}>Dashboard</h2>
                </div>
                <nav style={{ marginTop: '20px' }}>
                    <a href="#" style={{
                        display: 'block',
                        padding: '15px 20px',
                        color: 'white',
                        textDecoration: 'none',
                        borderLeft: '4px solid transparent',
                        backgroundColor: 'rgba(255, 255, 255, 0.28)'
                    }} 
                    >
                        <i className="fas fa-users" style={{ marginRight: '10px' }}></i>
                        <span>Dashboard</span>
                    </a>
                    <a href="#" style={{
                        display: 'block',
                        padding: '15px 20px',
                        color: 'white',
                        textDecoration: 'none',
                        borderLeft: '4px solid transparent'
                    }}

                    >
                        <i className="fas fa-wallet" style={{ marginRight: '10px' }}></i>
                        <span>Orders</span>
                    </a>
                    <a href="#" style={{
                        display: 'block',
                        padding: '15px 20px',
                        color: 'white',
                        textDecoration: 'none',
                        borderLeft: '4px solid transparent',
                    }}
                   
                    >
                        <i className="fas fa-truck" style={{ marginRight: '10px' }}></i>
                        <span>Customers</span>
                    </a>
                    <a
                        href="#"
                        style={{
                            display: 'block',
                            padding: '15px 20px',
                            color: 'white',
                            textDecoration: 'none',
                            borderLeft: '4px solid transparent'
                        }}
                        
                    >
                        <i className="fas fa-truck" style={{ marginRight: '10px' }}></i>
                        <span>Payments</span>
                    </a>
                    <a href="#" style={{
                        display: 'block',
                        padding: '15px 20px',
                        color: 'white',
                        textDecoration: 'none',
                        borderLeft: '4px solid transparent'
                    }}>
                        <i className="fas fa-boxes" style={{ marginRight: '10px' }}></i>
                        <span>Analytics</span>
                    </a>
                    <a href="#" style={{
                        display: 'block',
                        padding: '15px 20px',
                        color: 'white',
                        textDecoration: 'none',
                        borderLeft: '4px solid transparent'
                    }}
                    onClick={() =>navigate('/')}
                    >
                        <i className="fas fa-tools" style={{ marginRight: '10px' }}></i>
                        <span>Log out</span>
                    </a>
                </nav>
            </aside>
            {/* Main Content */}
            <main style={{
                flex: 1,
                padding: "30px",
                background: "#f4f4f4",
                overflowY: "auto",
                marginLeft:"80px",
            }}>
                <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px"}}>
                    <div>
                        <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Order Overview</h1>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <button
                            id="downloadPdfReportBtn"
                            style={{
                                padding: "10px 20px",
                                background: "#e74c3c",
                                color: "#fff",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer"
                            }}
                            onClick={handleDownloadPDFReport}
                        >
                            Download PDF Report
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
                <section style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px", marginBottom: "20px" }}>
                    <div style={{ background: "#fff", padding: "20px", borderRadius: "5px", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)" }}>
                        <h3 style={{ marginBottom: "15px", textAlign: "center" }}>Tea Type Distribution</h3>
                        <Pie data={teaTypeData} options={{ responsive: true, plugins: { legend: { position: "top" } } }} />
                    </div>
                    <div style={{ background: "#fff", padding: "20px", borderRadius: "5px", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)" }}>
                        <h3 style={{ marginBottom: "15px", textAlign: "center" }}>Price Range Analysis</h3>
                        <Bar data={priceAnalysisData} options={{ responsive: true, plugins: { legend: { position: "top" } } }} />
                    </div>
                </section>
                {/* Search Bar */}
                <div style={{ marginBottom: "20px", display: "flex", justifyContent: "flex-end" }}>
                    <div style={{ position: "relative", width: "300px" }}>
                        <input
                            type="text"
                            placeholder="Search orders..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "10px 15px 10px 40px",
                                borderRadius: "5px",
                                border: "1px solid #ddd",
                                fontSize: "16px",
                                boxSizing: "border-box"
                            }}
                        />
                        <FontAwesomeIcon 
                            icon={faSearch} 
                            style={{
                                position: "absolute",
                                left: "15px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                color: "#777"
                            }} 
                        />
                    </div>
                </div>
                {/* Order Table */}
                <section style={{ background: "#fff", padding: "20px", borderRadius: "5px", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                        <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>Recent Orders</h2>
                        <div style={{ color: "#777" }}>
                            Showing {filteredOrders.length} of {orders.length} orders
                        </div>
                    </div>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr>
                                <th style={{ padding: "10px", background: "#f4f4f4", textAlign: "center" }}>Full Name</th>
                                <th style={{ padding: "10px", background: "#f4f4f4", textAlign: "center" }}>Delivery Address</th>
                                <th style={{ padding: "10px", background: "#f4f4f4", textAlign: "center" }}>Contact Number</th>
                                <th style={{ padding: "10px", background: "#f4f4f4", textAlign: "center" }}>Email Address</th>
                                <th style={{ padding: "10px", background: "#f4f4f4", textAlign: "center" }}>Tea Type</th>
                                <th style={{ padding: "10px", background: "#f4f4f4", textAlign: "center" }}>Quantity</th>
                                <th style={{ padding: "10px", background: "#f4f4f4", textAlign: "center" }}>Price</th>
                                <th style={{ padding: "10px", background: "#f4f4f4", textAlign: "center" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.length > 0 ? (
                                filteredOrders.map((order) => (
                                    <tr key={order._id}>
                                        <td style={{ padding: "10px", borderBottom: "1px solid #ddd", textAlign: "center"  }}>{order.Full_Name}</td>
                                        <td style={{ padding: "10px", borderBottom: "1px solid #ddd", textAlign: "center"  }}>{order.Delivery_Address}</td>
                                        <td style={{ padding: "10px", borderBottom: "1px solid #ddd", textAlign: "center"  }}>{order.Contact_Number}</td>
                                        <td style={{ padding: "10px", borderBottom: "1px solid #ddd", textAlign: "center"  }}>{order.Email_Address}</td>
                                        <td style={{ padding: "10px", borderBottom: "1px solid #ddd", textAlign: "center"  }}>{order.Select_Tea_Type}</td>
                                        <td style={{ padding: "10px", borderBottom: "1px solid #ddd", textAlign: "center"  }}>{order.Quantity}</td>
                                        <td style={{ padding: "10px", borderBottom: "1px solid #ddd", textAlign: "center"  }}>{order.Price}</td>
                                        <td style={{ padding: "10px", borderBottom: "1px solid #ddd", textAlign: "center" }}>
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
                                                    marginRight: "15px",
                                                    fontSize: "16px"
                                                }}
                                                title="Delete Order"
                                            >
                                                <FontAwesomeIcon icon={faTrashAlt} />
                                            </button>
                                            <button 
                                                onClick={() => handleShare(order)}
                                                style={{
                                                    background: "none",
                                                    border: "none",
                                                    color: "#2ecc71",
                                                    cursor: "pointer",
                                                    fontSize: "16px"
                                                }}
                                                title="Share Order via WhatsApp"
                                            >
                                                <FontAwesomeIcon icon={faShare} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="9" style={{ padding: "20px", textAlign: "center" }}>
                                        No orders found matching your search criteria
                                    </td>
                                </tr>
                            )}
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