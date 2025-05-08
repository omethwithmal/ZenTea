import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import axios from 'axios';

const EqmNotification = () => {
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch all notifications
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get('http://localhost:8070/notifications');
                setNotifications(response.data.notifications);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching notifications:', err);
                setLoading(false);
            }
        };
        fetchNotifications();
    }, []);

    // Filter notifications based on search term
    const filteredNotifications = notifications.filter(notification => 
        notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notification.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notification.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle delete operation
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this notification?')) {
            try {
                await axios.delete(`http://localhost:8070/notifications/deleteNotification/${id}`);
                setNotifications(notifications.filter(item => item._id !== id));
                console.log('Notification deleted:', id);
            } catch (err) {
                console.error('Error deleting notification:', err);
            }
        }
    };



    // Styles
    const containerStyle = {
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#f5f7fa',
    };

    const mainContentStyle = {
        flex: '1',
        padding: '2rem',
        fontFamily: "'Inter', sans-serif",
        maxWidth: 'calc(100% - 250px)',
    };

    const headerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
    };

    const titleStyle = {
        fontSize: '2rem',
        fontWeight: '700',
        color: '#1a1a1a',
        margin: '0',
    };

    const buttonGroupStyle = {
        display: 'flex',
        gap: '1rem',
    };

    

    

    const searchContainerStyle = {
        marginBottom: '1.5rem',
        display: 'flex',
        gap: '1rem',
    };

    const searchInputStyle = {
        flex: '1',
        padding: '0.875rem 1rem',
        border: '1px solid #e9ecef',
        borderRadius: '8px',
        fontSize: '1rem',
        transition: 'all 0.2s ease',
        backgroundColor: '#f8f9fa',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
    };

    const tableStyle = {
        width: '100%',
        borderCollapse: 'separate',
        borderSpacing: '0',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    };

    const thStyle = {
        backgroundColor: '#f8f9fa',
        color: '#6c757d',
        padding: '1rem',
        textAlign: 'left',
        fontWeight: '600',
        fontSize: '0.875rem',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        borderBottom: '1px solid #e9ecef',
    };

    const tdStyle = {
        padding: '1rem',
        textAlign: 'left',
        borderBottom: '1px solid #e9ecef',
        backgroundColor: 'white',
        transition: 'background-color 0.2s ease',
    };

    const buttonStyle = {
        padding: '0.5rem 1rem',
        marginRight: '0.5rem',
        cursor: 'pointer',
        border: 'none',
        borderRadius: '6px',
        backgroundColor: '#f8f9fa',
        color: '#3a86ff',
        fontWeight: '500',
        fontSize: '0.875rem',
        transition: 'all 0.2s ease',
    };

    const deleteButtonStyle = {
        backgroundColor: '#fff5f5',
        color: '#ff6b6b',
    };

    const emailButtonStyle = {
        backgroundColor: '#28a745',
        color: 'white',
    };

    const noResultsStyle = {
        padding: '2rem',
        textAlign: 'center',
        color: '#6c757d',
        backgroundColor: 'white',
    };

    const sidebarStyle = {
        width: '250px',
        backgroundColor: '#2c3e50',
        color: 'white',
        padding: '20px 0',
        minHeight: '100vh',
        background: 'linear-gradient(45deg, hsl(130, 100%, 37%) 0%, #99ff00 100%)',
        position: 'sticky',
        top: '0',
    };

    const sidebarHeaderStyle = {
        textAlign: 'center',
        padding: '20px 0',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
    };

    const navLinkStyle = {
        display: 'block',
        padding: '15px 20px',
        color: 'white',
        textDecoration: 'none',
        borderLeft: '4px solid transparent',
        transition: 'all 0.2s ease',
    };

    const activeNavLinkStyle = {
        ...navLinkStyle,
        backgroundColor: 'rgba(255, 255, 255, 0.28)'
    };

    return (
        <div style={containerStyle}>
            {/* Sidebar */}
            <aside style={sidebarStyle}>
                <div style={sidebarHeaderStyle}>
                    <i className="fas fa-cogs" style={{ fontSize: '40px', marginBottom: '10px' }}></i>
                    <h1 style={{ margin: '5px 0', fontSize: '35px' }}>Equipment</h1>
                    <h2 style={{ margin: '5px 0', fontSize: '25px', fontWeight: 'normal' }}>Dashboard</h2>
                </div>
                <nav style={{ marginTop: '20px' }}>
                    <a href="#" style={navLinkStyle} onClick={(e) => { e.preventDefault(); navigate('/EquipmentDashboard'); }}>
                        <i className="fas fa-users" style={{ marginRight: '10px' }}></i>
                        <span>Equipment Details</span>
                    </a>
                    <a href="#" style={navLinkStyle} onClick={(e) => { e.preventDefault(); navigate('/MaintenanceSchedule'); }}>
                        <i className="fas fa-wallet" style={{ marginRight: '10px' }}></i>
                        <span>Maintenance Schedule</span>
                    </a>
                    <a href="#" style={navLinkStyle} onClick={(e) => { e.preventDefault(); navigate('/IssueDetails'); }}>
                        <i className="fas fa-truck" style={{ marginRight: '10px' }}></i>
                        <span>Failure Details</span>
                    </a>
                    <a href="#" style={activeNavLinkStyle} onClick={(e) => { e.preventDefault(); navigate('/EqmNotification'); }}>
                        <i className="fas fa-bell" style={{ marginRight: '10px' }}></i>
                        <span>Notifications</span>
                    </a>
                    <a href="#" style={navLinkStyle}>
                        <i className="fas fa-boxes" style={{ marginRight: '10px' }}></i>
                        <span>Settings</span>
                    </a>
                    <a href="#" style={navLinkStyle}>
                        <i className="fas fa-tools" style={{ marginRight: '10px' }}></i>
                        <span>Log Out</span>
                    </a>
                </nav>
            </aside>

            {/* Main Content */}
            <div style={mainContentStyle}>
                <div style={headerStyle}>
                    <h2 style={titleStyle}>Notification</h2>
                    <div style={buttonGroupStyle}>
                       
                        
                    </div>
                </div>
                
                <div style={searchContainerStyle}>
                    <input
                        type="text"
                        placeholder="Search notifications..."
                        style={searchInputStyle}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                
                <div id="report-table">
                    <table style={tableStyle}>
                        <thead>
                            <tr>
                                <th style={thStyle}>#</th>
                                <th style={thStyle}>Title</th>
                                <th style={thStyle}>Message</th>
                                <th style={thStyle}>Type</th>
                                <th style={thStyle}>Date</th>
                                <th style={thStyle}>Status</th>
                                <th style={thStyle}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="7" style={noResultsStyle}>Loading notifications...</td>
                                </tr>
                            ) : filteredNotifications.length > 0 ? (
                                filteredNotifications.map((notification, index) => (
                                    <tr key={notification._id} style={{ ':hover': { backgroundColor: '#f8f9fa' } }}>
                                        <td style={tdStyle}>{index + 1}</td>
                                        <td style={{ ...tdStyle, fontWeight: '500' }}>{notification.title}</td>
                                        <td style={tdStyle}>{notification.message}</td>
                                        <td style={tdStyle}>{notification.type}</td>
                                        <td style={tdStyle}>{new Date(notification.date).toLocaleDateString()}</td>
                                        <td style={{
                                            ...tdStyle,
                                            color: notification.status === 'unread' ? '#ff922b' :
                                                notification.status === 'read' ? '#51cf66' : '#ff6b6b',
                                            fontWeight: '500'
                                        }}>
                                            {notification.status}
                                        </td>
                                        <td style={tdStyle}>
                                            <button
                                                style={{ ...buttonStyle, ...deleteButtonStyle }}
                                                onClick={() => handleDelete(notification._id)}
                                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ffe3e3'}
                                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff5f5'}
                                            >
                                                Delete
                                            </button>
                                            <button
                                                style={{ ...buttonStyle, ...emailButtonStyle }}
                                                onClick={() => {
                                                    const body = `
Title: ${notification.title}
Message: ${notification.message}
Type: ${notification.type}
Date: ${new Date(notification.date).toLocaleDateString()}
Status: ${notification.status}
                                                    `.trim();
                                                    const subject = `Notification - ${notification.title}`;
                                                    const gmailUrl = `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}&tf=1`;
                                                    window.open(gmailUrl, '_blank');
                                                }}
                                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#218838'}
                                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#28a745'}
                                            >
                                                Email
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" style={noResultsStyle}>
                                        {searchTerm ? 'No notifications match your search.' : 'No notifications found.'}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default EqmNotification;