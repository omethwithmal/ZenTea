import React from "react";
import Navbar from "./naveBar"; // Import the Navbar component

const HomePage = () => {
  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div style={styles.container}>
        {/* Hero Section */}
        <header style={styles.header}>
          <h1 style={styles.title}>ZenTea</h1>
          <p style={styles.tagline}>Experience the Serenity in Every Sip</p>
          <button
            style={styles.ctaButton}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#1e4631";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#2a5c42";
              e.target.style.transform = "translateY(0)";
            }}
          >
            Explore Our Blends
          </button>
        </header>

        {/* Company Overview */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Our Tea Philosophy</h2>
          <p style={styles.sectionContent}>
            At ZenTea, we are passionate about delivering the finest tea blends from the heart of Sri Lanka to tea lovers around the world. 
            Our mission is to offer a unique and refreshing tea experience with a focus on quality, sustainability, and wellness. 
            Whether you're new to tea or a seasoned enthusiast, we provide the perfect selection to suit your taste.
          </p>
          <img
            src="https://images.unsplash.com/photo-1534957753291-64d667ce2927"
            alt="Tea plantation"
            style={styles.teaImage}
          />
        </section>

        {/* Our Story */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Our Story</h2>
          <p style={styles.sectionContent}>
            Founded in 2020, ZenTea started with a simple goal – to share the beauty of Sri Lankan tea culture with the world. 
            What began as a small local initiative has grown into a global brand loved by tea enthusiasts across the globe. 
            We believe in quality, sustainability, and community – values that are at the heart of everything we do.
          </p>
        </section>

        {/* Team Members */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Meet Our Tea Masters</h2>
          <div style={styles.teamContainer}>
            <div style={styles.teamMember}>
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a"
                alt="Tea master"
                style={styles.teamImage}
              />
              <h3>Ananda Perera</h3>
              <p>Head Tea Blender</p>
            </div>
            <div style={styles.teamMember}>
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2"
                alt="Tea master"
                style={styles.teamImage}
              />
              <h3>Priyanka Fernando</h3>
              <p>Quality Control Specialist</p>
            </div>
            <div style={styles.teamMember}>
              <img
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956"
                alt="Tea master"
                style={styles.teamImage}
              />
              <h3>Rajiv Bandara</h3>
              <p>Sustainability Director</p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section style={{ ...styles.section, textAlign: "center" }}>
          <h2 style={styles.sectionTitle}>Ready for Your Zen Moment?</h2>
          <p style={styles.sectionContent}>
            Discover our collection of premium teas and start your journey to mindfulness today.
          </p>
          <button
            style={styles.ctaButton}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#1e4631";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#2a5c42";
              e.target.style.transform = "translateY(0)";
            }}
          >
            Shop Now
          </button>
        </section>

        {/* Footer */}
        <footer style={styles.footer}>
          <div style={styles.footerContent}>
            <div style={styles.footerColumn}>
              <h3 style={styles.footerTitle}>ZenTea</h3>
              <p style={{ color: "#e0e0e0", lineHeight: "1.6" }}>
                Bringing serenity through premium tea blends since 2020.
              </p>
              <div style={styles.socialIcons}>
                <a href="#" style={styles.socialIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                  </svg>
                </a>
                <a href="#" style={styles.socialIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" style={styles.socialIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>
            <div style={styles.footerColumn}>
              <h3 style={styles.footerTitle}>Quick Links</h3>
              <a href="#" style={styles.footerLink}>Home</a>
              <a href="#" style={styles.footerLink}>Our Teas</a>
              <a href="#" style={styles.footerLink}>About Us</a>
              <a href="#" style={styles.footerLink}>Sustainability</a>
              <a href="#" style={styles.footerLink}>Blog</a>
            </div>
            <div style={styles.footerColumn}>
              <h3 style={styles.footerTitle}>Customer Service</h3>
              <a href="#" style={styles.footerLink}>Contact Us</a>
              <a href="#" style={styles.footerLink}>FAQs</a>
              <a href="#" style={styles.footerLink}>Shipping Info</a>
              <a href="#" style={styles.footerLink}>Returns & Exchanges</a>
              <a href="#" style={styles.footerLink}>Privacy Policy</a>
            </div>
            <div style={styles.footerColumn}>
              <h3 style={styles.footerTitle}>Contact Us</h3>
              <p style={{ color: "#e0e0e0", marginBottom: "10px" }}>123 Tea Garden Road</p>
              <p style={{ color: "#e0e0e0", marginBottom: "10px" }}>Kandy, Sri Lanka</p>
              <p style={{ color: "#e0e0e0", marginBottom: "10px" }}>info@zentea.com</p>
              <p style={{ color: "#e0e0e0", marginBottom: "10px" }}>+94 76 123 4567</p>
            </div>
          </div>
          <div style={styles.copyright}>
            <p>&copy; {new Date().getFullYear()} ZenTea. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

// Inline CSS Styles
const styles = {
  // Main container styles
  container: {
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
   
    width:"1510px",
    margin: "0 auto",
    padding: "0 20px",
    color: "#333",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    marginTop: "60px", // Adjust for fixed navbar height
    backgroundColor:'white'
   
  },
  // Header/Hero section
  header: {
   
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "500px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: "white",
    padding: "0 20px",
    marginBottom: "40px",
    backgroundColor:"red",
  },
  title: {
    fontSize: "3.5rem",
    fontWeight: "300",
    marginBottom: "20px",
    letterSpacing: "2px",
  },
  tagline: {
    fontSize: "1.5rem",
    fontWeight: "300",
    marginBottom: "30px",
    maxWidth: "700px",
  },
  // Content sections
  section: {
    marginBottom: "50px",
    padding: "0 20px",
  },
  sectionTitle: {
    fontSize: "2rem",
    color: "#2a5c42",
    marginBottom: "20px",
    borderBottom: "2px solid #2a5c42",
    paddingBottom: "10px",
    display: "inline-block",
  },
  sectionContent: {
    fontSize: "1.1rem",
    lineHeight: "1.6",
    maxWidth: "800px",
    margin: "0 auto",
  },
  // Team section
  teamContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "30px",
    marginTop: "30px",
  },
  teamMember: {
    width: "250px",
    textAlign: "center",
  },
  teamImage: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "15px",
    border: "3px solid #2a5c42",
  },
  // Images
  teaImage: {
    width: "100%",
    maxHeight: "400px",
    objectFit: "cover",
    borderRadius: "8px",
    margin: "30px 0",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  // Buttons
  ctaButton: {
    backgroundColor: "#2a5c42",
    color: "white",
    padding: "15px 30px",
    fontSize: "1.1rem",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "20px",
    transition: "all 0.3s ease",
  },
  // Footer
  footer: {
    backgroundColor: "#2a5c42",
    color: "white",
    padding: "40px 20px",
    marginTop: "auto",
  },
  footerContent: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  footerColumn: {
    flex: "1",
    minWidth: "200px",
    marginBottom: "20px",
  },
  footerTitle: {
    fontSize: "1.2rem",
    marginBottom: "20px",
    fontWeight: "500",
  },
  footerLink: {
    display: "block",
    color: "#e0e0e0",
    marginBottom: "10px",
    textDecoration: "none",
    transition: "color 0.3s ease",
  },
  socialIcons: {
    display: "flex",
    gap: "15px",
    marginTop: "15px",
  },
  socialIcon: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    backgroundColor: "#3a6c52",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s ease",
  },
  copyright: {
    textAlign: "center",
    marginTop: "40px",
    paddingTop: "20px",
    borderTop: "1px solid #3a6c52",
  },
};

export default HomePage;