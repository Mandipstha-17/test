import React from "react";
import "./css/Banner.css";

const Banner = () => {
  return (
    <div className="banner">
      <div className="banner-content">
        <h1>Unlock Your Learning Potential</h1>
        <p>
          Discover a new way of learning with our interactive courses, expert
          instructors, and cutting-edge technology.
        </p>
        <div className="banner-stats">
          <div className="stat">
            <h3>500+</h3>
            <p>Courses</p>
          </div>
          <div className="stat">
            <h3>10K+</h3>
            <p>Students</p>
          </div>
          <div className="stat">
            <h3>95%</h3>
            <p>Success Rate</p>
          </div>
        </div>
        <div className="banner-buttons">
          <button className="btn-primary">Start Learning Now</button>
          <button className="btn-secondary">View Courses</button>
        </div>
      </div>
      <div className="banner-visual">
        <div className="floating-card card-1">
          <i className="fas fa-graduation-cap"></i>
          <p>Certified Programs</p>
        </div>
        <div className="floating-card card-2">
          <i className="fas fa-laptop-code"></i>
          <p>Interactive Learning</p>
        </div>
        <div className="floating-card card-3">
          <i className="fas fa-users"></i>
          <p>Community Support</p>
        </div>
        <div className="main-visual">
          <div className="circle-background"></div>
          <img
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='90' fill='%234361ee' opacity='0.2'/%3E%3Cpath d='M140,100 C140,122.09 122.09,140 100,140 C77.91,140 60,122.09 60,100 C60,77.91 77.91,60 100,60 C122.09,60 140,77.91 140,100 Z' fill='%234361ee'/%3E%3Ccircle cx='100' cy='100' r='30' fill='white'/%3E%3C/svg%3E"
            alt="Learning Illustration"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
