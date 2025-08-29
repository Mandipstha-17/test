import React from "react";
import "./css/TeacherDashboard.css";

function UpdateAttendance() {
  return (
    <div style={{ marginTop: "20px" }}>
      <a
        href="https://docs.google.com/spreadsheets/d/1mWSjUZh90Nuf8ttk8KTupbMlAP_UL42HSnI-CBY8xps/edit?usp=sharinghttps://docs.google.com/spreadsheets/d/1ugRG-E5fNM0UuCR4DCea9I3MVXDTuEvsf46yU7SWlLo/edit?usp=sharinghttps://docs.google.com/spreadsheets/d/1ugRG-E5fNM0UuCR4DCea9I3MVXDTuEvsf46yU7SWlLo/edit?usp=sharing"
        target="_blank"
        rel="noreferrer"
        style={{
          display: "inline-block",
          backgroundColor: "#28a745",
          color: "white",
          padding: "10px 16px",
          textDecoration: "none",
          borderRadius: "6px",
          fontWeight: "bold",
          fontSize: "1rem",
        }}
      >
        Update Attendance
      </a>
    </div>
  );
}

export default UpdateAttendance;
