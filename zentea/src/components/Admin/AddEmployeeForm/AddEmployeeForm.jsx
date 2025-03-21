import React, { useState } from 'react';
import './AddEmployeeForm.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';


const AddEmployeeForm = () => {

    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        employeeId: '',
        birthDate: '',
        contactNumber: '',
        email: '',
        homeAddress: '',
        nationalId: '',
        startDate: '',
        jobTitle: '',
        department: '',
        profilePicture: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setFormData((prev) => ({ ...prev, profilePicture: file, previewUrl }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        if (formData.previewUrl) {
            URL.revokeObjectURL(formData.previewUrl); // Clean up memory
        }
        // Add your form submission logic here
    };

    const handleCancel = () => {
        if (formData.previewUrl) {
            URL.revokeObjectURL(formData.previewUrl); // Clean up memory
        }
        setFormData({
            firstName: '',
            lastName: '',
            employeeId: '',
            birthDate: '',
            contactNumber: '',
            email: '',
            homeAddress: '',
            nationalId: '',
            startDate: '',
            jobTitle: '',
            department: '',
            profilePicture: null,
            previewUrl: null,
        });
    };

    return (
        <div className="IT22090508-AddEmployeeForm-dashboard">
            {/* Sidebar */}
            <aside className="IT22090508-admindashbord-sidebar">
                <div className="IT22090508-admindashbord-logo">
                    <i className="fas fa-cogs"></i>
                    <h1>Admin</h1>
                    <h2>Dashboard</h2>
                </div>
                <nav>
                    <a href="#" className="IT22090508-admindashbord-nav-link "
                    onClick={() =>navigate('/ManagementDashboard')}>
                        <i className="fas fa-user-shield"></i>
                        <span>Admin</span>
                    </a>
                    <a href="#" className="IT22090508-admindashbord-nav-link active">
                        <i className="fas fa-user-plus"></i>
                        <span>➕ Add User</span>
                    </a>
                    <a href="#" className="IT22090508-admindashbord-nav-link">
                        <i className="fas fa-bell"></i>
                        <span>🔔Notification</span>
                    </a>
                    <a href="#" className="IT22090508-admindashbord-nav-link"
                    onClick={() =>navigate('/EmployeeDashboard')}
                    >
                        <i className="fas fa-users"></i>
                        
                        <span>👤Employee</span>
                    </a>
                    <a href="#" className="IT22090508-admindashbord-nav-link">
                        <i className="fas fa-wallet"></i>
                        <span>💰Financial</span>
                    </a>
                    <a href="#" className="IT22090508-admindashbord-nav-link">
                        <i className="fas fa-truck"></i>
                        <span>🚚 Orders</span>
                    </a>
                    <a href="#" className="IT22090508-admindashbord-nav-link">
                        <i className="fas fa-boxes"></i>
                        <span>📦Inventory</span>
                    </a>
                    <a href="#" className="IT22090508-admindashbord-nav-link">
                        <i className="fas fa-tools"></i>
                        <span>🛠 Equipment</span>
                    </a>
                    <a href="#" className="IT22090508-admindashbord-nav-link">
                        <i className="fas fa-cog"></i>
                        <span>⚙ Settings</span>
                    </a>
                    <a href="#" className="IT22090508-admindashbord-nav-link">
                        <i className="fas fa-sign-out-alt"></i>
                        <span>↩ Log Out</span>
                    </a>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="IT22090508-AddEmployeeForm-content">
                <div className="IT22090508-AddEmployeeForm-card">
                    <h2 className="IT22090508-AddEmployeeForm-title">Add New User</h2>
                    <form onSubmit={handleSubmit} className="IT22090508-AddEmployeeForm-form">
                        <div className="IT22090508-AddEmployeeForm-grid">
                            <div className="IT22090508-AddEmployeeForm-field">
                                <label>First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="Enter first name"
                                    required
                                />
                            </div>
                            <div className="IT22090508-AddEmployeeForm-field">
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder="Enter last name"
                                    required
                                />
                            </div>
                            <div className="IT22090508-AddEmployeeForm-field">
                                <label>Employee ID</label>
                                <input
                                    type="text"
                                    name="employeeId"
                                    value={formData.employeeId}
                                    onChange={handleChange}
                                    placeholder="Enter employee ID"
                                    required
                                />
                            </div>
                            <div className="IT22090508-AddEmployeeForm-field">
                                <label>Birth Date</label>
                                <input
                                    type="date"
                                    name="birthDate"
                                    value={formData.birthDate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="IT22090508-AddEmployeeForm-field">
                                <label>Contact Number</label>
                                <input
                                    type="tel"
                                    name="contactNumber"
                                    value={formData.contactNumber}
                                    onChange={handleChange}
                                    placeholder="Enter contact number"
                                    required
                                />
                            </div>
                            <div className="IT22090508-AddEmployeeForm-field">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter email address"
                                    required
                                />
                            </div>
                            <div className="IT22090508-AddEmployeeForm-field full-width">
                                <label>Home Address</label>
                                <textarea
                                    name="homeAddress"
                                    value={formData.homeAddress}
                                    onChange={handleChange}
                                    placeholder="Enter home address"
                                    required
                                />
                            </div>
                            <div className="IT22090508-AddEmployeeForm-field">
                                <label>National ID Card Number</label>
                                <input
                                    type="text"
                                    name="nationalId"
                                    value={formData.nationalId}
                                    onChange={handleChange}
                                    placeholder="Enter national ID"
                                    required
                                />
                            </div>
                            <div className="IT22090508-AddEmployeeForm-field">
                                <label>Start Date</label>
                                <input
                                    type="date"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="IT22090508-AddEmployeeForm-field">
                                <label>Job Title</label>
                                <input
                                    type="text"
                                    name="jobTitle"
                                    value={formData.jobTitle}
                                    onChange={handleChange}
                                    placeholder="Enter job title"
                                    required
                                />
                            </div>
                            <div className="IT22090508-AddEmployeeForm-field">
                                <label>Department</label>
                                <select
                                    name="department"
                                    value={formData.department}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Department</option>
                                    <option value="Plantation">Plantation Department</option>
                                    <option value="Production">Production & Processing Department</option>
                                    <option value="Quality">Quality Control Department</option>
                                    <option value="Finance">Finance Department</option>
                                    <option value="Development">Development Department</option>
                                </select>
                            </div>
                        </div>
                        <div className="IT22090508-AddEmployeeForm-profile-section">
                            <div className="IT22090508-AddEmployeeForm-profile-picture">
                                <label>Profile Picture</label>
                                <div className="IT22090508-AddEmployeeForm-upload-area">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        id="profile-upload"
                                        hidden
                                    />
                                    <label htmlFor="profile-upload" className="IT22090508-AddEmployeeForm-upload-label">
                                        {formData.profilePicture ? (
                                            <span>{formData.profilePicture.name}</span>
                                        ) : (
                                            <span>Click to upload profile picture</span>
                                        )}
                                    </label>
                                </div>
                            </div>
                            <div className="IT22090508-AddEmployeeForm-preview-section">
                                <label>Preview</label>
                                <div className="IT22090508-AddEmployeeForm-preview-container">
                                    {formData.previewUrl ? (
                                        <img
                                            src={formData.previewUrl}
                                            alt="Profile preview"
                                            className="IT22090508-AddEmployeeForm-preview-image"
                                        />
                                    ) : (
                                        <div className="IT22090508-AddEmployeeForm-preview-placeholder">
                                            No image selected
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="IT22090508-AddEmployeeForm-buttons">
                            <button
                                type="button"
                                className="IT22090508-AddEmployeeForm-cancel"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="IT22090508-AddEmployeeForm-save"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default AddEmployeeForm;