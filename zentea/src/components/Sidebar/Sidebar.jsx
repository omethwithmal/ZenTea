import React from 'react';
import './Sidebar.css'; // Import the CSS file

const Sidebar = () => {
    return (
        <div className="IT22090508-managersdashbord-dashboard">
            {/* Sidebar */}
            <aside className="IT22090508-managersdashbord-sidebar">
                <div className="IT22090508-managersdashbord-logo">
                    <i className="fas fa-cogs"></i>
                    <h1>Management</h1>
                    <h2>Dashboard</h2>
                </div>

                {/* Navigation Links */}
                <nav>
                    <a href="#admin" className="IT22090508-managersdashbord-nav-link">
                        <i className="fas fa-user-shield"></i>
                        <span>Admin</span>
                    </a>
                    <a href="#employees" className="IT22090508-managersdashbord-nav-link">
                        <i className="fas fa-users"></i>
                        <span>Employee Manager</span>
                    </a>
                    <a href="#finance" className="IT22090508-managersdashbord-nav-link">
                        <i className="fas fa-wallet"></i>
                        <span>Financial Manager</span>
                    </a>
                    <a href="#orders" className="IT22090508-managersdashbord-nav-link">
                        <i className="fas fa-truck"></i>
                        <span>Orders</span>
                    </a>
                    <a href="#inventory" className="IT22090508-managersdashbord-nav-link">
                        <i className="fas fa-boxes"></i>
                        <span>Inventory</span>
                    </a>
                    <a href="#maintenance" className="IT22090508-managersdashbord-nav-link">
                        <i className="fas fa-tools"></i>
                        <span>Equipment Maintenance</span>
                    </a>
                </nav>
            </aside>

           
        </div>
    );
};

export default Sidebar;