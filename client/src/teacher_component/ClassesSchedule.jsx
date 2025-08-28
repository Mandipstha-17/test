import React, { useState } from "react";

function ClassesSchedule({ batch }) {
  const [classes, setClasses] = useState([
    { name: "Mathematics", time: "9:00 AM - 10:30 AM", room: "A-101" },
    { name: "Physics", time: "11:00 AM - 12:30 PM", room: "B-204" },
  ]);
  const [newName, setNewName] = useState("");
  const [newTime, setNewTime] = useState("");
  const [newRoom, setNewRoom] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (newName && newTime && newRoom) {
      setClasses([...classes, { name: newName, time: newTime, room: newRoom }]);
      setNewName("");
      setNewTime("");
      setNewRoom("");
    }
  };

  return (
    <div className="card">
      <h2>Classes Schedule for Batch {batch}</h2>
      <ul>
        {classes.map((cls, index) => (
          <li key={index}>
            {cls.name} - {cls.time} ({cls.room})
          </li>
        ))}
      </ul>
      <form onSubmit={handleAdd}>
        <div className="form-group">
          <label>New Class Name:</label>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Time:</label>
          <input
            type="text"
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
            placeholder="e.g., 9:00 AM - 10:30 AM"
          />
        </div>
        <div className="form-group">
          <label>Room:</label>
          <input
            type="text"
            value={newRoom}
            onChange={(e) => setNewRoom(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-button">
          Add Class
        </button>
      </form>
    </div>
  );
}

export default ClassesSchedule;
