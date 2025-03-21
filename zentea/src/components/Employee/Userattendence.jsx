import React from 'react';
import './Userattendence.css'; // Make sure to update your CSS file with new class names

const AttendanceForm = () => {
    return (

      <div className='IT22090508-userAttendence-form-container-body'>
        <div className="IT22090508-userAttendence-form-container">
            <div className="IT22090508-userAttendence-form-header">
                <h2>Attendance Record</h2>
            </div>
            
            <div className="IT22090508-userAttendence-form-body">
                <form>
                    <div className="IT22090508-userAttendence-form-group">
                        <label htmlFor="name">Full Name</label>
                        <input 
                            type="text" 
                            id="name" 
                            placeholder="Enter your name" 
                            required 
                            className="IT22090508-userAttendence-form-input"
                        />
                    </div>
                    
                    <div className="IT22090508-userAttendence-form-group">
                        <label htmlFor="id">Employee ID</label>
                        <input 
                            type="text" 
                            id="id" 
                            placeholder="e.g. EMP-1234" 
                            required 
                            className="IT22090508-userAttendence-form-input"
                        />
                    </div>

                    <div className="IT22090508-userAttendence-form-group">
                        <label htmlFor="date">Date</label>
                        <input 
                            type="date" 
                            id="date" 
                            required 
                            className="IT22090508-userAttendence-form-input"
                        />
                    </div>

                    <div className="IT22090508-userAttendence-time-row">
                        <div className="IT22090508-userAttendence-form-group">
                            <label htmlFor="in-time">In Time</label>
                            <input 
                                type="time" 
                                id="in-time" 
                                required 
                                className="IT22090508-userAttendence-form-input"
                            />
                        </div>
                        <div className="IT22090508-userAttendence-form-group">
                            <label htmlFor="out-time">Out Time</label>
                            <input 
                                type="time" 
                                id="out-time" 
                                required 
                                className="IT22090508-userAttendence-form-input"
                            />
                        </div>
                    </div>

                    <div className="IT22090508-userAttendence-form-group">
                        <label htmlFor="department">Department</label>
                        <select 
                            id="department" 
                            className="IT22090508-userAttendence-department-select" 
                            required
                        >
                            <option value="">Select Department</option>
                            <option value="HR">Human Resources (HR)</option>
                            <option value="Sales">Sales & Marketing</option>
                            <option value="Maintenance">Maintenance Department</option>
                            <option value="Quality">Quality Control Department</option>
                            <option value="Production">Production Department</option>
                        </select>
                    </div>

                    <button 
                        type="submit" 
                        className="IT22090508-userAttendence-submit-btn"
                    >
                        Submit Attendance
                    </button>
                </form>
            </div>
            
            <div className="IT22090508-userAttendence-form-footer">
                &copy; Experience the art of tea with Zen Tea. Handcrafted blends, sourced sustainably, and brewed with love.
            </div>
        </div>
        </div>
    );
};

export default AttendanceForm;