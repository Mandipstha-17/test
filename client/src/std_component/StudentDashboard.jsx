import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AttendanceView from "./Attendance";
import AssignmentSubmission from "./AssignmentSubmission";
import ClassesView from "./ClassesView";
import TimetablePlan from "./TimetablePlan";
import Chatbot from "./Chatbot";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("attendance");
  const [displayName, setDisplayName] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    
    const fetchMe = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) return;
        const me = await res.json();
        setDisplayName(me.name || me.email || "Student");
        setUserInfo(me);
      } catch {}
    };
    fetchMe();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar">
        <div>
          <h1>Student Dashboard - {displayName}</h1>
          <p style={{ margin: "5px 0", color: "#666", fontSize: "14px" }}>
            {userInfo.faculty && userInfo.batch ? `${userInfo.faculty} - Batch ${userInfo.batch}` : ""}
          </p>
        </div>
        <button onClick={handleLogout}>Logout</button>
      </nav>
      <div className="container">
        <div className="tabs">
          <button
            className={`tab-button ${
              activeTab === "attendance" ? "active" : ""
            }`}
            onClick={() => setActiveTab("attendance")}
          >
            Attendance
          </button>
          <button
            className={`tab-button ${
              activeTab === "assignments" ? "active" : ""
            }`}
            onClick={() => setActiveTab("assignments")}
          >
            Assignments
          </button>
          <button
            className={`tab-button ${activeTab === "classes" ? "active" : ""}`}
            onClick={() => setActiveTab("classes")}
          >
            Classes
          </button>
          <button
            className={`tab-button ${
              activeTab === "timetable" ? "active" : ""
            }`}
            onClick={() => setActiveTab("timetable")}
          >
            Study Timetable
          </button>
          <button
            className={`tab-button ${activeTab === "chatbot" ? "active" : ""}`}
            onClick={() => setActiveTab("chatbot")}
          >
            Chatbot
          </button>
        </div>

        {activeTab === "attendance" && <AttendanceView />}
        {activeTab === "assignments" && <AssignmentSubmission />}
        {activeTab === "classes" && <ClassesView />}
        {activeTab === "timetable" && <TimetablePlan />}
        {activeTab === "chatbot" && <Chatbot />}
      </div>
    </div>
  );
}

export default Dashboard;
