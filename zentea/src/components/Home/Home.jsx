import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import Footer from "../Footer/Footer";
import img1 from '../../assets/section2_1.jpg';
import img2 from '../../assets/section2_2.jpg';
import img3 from '../../assets/About.jpg';

function Home() {
 const navigate = useNavigate();

  return (
    <div>
      {/* Snowflakes */}
      {[...Array(20)].map((_, index) => (
        <div key={index} className="snowflake"></div>
      ))}

      {/* Navbar */}
      <nav className="IT22090508-Home-navbar">
        <h1 className="IT22090508-Home-logo">Zen Tea</h1>
        <ul className="IT22090508-Home-navbar-links">
          <li className="IT22090508-Home-active"><a href="#">Home</a></li>
          <li><a href="#">About Us</a></li>
          <li><a href="cart"> Products</a></li>
          <li><a href="#">Contact Us</a></li>
          <li><a href="#">Profile</a></li>
          <li className="IT22090508-Home-ctn">
          <button onClick={() => navigate("/login")}>Log In</button>
        </li>
        <li className="IT22090508-Home-ctn">
          <button onClick={() => navigate("/signup")}>Sign Up</button>
        </li>
        </ul>
      </nav>

      {/* Header */}
      <div className='header'>
        <header>
          <div className="IT22090508-Home-header-content">
            <h1>Zen Tea</h1>
            <div className="IT22090508-Home-line"></div>
            <div className="IT22090508-Home-main">
              <h2>Crafting Premium, Authentic Teas</h2>
              <br /><br />
              <a href="#" className="IT22090508-Home-ctn">Learn more</a>
            </div>
          </div>
        </header>
      </div>

      {/* Section 2 */}
      <section className="IT22090508-Home-section2">
        <div className="IT22090508-Home-title">
          <h1>Upcoming Our Product</h1>
        </div>
        <div className="IT22090508-Home-row">
          <div className="IT22090508-Home-col">
            <img src={img1} alt="" />
            <h4>Herbal Tea</h4>
            <p>Flavor: Spicy, aromatic, and bold, typically brewed with milk and sweetener.</p>
            <a href="#" className="IT22090508-Home-ctn">Learn more</a>
          </div>
          <div className="IT22090508-Home-col">
            <img src={img2} alt="" />
            <h4>Flavored Teas</h4>
            <p>Flavor: Base teas like green, black, or white combined with additional flavorings.</p>
            <a href="#" className="IT22090508-Home-ctn">Learn more</a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="IT22090508-About-about-section">
        <div className="IT22090508-About-container">
          <div className="IT22090508-About-about-content">
            <h2>About Zen Tea</h2>
            <p>
              Welcome to Zen Tea, where tradition meets innovation. For over two decades, we have been crafting the finest teas, sourced from the lush hills of nature's most pristine tea gardens. Our mission is simple: to deliver an unparalleled tea experience that soothes the soul and invigorates the mind.
            </p>
            <p>
              At Zen Tea, every leaf tells a story. From hand-picking the freshest leaves to blending them with care, we ensure that each cup of tea is a masterpiece. Whether you're sipping our classic green tea or exploring our exotic herbal blends, you'll taste the dedication and passion that goes into every batch.
            </p>
            <a href="#contact" className="IT22090508-About-btn">
              Contact Us
            </a>
          </div>
          <div className="IT22090508-About-about-image">
            <img src={img3} alt="" />
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="IT22090508-Contact-contact-section">
        <div className="IT22090508-Contact-container">
          <h2>Contact Zen Tea</h2>
          <p>
            Have questions or want to place an order? We'd love to hear from you! Fill out the form below, and our team will get back to you as soon as possible.
          </p>
          <div className="IT22090508-Contact-contact-container">
            <form className="IT22090508-Contact-contact-form" action="#" method="POST">
              <div className="IT22090508-Contact-form-group">
                <label htmlFor="name">Your Name</label>
                <input type="text" id="name" name="name" placeholder="Enter your name" required />
              </div>
              <div className="IT22090508-Contact-form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" name="email" placeholder="Enter your email" required />
              </div>
              <div className="IT22090508-Contact-form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="5" placeholder="Write your message here..." required />
              </div>
              <button type="submit" className="IT22090508-Contact-btn">
                Send Message
              </button>
            </form>

            {/* Contact Info */}
            <div className="IT22090508-Contact-contact-info">
              <h3>Our Contact Information</h3>
              <ul>
                <li>
                  <i className="IT22090508-Contact-icon-location"></i> 123 Tea Lane, Zen Valley, Earth
                </li>
                <li>
                  <i className="IT22090508-Contact-icon-phone"></i> +1 (123) 456-7890
                </li>
                <li>
                  <i className="IT22090508-Contact-icon-email"></i> info@zentea.com
                </li>
              </ul>
              <div className="IT22090508-Contact-social-icons">
                <a href="#">
                  <i className="IT22090508-Contact-icon-facebook"></i>
                </a>
                <a href="#">
                  <i className="IT22090508-Contact-icon-instagram"></i>
                </a>
                <a href="#">
                  <i className="IT22090508-Contact-icon-twitter"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;