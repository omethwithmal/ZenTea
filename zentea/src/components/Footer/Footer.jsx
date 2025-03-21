import React from "react";
// Import the CSS file for styling
import './Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faTwitter, faPinterest } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    {/* Logo and Description */}
                    <div className="footer-section">
                        <h2 className="footer-logo">Zen Tea</h2>
                        <p className="footer-description">
                            Experience the art of tea with Zen Tea. Handcrafted blends, sourced sustainably, and brewed with love.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-section">
                        <h3 className="footer-title">Quick Links</h3>
                        <ul className="footer-links">
                            <li><a href="#home">Home</a></li>
                            <li><a href="#about">About Us</a></li>
                            <li><a href="#products">Products</a></li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>
                    </div>

                    {/* Contact Information */}
                    <div className="footer-section">
                        <h3 className="footer-title">Contact Us</h3>
                        <p className="footer-contact">
                            <span>Email:</span> info@zentea.com<br />
                            <span>Phone:</span> +1 (123) 456-7890<br />
                            <span>Address:</span> 123 Zen Lane, Serenity City
                        </p>
                    </div>

                    {/* Social Media */}
                    <div className="footer-section">
                        <h3 className="footer-title">Follow Us</h3>
                        <div className="social-icons">
                        <a href="#" className="social-icon">
                                <FontAwesomeIcon icon={faFacebookF} />
                            </a>
                            <a href="#" className="social-icon">
                                <FontAwesomeIcon icon={faInstagram} />
                            </a>
                            <a href="#" className="social-icon">
                                <FontAwesomeIcon icon={faTwitter} />
                            </a>
                            <a href="#" className="social-icon">
                                <FontAwesomeIcon icon={faPinterest} />
                            </a>
                            <a href="#" className="social-icon">

                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="footer-bottom">
                <p>&copy; 2024 Zen Tea. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;