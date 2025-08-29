import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SelectionPage from "./SelectionPage";
import TeacherDashboard from "./TeacherDashboard";
import "./css/Teacher.css";
import config from "../config";

function TeacherApp() {
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication first
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Verify token is valid
    const verifyToken = async () => {
      try {
        const res = await fetch(`${config.API_BASE_URL}/api/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }
        
        const user = await res.json();
        if (user.role !== "teacher") {
          navigate("/login");
          return;
        }

        // Load saved selection from localStorage
        const savedFaculty = localStorage.getItem("teacherFaculty");
        const savedBatch = localStorage.getItem("teacherBatch");
        
        if (savedFaculty && savedBatch) {
          setSelectedFaculty(savedFaculty);
          setSelectedBatch(savedBatch);
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error verifying token:", error);
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    verifyToken();
  }, [navigate]);

  const handleSelection = (faculty, batch) => {
    setSelectedFaculty(faculty);
    setSelectedBatch(batch);
    
    // Save selection to localStorage
    localStorage.setItem("teacherFaculty", faculty);
    localStorage.setItem("teacherBatch", batch);
  };

  if (loading) {
    return <div style={{ padding: "20px", textAlign: "center" }}>Loading...</div>;
  }

  return (
    <div>
      {!selectedFaculty || !selectedBatch ? (
        <SelectionPage onSelect={handleSelection} />
      ) : (
        <TeacherDashboard faculty={selectedFaculty} batch={selectedBatch} />
      )}
    </div>
  );
}

export default TeacherApp;
