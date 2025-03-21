import React, { useState } from "react";
import './SignUp.css'

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Here you can add API call to submit the form data
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
              name="role"
              required
              value={formData.role}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select your role
              </option>
              <option value="customer">Customer</option>
              <option value="inventory">Inventory Management</option>
              <option value="order">Order Management</option>
              <option value="employee">Employee Manager</option>
              <option value="equipment">Equipment Maintenance</option>
              <option value="financial">Financial Manager</option>
            </select>
          </div>
          <button type="submit" className="btn">
            Sign Up
          </button>
          <p>
            Already have an account? <a href="login.html">Login</a>
          </p>
        </form>
      </div>
    </div>
    </div>
    </div>
  );
};

export default SignUp;
