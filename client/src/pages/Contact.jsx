import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "./css/Contact.css";

function Contact() {
  return (
    <>
      <Navbar />
      <div className="contact-page">
        <header className="contact-header">
          <h1>Contact Us</h1>
          <p>We’d love to hear from you! Please fill out the form below.</p>
        </header>

        <section className="contact-form-section">
          <form className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="Enter subject"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder="Type your message here..."
                required
              ></textarea>
            </div>

            <button type="submit" className="btn-submit">
              Send Message
            </button>
          </form>
        </section>
      </div>
      <Footer />
    </>
  );
}
export default Contact;
