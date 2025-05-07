import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EmpSignUp = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    role: '',
    password: '',
    confirmPassword: '',
  });

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setFormData({
      fullName: '',
      email: '',
      role: '',
      password: '',
      confirmPassword: '',
    });
    setErrors({
      fullName: '',
      email: '',
      role: '',
      password: '',
      confirmPassword: '',
    });
  };

  const validateFullName = (value) => {
    const regex = /^[a-zA-Z\s]*$/;
    return regex.test(value) && value.trim().length > 0;
  };

  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

  const validateRole = (value) => {
    return value === 'admin' || value === 'employee';
  };

  const validatePassword = (value) => {
    return value.length >= 8;
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    return password === confirmPassword && confirmPassword.length >= 8;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'fullName') {
      setErrors({
        ...errors,
        fullName: validateFullName(value) ? '' : 'Full Name must contain only letters and be non-empty',
      });
    } else if (name === 'email') {
      setErrors({
        ...errors,
        email: validateEmail(value) ? '' : 'Invalid email format',
      });
    } else if (name === 'role') {
      setErrors({
        ...errors,
        role: validateRole(value) ? '' : 'Please select a valid role',
      });
    } else if (name === 'password') {
      setErrors({
        ...errors,
        password: validatePassword(value) ? '' : 'Password must be at least 8 characters',
        confirmPassword:
          formData.confirmPassword && !validateConfirmPassword(value, formData.confirmPassword)
            ? 'Passwords do not match'
            : errors.confirmPassword,
      });
    } else if (name === 'confirmPassword') {
      setErrors({
        ...errors,
        confirmPassword: validateConfirmPassword(formData.password, value) ? '' : 'Passwords do not match',
      });
    }
  };

  const handleSignUp = async () => {
    const validationErrors = {
      fullName: validateFullName(formData.fullName) ? '' : 'Full Name must contain only letters and be non-empty',
      email: validateEmail(formData.email) ? '' : 'Invalid email format',
      role: validateRole(formData.role) ? '' : 'Please select a valid role',
      password: validatePassword(formData.password) ? '' : 'Password must be at least 8 characters',
      confirmPassword: validateConfirmPassword(formData.password, formData.confirmPassword)
        ? ''
        : 'Passwords do not match',
    };

    setErrors(validationErrors);

    if (Object.values(validationErrors).every((error) => error === '')) {
      try {
        const response = await axios.post('http://localhost:8070/login/registerUser', {
          fullName: formData.fullName,
          email: formData.email,
          role: formData.role,
          password: formData.password,
        });
        const user = {
          email: formData.email,
          role: formData.role,
          fullName: formData.fullName,
        };
        navigate('/EmployeeRegistrationForm', { state: { user } });
      } catch (error) {
        setErrors({
          ...errors,
          email: error.response?.data?.message || 'Failed to register user',
        });
      }
    }
  };

  const handleSignIn = async () => {
    const validationErrors = {
      email: validateEmail(formData.email) ? '' : 'Invalid email format',
      password: formData.password.length > 0 ? '' : 'Password is required',
    };

    setErrors(validationErrors);

    if (Object.values(validationErrors).every((error) => error === '')) {
      try {
        const response = await axios.post('http://localhost:8070/login/login', {
          email: formData.email,
          password: formData.password,
        });
        const user = response.data;
        navigate('/HomePage', { state: { user } });
      } catch (error) {
        setErrors({
          ...errors,
          email: error.response?.data?.message || 'Invalid email or password',
          password: error.response?.data?.message || 'Invalid email or password',
        });
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        <div style={styles.toggleContainer}>
          <button
            style={{
              ...styles.toggleButton,
              backgroundColor: !isSignUp ? '#2a5c42' : '#f0f0f0',
              color: !isSignUp ? 'white' : '#333',
            }}
            onClick={() => setIsSignUp(false)}
          >
            Sign In
          </button>
          <button
            style={{
              ...styles.toggleButton,
              backgroundColor: isSignUp ? '#2a5c42' : '#f0f0f0',
              color: isSignUp ? 'white' : '#333',
            }}
            onClick={() => setIsSignUp(true)}
          >
            Sign Up
          </button>
        </div>

        <div style={styles.formContainer}>
          {isSignUp ? (
            <div style={styles.form}>
              <h2 style={styles.formTitle}>Create Your ZenTea Account</h2>
              <div style={styles.inputWrapper}>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  style={styles.input}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#2a5c42';
                    e.target.style.boxShadow = '0 0 10px rgba(42, 92, 66, 0.3)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                {errors.fullName && <span style={styles.errorText}>{errors.fullName}</span>}
              </div>
              <div style={styles.inputWrapper}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={styles.input}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#2a5c42';
                    e.target.style.boxShadow = '0 0 10px rgba(42, 92, 66, 0.3)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                {errors.email && <span style={styles.errorText}>{errors.email}</span>}
              </div>
              <div style={styles.inputWrapper}>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  style={styles.select}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#2a5c42';
                    e.target.style.boxShadow = '0 0 10px rgba(42, 92, 66, 0.3)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <option value="" disabled>
                    User Role
                  </option>
                  <option value="admin">Admin</option>
                  <option value="employee">Employee</option>
                </select>
                {errors.role && <span style={styles.errorText}>{errors.role}</span>}
              </div>
              <div style={styles.inputWrapper}>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  style={styles.input}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#2a5c42';
                    e.target.style.boxShadow = '0 0 10px rgba(42, 92, 66, 0.3)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                {errors.password && <span style={styles.errorText}>{errors.password}</span>}
              </div>
              <div style={styles.inputWrapper}>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  style={styles.input}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#2a5c42';
                    e.target.style.boxShadow = '0 0 10px rgba(42, 92, 66, 0.3)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                {errors.confirmPassword && <span style={styles.errorText}>{errors.confirmPassword}</span>}
              </div>
              <button
                style={styles.submitButton}
                onClick={handleSignUp}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#1e4631';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#2a5c42';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Sign Up
              </button>
            </div>
          ) : (
            <div style={styles.form}>
              <h2
                style={{
                  ...styles.formTitle,
                  animation: !isSignUp ? 'fadeSlideUp 0.8s ease-out forwards' : 'none',
                }}
              >
                Welcome Back to ZenTea
              </h2>
              <div style={styles.inputWrapper}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={styles.input}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#2a5c42';
                    e.target.style.boxShadow = '0 0 10px rgba(42, 92, 66, 0.3)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                {errors.email && <span style={styles.errorText}>{errors.email}</span>}
              </div>
              <div style={styles.inputWrapper}>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  style={styles.input}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#2a5c42';
                    e.target.style.boxShadow = '0 0 10px rgba(42, 92, 66, 0.3)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                {errors.password && <span style={styles.errorText}>{errors.password}</span>}
              </div>
              <span
                style={styles.forgotPassword}
                onClick={() => alert('Forgot Password functionality to be implemented')}
              >
                Forgot Password?
              </span>
              <button
                style={styles.submitButton}
                onClick={handleSignIn}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#1e4631';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#2a5c42';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Sign In
              </button>
              <p style={styles.switchText}>
                Don’t have an account?{' '}
                <span style={styles.switchLink} onClick={toggleForm}>
                  Sign Up
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, rgb(255, 255, 255) 0%, #f9f9f9 100%)',
    padding: '20px',
    position: 'relative',
    overflow: 'hidden',
    width: '1525px',
  },
  formWrapper: {
    backgroundColor: 'rgb(255, 255, 255)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    padding: '40px',
    width: '100%',
    maxWidth: '500px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  toggleContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '30px',
  },
  toggleButton: {
    padding: '12px 20px',
    fontSize: '1.1rem',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    flex: 1,
    maxWidth: '150px',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    width: '100%',
  },
  formTitle: {
    fontSize: '2rem',
    color: '#2a5c42',
    textAlign: 'center',
    marginBottom: '20px',
    fontWeight: '300',
  },
  inputWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  input: {
    padding: '14px',
    fontSize: '1rem',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '12px',
    outline: 'none',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    color: '#333',
    transition: 'all 0.3s ease',
  },
  select: {
    padding: '14px',
    fontSize: '1rem',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '12px',
    outline: 'none',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    color: '#333',
    transition: 'all 0.3s ease',
    appearance: 'none',
    cursor: 'pointer',
  },
  errorText: {
    fontSize: '0.85rem',
    color: '#d32f2f',
    fontStyle: 'italic',
    animation: 'slideInError 0.3s ease',
  },
  submitButton: {
    backgroundColor: '#2a5c42',
    color: 'white',
    padding: '14px',
    fontSize: '1.1rem',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  forgotPassword: {
    fontSize: '0.9rem',
    color: '#2a5c42',
    textAlign: 'right',
    cursor: 'pointer',
    textDecoration: 'underline',
    transition: 'color 0.3s ease',
  },
  switchText: {
    fontSize: '0.9rem',
    color: '#333',
    textAlign: 'center',
    marginTop: '10px',
  },
  switchLink: {
    color: '#2a5c42',
    cursor: 'pointer',
    textDecoration: 'underline',
    transition: 'color 0.3s ease',
  },
};

const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes fadeSlideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`, styleSheet.cssRules.length);
styleSheet.insertRule(`
  @keyframes slideInError {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`, styleSheet.cssRules.length);

export default EmpSignUp;