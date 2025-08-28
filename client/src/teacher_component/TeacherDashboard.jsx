import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateAssignments from "./CreateAssignments";
import ViewSubmissions from "./ViewSubmissions";
import UpdateAttendance from "./UpdateAttendance";
import ExamSchedule from "./ExamSchedule";
import ClassesSchedule from "./ClassesSchedule";
import "./css/TeacherDashboard.css";

function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState("assignments");
  const [displayName, setDisplayName] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3000/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) return;
        const me = await res.json();
        setDisplayName(me.name || me.email || "Teacher");
        setUserInfo(me);
      } catch {}
    };
    fetchMe();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar">
        <div>
          <h1>Teacher Dashboard - {displayName}</h1>
          <p style={{ margin: "5px 0", color: "#666", fontSize: "14px" }}>
            {userInfo.faculty && userInfo.batch ? `${userInfo.faculty} - Batch ${userInfo.batch}` : ""}
            {userInfo.subject && ` | Subject: ${userInfo.subject}`}
          </p>
        </div>
        <button onClick={handleLogout}>Logout</button>
      </nav>
      <div className="container">
        <div className="tabs">
          <button
            className={`tab-button ${
              activeTab === "assignments" ? "active" : ""
            }`}
            onClick={() => setActiveTab("assignments")}
          >
            Create Assignments
          </button>
          <button
            className={`tab-button ${
              activeTab === "submissions" ? "active" : ""
            }`}
            onClick={() => setActiveTab("submissions")}
          >
            View & Grade Submissions
          </button>
          <button
            className={`tab-button ${
              activeTab === "attendance" ? "active" : ""
            }`}
            onClick={() => setActiveTab("attendance")}
          >
            Update Attendance
          </button>
          <button
            className={`tab-button ${activeTab === "exam" ? "active" : ""}`}
            onClick={() => setActiveTab("exam")}
          >
            Exam Schedule
          </button>
          <button
            className={`tab-button ${activeTab === "classes" ? "active" : ""}`}
            onClick={() => setActiveTab("classes")}
          >
            Classes Schedule
          </button>
        </div>

        {activeTab === "assignments" && <CreateAssignments />}
        {activeTab === "submissions" && <ViewSubmissions />}
        {activeTab === "attendance" && <UpdateAttendance batch={userInfo.batch} />}
        {activeTab === "exam" && <ExamSchedule batch={userInfo.batch} />}
        {activeTab === "classes" && <ClassesSchedule batch={userInfo.batch} />}
      </div>
    </div>
  );
}

export default TeacherDashboard;
