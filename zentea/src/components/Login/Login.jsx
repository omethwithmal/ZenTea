import React, { useState } from 'react';
import './Login.css'; // Import your CSS file

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (

        <div className='IT22090508-body'>
        
        <div className="IT22090508-LogIn-auth-container">
            {/* Login Section */}
            <div className="IT22090508-LogIn-auth-box login-box">
                <h2>Login</h2>
                <form className="IT22090508-LogIn-auth-form" action="#" method="POST">
                    <div className="IT22090508-LogIn-form-group">
                        <label htmlFor="login-email">Email Address</label>
                        <input
                            type="email"
                            id="login-email"
                            name="email"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="IT22090508-LogIn-form-group">
                        <label htmlFor="login-password">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="login-password"
                            name="password"
                            placeholder="Enter your password"
                            required
                        />
                        <i
                            className={`eye-icon fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                            onClick={togglePasswordVisibility}
                        ></i>
                    </div>
                    <button type="submit" className="IT22090508-LogIn-btn">
                        Login
                    </button>
                    <p>
                        Don't have an account?{' '}
                        <a href="signup.html">Sign Up</a>
                    </p>
                </form>
            </div>
        </div>
        </div>
        
    );
};

export default LoginPage;