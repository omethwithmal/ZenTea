import React from "react";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";

const Notifications = () => {
  // Sample notification data
  const notifications = [
    {
      id: 1,
      type: "whatsapp",
      message: "Your salary payment has been processed for this month"
    },
    {
      id: 2,
      type: "email",
      message: "Your leave request has been approved by HR"
    },
    {
      id: 3,
      type: "whatsapp",
      message: "Reminder: Submit your timesheet by Friday"
    }
  ];

  const handleWhatsApp = () => {
    const url = "https://wa.me/"; // Opens WhatsApp
    window.open(url, "_blank");
  };

  const handleEmail = (message) => {
    const mailtoLink = `mailto:hr@teafactory.com?subject=${encodeURIComponent(
      "Regarding your notification"
    )}&body=${encodeURIComponent("About: " + message + "\n\nMy response:")}`;
    window.open(mailtoLink, "_blank");
  };

  // Track whether WhatsApp button has been shown to prevent duplicates
  let whatsappButtonShown = false;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Notifications</h2>

      {notifications.length === 0 ? (
        <p style={styles.noData}>No notifications available</p>
      ) : (
        <div style={styles.notificationsList}>
          {notifications.map((notification) => (
            <div key={notification.id} style={styles.notificationCard}>
              <div style={styles.buttonContainer}>
                {notification.type === "whatsapp" && !whatsappButtonShown ? (
                  <button
                    style={styles.whatsappButton}
                    onClick={handleWhatsApp}
                  >
                    <FaWhatsapp style={styles.buttonIcon} />
                    Open WhatsApp
                  </button>
                ) : null}

                {notification.type === "email" ? (
                  <button
                    style={styles.emailButton}
                    onClick={() => handleEmail(notification.message)}
                  >
                    <FaEnvelope style={styles.buttonIcon} />
                    Open Email
                  </button>
                ) : null}

                {/* Ensure the WhatsApp button only shows once */}
                {notification.type === "whatsapp" && !whatsappButtonShown
                  ? (whatsappButtonShown = true)
                  : null}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "40px auto",
    padding: "30px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: "linear-gradient(135deg, #00bcd4, #8e44ad)", // Gradient background
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
  },
  heading: {
    color: "#fff", // White text for contrast
    marginBottom: "30px",
    fontSize: "28px",
    textAlign: "center",
    fontWeight: "600"
  },
  noData: {
    color: "#fff",
    fontSize: "18px",
    textAlign: "center",
    margin: "40px 0"
  },
  notificationsList: {
    display: "flex",
    flexDirection: "column",
    gap: "30px" // Increased gap between notifications
  },
  notificationCard: {
    backgroundColor: "#f9f9f9", // Light grey background for cards
    borderRadius: "12px",
    padding: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    ":hover": {
      transform: "translateY(-3px)",
      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)"
    }
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row", // Ensuring buttons are in a row
    gap: "15px", // Space between buttons
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "0", // Ensuring no margin is added underneath the buttons
  },
  whatsappButton: {
    display: "flex",
    alignItems: "center",
    padding: "16px 24px", // Bigger button size
    backgroundColor: "#25D366", // WhatsApp color
    color: "white",
    border: "none",
    borderRadius: "10px", // Rounded corners
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "18px", // Increased font size
    transition: "all 0.2s ease",
    ":hover": {
      backgroundColor: "#128C7E", // Darker shade on hover
      transform: "scale(1.05)"
    }
  },
  emailButton: {
    display: "flex",
    alignItems: "center",
    padding: "16px 24px", // Bigger button size
    backgroundColor: "#3498db", // Email blue color
    color: "white",
    border: "none",
    borderRadius: "10px", // Rounded corners
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "18px", // Increased font size
    transition: "all 0.2s ease",
    ":hover": {
      backgroundColor: "#2980b9", // Darker shade on hover
      transform: "scale(1.05)"
    }
    
  },
  buttonIcon: {
    marginRight: "12px",
    fontSize: "20px" // Slightly bigger icon size
  }
};

export default Notifications;