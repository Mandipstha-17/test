import React, { useState } from "react";
import "./css/Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <i className="fas fa-graduation-cap"></i>
          <span>EduLearn</span>
        </div>

        <div className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
          <div className="nav-item">
            <a href="#home" className="nav-link">
              Home
            </a>
          </div>
          <div className="nav-item">
            <a href="#about" className="nav-link">
              About
            </a>
          </div>
          <div className="nav-item">
            <a href="#contact" className="nav-link">
              Contact
            </a>
          </div>
          <div className="nav-item">
            <Link to="/login" className="login-btn">
              Login
            </Link>
          </div>
        </div>

        <div className="nav-toggle" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
