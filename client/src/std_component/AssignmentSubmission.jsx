import React, { useState } from "react";

function AssignmentSubmission() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = () => {
    if (file) {
      alert(`Submitting ${file.name}`);
      // Add file upload logic here (e.g., API call)
    } else {
      alert("Please select a file to upload.");
    }
  };

  return (
    <div className="card">
      <h2>Submit Assignment</h2>
      <div>
        <label>Select Assignment File:</label>
        <input type="file" onChange={handleFileChange} />
      </div>
      <button className="submit-button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}

export default AssignmentSubmission;
