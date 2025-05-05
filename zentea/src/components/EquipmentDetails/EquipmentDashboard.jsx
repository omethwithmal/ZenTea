import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const EquipmentDashboard = () => {
    const [equipments, setEquipments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [editFormData, setEditFormData] = useState({
        serial_number: '',
        eqm_name: '',
        type: '',
        purchase_date: '',
        last_maintenance_date: '',
        next_maintenance_date: '',
        warrenty_information: '',
        description: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        fetchEquipments();
    }, []);

    const fetchEquipments = async () => {
        try {
            const response = await axios.get('http://localhost:5000/equipments');
            if (response.data?.equipments) {
                setEquipments(response.data.equipments);
            } else {
                setError("No equipment data found");
            }
        } catch (error) {
            console.error("Fetch error:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const filteredEquipments = equipments.filter(equipment => 
        equipment.serial_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        equipment.eqm_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        equipment.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (equipment.warrenty_information && equipment.warrenty_information.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (equipment.description && equipment.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleAddClick = () => {
        setIsAdding(true);
        setEditFormData({
            serial_number: '',
            eqm_name: '',
            type: '',
            purchase_date: '',
            last_maintenance_date: '',
            next_maintenance_date: '',
            warrenty_information: '',
            description: ''
        });
    };

    const handleEditClick = (equipment) => {
        setEditingId(equipment._id);
        setIsAdding(false);
        setEditFormData({
            serial_number: equipment.serial_number,
            eqm_name: equipment.eqm_name,
            type: equipment.type,
            purchase_date: equipment.purchase_date ? equipment.purchase_date.split('T')[0] : '',
            last_maintenance_date: equipment.last_maintenance_date ? equipment.last_maintenance_date.split('T')[0] : '',
            next_maintenance_date: equipment.next_maintenance_date ? equipment.next_maintenance_date.split('T')[0] : '',
            warrenty_information: equipment.warrenty_information,
            description: equipment.description
        });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isAdding) {
                await axios.post('http://localhost:5000/equipments/addEquipment', editFormData);
            } else {
                await axios.put(
                    `http://localhost:5000/equipments/updateEquipment/${editingId}`,
                    editFormData
                );
            }
            setEditingId(null);
            setIsAdding(false);
            fetchEquipments();
        } catch (error) {
            console.error(isAdding ? "Add error:" : "Update error:", error);
            setError(isAdding ? "Failed to add equipment" : "Failed to update equipment");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this equipment?")) {
            try {
                await axios.delete(`http://localhost:5000/equipments/deleteEquipment/${id}`);
                fetchEquipments();
            } catch (error) {
                console.error("Delete error:", error);
                setError("Failed to delete equipment");
            }
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString();
        } catch {
            return dateString;
        }
    };

    const generateReport = () => {
        if (!equipments.length) return;

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

            pdf.save('equipment-report.pdf');
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

    if (loading) return <div style={{ padding: '20px', textAlign: 'center', fontSize: '18px' }}>Loading...</div>;
    if (error) return <div style={{ padding: '20px', textAlign: 'center', fontSize: '18px', color: '#dc3545' }}>Error: {error}</div>;

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
                    <a href="#" style={activeNavLinkStyle} onClick={(e) => { e.preventDefault(); navigate('/EquipmentDashboard'); }}>
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
                    <h2 style={titleStyle}>Equipment Management</h2>
                    <div style={buttonGroupStyle}>
                        <button 
                            onClick={handleAddClick}
                            style={addButtonStyle}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2671e0'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3a86ff'}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                            Add Equipment
                        </button>
                        <button 
                            onClick={generateReport}
                            style={reportButtonStyle}
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
                
                {/* Search Bar */}
                <div style={searchContainerStyle}>
                    <input
                        type="text"
                        placeholder="Search equipment..."
                        style={searchInputStyle}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div id="report-table">
                    <table style={tableStyle}>
                        <thead>
                            <tr>
                                <th style={thStyle}>Serial Number</th>
                                <th style={thStyle}>Equipment Name</th>
                                <th style={thStyle}>Type</th>
                                <th style={thStyle}>Purchase Date</th>
                                <th style={thStyle}>Last Maintenance</th>
                                <th style={thStyle}>Next Maintenance</th>
                                <th style={thStyle}>Warranty Info</th>
                                <th style={thStyle}>Description</th>
                                <th style={thStyle}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEquipments.length > 0 ? (
                                filteredEquipments.map(equipment => (
                                    <tr key={equipment._id} style={{ ':hover': { backgroundColor: '#f8f9fa' } }}>
                                        <td style={tdStyle}>{equipment.serial_number}</td>
                                        <td style={tdStyle}>{equipment.eqm_name}</td>
                                        <td style={tdStyle}>{equipment.type}</td>
                                        <td style={tdStyle}>{formatDate(equipment.purchase_date)}</td>
                                        <td style={tdStyle}>{formatDate(equipment.last_maintenance_date)}</td>
                                        <td style={tdStyle}>{formatDate(equipment.next_maintenance_date)}</td>
                                        <td style={tdStyle}>{equipment.warrenty_information}</td>
                                        <td style={tdStyle}>{equipment.description}</td>
                                        <td style={tdStyle}>
                                            <button 
                                                style={buttonStyle}
                                                onClick={() => handleEditClick(equipment)}
                                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e9ecef'}
                                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                style={{ ...buttonStyle, ...deleteButtonStyle }}
                                                onClick={() => handleDelete(equipment._id)}
                                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ffe3e3'}
                                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff5f5'}
                                            >
                                                Delete
                                            </button>
                                            <button
                                                style={{ ...buttonStyle, ...emailButtonStyle }}
                                                onClick={() => {
                                                    const body = `
Serial Number: ${equipment.serial_number}
Equipment Name: ${equipment.eqm_name}
Type: ${equipment.type}
Purchase Date: ${formatDate(equipment.purchase_date)}
Last Maintenance: ${formatDate(equipment.last_maintenance_date)}
Next Maintenance: ${formatDate(equipment.next_maintenance_date)}
Warranty Info: ${equipment.warrenty_information}
Description: ${equipment.description}
                                                    `.trim();
                                                    const subject = `Equipment Details - ${equipment.serial_number}`;
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
                                    <td colSpan="9" style={noResultsStyle}>
                                        {searchTerm ? 'No equipment matches your search.' : 'No equipment records found.'}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Add/Edit Modal */}
                {(editingId || isAdding) && (
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000
                    }}>
                        <div style={{
                            background: 'white',
                            padding: '20px',
                            borderRadius: '8px',
                            width: '80%',
                            maxWidth: '600px'
                        }}>
                            <h2 style={{ color: '#333', marginBottom: '20px' }}>{isAdding ? 'Add New Equipment' : 'Edit Equipment'}</h2>
                            <form onSubmit={handleSubmit}>
                                <div style={{ marginBottom: '15px' }}>
                                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Serial Number</label>
                                    <input
                                        type="text"
                                        name="serial_number"
                                        value={editFormData.serial_number}
                                        onChange={handleEditChange}
                                        required
                                        style={{ 
                                            width: '100%', 
                                            padding: '8px', 
                                            border: '1px solid #ddd', 
                                            borderRadius: '4px' 
                                        }}
                                    />
                                </div>
                                <div style={{ marginBottom: '15px' }}>
                                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Equipment Name</label>
                                    <input
                                        type="text"
                                        name="eqm_name"
                                        value={editFormData.eqm_name}
                                        onChange={handleEditChange}
                                        required
                                        style={{ 
                                            width: '100%', 
                                            padding: '8px', 
                                            border: '1px solid #ddd', 
                                            borderRadius: '4px' 
                                        }}
                                    />
                                </div>
                                <div style={{ marginBottom: '15px' }}>
                                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Type</label>
                                    <input
                                        type="text"
                                        name="type"
                                        value={editFormData.type}
                                        onChange={handleEditChange}
                                        required
                                        style={{ 
                                            width: '100%', 
                                            padding: '8px', 
                                            border: '1px solid #ddd', 
                                            borderRadius: '4px' 
                                        }}
                                    />
                                </div>
                                <div style={{ marginBottom: '15px' }}>
                                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Purchase Date</label>
                                    <input
                                        type="date"
                                        name="purchase_date"
                                        value={editFormData.purchase_date}
                                        onChange={handleEditChange}
                                        style={{ 
                                            width: '100%', 
                                            padding: '8px', 
                                            border: '1px solid #ddd', 
                                            borderRadius: '4px' 
                                        }}
                                    />
                                </div>
                                <div style={{ marginBottom: '15px' }}>
                                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Last Maintenance</label>
                                    <input
                                        type="date"
                                        name="last_maintenance_date"
                                        value={editFormData.last_maintenance_date}
                                        onChange={handleEditChange}
                                        style={{ 
                                            width: '100%', 
                                            padding: '8px', 
                                            border: '1px solid #ddd', 
                                            borderRadius: '4px' 
                                        }}
                                    />
                                </div>
                                <div style={{ marginBottom: '15px' }}>
                                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Next Maintenance</label>
                                    <input
                                        type="date"
                                        name="next_maintenance_date"
                                        value={editFormData.next_maintenance_date}
                                        onChange={handleEditChange}
                                        style={{ 
                                            width: '100%', 
                                            padding: '8px', 
                                            border: '1px solid #ddd', 
                                            borderRadius: '4px' 
                                        }}
                                    />
                                </div>
                                <div style={{ marginBottom: '15px' }}>
                                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Warranty Info</label>
                                    <input
                                        type="text"
                                        name="warrenty_information"
                                        value={editFormData.warrenty_information}
                                        onChange={handleEditChange}
                                        style={{ 
                                            width: '100%', 
                                            padding: '8px', 
                                            border: '1px solid #ddd', 
                                            borderRadius: '4px' 
                                        }}
                                    />
                                </div>
                                <div style={{ marginBottom: '15px' }}>
                                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Description</label>
                                    <textarea
                                        name="description"
                                        value={editFormData.description}
                                        onChange={handleEditChange}
                                        rows="3"
                                        style={{ 
                                            width: '100%', 
                                            padding: '8px', 
                                            border: '1px solid #ddd', 
                                            borderRadius: '4px' 
                                        }}
                                    />
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                                    <button
                                        type="button"
                                        onClick={() => { setEditingId(null); setIsAdding(false); }}
                                        style={{
                                            padding: '8px 16px',
                                            background: '#6c757d',
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
                                            background: '#28a745',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {isAdding ? 'Add Equipment' : 'Save Changes'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EquipmentDashboard;