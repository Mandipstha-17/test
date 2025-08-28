import React, { useState } from "react";

function CreateAssignments({ batch }) {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Assignment created for batch ${batch}: ${subject} - Due: ${dueDate}`
    );
    // In real app, send to backend to make visible in student dashboard
    setSubject("");
    setDescription("");
    setDueDate("");
  };

  return (
    <div className="card">
      <h2>Create Assignment for Batch {batch}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Subject:</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Due Date:</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Create Assignment
        </button>
      </form>
    </div>
  );
}

export default CreateAssignments;
