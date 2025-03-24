import React, { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const OrderManagementDashboard = () => {
    const [reportGenerated, setReportGenerated] = useState(false);

    // Handle report generation
    const handleGenerateReport = () => {
        setReportGenerated(true);
        alert("Report Generated Successfully!");
    };

    // Handle report download
    const handleDownloadReport = () => {
        if (!reportGenerated) return;

        const reportContent = `
            Order Management Report - 2025
            ------------------------
            Total Orders: 1,250
            Pending Orders: 250
            Completed Orders: 1,000
            Delayed Orders: 50

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

    // Data for the Doughnut Chart (Order Status)
    const orderStatusData = {
        labels: ["Completed", "Pending", "Delayed"],
        datasets: [
            {
                label: "Order Status",
                data: [1000, 250, 50],
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
                    <i className="fas fa-boxes" style={{ fontSize: "24px" }}></i>
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
                        <i className="fas fa-tachometer-alt" style={{ marginRight: "10px" }}></i>
                        <span>Dashboard</span>
                    </a>
                    <a href="#" style={{ display: "flex", alignItems: "center", color: "#fff", textDecoration: "none", padding: "10px", marginBottom: "10px" }}>
                        <i className="fas fa-truck" style={{ marginRight: "10px" }}></i>
                        <span>Orders</span>
                    </a>
                    <a href="#" style={{ display: "flex", alignItems: "center", color: "#fff", textDecoration: "none", padding: "10px", marginBottom: "10px" }}>
                        <i className="fas fa-users" style={{ marginRight: "10px" }}></i>
                        <span>Customers</span>
                    </a>
                    <a href="#" style={{ display: "flex", alignItems: "center", color: "#fff", textDecoration: "none", padding: "10px", marginBottom: "10px" }}>
                        <i className="fas fa-coins" style={{ marginRight: "10px" }}></i>
                        <span>Payments</span>
                    </a>
                    <a href="#" style={{ display: "flex", alignItems: "center", color: "#fff", textDecoration: "none", padding: "10px", marginBottom: "10px" }}>
                        <i className="fas fa-chart-bar" style={{ marginRight: "10px" }}></i>
                        <span>Analytics</span>
                    </a>
                    <a href="#" style={{ display: "flex", alignItems: "center", color: "#fff", textDecoration: "none", padding: "10px" }}>
                        <i className="fas fa-cog" style={{ marginRight: "10px" }}></i>
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
                    {["Total Orders", "Pending Orders", "Completed Orders", "Delayed Orders"].map((title, index) => (
                        <div key={index} style={{
                            background: "#fff",
                            padding: "20px",
                            borderRadius: "5px",
                            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                            textAlign: "center"
                        }}>
                            <i className={`fas fa-${index === 0 ? "box-open" : index === 1 ? "clock" : index === 2 ? "check-circle" : "exclamation-triangle"}`} style={{ fontSize: "24px", marginBottom: "10px" }}></i>
                            <h3 style={{ fontSize: "18px", margin: "10px 0" }}>{title}</h3>
                            <p style={{ fontSize: "20px", fontWeight: "bold" }}>{index === 0 ? "1,250" : index === 1 ? "250" : index === 2 ? "1,000" : "50"}</p>
                        </div>
                    ))}
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
                                <th style={{ padding: "10px", background: "#f4f4f4", textAlign: "left" }}>National Id Number</th>
                                <th style={{ padding: "10px", background: "#f4f4f4", textAlign: "left" }}>Delivery Address</th>
                                <th style={{ padding: "10px", background: "#f4f4f4", textAlign: "left" }}>Contact Number</th>
                                <th style={{ padding: "10px", background: "#f4f4f4", textAlign: "left" }}>Email Address</th>
                                <th style={{ padding: "10px", background: "#f4f4f4", textAlign: "left" }}>Tea Type</th>
                                <th style={{ padding: "10px", background: "#f4f4f4", textAlign: "left" }}>Quantity</th>
                                <th style={{ padding: "10px", background: "#f4f4f4", textAlign: "left" }}>Status</th>
                                <th style={{ padding: "10px", background: "#f4f4f4", textAlign: "left" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { name: "Kavishka", id: "2000212345", address: "Matale", phone: "0778770920", email: "KavishkaDilshan888@gmail.com", teaType: "Black Tea", quantity: "1", status: "Completed" },
                                { name: "Kavishka", id: "2000212345", address: "Matale", phone: "0778770920", email: "KavishkaDilshan888@gmail.com", teaType: "Black Tea", quantity: "1", status: "Pending" },
                                { name: "Kavishka", id: "2000212345", address: "Matale", phone: "0778770920", email: "KavishkaDilshan888@gmail.com", teaType: "Black Tea", quantity: "1", status: "Delayed" }
                            ].map((order, index) => (
                                <tr key={index}>
                                    <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{order.name}</td>
                                    <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{order.id}</td>
                                    <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{order.address}</td>
                                    <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{order.phone}</td>
                                    <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{order.email}</td>
                                    <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{order.teaType}</td>
                                    <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{order.quantity}</td>
                                    <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                                        <span style={{
                                            padding: "5px 10px",
                                            background: order.status === "Completed" ? "#2ecc71" : order.status === "Pending" ? "#f1c40f" : "#e74c3c",
                                            color: "#fff",
                                            borderRadius: "5px",
                                            textTransform: "capitalize"
                                        }}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                                        <button style={{
                                            padding: "5px 10px",
                                            background: "#3498db",
                                            color: "#fff",
                                            border: "none",
                                            borderRadius: "5px",
                                            cursor: "pointer",
                                            marginRight: "5px"
                                        }}>
                                            Update
                                        </button>
                                        <button style={{
                                            padding: "5px 10px",
                                            background: "#e74c3c",
                                            color: "#fff",
                                            border: "none",
                                            borderRadius: "5px",
                                            cursor: "pointer"
                                        }}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
};

export default OrderManagementDashboard;