import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import "./css/AdminPortal.css";

// Main App Component
const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin/:collegeId" element={<AdminPortal />} />
        </Routes>
      </div>
    </Router>
  );
};

// Landing Page Component
const LandingPage = () => {
  return (
    <div className="landing-page">
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <i className="fas fa-graduation-cap"></i>
            <span>EduLearn</span>
          </div>
          <div className="nav-menu">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/" className="nav-link">
              About
            </Link>
            <Link to="/" className="nav-link">
              Contact
            </Link>
            <Link to="/login" className="login-btn">
              Login
            </Link>
          </div>
        </div>
      </nav>

      <div className="landing-content">
        <h1>Welcome to EduLearn</h1>
        <p>Your gateway to modern education</p>
        <div className="college-links">
          <h3>Access your college portal:</h3>
          <div className="links-container">
            <Link to="/admin/college1" className="college-link">
              College A
            </Link>
            <Link to="/admin/college2" className="college-link">
              College B
            </Link>
            <Link to="/admin/college3" className="college-link">
              College C
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// Login Page Component
const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    // Login logic would go here
    alert("Login functionality would be implemented here");
  };

  return (
    <div className="login-page">
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <i className="fas fa-graduation-cap"></i>
            <span>EduLearn</span>
          </div>
          <div className="nav-menu">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/" className="nav-link">
              About
            </Link>
            <Link to="/" className="nav-link">
              Contact
            </Link>
            <Link to="/login" className="login-btn">
              Login
            </Link>
          </div>
        </div>
      </nav>

      <div className="login-container">
        <div className="login-form">
          <h2>Universal Login</h2>
          <p>Access your account from any college portal</p>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                required
              />
            </div>
            <button type="submit" className="login-submit-btn">
              Login
            </button>
          </form>
          <div className="login-links">
            <a href="#forgot">Forgot Password?</a>
            <a href="#signup">Create Account</a>
          </div>
        </div>
      </div>
    </div>
  );
};

// Admin Portal Component
const AdminPortal = () => {
  const { collegeId } = useParams();
  const [activeForm, setActiveForm] = useState(null);

  // College data mapping
  const collegeData = {
    college1: { name: "College A", color: "#4361ee" },
    college2: { name: "College B", color: "#e76f51" },
    college3: { name: "College C", color: "#2a9d8f" },
  };

  const college = collegeData[collegeId] || {
    name: "Unknown College",
    color: "#4361ee",
  };

  return (
    <div className="admin-portal" style={{ "--college-color": college.color }}>
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <i className="fas fa-graduation-cap"></i>
            <span>{college.name} Admin</span>
          </div>
          <div className="nav-menu">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/login" className="login-btn">
              Universal Login
            </Link>
          </div>
        </div>
      </nav>

      <div className="admin-content">
        <div className="admin-header">
          <h1>{college.name} Administration Portal</h1>
          <p>Manage teacher and student registrations</p>
        </div>

        <div className="registration-options">
          <div
            className="registration-card"
            onClick={() => setActiveForm("teacher")}
          >
            <div className="card-icon">
              <i className="fas fa-chalkboard-teacher"></i>
            </div>
            <h3>Teacher Registration</h3>
            <p>Register new teaching staff</p>
            <button className="card-btn">Register Teacher</button>
          </div>

          <div
            className="registration-card"
            onClick={() => setActiveForm("student")}
          >
            <div className="card-icon">
              <i className="fas fa-user-graduate"></i>
            </div>
            <h3>Student Registration</h3>
            <p>Register new students</p>
            <button className="card-btn">Register Student</button>
          </div>
        </div>

        {activeForm && (
          <div className="registration-form">
            <h2>
              {activeForm === "teacher" ? "Teacher" : "Student"} Registration
              Form
            </h2>
            <form>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" required />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>
                    {activeForm === "teacher" ? "Department" : "Course"}
                  </label>
                  <input type="text" required />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" required />
                </div>
              </div>
              {activeForm === "teacher" && (
                <div className="form-group">
                  <label>Qualifications</label>
                  <textarea rows="3"></textarea>
                </div>
              )}
              {activeForm === "student" && (
                <div className="form-row">
                  <div className="form-group">
                    <label>Student ID</label>
                    <input type="text" required />
                  </div>
                  <div className="form-group">
                    <label>Year of Study</label>
                    <select>
                      <option>1st Year</option>
                      <option>2nd Year</option>
                      <option>3rd Year</option>
                      <option>4th Year</option>
                    </select>
                  </div>
                </div>
              )}
              <div className="form-actions">
                <button type="button" onClick={() => setActiveForm(null)}>
                  Cancel
                </button>
                <button type="submit">Submit Registration</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
