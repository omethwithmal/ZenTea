import React from "react";
import Navbar from "./naveBar";

const HomePage = () => {
  return (
    <div style={{ overflowX: "hidden" }}>
      <Navbar />

      {/* Hero Section */}
      <div style={styles.heroContainer}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>ZenTea</h1>
          <p style={styles.heroSubtitle}>Welcome to the ZenTea Employee Portal</p>
          <button 
            style={styles.primaryButton}
            onMouseEnter={(e) => (e.target.style.transform = "translateY(-3px)")}
            onMouseLeave={(e) => (e.target.style.transform = "translateY(0)")}
          >
            Explore Our Blends
          </button>
        </div>
      </div>

      {/* Tea Philosophy Section */}
      <section style={styles.sectionDark}>
        <div style={styles.sectionContent}>
          <div style={styles.textBlock}>
            <h2 style={styles.sectionTitle}>Our Tea Philosophy</h2>
            <p style={styles.sectionText}>
              We combine ancient Sri Lankan traditions with modern wellness practices to create 
              teas that nourish both body and soul.
            </p>
            <div style={styles.pillarsContainer}>
              {[
                { icon: "🌱", title: "Natural Ingredients", text: "100% organic tea leaves from family-owned estates" },
                { icon: "🌍", title: "Sustainable Practice", text: "Ethical sourcing and eco-friendly packaging" },
                { icon: "🧘", title: "Mindful Blending", text: "Expertly crafted for tranquility and focus" }
              ].map((pillar, index) => (
                <div key={index} style={styles.pillar}>
                  <div style={styles.pillarIcon}>{pillar.icon}</div>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.text}</p>
                </div>
              ))}
            </div>
          </div>
          <img 
            src="../src/assets/Tea Philosophy2.jpg" 
            style={styles.sectionImage}
            alt="Tea ceremony" 
          />
        </div>
      </section>

      {/* Our Story Section */}
      <section style={styles.sectionLight}>
        <div style={styles.sectionContentReverse}>
          <img
            src="../src/assets/Our Story.jpg"
            style={styles.sectionImage}
            alt="Tea history"
          />
          <div style={styles.textBlock}>
            <h2 style={styles.sectionTitle}>Our Story</h2>
            <p style={styles.sectionText}>
              Born in the misty hills of Kandy, ZenTea began as a small family endeavor in 2015. 
              Today, we proudly share Sri Lanka's tea heritage with over 30 countries worldwide.
            </p>
            <div style={styles.statsContainer}>
              {[
                { number: "2000+", label: "Happy Customers" },
                { number: "50+", label: "Unique Blends" },
                { number: "100%", label: "Organic Certification" }
              ].map((stat, index) => (
                <div key={index} style={styles.statItem}>
                  <h3>{stat.number}</h3>
                  <p>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tea Masters Section */}
      <section style={styles.sectionDark}>
        <div style={styles.teamSection}>
          <h2 style={styles.sectionTitle}>Meet Our Tea Masters</h2>
          <div style={styles.teamGrid}>
            {[
                { 
                  img: "../src/assets/Master Blender.jpeg",
                  name: "Ananda Perera",
                  role: "Master Blender",
                  bio: "15 years experience in traditional Ceylon tea preparation"
                },
                {
                  img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
                  name: "Priyanka Fernando",
                  role: "Quality Control",
                  bio: "Ensuring premium quality in every batch"
                },
                {
                  img: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
                  name: "Rajiv Bandara",
                  role: "Sustainability Head",
                  bio: "Pioneering eco-friendly tea production"
                }
              ].map((member, index) => (
                <div key={index} style={styles.teamCard}>
                  <img src={member.img} style={styles.teamPhoto} alt={member.name} />
                  <h3>{member.name}</h3>
                  <p style={styles.teamRole}>{member.role}</p>
                  <p style={styles.teamBio}>{member.bio}</p>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerColumn}>
            <h3 style={styles.footerTitle}>ZenTea</h3>
            <p style={styles.footerText}>
              Experience the art of premium tea blending since 2015
            </p>
            <div style={styles.socialLinks}>
              {["Instagram", "Facebook", "Twitter"].map((platform, index) => (
                <a key={index} href="#" style={styles.socialLink}>{platform}</a>
              ))}
            </div>
          </div>

          <div style={styles.footerColumn}>
            <h3 style={styles.footerTitle}>Quick Links</h3>
            {["Our Story", "Tea Collections", "Brewing Guide", "Wholesale"].map((link, index) => (
              <a key={index} href="#" style={styles.footerLink}>{link}</a>
            ))}
          </div>

          <div style={styles.footerColumn}>
            <h3 style={styles.footerTitle}>Support</h3>
            {["Contact Us", "Shipping Policy", "Returns & Exchanges", "FAQ"].map((link, index) => (
              <a key={index} href="#" style={styles.footerLink}>{link}</a>
            ))}
          </div>

          <div style={styles.footerColumn}>
            <h3 style={styles.footerTitle}>Contact</h3>
            <p style={styles.footerText}>
              123 Tea Garden Road<br/>
              Kandy, Sri Lanka<br/>
              info@zentea.com<br/>
              +94 76 123 4567
            </p>
          </div>
        </div>

        <div style={styles.copyright}>
          <p>© {new Date().getFullYear()} ZenTea. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const styles = {
  heroContainer: {
    height: "90vh",
    width:"1513px",
    background: "linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url('../src/assets/home2.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    textAlign: "center",
    padding: "0 20px"
  },
  heroContent: {
    maxWidth: "800px",
  },
  heroTitle: {
    fontSize: "4rem",
    fontWeight: "300",
    marginBottom: "1rem",
    letterSpacing: "2px",
    
  },
  heroSubtitle: {
    fontSize: "1.5rem",
    marginBottom: "2rem",
    fontWeight: "300",
    color: "white",
  },
  primaryButton: {
    padding: "15px 40px",
    fontSize: "1.1rem",
    backgroundColor: "#2a5c42",
    color: "white",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
  },
  sectionDark: {
    backgroundColor: "#f8faf7",
    padding: "80px 20px"
  },
  sectionLight: {
    backgroundColor: "white",
    padding: "80px 20px"
  },
  sectionContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "50px",
    alignItems: "center"
  },
  sectionContentReverse: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    direction: "rtl"
  },
  sectionImage: {
    width: "100%",
    borderRadius: "15px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
  },
  textBlock: {
    padding: "30px"
  },
  sectionTitle: {
    fontSize: "2.5rem",
    color: "#2a5c42",
    marginBottom: "2rem",
    position: "relative",
    "::after": {
      content: "''",
      position: "absolute",
      bottom: "-10px",
      left: "0",
      width: "60px",
      height: "3px",
      backgroundColor: "#2a5c42"
    }
  },
  sectionText: {
    fontSize: "1.1rem",
    lineHeight: "1.8",
    color: "#555",
    marginBottom: "2rem"
  },
  pillarsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "30px",
    marginTop: "40px"
  },
  pillar: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 5px 15px rgba(0,0,0,0.05)"
  },
  pillarIcon: {
    fontSize: "2.5rem",
    marginBottom: "1rem"
  },
  statsContainer: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "40px"
  },
  statItem: {
    textAlign: "center",
    h3: {
      fontSize: "2.5rem",
      color: "#2a5c42",
      marginBottom: "0.5rem"
    },
    p: {
      color: "#777"
    }
  },
  teamSection: {
    maxWidth: "1200px",
    margin: "0 auto"
  },
  teamGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "40px",
    marginTop: "50px"
  },
  teamCard: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
    transition: "transform 0.3s ease",
    ":hover": {
      transform: "translateY(-10px)"
    }
  },
  teamPhoto: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "3px solid #2a5c42"
  },
  teamRole: {
    color: "#888",
    fontWeight: "500",
    margin: "0.5rem 0"
  },
  teamBio: {
    color: "#666",
    lineHeight: "1.6",
    marginTop: "1rem"
  },
  footer: {
    backgroundColor: "#4bbb00",
    color: "#ffffff",
    padding: "60px 20px 30px",
    marginTop: "auto",
  },
  footerContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "40px",
    paddingBottom: "40px",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
  },
  footerColumn: {
    padding: "15px",
  },
  footerTitle: {
    fontSize: "1.2rem",
    marginBottom: "1.5rem",
    fontWeight: "600",
    letterSpacing: "0.5px"
  },
  footerText: {
    color: "#e0e0e0",
    lineHeight: "1.6",
    margin: "0.8rem 0"
  },
  footerLink: {
    display: "block",
    color: "#e0e0e0",
    textDecoration: "none",
    margin: "0.5rem 0",
    transition: "color 0.3s ease",
    ":hover": {
      color: "#ffffff",
    }
  },
  socialLinks: {
    marginTop: "1.5rem",
    display: "flex",
    gap: "15px",
  },
  socialLink: {
    color: "#ffffff",
    textDecoration: "none",
    fontSize: "0.9rem",
    padding: "5px 10px",
    borderRadius: "4px",
    backgroundColor: "rgba(255,255,255,0.1)",
    transition: "all 0.3s ease",
    ":hover": {
      backgroundColor: "rgb(255, 255, 255)",
    }
  },
  copyright: {
    textAlign: "center",
    paddingTop: "30px",
    marginTop: "30px",
    color: "#ffffff",
    fontSize: "0.9rem",
   
  }
};

export default HomePage;