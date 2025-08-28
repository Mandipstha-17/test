import React, { useState } from "react";
import "./css/Navbar.css";
import { Link } from "react-router-dom";
import Image from "../assets/logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar-og">
      <div className="nav-container-og">
        <div className="nav-logo-og">
          {/* <i className="fas fa-graduation-cap"></i> */}
          <img src={Image} alt="Logo" className="logo-image-og" />
        </div>

        <div className={`nav-menu-og ${isMenuOpen ? "active-og" : ""}`}>
          <div className="nav-item-og">
            <a href="#home" className="nav-link-og">
              Home
            </a>
          </div>
          <div className="nav-item-og">
            <a href="#about" className="nav-link-og">
              About
            </a>
          </div>
          <div className="nav-item-og">
            <a href="#contact" className="nav-link-og">
              Contact
            </a>
          </div>
          <div className="nav-item-og">
            <Link to="/login" className="login-btn-og">
              Login
            </Link>
          </div>
        </div>

        <div className="nav-toggle-og" onClick={toggleMenu}>
          <span className="bar-og"></span>
          <span className="bar-og"></span>
          <span className="bar-og"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
