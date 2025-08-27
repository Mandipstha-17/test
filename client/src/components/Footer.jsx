import React from "react";
import "./css/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>EduPortal</h3>
          <p>Transforming education through technology and innovation.</p>
          <div className="social-icons">
            <a href="#facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#linkedin">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#courses">Courses</a>
            </li>
            <li>
              <a href="#resources">Resources</a>
            </li>
            <li>
              <a href="#about">About Us</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Support</h4>
          <ul>
            <li>
              <a href="#help">Help Center</a>
            </li>
            <li>
              <a href="#faq">FAQ</a>
            </li>
            <li>
              <a href="#contact">Contact Us</a>
            </li>
            <li>
              <a href="#privacy">Privacy Policy</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Info</h4>
          <p>
            <i className="fas fa-map-marker-alt"></i> 123 Education St, Academic
            City
          </p>
          <p>
            <i className="fas fa-phone"></i> +1 (555) 123-4567
          </p>
          <p>
            <i className="fas fa-envelope"></i> info@eduportal.com
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2023 EduPortal. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
