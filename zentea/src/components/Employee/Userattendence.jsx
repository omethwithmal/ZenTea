import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Userattendence.css';
import axios from 'axios';

const AttendanceForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        employeeID: '',
        date: '',
        inTime: '',
        outTime: '',
        department: ''
    });

    const [submissionStatus, setSubmissionStatus] = useState({
        success: false,
        message: ''
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // Format the data to match backend expectations
            const submissionData = {
                fullName: formData.name,
                employeeID: formData.id,
                date: formData.date,
                inTime: formData['in-time'],
                outTime: formData['out-time'],
                department: formData.department
            };

            const response = await axios.post('http://localhost:8070/attendance/add', submissionData);
            
            setSubmissionStatus({
                success: true,
                message: 'Attendance record submitted successfully!'
            });

            // Reset form after successful submission
            setFormData({
                fullName: '',
                employeeID: '',
                date: '',
                inTime: '',
                outTime: '',
                department: ''
            });

        } catch (error) {
            console.error('Error submitting attendance:', error);
            setSubmissionStatus({
                success: false,
                message: error.response?.data?.message || 'Failed to submit attendance. Please try again.'
            });
        }
    };

    return (
        <div style={{ display: 'flex' }}>
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
                    }}>
                        <i className="fas fa-truck" style={{ marginRight: '10px' }}></i>
                        <span>Employee Attendance</span>
                    </a>

                    <a href="#"
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
            <div className='IT22090508-userAttendence-form-container-body' style={{ flex: 1 }}>
                <div className="IT22090508-userAttendence-form-container">
                    <div className="IT22090508-userAttendence-form-header">
                        <h2>Attendance Record</h2>
                    </div>
                    
                    <div className="IT22090508-userAttendence-form-body">
                        {submissionStatus.message && (
                            <div className={`IT22090508-userAttendence-alert ${submissionStatus.success ? 'success' : 'error'}`}>
                                {submissionStatus.message}
                            </div>
                        )}
                        
                        <form onSubmit={handleSubmit}>
                            <div className="IT22090508-userAttendence-form-group">
                                <label htmlFor="name">Full Name</label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    placeholder="Enter your name" 
                                    required 
                                    className="IT22090508-userAttendence-form-input"
                                    value={formData.name || ''}
                                    onChange={handleChange}
                                />
                            </div>
                            
                            <div className="IT22090508-userAttendence-form-group">
                                <label htmlFor="id">Employee ID</label>
                                <input 
                                    type="text" 
                                    id="id" 
                                    placeholder="e.g. EMP-1234" 
                                    required 
                                    className="IT22090508-userAttendence-form-input"
                                    value={formData.id || ''}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="IT22090508-userAttendence-form-group">
                                <label htmlFor="date">Date</label>
                                <input 
                                    type="date" 
                                    id="date" 
                                    required 
                                    className="IT22090508-userAttendence-form-input"
                                    value={formData.date || ''}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="IT22090508-userAttendence-time-row">
                                <div className="IT22090508-userAttendence-form-group">
                                    <label htmlFor="in-time">In Time</label>
                                    <input 
                                        type="time" 
                                        id="in-time" 
                                        required 
                                        className="IT22090508-userAttendence-form-input"
                                        value={formData['in-time'] || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="IT22090508-userAttendence-form-group">
                                    <label htmlFor="out-time">Out Time</label>
                                    <input 
                                        type="time" 
                                        id="out-time" 
                                        required 
                                        className="IT22090508-userAttendence-form-input"
                                        value={formData['out-time'] || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="IT22090508-userAttendence-form-group">
                                <label htmlFor="department">Department</label>
                                <select 
                                    id="department" 
                                    className="IT22090508-userAttendence-department-select" 
                                    required
                                    value={formData.department || ''}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Department</option>
                                    <option value="Human Resources (HR)">Human Resources (HR)</option>
                                    <option value="Sales & Marketing">Sales & Marketing</option>
                                    <option value="Maintenance Department">Maintenance Department</option>
                                    <option value="Quality Control Department">Quality Control Department</option>
                                    <option value="Production Department">Production Department</option>
                                </select>
                            </div>

                            <button 
                                type="submit" 
                                className="IT22090508-userAttendence-submit-btn"
                            >
                                Submit Attendance
                            </button>
                        </form>
                    </div>
                    
                    <div className="IT22090508-userAttendence-form-footer">
                        &copy; Experience the art of tea with Zen Tea. Handcrafted blends, sourced sustainably, and brewed with love.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AttendanceForm;