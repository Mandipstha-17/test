import React, { useState } from "react";
import "./css/Style.css";

function CreateAssignments() {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:3000/api/assignments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          subject, 
          description, 
          dueDate 
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create assignment");
      alert("Assignment created successfully!");
      setSubject("");
      setDescription("");
      setDueDate("");
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Create Assignment</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Subject:</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="e.g., Mathematics, Programming, etc."
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the assignment requirements..."
            required
          />
        </div>
        <div className="form-group">
          <label>Due Date:</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            required
          />
        </div>
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Creating..." : "Create Assignment"}
        </button>
      </form>
    </div>
  );
}

export default CreateAssignments;
