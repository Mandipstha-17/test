import React, { useState } from "react";
import "./css/TeacherDashboard.css";

function ExamSchedule({ batch }) {
  const [exams, setExams] = useState([
    { subject: "Mathematics", date: "2025-09-10" },
    { subject: "Physics", date: "2025-09-12" },
  ]);
  const [newSubject, setNewSubject] = useState("");
  const [newDate, setNewDate] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (newSubject && newDate) {
      setExams([...exams, { subject: newSubject, date: newDate }]);
      setNewSubject("");
      setNewDate("");
    }
  };

  return (
    <div className="card">
      <h2>Exam Schedule for Batch {batch}</h2>
      <ul>
        {exams.map((exam, index) => (
          <li key={index}>
            {exam.subject} - {exam.date}
          </li>
        ))}
      </ul>
      <form onSubmit={handleAdd}>
        <div className="form-group">
          <label>New Subject:</label>
          <input
            type="text"
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>New Date:</label>
          <input
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-button">
          Add Exam
        </button>
      </form>
    </div>
  );
}

export default ExamSchedule;
