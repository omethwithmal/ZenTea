import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faBell, faSave, faPlay, faCheck } from '@fortawesome/free-solid-svg-icons';

import Navbar from "./naveBar";

function ZenTeaEmployeeProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const initialData = location.state?.employeeData || {
    firstName: 'John',
    lastName: 'Doe',
    employeeId: 'EMP001',
    birthday: '05/15/1990',
    contactNumber: '1234567890',
    email: 'john.doe@zentea.com',
    homeAddress: '123 Tea Lane, Colombo',
    nationalId: '123456789V',
    startDate: '01/01/2020',
    jobTitle: 'Tea Taster',
    department: 'Quality Control',
  };

  const [formData, setFormData] = useState(initialData);
  const [editField, setEditField] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    birthday: '',
    contactNumber: '',
    email: '',
    nationalId: '',
    startDate: '',
  });
  const [notifications, setNotifications] = useState([
    {
      taskId: 'T001',
      title: 'Quality Check',
      description: 'Inspect batch #123 for quality standards.',
      employeeName: 'John Doe',
      department: 'Quality Control',
      date: '2025-05-03',
      timePeriod: '2hrs',
      status: 'Pending',
    },
    {
      taskId: 'T002',
      title: 'Packaging Review',
      description: 'Review packaging process for efficiency.',
      employeeName: 'John Doe',
      department: 'Packaging',
      date: '2025-05-04',
      timePeriod: '3hrs',
      status: 'Started',
    },
    {
      taskId: 'T003',
      title: 'Tea Cultivation',
      description: 'Oversee tea planting schedule.',
      employeeName: 'John Doe',
      department: 'Tea Cultivation',
      date: '2025-05-02',
      timePeriod: '4hrs',
      status: 'Finished',
    },
  ]);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [currentTask, setCurrentTask] = useState('T002'); // Mock: T002 is started for testing

  const validateFirstLastName = (value) => {
    const regex = /^[a-zA-Z\s]*$/;
    return regex.test(value);
  };

  const validateBirthdayAge = (value) => {
    if (!validateDate(value)) return false;
    const [month, day, year] = value.split('/').map(Number);
    const inputDate = new Date(year, month - 1, day);
    const sixteenYearsAgo = new Date(2009, 4, 4); // May 4, 2009
    return inputDate <= sixteenYearsAgo;
  };

  const validateContactNumber = (value) => {
    const regex = /^\d{10}$/;
    return regex.test(value);
  };

  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

  const validateNationalId = (value) => {
    const regex = /^[0-9Vv]*$/;
    return regex.test(value);
  };

  const validateDate = (value) => {
    const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
    return regex.test(value);
  };

  const handleDateInput = (e) => {
    const { name, value } = e.target;
    let formattedValue = value.replace(/[^0-9]/g, '');

    if (formattedValue.length >= 2 && formattedValue.length < 4) {
      formattedValue = `${formattedValue.slice(0, 2)}/${formattedValue.slice(2)}`;
    } else if (formattedValue.length >= 4) {
      formattedValue = `${formattedValue.slice(0, 2)}/${formattedValue.slice(2, 4)}/${formattedValue.slice(4, 8)}`;
    }

    setFormData({ ...formData, [name]: formattedValue });

    if (formattedValue.length === 10) {
      if (name === 'birthday') {
        setErrors({
          ...errors,
          birthday: validateDate(formattedValue)
            ? validateBirthdayAge(formattedValue)
              ? ''
              : 'Must be at least 16 years old to register with ZenTea'
            : 'Invalid date format (mm/dd/yyyy)',
        });
      } else {
        setErrors({
          ...errors,
          startDate: validateDate(formattedValue) ? '' : 'Invalid date format (mm/dd/yyyy)',
        });
      }
    } else {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'firstName' || name === 'lastName') {
      setErrors({
        ...errors,
        [name]: validateFirstLastName(value) ? '' : 'Numbers are not allowed',
      });
    } else if (name === 'contactNumber') {
      setErrors({
        ...errors,
        contactNumber: validateContactNumber(value) || value === '' ? '' : 'Must be exactly 10 digits',
      });
    } else if (name === 'email') {
      setErrors({
        ...errors,
        email: validateEmail(value) || value === '' ? '' : 'Invalid email format',
      });
    } else if (name === 'nationalId') {
      setErrors({
        ...errors,
        nationalId: validateNationalId(value) ? '' : 'Only numbers and "V" or "v" are allowed',
      });
    }
  };

  const handleKeyPress = (e, type) => {
    const char = String.fromCharCode(e.charCode);
    if (type === 'name') {
      if (!/^[a-zA-Z\s]*$/.test(char)) {
        e.preventDefault();
      }
    } else if (type === 'number') {
      if (!/^\d$/.test(char)) {
        e.preventDefault();
      }
    } else if (type === 'nationalId') {
      if (!/^[0-9Vv]$/.test(char)) {
        e.preventDefault();
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png') && file.size < 5 * 1024 * 1024) {
      setProfileImage(URL.createObjectURL(file));
    } else {
      alert('Please upload a JPEG or PNG image less than 5MB.');
    }
  };

  const handleSave = (field) => {
    const isValid = {
      firstName: validateFirstLastName(formData.firstName),
      lastName: validateFirstLastName(formData.lastName),
      birthday: validateBirthdayAge(formData.birthday),
      contactNumber: validateContactNumber(formData.contactNumber),
      email: validateEmail(formData.email),
      nationalId: validateNationalId(formData.nationalId),
      startDate: validateDate(formData.startDate),
    };

    if (isValid[field] || !['firstName', 'lastName', 'birthday', 'contactNumber', 'email', 'nationalId', 'startDate'].includes(field)) {
      setEditField(null);
      // In a real app, save to backend here
    } else {
      setErrors({
        firstName: validateFirstLastName(formData.firstName) ? '' : 'Numbers are not allowed',
        lastName: validateFirstLastName(formData.lastName) ? '' : 'Numbers are not allowed',
        birthday: validateDate(formData.birthday)
          ? validateBirthdayAge(formData.birthday)
            ? ''
            : 'Must be at least 16 years old to register with ZenTea'
          : 'Invalid date format (mm/dd/yyyy)',
        contactNumber: validateContactNumber(formData.contactNumber) ? '' : 'Must be exactly 10 digits',
        email: validateEmail(formData.email) ? '' : 'Invalid email format',
        nationalId: validateNationalId(formData.nationalId) ? '' : 'Only numbers and "V" or "v" are allowed',
        startDate: validateDate(formData.startDate) ? '' : 'Invalid date format (mm/dd/yyyy)',
      });
    }
  };

  const handleStartTask = (taskId) => {
    setNotifications((prev) =>
      prev.map((task) =>
        task.taskId === taskId ? { ...task, status: 'Started' } : task
      )
    );
    setCurrentTask(taskId);
  };

  const handleFinishTask = (taskId) => {
    setNotifications((prev) =>
      prev.map((task) =>
        task.taskId === taskId ? { ...task, status: 'Finished' } : task
      )
    );
    setCurrentTask(null);
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
        `}
      </style>
      <div style={styles.container}>

      <Navbar />
        <div style={styles.layout}>
          {/* Sidebar */}
          <div style={styles.sidebar}>
            <div style={styles.imageContainer}>
              <img
                src={profileImage || 'https://via.placeholder.com/200'}
                alt="Profile"
                style={styles.profileImage}
              />
              <label style={styles.editIcon}>
                <FontAwesomeIcon icon={faPencilAlt} />
                <input
                  type="file"
                  accept="image/jpeg,image/png"
                  style={{ display: 'none' }}
                  onChange={handleImageChange}
                />
              </label>
            </div>
            <div style={styles.notificationIcon}>
              <FontAwesomeIcon
                icon={faBell}
                style={{ fontSize: '1.8rem', color: '#1a3b2e' }}
                onClick={() => setShowNotificationModal(true)}
              />
              {notifications.length > 0 && (
                <span style={styles.notificationBadge}>{notifications.length}</span>
              )}
            </div>
            {currentTask && (
              <div style={styles.taskMessage}>
                Start Your Task
              </div>
            )}
          </div>

          {/* Main Content */}
          <div style={styles.profileWrapper}>
            <h2 style={styles.profileTitle}>Employee Profile</h2>
            <div style={styles.form}>
              {/* Personal Information */}
              <div style={styles.section}>
                <h3 style={styles.sectionTitle}>Personal Information</h3>
                <div style={styles.inputGrid}>
                  <div style={styles.inputWrapper}>
                    <label style={styles.inputLabel}>First Name</label>
                    {editField === 'firstName' ? (
                      <>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          onKeyPress={(e) => handleKeyPress(e, 'name')}
                          style={{ ...styles.input, border: errors.firstName ? '2px solid #d32f2f' : '1px solid #e1e8e3' }}
                        />
                        {errors.firstName && <span style={styles.errorText}>{errors.firstName}</span>}
                        <button style={styles.saveButton} onClick={() => handleSave('firstName')}>
                          <FontAwesomeIcon icon={faSave} /> Save
                        </button>
                      </>
                    ) : (
                      <>
                        <span style={styles.inputText}>{formData.firstName}</span>
                        <button style={styles.editButton} onClick={() => setEditField('firstName')} title="Edit First Name">
                          <FontAwesomeIcon icon={faPencilAlt} />
                        </button>
                      </>
                    )}
                  </div>
                  <div style={styles.inputWrapper}>
                    <label style={styles.inputLabel}>Last Name</label>
                    {editField === 'lastName' ? (
                      <>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          onKeyPress={(e) => handleKeyPress(e, 'name')}
                          style={{ ...styles.input, border: errors.lastName ? '2px solid #d32f2f' : '1px solid #e1e8e3' }}
                        />
                        {errors.lastName && <span style={styles.errorText}>{errors.lastName}</span>}
                        <button style={styles.saveButton} onClick={() => handleSave('lastName')}>
                          <FontAwesomeIcon icon={faSave} /> Save
                        </button>
                      </>
                    ) : (
                      <>
                        <span style={styles.inputText}>{formData.lastName}</span>
                        <button style={styles.editButton} onClick={() => setEditField('lastName')} title="Edit Last Name">
                          <FontAwesomeIcon icon={faPencilAlt} />
                        </button>
                      </>
                    )}
                  </div>
                  <div style={styles.inputWrapper}>
                    <label style={styles.inputLabel}>Employee ID</label>
                    {editField === 'employeeId' ? (
                      <>
                        <input
                          type="text"
                          name="employeeId"
                          value={formData.employeeId}
                          onChange={handleInputChange}
                          style={styles.input}
                        />
                        <button style={styles.saveButton} onClick={() => handleSave('employeeId')}>
                          <FontAwesomeIcon icon={faSave} /> Save
                        </button>
                      </>
                    ) : (
                      <>
                        <span style={styles.inputText}>{formData.employeeId}</span>
                        <button style={styles.editButton} onClick={() => setEditField('employeeId')} title="Edit Employee ID">
                          <FontAwesomeIcon icon={faPencilAlt} />
                        </button>
                      </>
                    )}
                  </div>
                  <div style={styles.inputWrapper}>
                    <label style={styles.inputLabel}>Birthday</label>
                    {editField === 'birthday' ? (
                      <>
                        <input
                          type="text"
                          name="birthday"
                          value={formData.birthday}
                          onChange={handleDateInput}
                          placeholder="mm/dd/yyyy"
                          style={{ ...styles.input, border: errors.birthday ? '2px solid #d32f2f' : '1px solid #e1e8e3' }}
                        />
                        {errors.birthday && <span style={styles.errorText}>{errors.birthday}</span>}
                        <button style={styles.saveButton} onClick={() => handleSave('birthday')}>
                          <FontAwesomeIcon icon={faSave} /> Save
                        </button>
                      </>
                    ) : (
                      <>
                        <span style={styles.inputText}>{formData.birthday}</span>
                        <button style={styles.editButton} onClick={() => setEditField('birthday')} title="Edit Birthday">
                          <FontAwesomeIcon icon={faPencilAlt} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div style={styles.section}>
                <h3 style={styles.sectionTitle}>Contact Information</h3>
                <div style={styles.inputGrid}>
                  <div style={styles.inputWrapper}>
                    <label style={styles.inputLabel}>Contact Number</label>
                    {editField === 'contactNumber' ? (
                      <>
                        <input
                          type="tel"
                          name="contactNumber"
                          value={formData.contactNumber}
                          onChange={handleInputChange}
                          onKeyPress={(e) => handleKeyPress(e, 'number')}
                          maxLength="10"
                          style={{ ...styles.input, border: errors.contactNumber ? '2px solid #d32f2f' : '1px solid #e1e8e3' }}
                        />
                        {errors.contactNumber && <span style={styles.errorText}>{errors.contactNumber}</span>}
                        <button style={styles.saveButton} onClick={() => handleSave('contactNumber')}>
                          <FontAwesomeIcon icon={faSave} /> Save
                        </button>
                      </>
                    ) : (
                      <>
                        <span style={styles.inputText}>{formData.contactNumber}</span>
                        <button style={styles.editButton} onClick={() => setEditField('contactNumber')} title="Edit Contact Number">
                          <FontAwesomeIcon icon={faPencilAlt} />
                        </button>
                      </>
                    )}
                  </div>
                  <div style={styles.inputWrapper}>
                    <label style={styles.inputLabel}>Email Address</label>
                    {editField === 'email' ? (
                      <>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          style={{ ...styles.input, border: errors.email ? '2px solid #d32f2f' : '1px solid #e1e8e3' }}
                        />
                        {errors.email && <span style={styles.errorText}>{errors.email}</span>}
                        <button style={styles.saveButton} onClick={() => handleSave('email')}>
                          <FontAwesomeIcon icon={faSave} /> Save
                        </button>
                      </>
                    ) : (
                      <>
                        <span style={styles.inputText}>{formData.email}</span>
                        <button style={styles.editButton} onClick={() => setEditField('email')} title="Edit Email Address">
                          <FontAwesomeIcon icon={faPencilAlt} />
                        </button>
                      </>
                    )}
                  </div>
                  <div style={styles.inputWrapper}>
                    <label style={styles.inputLabel}>Home Address</label>
                    {editField === 'homeAddress' ? (
                      <>
                        <input
                          type="text"
                          name="homeAddress"
                          value={formData.homeAddress}
                          onChange={handleInputChange}
                          style={styles.input}
                        />
                        <button style={styles.saveButton} onClick={() => handleSave('homeAddress')}>
                          <FontAwesomeIcon icon={faSave} /> Save
                        </button>
                      </>
                    ) : (
                      <>
                        <span style={styles.inputText}>{formData.homeAddress}</span>
                        <button style={styles.editButton} onClick={() => setEditField('homeAddress')} title="Edit Home Address">
                          <FontAwesomeIcon icon={faPencilAlt} />
                        </button>
                      </>
                    )}
                  </div>
                  <div style={styles.inputWrapper}>
                    <label style={styles.inputLabel}>National ID</label>
                    {editField === 'nationalId' ? (
                      <>
                        <input
                          type="text"
                          name="nationalId"
                          value={formData.nationalId}
                          onChange={handleInputChange}
                          onKeyPress={(e) => handleKeyPress(e, 'nationalId')}
                          style={{ ...styles.input, border: errors.nationalId ? '2px solid #d32f2f' : '1px solid #e1e8e3' }}
                        />
                        {errors.nationalId && <span style={styles.errorText}>{errors.nationalId}</span>}
                        <button style={styles.saveButton} onClick={() => handleSave('nationalId')}>
                          <FontAwesomeIcon icon={faSave} /> Save
                        </button>
                      </>
                    ) : (
                      <>
                        <span style={styles.inputText}>{formData.nationalId}</span>
                        <button style={styles.editButton} onClick={() => setEditField('nationalId')} title="Edit National ID">
                          <FontAwesomeIcon icon={faPencilAlt} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Job Details */}
              <div style={styles.section}>
                <h3 style={styles.sectionTitle}>Job Details</h3>
                <div style={styles.inputGrid}>
                  <div style={styles.inputWrapper}>
                    <label style={styles.inputLabel}>Start Date</label>
                    {editField === 'startDate' ? (
                      <>
                        <input
                          type="text"
                          name="startDate"
                          value={formData.startDate}
                          onChange={handleDateInput}
                          placeholder="mm/dd/yyyy"
                          style={{ ...styles.input, border: errors.startDate ? '2px solid #d32f2f' : '1px solid #e1e8e3' }}
                        />
                        {errors.startDate && <span style={styles.errorText}>{errors.startDate}</span>}
                        <button style={styles.saveButton} onClick={() => handleSave('startDate')}>
                          <FontAwesomeIcon icon={faSave} /> Save
                        </button>
                      </>
                    ) : (
                      <>
                        <span style={styles.inputText}>{formData.startDate}</span>
                        <button style={styles.editButton} onClick={() => setEditField('startDate')} title="Edit Start Date">
                          <FontAwesomeIcon icon={faPencilAlt} />
                        </button>
                      </>
                    )}
                  </div>
                  <div style={styles.inputWrapper}>
                    <label style={styles.inputLabel}>Job Title</label>
                    {editField === 'jobTitle' ? (
                      <>
                        <input
                          type="text"
                          name="jobTitle"
                          value={formData.jobTitle}
                          onChange={handleInputChange}
                          style={styles.input}
                        />
                        <button style={styles.saveButton} onClick={() => handleSave('jobTitle')}>
                          <FontAwesomeIcon icon={faSave} /> Save
                        </button>
                      </>
                    ) : (
                      <>
                        <span style={styles.inputText}>{formData.jobTitle}</span>
                        <button style={styles.editButton} onClick={() => setEditField('jobTitle')} title="Edit Job Title">
                          <FontAwesomeIcon icon={faPencilAlt} />
                        </button>
                      </>
                    )}
                  </div>
                  <div style={styles.inputWrapper}>
                    <label style={styles.inputLabel}>Department</label>
                    {editField === 'department' ? (
                      <>
                        <select
                          name="department"
                          value={formData.department}
                          onChange={handleInputChange}
                          style={styles.select}
                        >
                          <option value="" disabled>
                            Select Department
                          </option>
                          <option value="Tea Cultivation">Tea Cultivation</option>
                          <option value="Processing">Processing</option>
                          <option value="Quality Control">Quality Control</option>
                          <option value="Packaging">Packaging</option>
                          <option value="Logistics">Logistics</option>
                        </select>
                        <button style={styles.saveButton} onClick={() => handleSave('department')}>
                          <FontAwesomeIcon icon={faSave} /> Save
                        </button>
                      </>
                    ) : (
                      <>
                        <span style={styles.inputText}>{formData.department}</span>
                        <button style={styles.editButton} onClick={() => setEditField('department')} title="Edit Department">
                          <FontAwesomeIcon icon={faPencilAlt} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <button
              style={styles.backButton}
              onClick={() => navigate('/HomePage')}
            >
              Back to Home
            </button>
          </div>
        </div>

        {/* Notification Modal */}
        {showNotificationModal && (
          <div style={styles.modalOverlay}>
            <div style={styles.modal}>
              <h3 style={styles.modalTitle}>Task Notifications</h3>
              <div style={styles.notificationList}>
                {notifications.map((notification) => (
                  <div key={notification.taskId} style={styles.notificationItem}>
                    <div style={styles.notificationHeader}>
                      <span style={styles.notificationTitle}>{notification.title}</span>
                      <span
                        style={{
                          ...styles.statusBadge,
                          backgroundColor:
                            notification.status === 'Pending'
                              ? '#f5c6a5'
                              : notification.status === 'Started'
                              ? '#4a8b6a'
                              : '#1a3b2e',
                        }}
                      >
                        {notification.status}
                      </span>
                    </div>
                    <div style={styles.notificationDetails}>
                      <p><strong>Task ID:</strong> {notification.taskId}</p>
                      <p><strong>Description:</strong> {notification.description}</p>
                      <p><strong>Employee:</strong> {notification.employeeName}</p>
                      <p><strong>Department:</strong> {notification.department}</p>
                      <p><strong>Date:</strong> {notification.date}</p>
                      <p><strong>Time Period:</strong> {notification.timePeriod}</p>
                    </div>
                    <div style={styles.notificationActions}>
                      {notification.status === 'Pending' && (
                        <button
                          style={{
                            ...styles.actionButton,
                            opacity: currentTask ? 0.5 : 1,
                            cursor: currentTask ? 'not-allowed' : 'pointer',
                          }}
                          onClick={() => handleStartTask(notification.taskId)}
                          disabled={!!currentTask}
                        >
                          <FontAwesomeIcon icon={faPlay} /> Start Task
                        </button>
                      )}
                      {notification.status === 'Started' && (
                        <button
                          style={styles.actionButton}
                          onClick={() => handleFinishTask(notification.taskId)}
                        >
                          <FontAwesomeIcon icon={faCheck} /> Finish Task
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <button
                style={styles.modalButton}
                onClick={() => setShowNotificationModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}

        <footer style={styles.footer}>
          <p style={styles.footerText}>© 2025 ZenTea Factory. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}

const styles = {
  container: {
    fontFamily: "'Inter', sans-serif",
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(180deg, #f7f9f7 0%, #e1e8e3 100%)',
    padding: '2rem',
    position: 'relative',
    overflow: 'auto',
    backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27100%27 height=%27100%27 viewBox=%270 0 100 100%27%3Cpath d=%27M50 30C40 20 60 20 50 30C40 40 60 40 50 30Z%27 fill=%27%231a3b2e%27 fill-opacity=%270.05%27/%3E%3C/svg%3E%27)',
    backgroundRepeat: 'repeat',
    backgroundSize: '120px 120px',
    width:'1450px',
    margin:'45px'
  },
  layout: {
    display: 'flex',
    gap: '2rem',
    width: '100%',
    maxWidth: '1200px',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  sidebar: {
    width: '250px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    padding: '2rem',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    animation: 'fadeInLeft 0.6s ease-out',
    '@media (max-width: 768px)': {
      width: '100%',
      maxWidth: '300px',
    },
  },
  imageContainer: {
    position: 'relative',
    width: '200px',
    height: '200px',
    marginBottom: '1.5rem',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '4px solid transparent',
    background: 'linear-gradient(45deg, #1a3b2e, #4a8b6a)',
    padding: '4px',
    transition: 'opacity 0.3s ease',
  },
  editIcon: {
    position: 'absolute',
    bottom: '15px',
    right: '15px',
    background: '#1a3b2e',
    color: '#fff',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, background 0.3s ease',
    ':hover': {
      background: '#f5c6a5',
      transform: 'scale(1.1)',
    },
  },
  notificationIcon: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    position: 'relative',
    marginBottom: '1rem',
  },
  notificationBadge: {
    background: '#d32f2f',
    color: 'white',
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '0.9rem',
    position: 'absolute',
    top: '-10px',
    right: '-10px',
    animation: 'pulseBadge 1.5s infinite',
  },
  taskMessage: {
    fontSize: '1rem',
    color: '#1a3b2e',
    fontWeight: '600',
    textAlign: 'center',
    padding: '0.75rem',
    background: 'rgba(74, 139, 106, 0.1)',
    borderRadius: '8px',
    animation: 'fadeIn 0.5s ease-out',
  },
  profileWrapper: {
    flex: 1,
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    padding: '2.5rem',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    animation: 'fadeInRight 0.6s ease-out',
    '@media (max-width: 768px)': {
      width: '100%',
    },
  },
  profileTitle: {
    fontSize: '2.5rem',
    color: '#1a3b2e',
    textAlign: 'center',
    marginBottom: '2rem',
    fontWeight: '700',
    letterSpacing: '0.5px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  section: {
    padding: '1rem 0',
    borderBottom: '1px solid rgba(225, 232, 227, 0.5)',
  },
  sectionTitle: {
    fontSize: '1.5rem',
    color: '#1a3b2e',
    marginBottom: '1.5rem',
    fontWeight: '700',
  },
  inputGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1.5rem',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
    },
  },
  inputWrapper: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  inputLabel: {
    fontSize: '1rem',
    color: '#1a3b2e',
    marginBottom: '0.5rem',
    fontWeight: '600',
  },
  inputText: {
    fontSize: '1rem',
    color: '#333',
    padding: '0.75rem',
    background: 'rgba(255, 255, 255, 0.5)',
    borderRadius: '12px',
    border: '1px solid #e1e8e3',
    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.05)',
  },
  input: {
    padding: '0.75rem',
    fontSize: '1rem',
    border: '1px solid #e1e8e3',
    borderRadius: '12px',
    outline: 'none',
    background: 'rgba(255, 255, 255, 0.5)',
    color: '#333',
    transition: 'border 0.3s ease, box-shadow 0.3s ease',
    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.05)',
    ':focus': {
      border: '2px solid #4a8b6a',
      boxShadow: '0 0 8px rgba(74, 139, 106, 0.3)',
    },
  },
  select: {
    padding: '0.75rem',
    fontSize: '1rem',
    border: '1px solid #e1e8e3',
    borderRadius: '12px',
    outline: 'none',
    background: 'rgba(255, 255, 255, 0.5)',
    color: '#333',
    transition: 'border 0.3s ease, box-shadow 0.3s ease',
    appearance: 'none',
    cursor: 'pointer',
    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.05)',
    ':focus': {
      border: '2px solid #4a8b6a',
      boxShadow: '0 0 8px rgba(74, 139, 106, 0.3)',
    },
  },
  errorText: {
    fontSize: '0.85rem',
    color: '#d32f2f',
    marginTop: '0.5rem',
    fontStyle: 'italic',
    animation: 'slideInError 0.3s ease, shake 0.5s ease',
  },
  editButton: {
    position: 'absolute',
    right: '10px',
    top: '40px',
    background: '#1a3b2e',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '32px',
    height: '32px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'background 0.3s ease, transform 0.3s ease',
    ':hover': {
      background: '#f5c6a5',
      transform: 'rotate(90deg)',
    },
  },
  saveButton: {
    background: '#4a8b6a',
    color: 'white',
    padding: '0.5rem 1rem',
    fontSize: '0.9rem',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    marginTop: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'background 0.3s ease, transform 0.3s ease',
    ':hover': {
      background: '#1a3b2e',
      transform: 'translateY(-2px)',
    },
  },
  backButton: {
    background: 'linear-gradient(45deg, #4a8b6a, #1a3b2e)',
    color: 'white',
    padding: '0.75rem',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    marginTop: '2rem',
    width: '100%',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    animation: 'slideUp 0.5s ease-out',
    ':hover': {
      transform: 'translateY(-3px)',
      boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
    },
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    backdropFilter: 'blur(5px)',
  },
  modal: {
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    padding: '2rem',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    animation: 'popIn 0.4s ease-out',
    maxWidth: '700px',
    width: '100%',
  },
  modalTitle: {
    fontSize: '1.8rem',
    color: '#1a3b2e',
    marginBottom: '1.5rem',
    fontWeight: '700',
  },
  notificationList: {
    maxHeight: '400px',
    overflowY: 'auto',
    marginBottom: '1.5rem',
  },
  notificationItem: {
    padding: '1.5rem',
    borderRadius: '8px',
    background: 'rgba(255, 255, 255, 0.5)',
    marginBottom: '1rem',
    transition: 'transform 0.3s ease',
    ':hover': {
      transform: 'translateX(5px)',
    },
  },
  notificationHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.75rem',
  },
  notificationTitle: {
    fontSize: '1.2rem',
    color: '#1a3b2e',
    fontWeight: '600',
  },
  statusBadge: {
    fontSize: '0.85rem',
    color: 'white',
    padding: '0.25rem 0.75rem',
    borderRadius: '12px',
    fontWeight: '500',
  },
  notificationDetails: {
    fontSize: '0.95rem',
    color: '#333',
    marginBottom: '1rem',
    lineHeight: '1.5',
  },
  notificationActions: {
    display: 'flex',
    gap: '1rem',
  },
  actionButton: {
    background: '#4a8b6a',
    color: 'white',
    padding: '0.5rem 1rem',
    fontSize: '0.9rem',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'background 0.3s ease, transform 0.3s ease',
    ':hover': {
      background: '#1a3b2e',
      transform: 'translateY(-2px)',
    },
  },
  modalButton: {
    background: '#4a8b6a',
    color: 'white',
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'background 0.3s ease, transform 0.3s ease',
    ':hover': {
      background: '#1a3b2e',
      transform: 'translateY(-2px)',
    },
  },
  footer: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(10px)',
    padding: '1rem 0',
    textAlign: 'center',
    borderTop: '1px solid rgba(225, 232, 227, 0.5)',
    boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.05)',
    animation: 'fadeIn 0.5s ease-out',
    zIndex: 100,
  },
  footerText: {
    fontSize: '0.9rem',
    color: '#4a8b6a',
    margin: 0,
    fontWeight: '500',
  },
};

// Define keyframes for animations
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes fadeInLeft {
    from { opacity: 0; transform: translateX(-20px); }
    to { opacity: 1; transform: translateX(0); }
  }
`, styleSheet.cssRules.length);
styleSheet.insertRule(`
  @keyframes fadeInRight {
    from { opacity: 0; transform: translateX(20px); }
    to { opacity: 1; transform: translateX(0); }
  }
`, styleSheet.cssRules.length);
styleSheet.insertRule(`
  @keyframes slideInError {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`, styleSheet.cssRules.length);
styleSheet.insertRule(`
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
`, styleSheet.cssRules.length);
styleSheet.insertRule(`
  @keyframes pulseBadge {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.2); }
  }
`, styleSheet.cssRules.length);
styleSheet.insertRule(`
  @keyframes popIn {
    0% { opacity: 0; transform: scale(0.8); }
    80% { transform: scale(1.05); }
    100% { opacity: 1; transform: scale(1); }
  }
`, styleSheet.cssRules.length);
styleSheet.insertRule(`
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`, styleSheet.cssRules.length);
styleSheet.insertRule(`
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`, styleSheet.cssRules.length);

export default ZenTeaEmployeeProfile;