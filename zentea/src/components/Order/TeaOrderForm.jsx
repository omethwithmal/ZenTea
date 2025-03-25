import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TeaOrderForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Full_Name: '',
    Delivery_Address: '',
    Contact_Number: '',
    Email_Address: '',
    Select_Tea_Type: 'green',
    Quantity: 1,
    Price: '',
  });

  const [errors, setErrors] = useState({
    Full_Name: '',
    Delivery_Address: '',
    Contact_Number: '',
    Email_Address: '',
    Price: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const formatPrice = (value) => {
    if (!value) return '';
    
    // Remove any existing formatting
    const numValue = value.replace(/[^0-9.]/g, '');
    
    // If empty after cleaning, return empty
    if (!numValue) return '';
    
    // If value already has exactly two decimal places, return as is
    if (/\.\d{2}$/.test(numValue)) return numValue;
    
    // If value has one decimal digit, add a zero
    if (/\.\d$/.test(numValue)) return `${numValue}0`;
    
    // If value is a whole number, add .00
    if (/^\d+$/.test(numValue)) return `${numValue}.00`;
    
    // For any other case, return the cleaned value
    return numValue;
  };

  const handlePriceBlur = (e) => {
    const { value } = e.target;
    const formattedPrice = formatPrice(value);
    
    if (formattedPrice !== value) {
      setFormData(prev => ({
        ...prev,
        Price: formattedPrice
      }));
      
      // Revalidate after formatting
      const error = validateField('Price', formattedPrice);
      setErrors(prev => ({
        ...prev,
        Price: error
      }));
    }
  };

  const validateField = (name, value) => {
    let error = '';
    
    switch (name) {
      case 'Full_Name':
        if (!value.trim()) {
          error = 'Full Name is required';
        } else if (!/^[a-zA-Z\s]*$/.test(value)) {
          error = 'Name should only contain letters and spaces';
        } else if (/\d/.test(value)) {
          error = 'Name cannot contain numbers';
        }
        break;
      case 'Delivery_Address':
        if (!value.trim()) {
          error = 'Delivery Address is required';
        }
        break;
      case 'Contact_Number':
        if (!value.trim()) {
          error = 'Contact Number is required';
        } else if (!/^\d+$/.test(value)) {
          error = 'Contact Number should only contain numbers';
        } else if (value.length !== 10) {
          error = 'Contact Number must be 10 digits';
        }
        break;
      case 'Email_Address':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Please enter a valid email address';
        }
        break;
      case 'Price':
        if (!value.trim()) {
          error = 'Price is required';
        } else if (!/^\d+(\.\d{1,2})?$/.test(value)) {
          error = 'Price should be a valid positive number';
        } else if (parseFloat(value) <= 0) {
          error = 'Price must be greater than 0';
        } else if (value.includes('-')) {
          error = 'Price cannot be negative';
        }
        break;
      default:
        break;
    }
    
    return error;
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
    
    // Validate all fields
    Object.keys(formData).forEach(key => {
      if (key !== 'Select_Tea_Type' && key !== 'Quantity') {
        const error = validateField(key, formData[key]);
        newErrors[key] = error;
        if (error) isValid = false;
      }
    });
    
    // Check for empty fields
    Object.keys(formData).forEach(key => {
      if (key !== 'Select_Tea_Type' && key !== 'Quantity') {
        if (!formData[key].trim()) {
          newErrors[key] = `${key.replace('_', ' ')} is required`;
          isValid = false;
        }
      }
    });
    
    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Block invalid characters based on field type
    let processedValue = value;
    if (name === 'Full_Name') {
      // Block numbers in name field
      processedValue = value.replace(/[0-9]/g, '');
    } else if (name === 'Contact_Number') {
      // Block non-numeric characters in contact number
      processedValue = value.replace(/\D/g, '').substring(0, 10);
    } else if (name === 'Price') {
      // Block non-numeric characters in price (except decimal)
      processedValue = value.replace(/[^0-9.]/g, '');
      // Ensure only one decimal point
      const decimalCount = processedValue.split('.').length - 1;
      if (decimalCount > 1) {
        processedValue = processedValue.substring(0, processedValue.lastIndexOf('.'));
      }
      // Limit to 2 decimal places
      const decimalIndex = processedValue.indexOf('.');
      if (decimalIndex !== -1) {
        processedValue = processedValue.substring(0, decimalIndex + 3);
      }
    }
    
    // Validate the field
    const error = validateField(name, processedValue);
    
    setErrors({
      ...errors,
      [name]: error
    });
    
    setFormData({ 
      ...formData, 
      [name]: processedValue 
    });
  };

  const handleQuantityChange = (action) => {
    setFormData((prevData) => ({
      ...prevData,
      Quantity: action === 'increment' ? prevData.Quantity + 1 : Math.max(1, prevData.Quantity - 1),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Format price before submission if it's not empty
    if (formData.Price.trim()) {
      const formattedPrice = formatPrice(formData.Price);
      setFormData(prev => ({
        ...prev,
        Price: formattedPrice
      }));
    }
    
    // Validate the entire form before submission
    const isValid = validateForm();
    
    if (!isValid) {
      setSubmitError('Please fix all errors before submitting');
      return;
    }
    
    setIsLoading(true);
    setSubmitError(null);

    try {
      const response = await axios.post('http://localhost:8070/order/add', formData, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 200 && response.data.orders) {
        navigate('/payment', { state: { orderData: response.data.orders } });
      } else {
        throw new Error('Failed to submit order');
      }
    } catch (err) {
      setSubmitError(err.response?.data?.message || 'An error occurred while submitting the order');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="tea-order-container">
      <div className="tea-order-card">
        <h1 className="tea-order-title">Tea Order Form</h1>
        {submitError && <p className="error-message">{submitError}</p>}
        <form onSubmit={handleSubmit} className="tea-order-form">
          <div className="form-group">
            <input 
              type="text" 
              name="Full_Name" 
              placeholder="Full Name" 
              value={formData.Full_Name} 
              onChange={handleChange} 
              className={`form-input ${errors.Full_Name ? 'input-error' : ''}`}
            />
            {errors.Full_Name && <span className="error-text">{errors.Full_Name}</span>}
          </div>
          
          <div className="form-group">
            <input 
              type="text" 
              name="Delivery_Address" 
              placeholder="Delivery Address" 
              value={formData.Delivery_Address} 
              onChange={handleChange} 
              className={`form-input ${errors.Delivery_Address ? 'input-error' : ''}`}
            />
            {errors.Delivery_Address && <span className="error-text">{errors.Delivery_Address}</span>}
          </div>
          
          <div className="form-group">
            <input 
              type="tel" 
              name="Contact_Number" 
              placeholder="Contact Number" 
              value={formData.Contact_Number} 
              onChange={handleChange} 
              maxLength="10"
              className={`form-input ${errors.Contact_Number ? 'input-error' : ''}`}
            />
            {errors.Contact_Number && <span className="error-text">{errors.Contact_Number}</span>}
          </div>
          
          <div className="form-group">
            <input 
              type="email" 
              name="Email_Address" 
              placeholder="Email Address" 
              value={formData.Email_Address} 
              onChange={handleChange} 
              className={`form-input ${errors.Email_Address ? 'input-error' : ''}`}
            />
            {errors.Email_Address && <span className="error-text">{errors.Email_Address}</span>}
          </div>
          
          <div className="form-group">
            <select 
              name="Select_Tea_Type" 
              value={formData.Select_Tea_Type} 
              onChange={handleChange}
              className="form-select"
            >
              <option value="green">Green Tea</option>
              <option value="black">Black Tea</option>
              <option value="herbal">Herbal Tea</option>
              <option value="oolong">Oolong Tea</option>
            </select>
          </div>
          
          <div className="form-group quantity-group">
            <label>Quantity:</label>
            <div className="quantity-control">
              <button 
                type="button" 
                onClick={() => handleQuantityChange('decrement')}
                className="quantity-btn"
              >
                -
              </button>
              <span className="quantity-value">{formData.Quantity}</span>
              <button 
                type="button" 
                onClick={() => handleQuantityChange('increment')}
                className="quantity-btn"
              >
                +
              </button>
            </div>
          </div>
          
          <div className="form-group">
            <input 
              type="text" 
              name="Price" 
              placeholder="Price (LKR)" 
              value={formData.Price} 
              onChange={handleChange}
              onBlur={handlePriceBlur}
              className={`form-input ${errors.Price ? 'input-error' : ''}`}
            />
            {errors.Price && <span className="error-text">{errors.Price}</span>}
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading}
            className="submit-btn"
          >
            {isLoading ? 'Submitting...' : 'Submit Order'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TeaOrderForm;

// CSS Styles
const styles = `
  .tea-order-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    width: 1600px;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    padding: 20px;
  }

  .tea-order-card {
    background: white;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    padding: 30px;
    width: 100%;
    max-width: 500px;
    transition: all 0.3s ease;
  }

  .tea-order-card:hover {
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  }

  .tea-order-title {
    color: #2c3e50;
    margin-bottom: 25px;
    font-size: 28px;
    text-align: center;
  }

  .tea-order-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .form-input, .form-select {
    padding: 12px 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 16px;
    transition: all 0.3s;
  }

  .form-input:focus, .form-select:focus {
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
    outline: none;
  }

  .input-error {
    border-color: #e74c3c;
  }

  .error-text {
    color: #e74c3c;
    font-size: 14px;
    margin-top: 2px;
  }

  .quantity-group {
    align-items: center;
  }

  .quantity-control {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-top: 5px;
  }

  .quantity-btn {
    width: 40px;
    height: 40px;
    border: none;
    background-color: #3498db;
    color: white;
    border-radius: 50%;
    font-size: 18px;
    cursor: pointer;
    transition: all 0.3s;
  }

  .quantity-btn:hover {
    background-color: #2980b9;
    transform: scale(1.05);
  }

  .quantity-value {
    font-size: 18px;
    font-weight: bold;
    min-width: 30px;
    text-align: center;
  }

  .submit-btn {
    background-color: #2ecc71;
    color: white;
    border: none;
    padding: 14px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s;
    margin-top: 10px;
  }

  .submit-btn:hover {
    background-color: #27ae60;
    transform: translateY(-2px);
  }

  .submit-btn:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
    transform: none;
  }

  .error-message {
    color: #e74c3c;
    background-color: #fadbd8;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 20px;
    text-align: center;
  }

  label {
    font-weight: 500;
    color: #34495e;
    font-size: 14px;
  }
`;

// Add styles to the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);