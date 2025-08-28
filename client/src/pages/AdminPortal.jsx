import React, { useState } from "react";
import "./css/AdminPortal.css";

function AdminPortal() {
  const [college, setCollege] = useState("");
  const [formType, setFormType] = useState(""); // "teacher" | "student"
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `College: ${college}\nForm: ${formType}\nData: ${JSON.stringify(
        formData,
        null,
        2
      )}`
    );
    setFormData({});
  };

  return (
    <div className="admin-container">
      <h2>Admin Portal</h2>

      <div className="college-select">
        <label>Select College: </label>
        <select value={college} onChange={(e) => setCollege(e.target.value)}>
          <option value="">-- Choose College --</option>
          <option value="College A">College A</option>
          <option value="College B">College B</option>
          <option value="College C">College C</option>
        </select>
      </div>

      <div className="buttons">
        <button onClick={() => setFormType("teacher")}>
          Create Teacher Account
        </button>
        <button onClick={() => setFormType("student")}>
          Create Student Account
        </button>
      </div>

      {formType === "teacher" && (
        <form className="form-box" onSubmit={handleSubmit}>
          <h3>Teacher Registration</h3>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="faculty"
            placeholder="Faculty"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <button type="submit">Register Teacher</button>
        </form>
      )}

      {formType === "student" && (
        <form className="form-box" onSubmit={handleSubmit}>
          <h3>Student Registration</h3>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="faculty"
            placeholder="Faculty"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="batch"
            placeholder="Batch"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <button type="submit">Register Student</button>
        </form>
      )}
    </div>
  );
}

export default AdminPortal;
