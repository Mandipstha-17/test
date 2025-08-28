import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import "./App.css";
import AdminPortal from "./pages/AdminPortal";
import StudentDashboard from "./std_component/StudentDashboard";
import TeacherApp from "./teacher_component/TeacherApp";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin/:collegeId" element={<AdminPortal />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/teacher-dashboard" element={<TeacherApp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
