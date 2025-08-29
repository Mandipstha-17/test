import React from "react";

function Attendance() {
  return (
    <div style={{ marginTop: "20px" }}>
      <a
        href="https://docs.google.com/spreadsheets/d/1ke4qpNYZh9rxUq6insfrqAWmp8DTmHR40ALRGf67D9Q/edit?usp=sharing"
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
        View Attendance
      </a>
    </div>
  );
}

export default Attendance;
