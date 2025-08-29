import React, { useEffect, useState } from "react";
import "./css/TeacherDashboard.css";
import config from "../config";

function AttendanceSheetOnly() {
  const [defaultSheet, setDefaultSheet] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchDefaultSheet = async () => {
      try {
        const res = await fetch(`${config.API_BASE_URL}/api/attendance/default-sheet`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          setDefaultSheet(data.defaultSheet);
        } else {
          console.error("Failed to fetch attendance sheet");
        }
      } catch (err) {
        console.error("Error fetching default sheet:", err);
      }
    };

    fetchDefaultSheet();
  }, [token]);

  return (
    <div className="card">
      <h2>Attendance Sheet (Teacher Edit Access)</h2>

      {defaultSheet ? (
        <div
          style={{
            backgroundColor: "#e8f5e8",
            padding: "15px",
            borderRadius: "8px",
            border: "1px solid #4CAF50",
          }}
        >
          <a
            href={defaultSheet.url}
            target="_blank"
            rel="noreferrer"
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              padding: "12px 20px",
              textDecoration: "none",
              borderRadius: "6px",
              display: "block",
              textAlign: "center",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            🔗 Open Attendance Sheet (Edit Mode)
          </a>
        </div>
      ) : (
        <p>Loading attendance sheet...</p>
      )}
    </div>
  );
}

export default AttendanceSheetOnly;
