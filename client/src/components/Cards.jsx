import React from "react";
import "./css/Cards.css";

const Cards = () => {
  const cardData = [
    {
      icon: "fas fa-book",
      title: "Course Materials",
      description:
        "Access all your course materials, lectures, and resources in one place.",
    },
    {
      icon: "fas fa-clipboard-list",
      title: "Assignments",
      description:
        "Submit assignments and get feedback directly from your instructors.",
    },
    {
      icon: "fas fa-chart-bar",
      title: "Grades & Progress",
      description:
        "Track your academic progress and view your grades over time.",
    },
    {
      icon: "fas fa-calendar-alt",
      title: "Schedule",
      description:
        "Stay organized with your class schedule and important deadlines.",
    },
    {
      icon: "fas fa-users",
      title: "Collaboration",
      description:
        "Work together with classmates on group projects and discussions.",
    },
    {
      icon: "fas fa-graduation-cap",
      title: "Career Guidance",
      description:
        "Get personalized recommendations for your academic and career path.",
    },
  ];

  return (
    <section className="cards-section">
      <h2>Everything You Need for Academic Success</h2>
      <p className="section-subtitle">
        Our platform provides all the tools to support your learning journey
      </p>
      <div className="cards-container">
        {cardData.map((card, index) => (
          <div className="card" key={index}>
            <div className="card-icon">
              <i className={card.icon}></i>
            </div>
            <h3 className="card-title">{card.title}</h3>
            <p className="card-description">{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Cards;
