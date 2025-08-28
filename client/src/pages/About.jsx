import React from "react";
import "./css/About.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function About() {
  return (
    <div className="page-container">
      <Navbar />
      <div className="about-page">
        {/* Header */}
        <header className="about-header">
          <h1>About Our Student System</h1>
          <p className="subtitle">
            A seamless platform for students to manage academics efficiently.
          </p>
        </header>

        {/* Overview Section */}
        <section className="section overview">
          <h2>Overview</h2>
          <p>
            Our Student System simplifies academic management by giving students
            easy access to resources, progress tracking, and communication tools
            to stay connected with teachers and peers. The platform is intuitive
            and user-friendly for modern learning needs.
          </p>
        </section>

        {/* Features Section */}
        <section className="section features">
          <h2>Key Features</h2>
          <ul>
            <li>
              Personalized dashboard with attendance, grades, and assignments.
            </li>
            <li>Access to study materials and downloadable resources.</li>
            <li>Notifications for deadlines, events, and announcements.</li>
            <li>Secure login and profile management.</li>
            <li>Direct communication with teachers for guidance.</li>
          </ul>
        </section>

        {/* How It Works */}
        <section className="section how-it-works">
          <h2>How It Works</h2>
          <p>
            Students log in using their credentials, access a dashboard with
            real-time updates, track assignments, view grades, and download
            necessary resources. Designed to make academic life smooth and
            efficient.
          </p>
        </section>

        {/* Team Section */}
        <section className="section team">
          <h2>Meet the Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-icon">👨‍💻</div>
              <h3>John Doe</h3>
              <p className="role">Lead Developer</p>
              <p className="member-description">
                John architected the backend systems and database structure,
                ensuring scalability and performance for thousands of concurrent
                users.
              </p>
            </div>
            <div className="team-member">
              <div className="member-icon">🎨</div>
              <h3>Jane Smith</h3>
              <p className="role">UI/UX Designer</p>
              <p className="member-description">
                Jane crafted the intuitive user interface and seamless
                experience, focusing on accessibility and ease of use for
                students of all ages.
              </p>
            </div>
            <div className="team-member">
              <div className="member-icon">📊</div>
              <h3>Mike Lee</h3>
              <p className="role">Project Manager</p>
              <p className="member-description">
                Mike coordinated the development timeline and stakeholder
                communication, ensuring the project met all requirements and
                deadlines.
              </p>
            </div>
          </div>
        </section>

        {/* Call-to-Action */}
        <div className="cta">
          <a href="/login" className="cta-btn">
            Get Started
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
}
