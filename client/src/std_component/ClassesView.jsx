import React from "react";

function ClassesView() {
  const classes = [
    { name: "Mathematics", time: "9:00 AM - 10:30 AM", room: "A-101" },
    { name: "Physics", time: "11:00 AM - 12:30 PM", room: "B-204" },
    { name: "Chemistry", time: "2:00 PM - 3:30 PM", room: "C-305" },
  ];

  return (
    <div className="card">
      <h2>Class Schedule</h2>
      <ul>
        {classes.map((cls, index) => (
          <li key={index}>
            {cls.name} - {cls.time} ({cls.room})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClassesView;
