import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
  const location = useLocation();
  const [selectedMethod, setSelectedMethod] = useState("Credit Card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiry, setExpiry] = useState("");
  const [amount, setAmount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [errors, setErrors] = useState({
    cardNumber: "",
    cardName: "",
    cvv: "",
    expiry: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.orderData?.Price) {
      setAmount(parseFloat(location.state.orderData.Price).toFixed(2));
    }
  }, [location.state]);

  const validateCardNumber = (number) => {
    // Remove all non-digit characters
    const cleaned = number.replace(/\D/g, '');
    
    // Basic validation for card number length (typically 13-19 digits)
    if (cleaned.length < 13 || cleaned.length > 19) {
      return "Card number must be 13-19 digits";
    }
    
    return "";
  };

  const validateCardName = (name) => {
    // Only allow letters, spaces, and apostrophes
    if (!/^[A-Z\s']+$/i.test(name)) {
      return "Only letters and spaces allowed";
    }
    return "";
  };

  const validateCVV = (cvv) => {
    if (!/^\d{3,4}$/.test(cvv)) {
      return "CVV must be 3 or 4 digits";
    }
    return "";
  };

  const validateExpiry = (date) => {
    if (!/^\d{2}\/\d{2}$/.test(date)) {
      return "Invalid format (MM/YY)";
    }
    
    const [month, year] = date.split('/');
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
    
    if (month < 1 || month > 12) {
      return "Invalid month";
    }
    
    if (year < currentYear || (year == currentYear && month < currentMonth)) {
      return "Card expired";
    }
    
    return "";
  };

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    
    // Add dashes for better readability (XXXX-XXXX-XXXX-XXXX)
    if (value.length > 4) value = value.replace(/(\d{4})/, '$1-');
    if (value.length > 9) value = value.replace(/(\d{4})-(\d{4})/, '$1-$2-');
    if (value.length > 14) value = value.replace(/(\d{4})-(\d{4})-(\d{4})/, '$1-$2-$3-');
    
    // Trim to 19 digits (16 numbers + 3 dashes)
    value = value.substring(0, 19);
    
    setCardNumber(value);
    setErrors({...errors, cardNumber: validateCardNumber(value)});
  };

  const handleCardNameChange = (e) => {
    let value = e.target.value.toUpperCase(); // Convert to uppercase
    value = value.replace(/[^A-Z\s']/g, ''); // Remove non-letters
    
    setCardName(value);
    setErrors({...errors, cardName: validateCardName(value)});
  };

  const handleCVVChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    value = value.substring(0, 4); // Limit to 4 digits (some cards have 4-digit CVV)
    
    setCvv(value);
    setErrors({...errors, cvv: validateCVV(value)});
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    
    // Add slash after 2 digits
    if (value.length > 2) {
      value = value.replace(/(\d{2})/, '$1/');
    }
    
    // Limit to 5 characters (MM/YY)
    value = value.substring(0, 5);
    
    setExpiry(value);
    setErrors({...errors, expiry: validateExpiry(value)});
  };

  const handlePayment = () => {
    // Validate all fields before proceeding
    const validationErrors = {
      cardNumber: validateCardNumber(cardNumber),
      cardName: validateCardName(cardName),
      cvv: validateCVV(cvv),
      expiry: validateExpiry(expiry)
    };
    
    setErrors(validationErrors);
    
    // Check if there are any errors
    if (Object.values(validationErrors).some(error => error)) {
      return;
    }
    
    // Proceed with payment
    const newPayment = {
      amount,
      cardNumber: maskCardNumber(cardNumber),
      cardName,
      cvv,
      expiry,
    };
    
    const existingPayments = JSON.parse(localStorage.getItem("payments")) || [];
    localStorage.setItem("payments", JSON.stringify([...existingPayments, newPayment]));
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };
    
  const maskCardNumber = (number) => {
    if (!number) return "";
    const last4 = number.replace(/\D/g, '').slice(-4);
    return `XXXX-XXXX-XXXX-${last4}`;
  };

  const isFormValid = () => {
    return (
      cardNumber &&
      cardName &&
      cvv &&
      expiry &&
      !errors.cardNumber &&
      !errors.cardName &&
      !errors.cvv &&
      !errors.expiry
    );
  };

  return (
    <div className="checkout-container" style={styles.container}>
      <div className="checkout-header" style={styles.header}>
        <div className="checkout-title" style={styles.checkout}>
          <span>Checkout</span>
          <span className="total-amount" style={styles.total}>Total: Rs. {amount}</span>
        </div>
      </div>

      <h2 className="payment-method-title" style={styles.title}>My payment method</h2>

      <div className="amount-section" style={styles.form}>
        <label className="amount-label" style={styles.label}>Amount (LKR)</label>
        <input 
          className="amount-input" 
          type="number" 
          value={amount} 
          readOnly
          style={{ 
            ...styles.input,
            backgroundColor: '#f5f5f5',
            cursor: 'not-allowed'
          }} 
        />
      </div>

      <div className="payment-methods" style={styles.paymentMethods}>
        {["Credit Card", "Paypal", "Bitcoin"].map((method) => (
          <div
            key={method}
            className={`payment-method ${selectedMethod === method ? 'active' : ''}`}
            style={{
              ...styles.method,
              ...(selectedMethod === method ? styles.active : {}),
            }}
            onClick={() => setSelectedMethod(method)}
          >
            {method === "Credit Card" ? "💳" : method === "Paypal" ? "💰" : "₿"} {method}
          </div>
        ))}
      </div>

      <div className="payment-form" style={styles.form}>
        {selectedMethod === "Credit Card" && (
          <>
            <label className="card-number-label" style={styles.label}>Card number</label>
            <input 
              className="card-number-input" 
              type="text" 
              value={cardNumber} 
              onChange={handleCardNumberChange} 
              style={{
                ...styles.input,
                ...(errors.cardNumber ? styles.inputError : {})
              }} 
              placeholder="1234-5678-9012-3456"
            />
            {errors.cardNumber && <span style={styles.errorText}>{errors.cardNumber}</span>}

            <label className="card-name-label" style={styles.label}>Name on Card</label>
            <input 
              className="card-name-input" 
              type="text" 
              value={cardName}
              onChange={handleCardNameChange}
              style={{
                ...styles.input,
                ...(errors.cardName ? styles.inputError : {})
              }} 
              placeholder="JOHN DOE"
            />
            {errors.cardName && <span style={styles.errorText}>{errors.cardName}</span>}

            <div className="card-details-row" style={styles.row}>
              <div>
                <label className="cvv-label" style={styles.label}>CVV CODE</label>
                <input 
                  className="cvv-input" 
                  type="password" 
                  value={cvv}
                  onChange={handleCVVChange}
                  style={{
                    ...styles.inputSmall,
                    ...(errors.cvv ? styles.inputError : {})
                  }} 
                  placeholder="123"
                />
                {errors.cvv && <span style={styles.errorText}>{errors.cvv}</span>}
              </div>
              <div>
                <label className="expiry-label" style={styles.label}>Expiration date</label>
                <input 
                  className="expiry-input" 
                  type="text" 
                  value={expiry}
                  onChange={handleExpiryChange}
                  style={{
                    ...styles.inputSmall,
                    ...(errors.expiry ? styles.inputError : {})
                  }} 
                  placeholder="MM/YY"
                />
                {errors.expiry && <span style={styles.errorText}>{errors.expiry}</span>}
              </div>
            </div>
          </>
        )}

        {selectedMethod === "Paypal" && (
          <div className="paypal-message">
            <p>You will be redirected to PayPal to complete your payment</p>
          </div>
        )}

        {selectedMethod === "Bitcoin" && (
          <div className="bitcoin-message">
            <p>Please send Rs. {amount} worth of Bitcoin to the following address:</p>
            <p style={{fontFamily: 'monospace', wordBreak: 'break-all'}}>
              3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5
            </p>
          </div>
        )}

        <div className="terms-checkbox" style={styles.checkboxContainer}>
          <input className="terms-input" type="checkbox" id="terms" required />
          <label className="terms-label" htmlFor="terms">
            I have read & agree to <span className="terms-link" style={styles.link}>Terms & Conditions</span>
          </label>
        </div>

        <button 
          className="submit-order-btn" 
          style={{
            ...styles.button,
            ...(!isFormValid() ? styles.buttonDisabled : {})
          }} 
          onClick={handlePayment}
          disabled={!isFormValid()}
        >
          {selectedMethod === "Credit Card" ? "Pay Now" : 
           selectedMethod === "Paypal" ? "Proceed to PayPal" : "I've Sent Bitcoin"}
        </button>
      </div>

      {/* Payment Successful Popup */}
      {showPopup && (
        <div className="popup" style={styles.popup}>
          <div style={styles.popupContent}>
            <h2>Payment Successful!</h2>
            <p>Your payment has been completed successfully.</p>
            <button onClick={() => navigate("/")} style={styles.popupCloseButton}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    maxWidth: "500px",
    margin: "auto",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    minHeight: "100vh",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
    borderBottom: "1px solid #ccc",
    width: "100%",
  },
  checkout: {
    fontWeight: "bold",
    fontSize: "20px",
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  total: {
    backgroundColor: "#222",
    color: "#fff",
    padding: "5px 10px",
    borderRadius: "5px",
    marginLeft: "10px",
  },
  title: {
    textAlign: "center",
    margin: "20px 0",
    fontSize: "24px",
  },
  paymentMethods: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    cursor: "pointer",
    marginBottom: "20px",
    flexWrap: "wrap",
  },
  method: {
    padding: "10px 15px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    cursor: "pointer",
    transition: "all 0.3s",
  },
  active: {
    backgroundColor: "#E6F7FF",
    borderColor: "#009EEB",
    transform: "scale(1.05)",
  },
  form: {
    marginTop: "20px",
    width: "100%",
  },
  label: {
    display: "block",
    fontSize: "12px",
    margin: "5px 0",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginBottom: "5px",
    fontSize: "14px",
  },
  inputError: {
    borderColor: "#e74c3c",
    backgroundColor: "#fadbd8",
  },
  errorText: {
    color: "#e74c3c",
    fontSize: "12px",
    marginBottom: "15px",
    display: "block",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
  },
  inputSmall: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "14px",
    marginBottom: "5px",
  },
  checkboxContainer: {
    margin: "20px 0",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    fontSize: "14px",
  },
  link: {
    color: "#FF5733",
    cursor: "pointer",
    textDecoration: "underline",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#FF5733",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "all 0.3s",
  },
  buttonDisabled: {
    backgroundColor: "#95a5a6",
    cursor: "not-allowed",
  },
  popup: {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  popupContent: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "8px",
    textAlign: "center",
    width: "300px",
  },
  popupCloseButton: {
    backgroundColor: "#FF5733",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "15px",
  },
};

export default CheckoutForm;