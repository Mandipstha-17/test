import React, { useState } from "react";
import "./css/TeacherDashboard.css";

function UpdateAttendance({ batch }) {
  const [date, setDate] = useState("");
  const students = ["Student A", "Student B", "Student C"]; // Placeholder students
  const [attendance, setAttendance] = useState(
    students.reduce((acc, student) => ({ ...acc, [student]: false }), {})
  );

  const handleToggle = (student) => {
    setAttendance({ ...attendance, [student]: !attendance[student] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Attendance updated for batch ${batch} on ${date}: ${JSON.stringify(
        attendance
      )}`
    );
    // In real app, send to backend to update student views
  };

  return (
    <div className="card">
      <h2>Update Attendance for Batch {batch}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <ul>
          {students.map((student, index) => (
            <li key={index}>
              {student}:
              <input
                type="checkbox"
                checked={attendance[student]}
                onChange={() => handleToggle(student)}
              />{" "}
              Present
            </li>
          ))}
        </ul>
        <button type="submit" className="submit-button">
          Update Attendance
        </button>
      </form>
    </div>
  );
}

export default UpdateAttendance;
