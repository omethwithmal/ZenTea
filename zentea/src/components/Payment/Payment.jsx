import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const CheckoutForm = () => {
  const location = useLocation();
  const [selectedMethod, setSelectedMethod] = useState("Credit Card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiry, setExpiry] = useState("");
  const [amount, setAmount] = useState(0);
  const [showPopup, setShowPopup] = useState(false); // Popup state

  useEffect(() => {
    if (location.state?.orderData?.Price) {
      // Directly use the LKR amount without conversion
      setAmount(parseFloat(location.state.orderData.Price).toFixed(2));
    }
  }, [location.state]);


  const handlePayment = () => {
    
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
    setTimeout(() => setShowPopup(false), 3000); // Hide popup after 3 seconds
   
   };
    
    const maskCardNumber = (number) => {
      if (!number) return "";
      const last4 = number.slice(-4);
      return `XXXX-XXXX-XXXX-${last4}`;
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
              onChange={(e) => setCardNumber(e.target.value)} 
              style={styles.input} 
              placeholder="Enter card number"
            />

            <label className="card-name-label" style={styles.label}>Name on Card</label>
            <input className="card-name-input" type="text" placeholder="Enter name" style={styles.input} />
            {(e) => setCardName(e.target.value)} 
     

            <div className="card-details-row" style={styles.row}>
              <div>
                <label className="cvv-label" style={styles.label}>CVV CODE</label>
                <input className="cvv-input" type="password" style={styles.inputSmall} placeholder="***" />
               {(e) => setCvv(e.target.value)} 
              
              </div>
              <div>
                <label className="expiry-label" style={styles.label}>Expiration date</label>
                <input className="expiry-input" type="text" placeholder="MM/YY" style={styles.inputSmall} />
                {(e) => setExpiry(e.target.value)} 

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
          <input className="terms-input" type="checkbox" id="terms" />
          <label className="terms-label" htmlFor="terms">
            I have read & agree to <span className="terms-link" style={styles.link}>Terms & Conditions</span>
          </label>
        </div>

        <button className="submit-order-btn" style={styles.button} onClick={handlePayment}>
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
            <button onClick={() => setShowPopup(false)} style={styles.popupCloseButton}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    width: "1550px",
    margin: "auto",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
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
    maxWidth: "350px",
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
    marginBottom: "15px",
    fontSize: "14px",
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
  },
  checkboxContainer: {
    margin: "20px 0",
    display: "flex",
    alignItems: "center",
    gap: "5px",
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
  },
};

export default CheckoutForm;
