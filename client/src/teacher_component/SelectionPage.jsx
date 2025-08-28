import React, { useState } from "react";
import "./css/TeacherDashboard.css";

function SelectionPage({ onSelect }) {
  const [faculty, setFaculty] = useState("");
  const [batch, setBatch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (faculty && batch) {
      onSelect(faculty, batch);
    }
  };

  return (
    <div className="selection-container">
      <div className="decoration-1"></div>
      <div className="decoration-2"></div>
      <div className="decoration-3"></div>

      <div className="selection-card">
        <div className="selection-header">
          <h1 className="selection-title">Teacher Portal</h1>
          <p className="selection-subtitle">
            Select your faculty and batch to continue
          </p>
        </div>

        <form className="selection-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="faculty" className="form-label">
              Faculty
            </label>
            <select
              id="faculty"
              className="form-select"
              value={faculty}
              onChange={(e) => setFaculty(e.target.value)}
              required
            >
              <option value="">Select Faculty</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Engineering">Engineering</option>
              <option value="Business">Business</option>
              <option value="Arts">Arts</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="batch" className="form-label">
              Batch
            </label>
            <select
              id="batch"
              className="form-select"
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
              required
            >
              <option value="">Select Batch</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
            </select>
          </div>

          <button type="submit" className="submit-button">
            Continue to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}

export default SelectionPage;
