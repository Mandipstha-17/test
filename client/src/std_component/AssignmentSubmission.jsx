import React, { useState, useEffect } from "react";
import "./css/std_style.css";

function AssignmentSubmission() {
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingAssignments, setLoadingAssignments] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/assignments", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setAssignments(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      alert("Failed to load assignments");
    } finally {
      setLoadingAssignments(false);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!selectedAssignment) {
      alert("Please select an assignment first.");
      return;
    }
    
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("assignment", file);

    try {
      const res = await fetch(
        `http://localhost:3000/api/assignments/${selectedAssignment._id}/submit`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to submit assignment");
      
      alert("Assignment submitted successfully!");
      setFile(null);
      setSelectedAssignment(null);
      fetchAssignments(); // Refresh to show updated submission status
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loadingAssignments) {
    return <div className="card"><p>Loading assignments...</p></div>;
  }

  return (
    <div className="card">
      <h2>Assignments</h2>
      
             {assignments.length === 0 ? (
         <p>No assignments available.</p>
       ) : (
        <div>
          <div className="form-group">
            <label>Select Assignment:</label>
            <select 
              value={selectedAssignment?._id || ""} 
              onChange={(e) => {
                const assignment = assignments.find(a => a._id === e.target.value);
                setSelectedAssignment(assignment);
                setFile(null);
              }}
            >
              <option value="">-- Choose an assignment --</option>
              {assignments.map((assignment) => (
                <option key={assignment._id} value={assignment._id}>
                  {assignment.subject} - {assignment.description} 
                  {assignment.submitted && " ✓ Submitted"}
                </option>
              ))}
            </select>
          </div>

          {selectedAssignment && (
            <div className="assignment-details">
              <h3>Assignment Details</h3>
                             <p><strong>Subject:</strong> {selectedAssignment.subject}</p>
               <p><strong>Description:</strong> {selectedAssignment.description}</p>
               <p><strong>Due Date:</strong> {formatDate(selectedAssignment.dueDate)}</p>
              
              {selectedAssignment.submitted ? (
                <div className="submitted-status">
                  <p style={{ color: "green", fontWeight: "bold" }}>
                    ✓ You have already submitted this assignment
                  </p>
                </div>
              ) : (
                <div className="submission-form">
                  <div className="form-group">
                    <label>Select Assignment File (PDF only):</label>
                    <input 
                      type="file" 
                      accept=".pdf"
                      onChange={handleFileChange}
                      disabled={loading}
                    />
                  </div>
                  <button 
                    className="submit-button" 
                    onClick={handleSubmit}
                    disabled={!file || loading}
                  >
                    {loading ? "Submitting..." : "Submit Assignment"}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AssignmentSubmission;
