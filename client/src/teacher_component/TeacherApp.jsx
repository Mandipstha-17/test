import React, { useState } from "react";
import SelectionPage from "./SelectionPage";
import TeacherDashboard from "./TeacherDashboard";
import "./css/Teacher.css";

function TeacherApp() {
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [selectedBatch, setSelectedBatch] = useState(null);

  const handleSelection = (faculty, batch) => {
    setSelectedFaculty(faculty);
    setSelectedBatch(batch);
  };

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
