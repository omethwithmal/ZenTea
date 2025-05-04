import React, { useState } from 'react';


const EmpSignUp = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
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
              <input
                type="text"
                placeholder="Full Name"
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
              <input
                type="email"
                placeholder="Email Address"
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
              <select
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
                <option value="" disabled selected>
                  User Role
                </option>
                <option value="admin">Admin</option>
                <option value="employee">Employee</option>
              </select>
              <input
                type="password"
                placeholder="Password"
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
              <input
                type="password"
                placeholder="Confirm Password"
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
              <button
                style={styles.submitButton}
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
              <input
                type="email"
                placeholder="Email Address"
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
              <input
                type="password"
                placeholder="Password"
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
              <span
                style={styles.forgotPassword}
                onClick={() => alert('Forgot Password functionality to be implemented')}
              >
                Forgot Password?
              </span>
              <button
                style={styles.submitButton}
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
    background: 'linear-gradient(135deg,rgb(255, 255, 255) 0%, #f9f9f9 100%)',
    padding: '20px',
    width:'1525px',
    position: 'relative',
    overflow: 'hidden',
    
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

// Define keyframes for the text animation
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

export default EmpSignUp;