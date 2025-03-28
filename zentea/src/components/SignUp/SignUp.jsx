import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './SignUp.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    password: "",
    userType: "",
  });

  const navigate = useNavigate(); // 👉 React Router Hook

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8070/login/registerUser", formData);
      console.log("Response:", response.data);
      alert("User registered successfully!");
      navigate("/login"); // 👉 Navigate to Login Page
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="IT22090508-Signup-blackground">
      <div className='IT22090508-Signup-body'>
        <div className="IT22090508-SignUp-auth-container">
          <div className="IT22090508-SignUp-auth-box signup-box">
            <h2>Sign Up</h2>
            <form className="IT22090508-SignUp-auth-form" onSubmit={handleSubmit}>
              <div className="IT22090508-SignUp-form-group">
                <label htmlFor="signup-name">Full Name</label>
                <input
                  type="text"
                  id="signup-name"
                  name="name"
                  placeholder="Enter your full name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="IT22090508-SignUp-form-group">
                <label htmlFor="signup-email">Email Address</label>
                <input
                  type="email"
                  id="signup-email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="IT22090508-SignUp-form-group">
                <label htmlFor="signup-gender">Gender</label>
                <select
                  id="signup-gender"
                  name="gender"
                  required
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="" disabled>Select your gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="IT22090508-SignUp-form-group">
                <label htmlFor="signup-password">Password</label>
                <input
                  type="password"
                  id="signup-password"
                  name="password"
                  placeholder="Create a password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="IT22090508-SignUp-form-group">
                <label htmlFor="signup-role">User Role</label>
                <select
                  id="signup-role"
                  name="userType"
                  required
                  value={formData.userType}
                  onChange={handleChange}
                >
                  <option value="" disabled>Select your role</option>
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                  <option value="Employee">Employee</option>
                </select>
              </div>
              <button type="submit" className="btn">Sign Up</button>
              <p>
                Already have an account? <a href="/login">Login</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
