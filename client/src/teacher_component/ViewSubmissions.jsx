import React, { useEffect, useState } from "react";
import "./css/Style.css";

function ViewSubmissions() {
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState("");
  const [submissions, setSubmissions] = useState([]);
  const [loadingAssignments, setLoadingAssignments] = useState(true);
  const [loadingSubmissions, setLoadingSubmissions] = useState(false);
  const [gradingState, setGradingState] = useState({});

  const token = localStorage.getItem("token");

  useEffect(() => {
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
    fetchAssignments();
  }, []);

  const fetchSubmissions = async (assignmentId) => {
    if (!assignmentId) return;
    setLoadingSubmissions(true);
    try {
      const res = await fetch(
        `http://localhost:3000/api/assignments/${assignmentId}/submissions`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      setSubmissions(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      alert("Failed to load submissions");
    } finally {
      setLoadingSubmissions(false);
    }
  };

  const handleSelectAssignment = (e) => {
    const id = e.target.value;
    setSelectedAssignmentId(id);
    fetchSubmissions(id);
  };

  const updateGradingField = (submissionId, field, value) => {
    setGradingState((prev) => ({
      ...prev,
      [submissionId]: { ...prev[submissionId], [field]: value },
    }));
  };

  const submitGrade = async (submissionId) => {
    const { grade, feedback } = gradingState[submissionId] || {};
    
    if (!grade || grade < 1 || grade > 10) {
      alert("Please enter a valid grade between 1 and 10.");
      return;
    }
    
    try {
      const res = await fetch(
        `http://localhost:3000/api/submissions/${submissionId}/grade`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ grade, feedback }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to grade submission");
      alert("Grade saved successfully!");
      fetchSubmissions(selectedAssignmentId);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const deleteAssignment = async (assignmentId) => {
    if (!confirm("Are you sure you want to delete this assignment? This will also delete all submissions.")) {
      return;
    }
    
    try {
      const res = await fetch(
        `http://localhost:3000/api/assignments/${assignmentId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete assignment");
      alert("Assignment deleted successfully");
      // Refresh assignments list
      const refreshRes = await fetch("http://localhost:3000/api/assignments", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const refreshData = await refreshRes.json();
      setAssignments(Array.isArray(refreshData) ? refreshData : []);
      setSelectedAssignmentId("");
      setSubmissions([]);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const getGradeColor = (grade) => {
    if (!grade) return "black";
    if (grade >= 9) return "green";
    if (grade >= 7) return "blue";
    if (grade >= 5) return "orange";
    return "red";
  };

  return (
    <div className="card">
      <h2>View & Grade Submissions</h2>
      {loadingAssignments ? (
        <p>Loading assignments...</p>
      ) : (
        <div className="form-group">
          <label>Select Assignment:</label>
          <select value={selectedAssignmentId} onChange={handleSelectAssignment}>
            <option value="">-- Choose an assignment --</option>
            {assignments.map((a) => (
              <option key={a._id} value={a._id}>
                {a.subject} - {a.description}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedAssignmentId && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h3>Submissions</h3>
            <button 
              onClick={() => deleteAssignment(selectedAssignmentId)}
              style={{ backgroundColor: "red", color: "white", padding: "8px 16px", border: "none", borderRadius: "4px", cursor: "pointer" }}
            >
              Delete Assignment
            </button>
          </div>
          {loadingSubmissions ? (
            <p>Loading submissions...</p>
          ) : submissions.length === 0 ? (
            <p>No submissions yet for this assignment.</p>
          ) : (
            <div className="submissions-list">
              {submissions.map((s) => (
                <div key={s._id} className="submission-item" style={{ 
                  border: "1px solid #ddd", 
                  padding: "15px", 
                  marginBottom: "15px", 
                  borderRadius: "8px",
                  backgroundColor: "#f9f9f9"
                }}>
                  <div style={{ marginBottom: "10px" }}>
                    <strong style={{ fontSize: "16px" }}>
                      {s.student?.name || s.student?.email || "Unknown Student"}
                    </strong>
                    <span style={{ color: "#666", marginLeft: "10px" }}>
                      Submitted: {formatDate(s.submittedAt)}
                    </span>
                  </div>
                  
                                     <div style={{ marginBottom: "15px" }}>
                     <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                       <a
                         href={`http://localhost:3000/${s.filePath}`}
                         target="_blank"
                         rel="noreferrer"
                         style={{ 
                           backgroundColor: "#007bff",
                           color: "white", 
                           padding: "8px 16px",
                           textDecoration: "none",
                           borderRadius: "4px",
                           fontWeight: "bold"
                         }}
                       >
                         📄 View PDF
                       </a>
                       <span style={{ color: "#666", fontSize: "14px" }}>
                         File: {s.originalName}
                       </span>
                     </div>
                   </div>
                  
                  <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
                    <div>
                      <label style={{ marginRight: "5px" }}>Grade (1-10):</label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        placeholder="Grade"
                        defaultValue={s.grade ?? ""}
                        onChange={(e) => updateGradingField(s._id, "grade", Number(e.target.value))}
                        style={{ 
                          width: "80px", 
                          padding: "5px",
                          border: "1px solid #ccc",
                          borderRadius: "4px"
                        }}
                      />
                    </div>
                    
                    <div style={{ flex: "1", minWidth: "200px" }}>
                      <label style={{ marginRight: "5px" }}>Feedback:</label>
                      <input
                        type="text"
                        placeholder="Enter feedback..."
                        defaultValue={s.feedback || ""}
                        onChange={(e) => updateGradingField(s._id, "feedback", e.target.value)}
                        style={{ 
                          width: "100%", 
                          padding: "5px",
                          border: "1px solid #ccc",
                          borderRadius: "4px"
                        }}
                      />
                    </div>
                    
                    <button 
                      onClick={() => submitGrade(s._id)}
                      style={{ 
                        backgroundColor: "#4CAF50", 
                        color: "white", 
                        padding: "8px 16px", 
                        border: "none", 
                        borderRadius: "4px",
                        cursor: "pointer"
                      }}
                    >
                      Save Grade
                    </button>
                  </div>
                  
                  {s.grade && (
                    <div style={{ marginTop: "10px" }}>
                      <strong style={{ color: getGradeColor(s.grade) }}>
                        Current Grade: {s.grade}/10
                      </strong>
                      {s.feedback && (
                        <span style={{ marginLeft: "10px", color: "#666" }}>
                          Feedback: {s.feedback}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ViewSubmissions;


