import React, { useState } from 'react';


const TeaOrderForm = () => {
  // State for form data
  const [formData, setFormData] = useState({
    fullName: '',
    deliveryAddress: '',
    contactNumber: '',
    email: '',
    teaType: 'green',
    quantity: 1,
    price: '', // Ensure price is calculated or entered manually
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle quantity increment/decrement
  const handleQuantityChange = (action) => {
    if (action === 'increment') {
      setFormData((prevData) => ({ ...prevData, quantity: prevData.quantity + 1 }));
    } else if (action === 'decrement' && formData.quantity > 1) {
      setFormData((prevData) => ({ ...prevData, quantity: prevData.quantity - 1 }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    alert('Order submitted successfully!');
    // Reset the form
    setFormData({
      fullName: '',
      deliveryAddress: '',
      contactNumber: '',
      email: '',
      teaType: 'green',
      quantity: 1,
      price: '',
    });
  };

  return (
    <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor:"#ffffff00",
      backgroundImage: "url(./src/assets/orderform.jpg)",
      width:"1550px",
     
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Form */}
      <form
        onSubmit={handleSubmit}
        style={{

          margin:'30px',
          marginLeft:'40px',
          width: '100%',
          maxWidth: '600px',
          padding: '30px',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          background: 'rgb(255, 255, 255)',
          border: '1px solid #e0e0e0',
          marginBottom: '40px',
        }}
      >
        <h1
          style={{
            textAlign: 'center',
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#2e7d32',
            marginBottom: '20px',
          }}
        >
          Tea Order Form
        </h1>
        {/* Full Name */}
        <div style={{ marginBottom: '20px' }}>
          <label
            htmlFor="fullName"
            style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '1rem',
              fontWeight: '500',
              color: '#333',
            }}
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            placeholder="Enter your full name"
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '1rem',
              border: '1px solid #ddd',
              borderRadius: '8px',
              outline: 'none',
              transition: 'border-color 0.3s',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#2e7d32')}
            onBlur={(e) => (e.target.style.borderColor = '#ddd')}
          />
        </div>
        {/* Delivery Address */}
        <div style={{ marginBottom: '20px' }}>
          <label
            htmlFor="deliveryAddress"
            style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '1rem',
              fontWeight: '500',
              color: '#333',
            }}
          >
            Delivery Address
          </label>
          <textarea
            id="deliveryAddress"
            name="deliveryAddress"
            value={formData.deliveryAddress}
            onChange={handleChange}
            required
            rows="3"
            placeholder="Enter your delivery address"
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '1rem',
              border: '1px solid #ddd',
              borderRadius: '8px',
              outline: 'none',
              resize: 'none',
              transition: 'border-color 0.3s',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#2e7d32')}
            onBlur={(e) => (e.target.style.borderColor = '#ddd')}
          />
        </div>
        {/* Contact Number */}
        <div style={{ marginBottom: '20px' }}>
          <label
            htmlFor="contactNumber"
            style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '1rem',
              fontWeight: '500',
              color: '#333',
            }}
          >
            Contact Number (+94)
          </label>
          <input
            type="tel"
            id="contactNumber"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            required
            placeholder="+94 XXX XXX XXXX"
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '1rem',
              border: '1px solid #ddd',
              borderRadius: '8px',
              outline: 'none',
              transition: 'border-color 0.3s',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#2e7d32')}
            onBlur={(e) => (e.target.style.borderColor = '#ddd')}
          />
        </div>
        {/* Email Address */}
        <div style={{ marginBottom: '20px' }}>
          <label
            htmlFor="email"
            style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '1rem',
              fontWeight: '500',
              color: '#333',
            }}
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email address"
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '1rem',
              border: '1px solid #ddd',
              borderRadius: '8px',
              outline: 'none',
              transition: 'border-color 0.3s',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#2e7d32')}
            onBlur={(e) => (e.target.style.borderColor = '#ddd')}
          />
        </div>
        {/* Tea Type */}
        <div style={{ marginBottom: '20px' }}>
          <label
            htmlFor="teaType"
            style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '1rem',
              fontWeight: '500',
              color: '#333',
            }}
          >
            Select Tea Type
          </label>
          <select
            id="teaType"
            name="teaType"
            value={formData.teaType}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '1rem',
              border: '1px solid #ddd',
              borderRadius: '8px',
              outline: 'none',
              transition: 'border-color 0.3s',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#2e7d32')}
            onBlur={(e) => (e.target.style.borderColor = '#ddd')}
          >
            <option value="green">Green Tea</option>
            <option value="black">Black Tea</option>
            <option value="herbal">Herbal Tea</option>
            <option value="oolong">Oolong Tea</option>
          </select>
        </div>
        {/* Quantity */}
        <div style={{ marginBottom: '20px' }}>
          <label
            htmlFor="quantity"
            style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '1rem',
              fontWeight: '500',
              color: '#333',
            }}
          >
            Quantity
          </label>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              border: '1px solid #ddd',
              borderRadius: '8px',
              overflow: 'hidden',
            }}
          >
            <button
              type="button"
              onClick={() => handleQuantityChange('decrement')}
              style={{
                padding: '12px',
                fontSize: '1.2rem',
                color: '#2e7d32',
                backgroundColor: '#f0f9ff',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
              }}
            >
              -
            </button>
            <span
              style={{
                padding: '12px',
                fontSize: '1rem',
                fontWeight: '500',
                color: '#333',
              }}
            >
              {formData.quantity}
            </span>
            <button
              type="button"
              onClick={() => handleQuantityChange('increment')}
              style={{
                padding: '12px',
                fontSize: '1.2rem',
                color: '#2e7d32',
                backgroundColor: '#f0f9ff',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
              }}
            >
              +
            </button>
          </div>
        </div>
        {/* Price */}
        <div style={{ marginBottom: '20px' }}>
          <label
            htmlFor="price"
            style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '1rem',
              fontWeight: '500',
              color: '#333',
            }}
          >
            Price
          </label>
          <input
            type="text"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            placeholder="Enter price"
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '1rem',
              border: '1px solid #ddd',
              borderRadius: '8px',
              outline: 'none',
              transition: 'border-color 0.3s',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#2e7d32')}
            onBlur={(e) => (e.target.style.borderColor = '#ddd')}
          />
        </div>
        {/* Submit Button */}
        <div style={{ textAlign: 'center' }}>
          <button
            type="submit"
            style={{
              padding: '12px 24px',
              fontSize: '1rem',
              fontWeight: '600',
              color: '#fff',
              backgroundColor: '#2e7d32',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
          >
            Submit Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default TeaOrderForm;