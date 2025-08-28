import React from "react";

function AttendanceView() {
  const attendanceData = [
    { date: "2025-08-25", subject: "Mathematics", status: "Present" },
    { date: "2025-08-25", subject: "Physics", status: "Absent" },
    { date: "2025-08-26", subject: "Chemistry", status: "Present" },
  ];

  return (
    <div className="card">
      <h2>Attendance Records</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Subject</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((record, index) => (
            <tr key={index}>
              <td>{record.date}</td>
              <td>{record.subject}</td>
              <td>{record.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AttendanceView;
