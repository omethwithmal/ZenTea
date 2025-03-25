import React, { useState } from "react";

const PaymentForm = () => {
  
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    address: "",
    cardNumber: "",
    cvv: "",
    expirationMonth: "",
    expirationYear: "",
    paymentMethod: "",
    amount: "",
  });
  const [successMessage, setSuccessMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      setSuccessMessage(true);

      // Reset form
      setFormData({
        name: "",
        contact: "",
        email: "",
        address: "",
        cardNumber: "",
        cvv: "",
        expirationMonth: "",
        expirationYear: "",
        paymentMethod: "",
        amount: "",
      });

      // Hide success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(false);
      }, 3000);
    }, 2000);
  };

  return (
    <div
      style={{
        marginLeft:"350px",
        fontFamily: "'Poppins', sans-serif",
        backgroundColor: "#f9f9f9",
        padding: "40px", // Increased padding for larger form size
        maxWidth: "800px", // Increased form width
        margin: "0 auto",
        borderRadius: "12px",
        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          fontSize: "28px", // Larger title font size
          fontWeight: "600",
          color: "#333",
          marginBottom: "30px", // Increased spacing below title
        }}
      >
        <i className="fa-solid fa-credit-card" style={{ color: "#007bff" }}></i>
        Secure Payment
      </h2>

      {/* Success Message */}
      <div
        style={{
          display: successMessage ? "flex" : "none",
          alignItems: "center",
          gap: "12px",
          color: "#28a745",
          fontSize: "20px", // Larger success message font size
          fontWeight: "500",
          marginBottom: "30px",
        }}
      >
        <i className="fa-solid fa-check-circle"></i>
        Payment Successful!
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px", // Increased spacing between form elements
        }}
      >
        {/* Full Name */}
        <div style={{ position: "relative" }}>
          <label
            htmlFor="name"
            style={{
              fontSize: "18px", // Larger label font size
              fontWeight: "500",
              color: "#555",
              marginBottom: "10px", // Increased spacing below label
            }}
          >
            Full Name
          </label>
          <i
            className="fa-solid fa-address-card"
            style={{
              position: "absolute",
              top: "45px",
              left: "50px",
              color: "#aaa",
            }}
          ></i>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "15px 45px", // Increased input padding
              fontSize: "16px", // Larger input font size
              border: "1px solid #ddd",
              borderRadius: "6px",
              outline: "none",
            }}
          />
        </div>

        {/* Contact Number & Email */}
        <div
          style={{
            display: "flex",
            gap: "20px",
          }}
        >
          <div style={{ flex: 1, position: "relative" }}>
            <label
              htmlFor="contact"
              style={{
                fontSize: "18px", // Larger label font size
                fontWeight: "500",
                color: "#555",
                marginBottom: "10px", // Increased spacing below label
              }}
            >
              Contact Number
            </label>
            <i
              className="fa-solid fa-phone"
              style={{
                position: "absolute",
                top: "45px",
                left: "15px",
                color: "#aaa",
              }}
            ></i>
            <input
              type="tel"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "15px 45px", // Increased input padding
                fontSize: "16px", // Larger input font size
                border: "1px solid #ddd",
                borderRadius: "6px",
                outline: "none",
              }}
            />
          </div>
          <div style={{ flex: 1, position: "relative" }}>
            <label
              htmlFor="email"
              style={{
                fontSize: "18px", // Larger label font size
                fontWeight: "500",
                color: "#555",
                marginBottom: "10px", // Increased spacing below label
              }}
            >
              Email Address
            </label>
            <i
              className="fa-solid fa-envelope"
              style={{
                position: "absolute",
                top: "45px",
                left: "15px",
                color: "#aaa",
              }}
            ></i>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "15px 45px", // Increased input padding
                fontSize: "16px", // Larger input font size
                border: "1px solid #ddd",
                borderRadius: "6px",
                outline: "none",
              }}
            />
          </div>
        </div>

        {/* Delivery Address */}
        <div style={{ position: "relative" }}>
          <label
            htmlFor="address"
            style={{
              fontSize: "18px", // Larger label font size
              fontWeight: "500",
              color: "#555",
              marginBottom: "10px", // Increased spacing below label
            }}
          >
            Delivery Address
          </label>
          <i
            className="fa-solid fa-address-card"
            style={{
              position: "absolute",
              top: "45px",
              left: "15px",
              color: "#aaa",
            }}
          ></i>
          <textarea
            id="address"
            name="address"
            rows="3"
            value={formData.address}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "15px 45px", // Increased input padding
              fontSize: "16px", // Larger input font size
              border: "1px solid #ddd",
              borderRadius: "6px",
              outline: "none",
            }}
          ></textarea>
        </div>

        {/* Card Number & CVV */}
        <div
          style={{
            display: "flex",
            gap: "20px",
          }}
        >
          <div style={{ flex: 2, position: "relative" }}>
            <label
              htmlFor="cardNumber"
              style={{
                fontSize: "18px", // Larger label font size
                fontWeight: "500",
                color: "#555",
                marginBottom: "10px", // Increased spacing below label
              }}
            >
              Card Number
            </label>
            <i
              className="fa-solid fa-credit-card"
              style={{
                position: "absolute",
                top: "45px",
                left: "15px",
                color: "#aaa",
              }}
            ></i>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              pattern="\d{16}"
              placeholder="1234 5678 9012 3456"
              required
              style={{
                width: "100%",
                padding: "15px 45px", // Increased input padding
                fontSize: "16px", // Larger input font size
                border: "1px solid #ddd",
                borderRadius: "6px",
                outline: "none",
              }}
            />
          </div>
          <div style={{ flex: 1, position: "relative" }}>
            <label
              htmlFor="cvv"
              style={{
                fontSize: "18px", // Larger label font size
                fontWeight: "500",
                color: "#555",
                marginBottom: "10px", // Increased spacing below label
              }}
            >
              CVV
            </label>
            <i
              className="fa-solid fa-lock"
              style={{
                position: "absolute",
                top: "45px",
                left: "15px",
                color: "#aaa",
              }}
            ></i>
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              pattern="\d{3}"
              placeholder="123"
              required
              style={{
                width: "100%",
                padding: "15px 45px", // Increased input padding
                fontSize: "16px", // Larger input font size
                border: "1px solid #ddd",
                borderRadius: "6px",
                outline: "none",
              }}
            />
          </div>
        </div>

        {/* Expiration Month, Year & Payment Method */}
        <div
          style={{
            display: "flex",
            gap: "20px",
          }}
        >
          <div style={{ flex: 1, position: "relative" }}>
            <label
              htmlFor="expirationMonth"
              style={{
                fontSize: "18px", // Larger label font size
                fontWeight: "500",
                color: "#555",
                marginBottom: "10px", // Increased spacing below label
              }}
            >
              Expiration Month
            </label>
            <i
              className="fa-solid fa-calendar"
              style={{
                position: "absolute",
                top: "45px",
                left: "15px",
                color: "#aaa",
              }}
            ></i>
            <select
              id="expirationMonth"
              name="expirationMonth"
              value={formData.expirationMonth}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "15px 45px", // Increased input padding
                fontSize: "16px", // Larger input font size
                border: "1px solid #ddd",
                borderRadius: "6px",
                outline: "none",
              }}
            >
              <option value="">Month</option>
              {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0")).map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
          <div style={{ flex: 1, position: "relative" }}>
            <label
              htmlFor="expirationYear"
              style={{
                fontSize: "18px", // Larger label font size
                fontWeight: "500",
                color: "#555",
                marginBottom: "10px", // Increased spacing below label
              }}
            >
              Expiration Year
            </label>
            <i
              className="fa-solid fa-calendar"
              style={{
                position: "absolute",
                top: "45px",
                left: "15px",
                color: "#aaa",
              }}
            ></i>
            <select
              id="expirationYear"
              name="expirationYear"
              value={formData.expirationYear}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "15px 45px", // Increased input padding
                fontSize: "16px", // Larger input font size
                border: "1px solid #ddd",
                borderRadius: "6px",
                outline: "none",
              }}
            >
              <option value="">Year</option>
              {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div style={{ flex: 1, position: "relative" }}>
            <label
              htmlFor="paymentMethod"
              style={{
                fontSize: "18px", // Larger label font size
                fontWeight: "500",
                color: "#555",
                marginBottom: "10px", // Increased spacing below label
              }}
            >
              Payment Method
            </label>
            <i
              className="fa-solid fa-credit-card"
              style={{
                position: "absolute",
                top: "45px",
                left: "15px",
                color: "#aaa",
              }}
            ></i>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "15px 45px", // Increased input padding
                fontSize: "16px", // Larger input font size
                border: "1px solid #ddd",
                borderRadius: "6px",
                outline: "none",
              }}
            >
              <option value="">Select Method</option>
              <option value="visa">Visa</option>
              <option value="mastercard">Mastercard</option>
              <option value="paypal">PayPal</option>
              <option value="amex">American Express</option>
            </select>
          </div>
        </div>

        {/* Amount */}
        <div style={{ position: "relative" }}>
          <label
            htmlFor="amount"
            style={{
              fontSize: "18px", // Larger label font size
              fontWeight: "500",
              color: "#555",
              marginBottom: "10px", // Increased spacing below label
            }}
          >
            Amount
          </label>
          <i
            className="fa-solid fa-dollar-sign"
            style={{
              position: "absolute",
              top: "45px",
              left: "15px",
              color: "#aaa",
            }}
          ></i>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            min="1"
            step="0.01"
            placeholder="0.00"
            required
            style={{
              width: "100%",
              padding: "15px 45px", // Increased input padding
              fontSize: "16px", // Larger input font size
              border: "1px solid #ddd",
              borderRadius: "6px",
              outline: "none",
            }}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            padding: "15px",
            fontSize: "18px", // Larger button font size
            fontWeight: "600",
            color: "#fff",
            backgroundColor: loading ? "#ccc" : "#007bff",
            border: "none",
            borderRadius: "6px",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "background-color 0.3s ease",
          }}
        >
          {loading ? (
            <>
              <i className="fa-solid fa-spinner spin"></i>
              Processing Payment...
            </>
          ) : (
            <>
              Pay Now
              <i className="fa-solid fa-credit-card"></i>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;