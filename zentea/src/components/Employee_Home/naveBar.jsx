import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; // Profile Icon Import

const Navbar = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigateTo = (path) => {
    navigate(path);
    setDropdownOpen(false); // Close dropdown after navigation
  };

  // Inline CSS Styles
  const styles = {
    navbar: {
        width:"1510px",
      position: "fixed", // Changed from "sticky" to "fixed"
      top: 0,
      zIndex: 50,
      background: "rgba(255, 255, 255, 0.9)",
      backdropFilter: "blur(10px)",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      padding: "10px 20px",
      left: "0", // Ensure it spans the full width of the viewport
      right: "0",
    },
    container: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    logoContainer: {
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
    },
    logo: {
      width: "40px",
      height: "40px",
      backgroundColor: "#bbf7d0",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginRight: "10px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    logoText: {
      fontSize: "20px",
      fontWeight: "bold",
      color: "#065f46",
    },
    brandName: {
      fontSize: "20px",
      fontWeight: "bold",
      color: "#1f2937",
      cursor: "pointer",
    },
    navButtons: {
      display: "flex",
      gap: "20px",
    },
    navButton: {
      fontSize: "16px",
      color: "#374151",
      cursor: "pointer",
      background: "none",
      border: "none",
      transition: "color 0.3s",
    },
    navButtonHover: {
      color: "#047857",
    },
    authButtons: {
      display: "flex",
      gap: "10px",
    },
    loginButton: {
      padding: "8px 16px",
      border: "2px solid #047857",
      color: "#047857",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "background 0.3s",
      background: "none",
    },
    loginButtonHover: {
      backgroundColor: "#d1fae5",
    },
    signupButton: {
      padding: "8px 16px",
      backgroundColor: "#047857",
      color: "#fff",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "background 0.3s",
      border: "none",
    },
    signupButtonHover: {
      backgroundColor: "#065f46",
    },
    profileContainer: {
      position: "relative",
    },
    profileButton: {
      display: "flex",
      alignItems: "center",
      fontSize: "16px",
      color: "#047857",
      background: "none",
      border: "none",
      cursor: "pointer",
      transition: "color 0.3s",
    },
    profileIcon: {
      fontSize: "30px",
      marginRight: "8px",
    },
    dropdownMenu: {
      position: "absolute",
      right: 0,
      top: "40px",
      background: "white",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      borderRadius: "8px",
      width: "150px",
      padding: "8px 0",
      display: dropdownOpen ? "block" : "none",
    },
    dropdownItem: {
      display: "block",
      width: "100%",
      textAlign: "left",
      padding: "10px 16px",
      background: "none",
      border: "none",
      cursor: "pointer",
      fontSize: "14px",
      transition: "background 0.3s",
    },
    dropdownItemHover: {
      backgroundColor: "#d1fae5",
    },
    logout: {
      color: "red",
    },
    logoutHover: {
      backgroundColor: "#fee2e2",
    },
  };

  return (
    <header style={styles.navbar}>
      <div style={styles.container}>
        {/* Logo */}
        <div style={styles.logoContainer} onClick={() => navigateTo("/")}>
          <div style={styles.logo}>
            <span style={styles.logoText}>ZT</span>
          </div>
          <span style={styles.brandName}>ZenTea</span>
        </div>

        {/* Navigation Links */}
        <nav style={styles.navButtons}>
          {["Home", "Services", "About", "Contact"].map((item) => (
            <button
              key={item}
              onClick={() => navigateTo(`/${item.toLowerCase()}`)}
              style={styles.navButton}
              onMouseOver={(e) => (e.target.style.color = styles.navButtonHover.color)}
              onMouseOut={(e) => (e.target.style.color = styles.navButton.color)}
            >
              {item}
            </button>
          ))}

          {/* Auth Buttons */}
          <div style={styles.authButtons}>
            <button
              onClick={() => navigateTo("/login")}
              style={styles.loginButton}
              onMouseOver={(e) => (e.target.style.backgroundColor = styles.loginButtonHover.backgroundColor)}
              onMouseOut={(e) => (e.target.style.backgroundColor = "transparent")}
            >
              Log In
            </button>
            <button
              onClick={() => navigateTo("/signup")}
              style={styles.signupButton}
              onMouseOver={(e) => (e.target.style.backgroundColor = styles.signupButtonHover.backgroundColor)}
              onMouseOut={(e) => (e.target.style.backgroundColor = styles.signupButton.backgroundColor)}
            >
              Sign Up
            </button>
          </div>

          {/* Profile Dropdown */}
          <div style={styles.profileContainer}>
            <button style={styles.profileButton} onClick={() => setDropdownOpen(!dropdownOpen)}>
              <FaUserCircle style={styles.profileIcon} />
              Profile
            </button>

            <div style={styles.dropdownMenu}>
              <button
                onClick={() => navigateTo("/profile")}
                style={styles.dropdownItem}
                onMouseOver={(e) => (e.target.style.backgroundColor = styles.dropdownItemHover.backgroundColor)}
                onMouseOut={(e) => (e.target.style.backgroundColor = "transparent")}
              >
                Profile
              </button>
              <button
                onClick={() => navigateTo("/logout")}
                style={{ ...styles.dropdownItem, ...styles.logout }}
                onMouseOver={(e) => (e.target.style.backgroundColor = styles.logoutHover.backgroundColor)}
                onMouseOut={(e) => (e.target.style.backgroundColor = "transparent")}
              >
                Log Out
              </button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;