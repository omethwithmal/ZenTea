import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import navigate from react-router-dom

const QRAttendance = () => {
    const navigate = useNavigate(); 
    
    const [attendanceData, setAttendanceData] = useState([
        { id: 1, name: "John Doe", eId: "E001", date: "2023-10-01", inTime: "09:00 AM", outTime: "05:00 PM", department: "HR" },
        { id: 2, name: "Jane Smith", eId: "E002", date: "2023-10-01", inTime: "09:15 AM", outTime: "04:45 PM",  department: "IT" },
        { id: 3, name: "Sam Wilson", eId: "E003", date: "2023-10-01", inTime: "08:45 AM", outTime: "06:00 PM",  department: "Finance" },
    ]);
    const [searchTerm, setSearchTerm] = useState("");

    const handleDelete = (id) => {
        setAttendanceData(attendanceData.filter((item) => item.id !== id));
    };

    const handleUpdate = (id) => {
        alert(`Update functionality for ID: ${id}`);
    };

    const generateCSV = () => {
        const csvRows = [];
        const headers = ["Name", "E ID", "Date", "In Time", "Out Time", "Department"];
        csvRows.push(headers.join(","));
        attendanceData.forEach((row) => {
            const values = [
                row.name,
                row.eId,
                row.date,
                row.inTime,
                row.outTime,
               
                row.department,
                
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
    };

    const filteredData = attendanceData.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{
            display: 'flex',
            fontFamily: 'Arial, sans-serif',
            backgroundColor: 'white',
            minHeight: '100vh',
            width:'1520px',
            
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
                    <a href="#" style={{
                        display: 'block',
                        padding: '15px 20px',
                        color: 'white',
                        textDecoration: 'none',
                        borderLeft: '4px solid transparent',
                       
                    }}
                    onClick={() => navigate('/EmployeeDashboard')}
                    >
                        <i className="fas fa-users" style={{ marginRight: '10px' }}></i>
                        <span>Employee Task</span>
                    </a>
                    <a href="#" style={{
                        display: 'block',
                        padding: '15px 20px',
                        color: 'white',
                        textDecoration: 'none',
                        borderLeft: '4px solid transparent'
                    }}
                    onClick={() => navigate('/NotificationDashboard')}
                    >
                        <i className="fas fa-wallet" style={{ marginRight: '10px' }}></i>
                        <span>Notification</span>
                    </a>

                    <a href="#" style={{
                        display: 'block',
                        padding: '15px 20px',
                        color: 'white',
                        textDecoration: 'none',
                        borderLeft: '4px solid transparent',
                       
                    }}
                    onClick={() => navigate('/AttendanceRecordCard')}
                    >
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
                    }}
                    onClick={() => navigate('/AttendanceDashboard')}
                    >
                        
                        

                        <i className="fas fa-truck" style={{ marginRight: '10px' }}></i>
                        <span>Employee Attendance</span>
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
                        onClick={() => navigate('/EmployeeDetailsCart')}
                    >
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
                overflowY: 'auto'
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
                        placeholder="Search Employee..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                            width: '300px',
                            fontSize: '14px',
                            backgroundColor:'white',
                            color:'black'
                        }}
                    />
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


                   

                </div>

                <table style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    backgroundColor: '#fff',
                    boxShadow: '0 2px 5px rgb(255, 255, 255)',
                    borderRadius: '5px',
                    overflow: 'hidden'
                }}>
                    <thead style={{
                        background: 'linear-gradient(45deg, hsl(130, 100%, 37%) 0%, #99ff00 100%)',
                        color: 'white'
                    }}>
                        <tr>
                            <th style={{ padding: '10px', textAlign: 'left' }}>Name</th>
                            <th style={{ padding: '10px', textAlign: 'left' }}>E ID</th>
                            <th style={{ padding: '10px', textAlign: 'left' }}>Date</th>
                            <th style={{ padding: '10px', textAlign: 'left' }}>In Time</th>
                            <th style={{ padding: '10px', textAlign: 'left' }}>Out Time</th>
                            
                            <th style={{ padding: '10px', textAlign: 'left' }}>Department</th>
                            
                            <th style={{ padding: '10px', textAlign: 'left' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item) => (
                            <tr key={item.id} style={{
                                borderBottom: '1px solid #eee'
                            }}>
                                <td style={{ padding: '10px' }}>{item.name}</td>
                                <td style={{ padding: '10px' }}>{item.eId}</td>
                                <td style={{ padding: '10px' }}>{item.date}</td>
                                <td style={{ padding: '10px' }}>{item.inTime}</td>
                                <td style={{ padding: '10px' }}>{item.outTime}</td>
                                
                                <td style={{ padding: '10px' }}>{item.department}</td>
                                
                                <td style={{ padding: '10px' }}>
                                    <button
                                        onClick={() => handleUpdate(item.id)}
                                        style={{
                                            padding: '5px 10px',
                                            backgroundColor: 'white',
                                            color: '#00ff0c',
                                            border: 'none',
                                            borderRadius: '3px',
                                            cursor: 'pointer',
                                            marginRight: '5px'
                                        }}
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        style={{
                                            padding: '5px 10px',
                                            backgroundColor: 'white',
                                            color: 'red',
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
            </main>
        </div>
    );
};

export default QRAttendance;