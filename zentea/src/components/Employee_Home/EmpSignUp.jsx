import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

    // Real-time validation
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

  const handleSignUp = () => {
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
      // Store user data in localStorage (for demo)
      const users = JSON.parse(localStorage.getItem('zentea_users') || '[]');
      users.push({
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        role: formData.role,
      });
      localStorage.setItem('zentea_users', JSON.stringify(users));

      // Navigate to EmployeeRegistrationForm
      navigate('/EmployeeRegistrationForm', {
        state: { user: { email: formData.email, role: formData.role, fullName: formData.fullName } },
      });
    }
  };

  const handleGoogleSignUp = () => {
    // Simulate Google sign-up with dummy data
    const googleUser = {
      email: `googleuser${Date.now()}@zentea.com`, // Unique email
      fullName: 'Google User',
      role: 'employee', // Default role
    };

    // Store dummy user data in localStorage (no password for Google users)
    const users = JSON.parse(localStorage.getItem('zentea_users') || '[]');
    users.push(googleUser);
    localStorage.setItem('zentea_users', JSON.stringify(users));

    // Navigate to EmployeeRegistrationForm
    navigate('/EmployeeRegistrationForm', {
      state: { user: { email: googleUser.email, role: googleUser.role, fullName: googleUser.fullName } },
    });
  };

  const handleSignIn = () => {
    const validationErrors = {
      email: validateEmail(formData.email) ? '' : 'Invalid email format',
      password: formData.password.length > 0 ? '' : 'Password is required',
    };

    setErrors(validationErrors);

    if (Object.values(validationErrors).every((error) => error === '')) {
      // Check credentials against localStorage (for demo)
      const users = JSON.parse(localStorage.getItem('zentea_users') || '[]');
      const user = users.find(
        (u) => u.email === formData.email && u.password === formData.password
      );

      if (user) {
        // Navigate to HomePage
        navigate('/HomePage', {
          state: { user: { email: user.email, role: user.role, fullName: user.fullName } },
        });
      } else {
        setErrors({
          ...errors,
          email: 'Invalid email or password',
          password: 'Invalid email or password',
        });
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        {/* Toggle Buttons */}
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

        {/* Form */}
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
              <button
                style={styles.googleButton}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#f9f9f9';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'white';
                  e.target.style.transform = 'translateY(0)';
                }}
                onClick={handleGoogleSignUp}
              >
                <svg
                  style={styles.googleIcon}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1.02.68-2.33 1.09-3.71 1.09-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C4.01 20.39 7.64 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.64 1 4.01 3.61 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Sign Up with Google
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
  googleButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    backgroundColor: 'white',
    color: '#333',
    padding: '14px',
    fontSize: '1.1rem',
    border: '1px solid #2a5c42',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  googleIcon: {
    width: '20px',
    height: '20px',
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

// Define keyframes for animations
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