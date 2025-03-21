import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './employeeprofile.css'; 
import img1 from '../../assets/employeeProfile.jpg';

const EmployeeProfile = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    return (
        <div className='IT22090508-employeeprofile-profile-body'>
            <div className="IT22090508-employeeprofile-profile-container">
                {/* Profile Header */}
                <div className="IT22090508-employeeprofile-profile-header">
                    <div className="IT22090508-employeeprofile-profile-image">
                        <img src={img1} alt="Profile" />
                        <button className="IT22090508-employeeprofile-edit-btn">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                            </svg>
                        </button>
                    </div>
                    <h1 className="IT22090508-employeeprofile-profile-name">John Doe</h1>
                    <div className="IT22090508-employeeprofile-profile-department">Software Development</div>
                </div>

                {/* Profile Details */}
                <div className="IT22090508-employeeprofile-profile-details">
                    <div className="IT22090508-employeeprofile-detail-card">
                        <div className="IT22090508-employeeprofile-detail-row">
                            <span className="IT22090508-employeeprofile-label">Company ID:</span>
                            <span className="IT22090508-employeeprofile-value">123-45-6789</span>
                        </div>

                        <div className="IT22090508-employeeprofile-detail-row">
                            <span className="IT22090508-employeeprofile-label">National ID:</span>
                            <span className="IT22090508-employeeprofile-value">123-45-6789</span>
                        </div>

                        <div className="IT22090508-employeeprofile-detail-row">
                            <span className="IT22090508-employeeprofile-label">Birthday:</span>
                            <span className="IT22090508-employeeprofile-value">January 15, 1990</span>
                        </div>

                        <div className="IT22090508-employeeprofile-detail-row">
                            <span className="IT22090508-employeeprofile-label">Email:</span>
                            <span className="IT22090508-employeeprofile-value">johndoe@company.com</span>
                        </div>

                        <div className="IT22090508-employeeprofile-detail-row">
                            <span className="IT22090508-employeeprofile-label">Contact:</span>
                            <span className="IT22090508-employeeprofile-value">071 44 02 107</span>
                        </div>

                        <div className="IT22090508-employeeprofile-detail-row">
                            <span className="IT22090508-employeeprofile-label">Address:</span>
                            <span className="IT22090508-employeeprofile-value">123 Main Street, Cityville</span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="IT22090508-employeeprofile-action-buttons">
                        <button className="IT22090508-employeeprofile-attendance-btn"
                        onClick={() =>navigate('/AttendanceForm')}
                        >
                            Mark Attendance
                        </button>
                        <button 
                            className="IT22090508-employeeprofile-task-btn"
                            onClick={() => navigate('/EmployeeTaskView')} // Navigate onClick
                        >
                            Check Tasks
                        </button>

                        <button 
                            className="IT22090508-employeeprofile-logout-btn">
                            Log out
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeProfile;
