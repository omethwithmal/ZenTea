import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Login.css';

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8070/login/login", formData);
            const { token, userType } = response.data;
            
            localStorage.setItem("token", token); // Save token
            alert("Login Successful!");

            if (userType === "User") {
                navigate("/");
            } else if (userType === "Admin") {
                navigate("/ManagementDashboard");
            } else if (userType === "Employee") {
                navigate("/employeeprofile");
            } else {
                alert("Invalid Role!");
            }
        } catch (error) {
            alert("Invalid email or password!");
        }
    };

    return (
        <div className='IT22090508-body'>
            <div className="IT22090508-LogIn-auth-container">
                <div className="IT22090508-LogIn-auth-box login-box">
                    <h2>Login</h2>
                    <form className="IT22090508-LogIn-auth-form" onSubmit={handleSubmit}>
                        <div className="IT22090508-LogIn-form-group">
                            <label htmlFor="login-email">Email Address</label>
                            <input
                                type="email"
                                id="login-email"
                                name="email"
                                placeholder="Enter your email"
                                required
                                value={formData.email}
                                onChange={handleChange}
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
                                value={formData.password}
                                onChange={handleChange}
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
                            Don't have an account? <a href="/signup">Sign Up</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
