import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function EmployeeRegistrationForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    employeeId: '',
    birthday: '',
    contactNumber: '',
    email: '',
    homeAddress: '',
    nationalId: '',
    startDate: '',
    jobTitle: '',
    department: '',
  });
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    birthday: '',
    contactNumber: '',
    email: '',
    nationalId: '',
    startDate: '',
  });
  const [showPopup, setShowPopup] = useState(false);
  const [progress, setProgress] = useState(0);

  const validateFirstLastName = (value) => {
    const regex = /^[a-zA-Z\s]*$/;
    return regex.test(value);
  };

  const validateBirthdayAge = (value) => {
    if (!validateDate(value)) return false;
    const [month, day, year] = value.split('/').map(Number);
    const inputDate = new Date(year, month - 1, day);
    const sixteenYearsAgo = new Date(2009, 4, 4); // May 4, 2009 (16 years before May 4, 2025)
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

  const isFormValid = () => {
    return (
      validateFirstLastName(formData.firstName) &&
      validateFirstLastName(formData.lastName) &&
      validateBirthdayAge(formData.birthday) &&
      validateContactNumber(formData.contactNumber) &&
      validateEmail(formData.email) &&
      validateNationalId(formData.nationalId) &&
      validateDate(formData.startDate)
    );
  };

  const handleSave = () => {
    if (isFormValid()) {
      setShowPopup(true);
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

  const handleCancel = () => {
    setFormData({
      firstName: '',
      lastName: '',
      employeeId: '',
      birthday: '',
      contactNumber: '',
      email: '',
      homeAddress: '',
      nationalId: '',
      startDate: '',
      jobTitle: '',
      department: '',
    });
    setErrors({
      firstName: '',
      lastName: '',
      birthday: '',
      contactNumber: '',
      email: '',
      nationalId: '',
      startDate: '',
    });
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    navigate('/HomePage');
  };

  useEffect(() => {
    const filledFields = Object.values(formData).filter((value) => value !== '').length;
    setProgress((filledFields / Object.keys(formData).length) * 100);
  }, [formData]);

  return (
    <div style={styles.container}>
      <div style={styles.progressContainer}>
        <svg width="60" height="60" viewBox="0 0 60 60">
          <circle
            cx="30"
            cy="30"
            r="25"
            fill="none"
            stroke="#e8edea"
            strokeWidth="5"
          />
          <circle
            cx="30"
            cy="30"
            r="25"
            fill="none"
            stroke="#2a5c42"
            strokeWidth="5"
            strokeDasharray="157"
            strokeDashoffset={157 - (progress / 100) * 157}
            transform="rotate(-90 30 30)"
          />
        </svg>
      </div>
      <div style={styles.formWrapper}>
        <h2 style={styles.formTitle}>Employee Registration</h2>
        <div style={styles.form}>
          {/* Personal Info Section */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Personal Information</h3>
            <div style={styles.inputGrid}>
              <div style={styles.inputWrapper}>
                <label style={styles.inputLabel}>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  onKeyPress={(e) => handleKeyPress(e, 'name')}
                  style={{ ...styles.input, border: errors.firstName ? '2px solid #c62828' : '1px solid #e8edea' }}
                  onFocus={(e) => {
                    e.target.style.border = errors.firstName ? '2px solid #c62828' : '2px solid #2a5c42';
                    e.target.style.boxShadow = errors.firstName ? '0 0 6px rgba(198, 40, 40, 0.3)' : '0 0 6px rgba(42, 92, 66, 0.3)';
                  }}
                  onBlur={(e) => {
                    e.target.style.border = errors.firstName ? '2px solid #c62828' : '1px solid #e8edea';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                {errors.firstName && <span style={styles.errorText}>{errors.firstName}</span>}
              </div>
              <div style={styles.inputWrapper}>
                <label style={styles.inputLabel}>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  onKeyPress={(e) => handleKeyPress(e, 'name')}
                  style={{ ...styles.input, border: errors.lastName ? '2px solid #c62828' : '1px solid #e8edea' }}
                  onFocus={(e) => {
                    e.target.style.border = errors.lastName ? '2px solid #c62828' : '2px solid #2a5c42';
                    e.target.style.boxShadow = errors.lastName ? '0 0 6px rgba(198, 40, 40, 0.3)' : '0 0 6px rgba(42, 92, 66, 0.3)';
                  }}
                  onBlur={(e) => {
                    e.target.style.border = errors.lastName ? '2px solid #c62828' : '1px solid #e8edea';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                {errors.lastName && <span style={styles.errorText}>{errors.lastName}</span>}
              </div>
              <div style={styles.inputWrapper}>
                <label style={styles.inputLabel}>Employee ID</label>
                <input
                  type="text"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleInputChange}
                  style={styles.input}
                  onFocus={(e) => {
                    e.target.style.border = '2px solid #2a5c42';
                    e.target.style.boxShadow = '0 0 6px rgba(42, 92, 66, 0.3)';
                  }}
                  onBlur={(e) => {
                    e.target.style.border = '1px solid #e8edea';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
              <div style={styles.inputWrapper}>
                <label style={styles.inputLabel}>Birthday</label>
                <input
                  type="text"
                  name="birthday"
                  value={formData.birthday}
                  onChange={handleDateInput}
                  placeholder="mm/dd/yyyy"
                  style={{ ...styles.input, border: errors.birthday ? '2px solid #c62828' : '1px solid #e8edea' }}
                  onFocus={(e) => {
                    e.target.style.border = errors.birthday ? '2px solid #c62828' : '2px solid #2a5c42';
                    e.target.style.boxShadow = errors.birthday ? '0 0 6px rgba(198, 40, 40, 0.3)' : '0 0 6px rgba(42, 92, 66, 0.3)';
                  }}
                  onBlur={(e) => {
                    e.target.style.border = errors.birthday ? '2px solid #c62828' : '1px solid #e8edea';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                {errors.birthday && <span style={styles.errorText}>{errors.birthday}</span>}
              </div>
            </div>
          </div>

          {/* Contact Info Section */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Contact Information</h3>
            <div style={styles.inputGrid}>
              <div style={styles.inputWrapper}>
                <label style={styles.inputLabel}>Contact Number</label>
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  onKeyPress={(e) => handleKeyPress(e, 'number')}
                  maxLength="10"
                  style={{ ...styles.input, border: errors.contactNumber ? '2px solid #c62828' : '1px solid #e8edea' }}
                  onFocus={(e) => {
                    e.target.style.border = errors.contactNumber ? '2px solid #c62828' : '2px solid #2a5c42';
                    e.target.style.boxShadow = errors.contactNumber ? '0 0 6px rgba(198, 40, 40, 0.3)' : '0 0 6px rgba(42, 92, 66, 0.3)';
                  }}
                  onBlur={(e) => {
                    e.target.style.border = errors.contactNumber ? '2px solid #c62828' : '1px solid #e8edea';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                {errors.contactNumber && <span style={styles.errorText}>{errors.contactNumber}</span>}
              </div>
              <div style={styles.inputWrapper}>
                <label style={styles.inputLabel}>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={{ ...styles.input, border: errors.email ? '2px solid #c62828' : '1px solid #e8edea' }}
                  onFocus={(e) => {
                    e.target.style.border = errors.email ? '2px solid #c62828' : '2px solid #2a5c42';
                    e.target.style.boxShadow = errors.email ? '0 0 6px rgba(198, 40, 40, 0.3)' : '0 0 6px rgba(42, 92, 66, 0.3)';
                  }}
                  onBlur={(e) => {
                    e.target.style.border = errors.email ? '2px solid #c62828' : '1px solid #e8edea';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                {errors.email && <span style={styles.errorText}>{errors.email}</span>}
              </div>
              <div style={styles.inputWrapper}>
                <label style={styles.inputLabel}>Home Address</label>
                <input
                  type="text"
                  name="homeAddress"
                  value={formData.homeAddress}
                  onChange={handleInputChange}
                  style={styles.input}
                  onFocus={(e) => {
                    e.target.style.border = '2px solid #2a5c42';
                    e.target.style.boxShadow = '0 0 6px rgba(42, 92, 66, 0.3)';
                  }}
                  onBlur={(e) => {
                    e.target.style.border = '1px solid #e8edea';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
              <div style={styles.inputWrapper}>
                <label style={styles.inputLabel}>National ID</label>
                <input
                  type="text"
                  name="nationalId"
                  value={formData.nationalId}
                  onChange={handleInputChange}
                  onKeyPress={(e) => handleKeyPress(e, 'nationalId')}
                  style={{ ...styles.input, border: errors.nationalId ? '2px solid #c62828' : '1px solid #e8edea' }}
                  onFocus={(e) => {
                    e.target.style.border = errors.nationalId ? '2px solid #c62828' : '2px solid #2a5c42';
                    e.target.style.boxShadow = errors.nationalId ? '0 0 6px rgba(198, 40, 40, 0.3)' : '0 0 6px rgba(42, 92, 66, 0.3)';
                  }}
                  onBlur={(e) => {
                    e.target.style.border = errors.nationalId ? '2px solid #c62828' : '1px solid #e8edea';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                {errors.nationalId && <span style={styles.errorText}>{errors.nationalId}</span>}
              </div>
            </div>
          </div>

          {/* Job Details Section */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Job Details</h3>
            <div style={styles.inputGrid}>
              <div style={styles.inputWrapper}>
                <label style={styles.inputLabel}>Start Date</label>
                <input
                  type="text"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleDateInput}
                  placeholder="mm/dd/yyyy"
                  style={{ ...styles.input, border: errors.startDate ? '2px solid #c62828' : '1px solid #e8edea' }}
                  onFocus={(e) => {
                    e.target.style.border = errors.startDate ? '2px solid #c62828' : '2px solid #2a5c42';
                    e.target.style.boxShadow = errors.startDate ? '0 0 6px rgba(198, 40, 40, 0.3)' : '0 0 6px rgba(42, 92, 66, 0.3)';
                  }}
                  onBlur={(e) => {
                    e.target.style.border = errors.startDate ? '2px solid #c62828' : '1px solid #e8edea';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                {errors.startDate && <span style={styles.errorText}>{errors.startDate}</span>}
              </div>
              <div style={styles.inputWrapper}>
                <label style={styles.inputLabel}>Job Title</label>
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  style={styles.input}
                  onFocus={(e) => {
                    e.target.style.border = '2px solid #2a5c42';
                    e.target.style.boxShadow = '0 0 6px rgba(42, 92, 66, 0.3)';
                  }}
                  onBlur={(e) => {
                    e.target.style.border = '1px solid #e8edea';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
              <div style={styles.inputWrapper}>
                <label style={styles.inputLabel}>Department</label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  style={styles.select}
                  onFocus={(e) => {
                    e.target.style.border = '2px solid #2a5c42';
                    e.target.style.boxShadow = '0 0 6px rgba(42, 92, 66, 0.3)';
                  }}
                  onBlur={(e) => {
                    e.target.style.border = '1px solid #e8edea';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <option value="" disabled>
                    Select Department
                  </option>
                  <option value="teaCultivation">Tea Cultivation</option>
                  <option value="processing">Processing</option>
                  <option value="qualityControl">Quality Control</option>
                  <option value="packaging">Packaging</option>
                  <option value="logistics">Logistics</option>
                </select>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div style={styles.buttonContainer}>
            <button
              style={{ ...styles.saveButton, opacity: isFormValid() ? 1 : 0.6, cursor: isFormValid() ? 'pointer' : 'not-allowed' }}
              onClick={handleSave}
              disabled={!isFormValid()}
              onMouseEnter={(e) => {
                if (isFormValid()) {
                  e.target.style.background = '#1a3b2e';
                  e.target.style.transform = 'scale(1.05)';
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#2a5c42';
                e.target.style.transform = 'scale(1)';
              }}
              onMouseDown={(e) => {
                if (isFormValid()) {
                  e.target.style.transform = 'scale(0.95)';
                }
              }}
              onMouseUp={(e) => {
                if (isFormValid()) {
                  e.target.style.transform = 'scale(1.05)';
                }
              }}
            >
              Save
            </button>
            <button
              style={styles.cancelButton}
              onClick={handleCancel}
              onMouseEnter={(e) => {
                e.target.style.background = '#78909c';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#90a4ae';
                e.target.style.transform = 'scale(1)';
              }}
              onMouseDown={(e) => {
                e.target.style.transform = 'scale(0.95)';
              }}
              onMouseUp={(e) => {
                e.target.style.transform = 'scale(1.05)';
              }}
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Popup */}
        {showPopup && (
          <div style={styles.popupOverlay}>
            <div style={styles.popup}>
              <h3 style={styles.popupTitle}>Registration Successful</h3>
              <button
                style={styles.popupButton}
                onClick={handlePopupClose}
                onMouseEnter={(e) => {
                  e.target.style.background = '#1a3b2e';
                  e.target.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#2a5c42';
                  e.target.style.transform = 'scale(1)';
                }}
                onMouseDown={(e) => {
                  e.target.style.transform = 'scale(0.95)';
                }}
                onMouseUp={(e) => {
                  e.target.style.transform = 'scale(1)';
                }}
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
      <footer style={styles.footer}>
        <p style={styles.footerText}>© 2025 ZenTea Factory. All rights reserved.</p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(180deg, #f5f7f5 0%, #e8edea 100%)',
    padding: '20px',
    position: 'relative',
    overflow: 'auto',
    backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27100%27 height=%27100%27 viewBox=%270 0 100 100%27%3Cpath d=%27M50 30C40 20 60 20 50 30C40 40 60 40 50 30Z%27 fill=%27%232a5c42%27 fill-opacity=%270.05%27/%3E%3C/svg%3E%27)',
    backgroundRepeat: 'repeat',
    backgroundSize: '150px 150px',
    width:'1525px',
  },
  progressContainer: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    animation: 'fadeIn 0.5s ease-out',
  },
  formWrapper: {
    background: '#ffffff',
    borderRadius: '16px',
    padding: '40px',
    width: '100%',
    maxWidth: '800px',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    ':hover': {
      transform: 'translateY(-3px)',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
    },
    marginBottom: '60px',
  },
  formTitle: {
    fontSize: '2.5rem',
    color: '#2a5c42',
    textAlign: 'center',
    marginBottom: '30px',
    fontWeight: '700',
    animation: 'fadeIn 0.5s ease-out',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '25px',
    width: '100%',
  },
  section: {
    padding: '15px 0',
    borderBottom: '1px solid #e8edea',
  },
  sectionTitle: {
    fontSize: '1.4rem',
    color: '#2a5c42',
    marginBottom: '15px',
    fontWeight: '600',
    letterSpacing: '0.5px',
  },
  inputGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    '@media (maxWidth: 768px)': {
      gridTemplateColumns: '1fr',
    },
  },
  inputWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '12px',
    fontSize: '1rem',
    border: '1px solid #e8edea',
    borderRadius: '8px',
    outline: 'none',
    background: '#fafafa',
    color: '#333',
    transition: 'border 0.3s ease, box-shadow 0.3s ease',
    width: '100%',
    boxSizing: 'border-box',
  },
  select: {
    padding: '12px',
    fontSize: '1rem',
    border: '1px solid #e8edea',
    borderRadius: '8px',
    outline: 'none',
    background: '#fafafa',
    color: '#333',
    transition: 'border 0.3s ease, box-shadow 0.3s ease',
    appearance: 'none',
    cursor: 'pointer',
    width: '100%',
    boxSizing: 'border-box',
  },
  inputLabel: {
    fontSize: '1rem',
    color: '#2a5c42',
    marginBottom: '8px',
    fontWeight: '600',
  },
  errorText: {
    fontSize: '0.8rem',
    color: '#c62828',
    marginTop: '5px',
    animation: 'pulse 0.5s ease',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '15px',
    marginTop: '20px',
    animation: 'slideUp 0.5s ease-out',
  },
  saveButton: {
    background: '#2a5c42',
    color: 'white',
    padding: '12px',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background 0.3s ease, transform 0.3s ease',
    flex: 1,
  },
  cancelButton: {
    background: '#90a4ae',
    color: 'white',
    padding: '12px',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background 0.3s ease, transform 0.3s ease',
    flex: 1,
  },
  popupOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  popup: {
    background: '#ffffff',
    borderRadius: '16px',
    padding: '30px',
    textAlign: 'center',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
    border: '2px solid #2a5c42',
    animation: 'zoomIn 0.3s ease-out',
    maxWidth: '400px',
    width: '100%',
  },
  popupTitle: {
    fontSize: '1.8rem',
    color: '#2a5c42',
    marginBottom: '20px',
    fontWeight: '600',
  },
  popupButton: {
    background: '#2a5c42',
    color: 'white',
    padding: '10px 20px',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background 0.3s ease, transform 0.3s ease',
  },
  footer: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    background: '#ffffff',
    padding: '15px 0',
    textAlign: 'center',
    borderTop: '1px solid #e8edea',
    boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.05)',
    animation: 'fadeIn 0.5s ease-out',
    zIndex: 100,
  },
  footerText: {
    fontSize: '0.9rem',
    color: '#2a5c42',
    margin: 0,
    fontWeight: '400',
  },
};

// Define keyframes for animations
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`, styleSheet.cssRules.length);
styleSheet.insertRule(`
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.03); }
  }
`, styleSheet.cssRules.length);
styleSheet.insertRule(`
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`, styleSheet.cssRules.length);
styleSheet.insertRule(`
  @keyframes zoomIn {
    0% { opacity: 0; transform: scale(0.8); }
    80% { transform: scale(1.05); }
    100% { opacity: 1; transform: scale(1); }
  }
`, styleSheet.cssRules.length);

export default EmployeeRegistrationForm;