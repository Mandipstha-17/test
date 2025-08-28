import React, { useState } from "react";
import AttendanceView from "./AttendanceView";
import AssignmentSubmission from "./AssignmentSubmission";
import ClassesView from "./ClassesView";
import TimetablePlan from "./TimetablePlan";
import Chatbot from "./Chatbot";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("attendance");

  return (
    <div>
      <nav className="navbar">
        <h1>Student Dashboard</h1>
        <button>Logout</button>
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
