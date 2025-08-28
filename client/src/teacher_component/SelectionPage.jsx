import React, { useState } from "react";

function SelectionPage({ onSelect }) {
  const [faculty, setFaculty] = useState("");
  const [batch, setBatch] = useState("");

  const faculties = ["Science", "Arts", "Commerce", "Engineering"];
  const batches = ["2023", "2024", "2025", "2026"];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (faculty && batch) {
      onSelect(faculty, batch);
    } else {
      alert("Please select both faculty and batch.");
    }
  };

  return (
    <div className="selection-container">
      <h1>Select Faculty and Batch</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Faculty:</label>
          <select value={faculty} onChange={(e) => setFaculty(e.target.value)}>
            <option value="">Select Faculty</option>
            {faculties.map((fac, index) => (
              <option key={index} value={fac}>
                {fac}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Batch:</label>
          <select value={batch} onChange={(e) => setBatch(e.target.value)}>
            <option value="">Select Batch</option>
            {batches.map((bat, index) => (
              <option key={index} value={bat}>
                {bat}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="submit-button">
          Proceed to Dashboard
        </button>
      </form>
    </div>
  );
}

export default SelectionPage;
