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

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleQuantityChange = (action) => {
    setFormData((prevData) => ({
      ...prevData,
      Quantity: action === 'increment' ? prevData.Quantity + 1 : Math.max(1, prevData.Quantity - 1),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

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
      setError(err.response?.data?.message || 'An error occurred while submitting the order');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="tea-order-container">
      <div className="tea-order-card">
        <h1 className="tea-order-title">Tea Order Form</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit} className="tea-order-form">
          <div className="form-group">
            <input 
              type="text" 
              name="Full_Name" 
              placeholder="Full Name" 
              value={formData.Full_Name} 
              onChange={handleChange} 
              required 
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <input 
              type="text" 
              name="Delivery_Address" 
              placeholder="Delivery Address" 
              value={formData.Delivery_Address} 
              onChange={handleChange} 
              required 
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <input 
              type="tel" 
              name="Contact_Number" 
              placeholder="Contact Number" 
              value={formData.Contact_Number} 
              onChange={handleChange} 
              required 
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <input 
              type="email" 
              name="Email_Address" 
              placeholder="Email Address" 
              value={formData.Email_Address} 
              onChange={handleChange} 
              required 
              className="form-input"
            />
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
              type="number" 
              name="Price" 
              placeholder="Price (LKR)" 
              value={formData.Price} 
              onChange={handleChange} 
              required 
              className="form-input"
            />
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
    height: 100vh;
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
    gap: 8px;
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