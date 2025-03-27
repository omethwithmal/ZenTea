import React, { useState } from 'react';

const EmployeeSalaryPayment = () => {
  const [formData, setFormData] = useState({
    employeeName: '',
    employeeId: '',
    accountNumber: '',
    basicSalary: '',
    otHours: '',
    paymentDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Payment Details Submitted:', formData);
    alert('Payment Successful!');
  };

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        Width: '700px',
        margin: '50px auto',
        marginLeft:'550px',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor:'#f4f4f4'
      }}
    >
      <h2
        style={{
          textAlign: 'center',
          color: '#0a8700',
          marginBottom: '20px',
        }}
      >
        Employee Salary Payment
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Employee Name */}
        <div style={{ marginBottom: '15px' }}>
          <label
            style={{
              display: 'block',
              fontWeight: 'bold',
              marginBottom: '5px',
             
            }}
          >
            Employee Name:
          </label>
          <input
            type="text"
            name="employeeName"
            value={formData.employeeName}
            onChange={handleChange}
            placeholder="Enter Employee Name"
            required
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              backgroundColor:"#f4f4f4",
              color:'black'
            }}
          />
        </div>

        {/* Employee ID */}
        <div style={{ marginBottom: '15px' }}>
          <label
            style={{
              display: 'block',
              fontWeight: 'bold',
              marginBottom: '5px',
            }}
          >
            Employee ID:
          </label>
          <input
            type="text"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            placeholder="Enter Employee ID"
            required
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
                backgroundColor:"#f4f4f4",
              color:'black'
            }}
          />
        </div>

        {/* Account Number */}
        <div style={{ marginBottom: '15px' }}>
          <label
            style={{
              display: 'block',
              fontWeight: 'bold',
              marginBottom: '5px',
            }}
          >
            Account Number:
          </label>
          <input
            type="text"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleChange}
            placeholder="Enter Account Number"
            required
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
                backgroundColor:"#f4f4f4",
              color:'black'
            }}
          />
        </div>

        {/* Basic Salary */}
        <div style={{ marginBottom: '15px' }}>
          <label
            style={{
              display: 'block',
              fontWeight: 'bold',
              marginBottom: '5px',
            }}
          >
            Basic Salary:
          </label>
          <input
            type="number"
            name="basicSalary"
            value={formData.basicSalary}
            onChange={handleChange}
            placeholder="Enter Basic Salary"
            required
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
                backgroundColor:"#f4f4f4",
              color:'black'
            }}
          />
        </div>

        {/* OT Hours */}
        <div style={{ marginBottom: '15px' }}>
          <label
            style={{
              display: 'block',
              fontWeight: 'bold',
              marginBottom: '5px',
            }}
          >
            Overtime (OT) Hours:
          </label>
          <input
            type="number"
            name="otHours"
            value={formData.otHours}
            onChange={handleChange}
            placeholder="Enter OT Hours"
            required
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
                backgroundColor:"#f4f4f4",
              color:'black'
            }}
          />
        </div>

        {/* Payment Date */}
        <div style={{ marginBottom: '20px' }}>
          <label
            style={{
              display: 'block',
              fontWeight: 'bold',
              marginBottom: '5px',
            }}
          >
            Payment Date:
          </label>
          <input
            type="date"
            name="paymentDate"
            value={formData.paymentDate}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
                backgroundColor:"#f4f4f4",
              color:'black'
            }}
          />
        </div>

        {/* Pay Button */}
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#28a745',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, hsl(130, 100%, 37%) 0%, #99ff00 100%)',
          }}
        >
          Pay
        </button>
      </form>
    </div>
  );
};

export default EmployeeSalaryPayment;