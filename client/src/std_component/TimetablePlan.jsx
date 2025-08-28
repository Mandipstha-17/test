import React from "react";

function TimetablePlan() {
  const timetable = [
    { day: "Monday", time: "6:00 PM - 7:00 PM", subject: "Mathematics" },
    { day: "Tuesday", time: "6:00 PM - 7:00 PM", subject: "Physics" },
    { day: "Wednesday", time: "6:00 PM - 7:00 PM", subject: "Chemistry" },
  ];

  return (
    <div className="card">
      <h2>Personal Study Timetable</h2>
      <ul>
        {timetable.map((slot, index) => (
          <li key={index}>
            {slot.day}: {slot.subject} ({slot.time})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TimetablePlan;
