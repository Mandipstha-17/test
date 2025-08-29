import React, { useEffect, useState } from "react";
import config from "../config";

function Attendance() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await fetch(`${config.API_BASE_URL}/api/attendance`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();

        // Extract all student URLs from attendance records
        const urls = data.map(record => record.sheetLink?.studentUrl || record.sheetLink?.url);
        setLinks(urls.filter(Boolean));
      } catch (err) {
        console.error("Error fetching attendance:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [token]);

  if (loading) return <p>Loading attendance sheets...</p>;

  if (links.length === 0) return <p>No attendance sheets available.</p>;

  return (
    <div>
      {links.map((url, idx) => (
        <div key={idx} style={{ marginBottom: "10px" }}>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            style={{
              backgroundColor: "#007BFF",
              color: "white",
              padding: "10px 16px",
              textDecoration: "none",
              borderRadius: "6px",
              fontWeight: "bold"
            }}
          >
            📄 Attendance Sheet {idx + 1}
          </a>
        </div>
      ))}
    </div>
  );
}

export default Attendance;
