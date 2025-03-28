import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import axios from 'axios';

const MaintenanceSchedule = () => {
    const navigate = useNavigate();
    const [maintenanceList, setMaintenanceList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch all maintenance records
    useEffect(() => {
        const fetchMaintenance = async () => {
            try {
                const response = await axios.get('http://localhost:8070/maintenances');
                setMaintenanceList(response.data.maintenance);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching maintenance:', err);
                setLoading(false);
            }
        };
        fetchMaintenance();
    }, []);

    // Filter maintenance records based on search term
    const filteredMaintenance = maintenanceList.filter(maintenance => 
        maintenance.eqm_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        maintenance.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        maintenance.technician.toLowerCase().includes(searchTerm.toLowerCase()) ||
        maintenance.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle delete operation
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this maintenance record?')) {
            try {
                await axios.delete(`http://localhost:8070/maintenances/deleteMaintenance/${id}`);
                setMaintenanceList(maintenanceList.filter(item => item._id !== id));
                console.log('Maintenance record deleted:', id);
            } catch (err) {
                console.error('Error deleting maintenance:', err);
            }
        }
    };

    // Handle edit navigation
    const handleEdit = (id) => {
        navigate(`/updateMaintenance/${id}`);
    };

    // Generate PDF Report
    const generateReport = () => {
        const input = document.getElementById('report-table');
        
        html2canvas(input, {
            scale: 2,
            logging: false,
            useCORS: true,
        }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 210;
            const pageHeight = 295;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save('maintenance-report.pdf');
        });
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

    const addButtonStyle = {
        backgroundColor: '#3a86ff',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        padding: '0.75rem 1.5rem',
        fontSize: '1rem',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        boxShadow: '0 2px 8px rgba(58, 134, 255, 0.3)',
        transition: 'all 0.2s ease',
    };

    const reportButtonStyle = {
        backgroundColor: '#6c757d',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        padding: '0.75rem 1.5rem',
        fontSize: '1rem',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        boxShadow: '0 2px 8px rgba(108, 117, 125, 0.3)',
        transition: 'all 0.2s ease',
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
                    <a href="#" style={activeNavLinkStyle} onClick={(e) => { e.preventDefault(); navigate('/MaintenanceSchedule'); }}>
                        <i className="fas fa-wallet" style={{ marginRight: '10px' }}></i>
                        <span>Maintenance Schedule</span>
                    </a>
                    <a href="#" style={navLinkStyle} onClick={(e) => { e.preventDefault(); navigate('/IssueDetails'); }}>
                        <i className="fas fa-truck" style={{ marginRight: '10px' }}></i>
                        <span>Issue Details</span>
                    </a>
                    <a href="#" style={navLinkStyle} onClick={(e) => { e.preventDefault(); navigate('/NotificationDashboard'); }}>
                        <i className="fas fa-wallet" style={{ marginRight: '10px' }}></i>
                        <span>Notification</span>
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
                    <h2 style={titleStyle}>Maintenance Schedule</h2>
                    <div style={buttonGroupStyle}>
                        <button 
                            style={addButtonStyle}
                            onClick={() => navigate('/AddMaintenance')}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2671e0'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3a86ff'}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                            Add Maintenance
                        </button>
                        <button 
                            style={reportButtonStyle}
                            onClick={generateReport}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#5a6268'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#6c757d'}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 17V7M9 7L5 11M9 7L13 11M15 7V17M15 17L19 13M15 17L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Generate Report
                        </button>
                    </div>
                </div>
                
                <div style={searchContainerStyle}>
                    <input
                        type="text"
                        placeholder="Search maintenance records..."
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
                                <th style={thStyle}>Equipment Name</th>
                                <th style={thStyle}>Description</th>
                                <th style={thStyle}>Last Maintenance</th>
                                <th style={thStyle}>Next Maintenance</th>
                                <th style={thStyle}>Technician</th>
                                <th style={thStyle}>Status</th>
                                <th style={thStyle}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="8" style={noResultsStyle}>Loading maintenance records...</td>
                                </tr>
                            ) : filteredMaintenance.length > 0 ? (
                                filteredMaintenance.map((item, index) => (
                                    <tr key={item._id} style={{ ':hover': { backgroundColor: '#f8f9fa' } }}>
                                        <td style={tdStyle}>{index + 1}</td>
                                        <td style={{ ...tdStyle, fontWeight: '500' }}>{item.eqm_name}</td>
                                        <td style={tdStyle}>{item.description || 'N/A'}</td>
                                        <td style={tdStyle}>{item.last_maintenance_date || 'N/A'}</td>
                                        <td style={tdStyle}>{item.next_maintenance_date || 'N/A'}</td>
                                        <td style={tdStyle}>{item.technician || 'N/A'}</td>
                                        <td style={{
                                            ...tdStyle,
                                            color: item.status === 'pending' ? '#ff922b' :
                                                item.status === 'completed' ? '#51cf66' : '#ff6b6b',
                                            fontWeight: '500'
                                        }}>
                                            {item.status}
                                        </td>
                                        <td style={tdStyle}>
                                            <button 
                                                style={buttonStyle}
                                                onClick={() => handleEdit(item._id)}
                                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e9ecef'}
                                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                style={{ ...buttonStyle, ...deleteButtonStyle }}
                                                onClick={() => handleDelete(item._id)}
                                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ffe3e3'}
                                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff5f5'}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" style={noResultsStyle}>
                                        {searchTerm ? 'No maintenance records match your search.' : 'No maintenance records found.'}
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

export default MaintenanceSchedule;