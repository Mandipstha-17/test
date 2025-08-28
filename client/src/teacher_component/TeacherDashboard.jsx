import React, { useState } from "react";
import CreateAssignments from "./CreateAssignments";
import UpdateAttendance from "./UpdateAttendance";
import ExamSchedule from "./ExamSchedule";
import ClassesSchedule from "./ClassesSchedule";
import "./css/TeacherDashboard.css";

function TeacherDashboard({ faculty, batch }) {
  const [activeTab, setActiveTab] = useState("assignments");

  return (
    <div>
      <nav className="navbar">
        <h1>
          Teacher Dashboard - {faculty} ({batch})
        </h1>
        <button>Logout</button>
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

        {activeTab === "assignments" && <CreateAssignments batch={batch} />}
        {activeTab === "attendance" && <UpdateAttendance batch={batch} />}
        {activeTab === "exam" && <ExamSchedule batch={batch} />}
        {activeTab === "classes" && <ClassesSchedule batch={batch} />}
      </div>
    </div>
  );
}

export default TeacherDashboard;
