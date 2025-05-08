import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AttendanceDashboard = () => {
    const [attendanceData, setAttendanceData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [formData, setFormData] = useState({
        fullName: '',
        employeeID: '',
        date: '',
        inTime: '',
        outTime: '',
        department: ''
    });

    // Fetch attendance data
    useEffect(() => {
        const fetchAttendanceData = async () => {
            try {
                const response = await axios.get('http://localhost:8070/attendance/display');
                setAttendanceData(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
                console.error('Error fetching attendance data:', err);
            }
        };
        fetchAttendanceData();
    }, []);

    // Handle delete
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8070/attendance/delete/${id}`);
            setAttendanceData(attendanceData.filter((item) => item._id !== id));
            alert('Record deleted successfully');
        } catch (err) {
            console.error('Error deleting attendance record:', err);
            alert('Failed to delete record: ' + err.message);
        }
    };

    // Open update modal
    const handleUpdate = (record) => {
        setSelectedRecord(record);
        setFormData({
            fullName: record.fullName,
            employeeID: record.employeeID,
            date: new Date(record.date).toISOString().split('T')[0],
            inTime: record.inTime,
            outTime: record.outTime,
            department: record.department
        });
        setShowModal(true);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `http://localhost:8070/attendance/update/${selectedRecord._id}`,
                formData
            );
            setAttendanceData(attendanceData.map((item) =>
                item._id === selectedRecord._id ? response.data : item
            ));
            setShowModal(false);
            alert('Record updated successfully');
        } catch (err) {
            console.error('Error updating attendance record:', err);
            alert('Failed to update record: ' + err.message);
        }
    };

    // Generate CSV
    const generateCSV = () => {
        const csvRows = [];
        const headers = ["Name", "Employee ID", "Date", "In Time", "Out Time", "Department"];
        csvRows.push(headers.join(","));
        
        attendanceData.forEach((row) => {
            const values = [
                row.fullName,
                row.employeeID,
                new Date(row.date).toLocaleDateString(),
                row.inTime,
                row.outTime,
                row.department
            ];
            csvRows.push(values.join(","));
        });
        
        const csvString = csvRows.join("\n");
        const blob = new Blob([csvString], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.setAttribute("hidden", "");
        a.setAttribute("href", url);
        a.setAttribute("download", "attendance.csv");
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const filteredData = attendanceData.filter((item) =>
        item.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.employeeID.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                background: 'linear-gradient(45deg, hsl(130, 100%, 37%) 0%, #99ff00 100%)'
            }}>
                <div style={{
                    padding: '20px',
                    backgroundColor: 'white',
                    borderRadius: '5px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                }}>
                    Loading attendance data...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                background: 'linear-gradient(45deg, hsl(130, 100%, 37%) 0%, #99ff00 100%)'
            }}>
                <div style={{
                    padding: '20px',
                    backgroundColor: 'white',
                    borderRadius: '5px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    color: 'red'
                }}>
                    Error: {error}
                </div>
            </div>
        );
    }

    return (
        <div style={{
            display: 'flex',
            fontFamily: 'Arial, sans-serif',
            backgroundColor: 'white',
            minHeight: '100vh'
        }}>
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
                    <h1 style={{ margin: '5px 0', fontSize: '35px' }}>Employee</h1>
                    <h2 style={{ margin: '5px 0', fontSize: '25px', fontWeight: 'normal' }}>Dashboard</h2>
                </div>
                <nav style={{ marginTop: '20px' }}>
                    <a href="/EmployeeDashboard" style={{
                        display: 'block',
                        padding: '15px 20px',
                        color: 'white',
                        textDecoration: 'none',
                        borderLeft: '4px solid transparent'
                    }}>
                        <i className="fas fa-users" style={{ marginRight: '10px' }}></i>
                        <span>Employee Task</span>
                    </a>
                    <a href="/NotificationDashboard" style={{
                        display: 'block',
                        padding: '15px 20px',
                        color: 'white',
                        textDecoration: 'none',
                        borderLeft: '4px solid transparent'
                    }}>
                        <i className="fas fa-wallet" style={{ marginRight: '10px' }}></i>
                        <span>Notification</span>
                    </a>
                    <a href="/AttendanceRecordCard" style={{
                        display: 'block',
                        padding: '15px 20px',
                        color: 'white',
                        textDecoration: 'none',
                        borderLeft: '4px solid transparent'
                    }}>
                        <i className="fas fa-truck" style={{ marginRight: '10px' }}></i>
                        <span>Mark Attendance</span>
                    </a>
                    <a href="#" style={{
                        display: 'block',
                        padding: '15px 20px',
                        color: 'white',
                        textDecoration: 'none',
                        borderLeft: '4px solid transparent',
                        backgroundColor: 'rgba(255, 255, 255, 0.28)'
                    }}>
                        <i className="fas fa-truck" style={{ marginRight: '10px' }}></i>
                        <span>Employee Attendance</span>
                    </a>
                    <a href="/EmployeeDetailsCart" style={{
                        display: 'block',
                        padding: '15px 20px',
                        color: 'white',
                        textDecoration: 'none',
                        borderLeft: '4px solid transparent'
                    }}>
                        <i className="fas fa-truck" style={{ marginRight: '10px' }}></i>
                        <span>Employee details</span>
                    </a>
                    <a href="#" style={{
                        display: 'block',
                        padding: '15px 20px',
                        color: 'white',
                        textDecoration: 'none',
                        borderLeft: '4px solid transparent'
                    }}>
                        <i className="fas fa-boxes" style={{ marginRight: '10px' }}></i>
                        <span>Settings</span>
                    </a>
                    <a href="#" style={{
                        display: 'block',
                        padding: '15px 20px',
                        color: 'white',
                        textDecoration: 'none',
                        borderLeft: '4px solid transparent'
                    }}>
                        <i className="fas fa-tools" style={{ marginRight: '10px' }}></i>
                        <span>Log Out</span>
                    </a>
                </nav>
            </aside>

            {/* Main Content */}
            <main style={{
                flex: 1,
                padding: '20px',
                overflowY: 'auto',
                width:'1280px'
            }}>
                <h1 style={{
                    fontSize: '40px',
                    fontWeight: 'bold',
                    marginBottom: '50px',
                    color: '#333'
                }}>Attendance Dashboard</h1>

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '50px'
                }}>
                    <input
                        type="text"
                        placeholder="Search by name or employee ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                            width: '300px',
                            fontSize: '14px',
                            backgroundColor: 'white',
                            color: 'black'
                        }}
                    />
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                            onClick={generateCSV}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#2c3e50',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                background: 'linear-gradient(45deg, hsl(130, 100%, 37%) 0%, #99ff00 100%)'
                            }}
                        >
                            Generate CSV
                        </button>
                        <button
                            onClick={() => window.location.href = '/GoogleSheetTable'}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#2c3e50',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                background: 'linear-gradient(45deg, hsl(130, 100%, 37%) 0%, #99ff00 100%)'
                            }}
                        >
                            View Scan ID Attendance
                        </button>
                    </div>
                </div>

                {/* Update Modal */}
                {showModal && (
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
                            width: '400px',
                            maxWidth: '90%'
                        }}>
                            <h2 style={{ marginBottom: '20px' }}>Update Attendance</h2>
                            <form onSubmit={handleSubmit}>
                                <div style={{ marginBottom: '15px' }}>
                                    <label style={{ display: 'block', marginBottom: '5px' }}>Full Name</label>
                                    <input
                                        type="text"
                                        value={formData.fullName}
                                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                        style={{ 
                                            width: '100%', 
                                            padding: '8px', 
                                            border: '1px solid #ccc', 
                                            borderRadius: '3px',
                                            backgroundColor: '#ffffff',
                                            color: '#000000'
                                        }}
                                    />
                                </div>
                                <div style={{ marginBottom: '15px' }}>
                                    <label style={{ display: 'block', marginBottom: '5px' }}>Employee ID</label>
                                    <input
                                        type="text"
                                        value={formData.employeeID}
                                        onChange={(e) => setFormData({ ...formData, employeeID: e.target.value })}
                                        style={{ 
                                            width: '100%', 
                                            padding: '8px', 
                                            border: '1px solid #ccc', 
                                            borderRadius: '3px',
                                            backgroundColor: '#ffffff',
                                            color: '#000000'
                                        }}
                                    />
                                </div>
                                <div style={{ marginBottom: '15px' }}>
                                    <label style={{ display: 'block', marginBottom: '5px' }}>Date</label>
                                    <input
                                        type="date"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        style={{ 
                                            width: '100%', 
                                            padding: '8px', 
                                            border: '1px solid #ccc', 
                                            borderRadius: '3px',
                                            backgroundColor: '#ffffff',
                                            color: '#000000'
                                        }}
                                    />
                                </div>
                                <div style={{ marginBottom: '15px' }}>
                                    <label style={{ display: 'block', marginBottom: '5px' }}>In Time</label>
                                    <input
                                        type="text"
                                        value={formData.inTime}
                                        onChange={(e) => setFormData({ ...formData, inTime: e.target.value })}
                                        style={{ 
                                            width: '100%', 
                                            padding: '8px', 
                                            border: '1px solid #ccc', 
                                            borderRadius: '3px',
                                            backgroundColor: '#ffffff',
                                            color: '#000000'
                                        }}
                                    />
                                </div>
                                <div style={{ marginBottom: '15px' }}>
                                    <label style={{ display: 'block', marginBottom: '5px' }}>Out Time</label>
                                    <input
                                        type="text"
                                        value={formData.outTime}
                                        onChange={(e) => setFormData({ ...formData, outTime: e.target.value })}
                                        style={{ 
                                            width: '100%', 
                                            padding: '8px', 
                                            border: '1px solid #ccc', 
                                            borderRadius: '3px',
                                            backgroundColor: '#ffffff',
                                            color: '#000000'
                                        }}
                                    />
                                </div>
                                <div style={{ marginBottom: '15px' }}>
                                    <label style={{ display: 'block', marginBottom: '5px' }}>Department</label>
                                    <input
                                        type="text"
                                        value={formData.department}
                                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                        style={{ 
                                            width: '100%', 
                                            padding: '8px', 
                                            border: '1px solid #ccc', 
                                            borderRadius: '3px',
                                            backgroundColor: '#ffffff',
                                            color: '#000000'
                                        }}
                                    />
                                </div>
                                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        style={{
                                            padding: '8px 15px',
                                            backgroundColor: '#6c757d',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '3px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        style={{
                                            padding: '8px 15px',
                                            backgroundColor: '#28a745',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '3px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Update
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {filteredData.length === 0 ? (
                    <div style={{
                        padding: '20px',
                        backgroundColor: '#f8f9fa',
                        borderRadius: '5px',
                        textAlign: 'center',
                        color: '#6c757d'
                    }}>
                        No attendance records found
                    </div>
                ) : (
                    <table style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                        backgroundColor: '#fff',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                        borderRadius: '5px',
                        overflow: 'hidden'
                    }}>
                        <thead style={{
                            background: 'linear-gradient(45deg, hsl(130, 100%, 37%) 0%, #99ff00 100%)',
                            color: 'white'
                        }}>
                            <tr>
                                <th style={{ padding: '15px', textAlign: 'left' }}>Name</th>
                                <th style={{ padding: '15px', textAlign: 'left' }}>Employee ID</th>
                                <th style={{ padding: '15px', textAlign: 'left' }}>Date</th>
                                <th style={{ padding: '15px', textAlign: 'left' }}>In Time</th>
                                <th style={{ padding: '15px', textAlign: 'left' }}>Out Time</th>
                                <th style={{ padding: '15px', textAlign: 'left' }}>Department</th>
                                <th style={{ padding: '15px', textAlign: 'left' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((item) => (
                                <tr key={item._id} style={{
                                    borderBottom: '1px solid #eee'
                                }}>
                                    <td style={{ padding: '15px' }}>{item.fullName}</td>
                                    <td style={{ padding: '15px' }}>{item.employeeID}</td>
                                    <td style={{ padding: '15px' }}>{new Date(item.date).toLocaleDateString()}</td>
                                    <td style={{ padding: '15px' }}>{item.inTime}</td>
                                    <td style={{ padding: '15px' }}>{item.outTime}</td>
                                    <td style={{ padding: '15px' }}>{item.department}</td>
                                    <td style={{ padding: '15px' }}>
                                        <button
                                            onClick={() => handleUpdate(item)}
                                            style={{
                                                padding: '8px 15px',
                                                backgroundColor: '#28a745',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '3px',
                                                cursor: 'pointer',
                                                marginRight: '10px'
                                            }}
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item._id)}
                                            style={{
                                                padding: '8px 15px',
                                                backgroundColor: '#dc3545',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '3px',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </main>
        </div>
    );
};

export default AttendanceDashboard;