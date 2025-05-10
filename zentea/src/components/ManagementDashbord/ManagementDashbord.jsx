import React from 'react';
import './ManagementDashbord.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';

const ManagementDashboard = () => {

    const navigate = useNavigate();

    return (
        <div className="IT22090508-managementdashbord-dashboard">
            {/* Sidebar */}
            <aside className="IT22090508-admindashbord-sidebar">
                <div className="IT22090508-admindashbord-logo">
                    <i className="fas fa-cogs"></i>
                    <h1>Admin</h1>
                    <h2>Dashboard</h2>
                </div>

                {/* Navigation Links */}
                <nav>
                    <a href="#" className="IT22090508-admindashbord-nav-link active">
                        <i className="fas fa-user-shield"></i>
                        <span>Admin</span>
                    </a>
                    <a href="#" className="IT22090508-admindashbord-nav-link "
                     onClick={() =>navigate('/AddEmployeeForm')}
                    >
                        <i className="fas fa-user-shield"></i>
                        <span>Add Employee</span>
                        
                    </a>
                    <a href="#" className="IT22090508-admindashbord-nav-link ">
                        <i className="fas fa-user-shield"></i>
                        <span>Notification</span>
                        
                    </a>

                    <a href="#" className="IT22090508-admindashbord-nav-link "
                    onClick={() =>navigate('/EmployeeDashboard')}
                    >
                        <i className="fas fa-users"></i>
                        <span>Employee </span>
                    </a>
                    <a href="#" className="IT22090508-admindashbord-nav-link "
                     onClick={() =>navigate('/FinancialDashboard')}
                    >
                        <i className="fas fa-wallet"></i>
                        <span>Financial </span>
                    </a>
                    <a href="#" className="IT22090508-admindashbord-nav-link"
                    onClick={() =>navigate('/Orderdash')}
                    >
                        <i className="fas fa-truck"></i>
                        <span>Orders</span>
                    </a>
                    <a href="#" className="IT22090508-admindashbord-nav-link"
                    onClick={() =>navigate('/dashboard')}
                    >
                        <i className="fas fa-boxes"></i>
                        <span>Inventory</span>
                    </a>
                    <a href="#" className="IT22090508-admindashbord-nav-link"
                    onClick={() =>navigate('/MaintenanceSchedule')}
                    >
                        <i className="fas fa-tools"></i>
                        <span>Equipment</span>
                    </a>
                    <a href="#" className="IT22090508-admindashbord-nav-link ">
                        <i className="fas fa-user-shield"></i>
                        <span>Settings</span>
                        
                    </a>

                    <a href="#" className="IT22090508-admindashbord-nav-link "
                     onClick={() =>navigate('/')}
                    >
                        <i className="fas fa-user-shield"></i>
                        <span>↩ Log Out</span>
                        
                    </a>

                </nav>
            </aside>



            {/* Main Content */}
            <main className="IT22090508-managementdashbord-content">
                {/* Top Bar */}
                <header className="IT22090508-managementdashbord-top-bar">
                    <div className="IT22090508-managementdashbord-search-container">
                        <i className="fas fa-search"></i>
                        <input type="text" placeholder="Search dashboard..." />
                    </div>
                   
                </header>

                {/* Widgets Section */}
                <div className="IT22090508-managementdashbord-widgets">
                    {/* Employee Widget */}
                    <div className="IT22090508-managementdashbord-widget IT22090508-managementdashbord-card">
                        <div className="IT22090508-managementdashbord-widget-header">
                            <i className="fas fa-users"></i>
                            <h3>Employee</h3>
                        </div>
                        <div className="IT22090508-managementdashbord-widget-body">
                            <div className="IT22090508-managementdashbord-stat">
                                <h2>145</h2>
                                <p>Active Employees</p>
                            </div>
                            <div className="IT22090508-managementdashbord-progress-bar">
                                <div className="IT22090508-managementdashbord-progress" style={{ width: '75%' }}></div>
                            </div>
                        </div>
                    </div>

                    {/* Financial Widget */}
                    <div className="IT22090508-managementdashbord-widget IT22090508-managementdashbord-card">
                        <div className="IT22090508-managementdashbord-widget-header">
                            <i className="fas fa-wallet"></i>
                            <h3>Financial </h3>
                        </div>
                        <div className="IT22090508-managementdashbord-widget-body">
                            <div className="IT22090508-managementdashbord-stat">
                                <h2>$245K</h2>
                                <p>Monthly Revenue</p>
                            </div>
                            <div className="IT22090508-managementdashbord-trend IT22090508-managementdashbord-positive">
                                <i className="fas fa-arrow-up"></i> 12.5%
                            </div>
                        </div>
                    </div>

                    {/* Inventory Widget */}
                    <div className="IT22090508-managementdashbord-widget IT22090508-managementdashbord-card">
                        <div className="IT22090508-managementdashbord-widget-header">
                            <i className="fas fa-boxes"></i>
                            <h3>Inventory </h3>
                        </div>
                        <div className="IT22090508-managementdashbord-widget-body">
                            <div className="IT22090508-managementdashbord-stat">
                                <h2>78%</h2>
                                <p>Stock Level</p>
                            </div>
                            <div className="IT22090508-managementdashbord-donut-chart">
                                <svg viewBox="0 0 36 36" className="IT22090508-managementdashbord-circular-chart">
                                    <path
                                        className="IT22090508-managementdashbord-circle-bg"
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />
                                    <path
                                        className="IT22090508-managementdashbord-circle"
                                        strokeDasharray="78, 100"
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Order Widget */}
                    <div className="IT22090508-managementdashbord-widget IT22090508-managementdashbord-card IT22090508-managementdashbord-order-widget">
                        <div className="IT22090508-managementdashbord-widget-header">
                            <i className="fas fa-truck"></i>
                            <h3>Order </h3>
                        </div>
                        <div className="IT22090508-managementdashbord-widget-body">
                            <div className="IT22090508-managementdashbord-order-stats">
                                <div className="IT22090508-managementdashbord-stat-item">
                                    <h3>892</h3>
                                    <p>Pending Orders</p>
                                </div>
                                <div className="IT22090508-managementdashbord-stat-item">
                                    <h3>1.2K</h3>
                                    <p>Completed</p>
                                </div>
                            </div>
                            <div className="IT22090508-managementdashbord-order-chart">
                                <svg viewBox="0 0 200 60" className="IT22090508-managementdashbord-bar-chart">
                                    <rect x="10" y="20" width="30" height="35" fill="#6a11cb" />
                                    <rect x="50" y="35" width="30" height="20" fill="#2575fc" />
                                    <rect x="90" y="10" width="30" height="45" fill="#00cec9" />
                                    <rect x="130" y="25" width="30" height="30" fill="#ff6b6b" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Maintenance Widget */}
                    <div className="IT22090508-managementdashbord-widget IT22090508-managementdashbord-card">
                        <div className="IT22090508-managementdashbord-widget-header">
                            <i className="fas fa-tools"></i>
                            <h3>Equipment Maintenance</h3>
                        </div>
                        <div className="IT22090508-managementdashbord-widget-body">
                            <div className="IT22090508-managementdashbord-stat">
                                <h2>23</h2>
                                <p>Pending Tasks</p>
                            </div>
                            <div className="IT22090508-managementdashbord-maintenance-status">
                                <div className="IT22090508-managementdashbord-status-item">
                                    <span className="IT22090508-managementdashbord-dot IT22090508-managementdashbord-green"></span> Operational
                                    <span className="IT22090508-managementdashbord-count">15</span>
                                </div>
                                <div className="IT22090508-managementdashbord-status-item">
                                    <span className="IT22090508-managementdashbord-dot IT22090508-managementdashbord-yellow"></span> Under Maintenance
                                    <span className="IT22090508-managementdashbord-count">5</span>
                                </div>
                                <div className="IT22090508-managementdashbord-status-item">
                                    <span className="IT22090508-managementdashbord-dot IT22090508-managementdashbord-red"></span> Down
                                    <span className="IT22090508-managementdashbord-count">3</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="IT22090508-managementdashbord-charts">
                    <div className="IT22090508-managementdashbord-chart-card">
                        <h3>Performance Overview</h3>
                        <div className="IT22090508-managementdashbord-line-chart">
                            <svg viewBox="0 0 600 300" className="IT22090508-managementdashbord-line-graph">
                                {/* Chart data would be added here */}
                            </svg>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ManagementDashboard;