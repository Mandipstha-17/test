import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/AdminPortal.css";

function AdminPortal() {
  const [formType, setFormType] = useState("");
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const faculties = ["BCA", "Bsc.CSIT", "BIT", "BBA"];
  const colleges = ["College A", "College B", "College C"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:3000/api/admin/create-user", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...formData, role: formType }),
      });
      const data = await res.json();
      if (!res.ok) return setMessage(data.message || "Error creating user");
      setMessage(`${formType} created successfully`);
      setFormData({});
    } catch {
      setMessage("Server error");
    }
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="admin-container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2>Admin Portal</h2>
        <button 
          onClick={handleBackToLogin}
          style={{ 
            backgroundColor: "#007bff", 
            color: "white", 
            padding: "8px 16px", 
            border: "none", 
            borderRadius: "4px", 
            cursor: "pointer" 
          }}
        >
          Back to Login
        </button>
      </div>
      
      <div>
        <button onClick={() => setFormType("teacher")}>Create Teacher</button>
        <button onClick={() => setFormType("student")}>Create Student</button>
      </div>

      {message && <p>{message}</p>}

      {formType && (
        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Name" value={formData.name || ""} onChange={handleChange} required />
          <select name="faculty" onChange={handleChange} value={formData.faculty || ""} required>
            <option value="">--Select Faculty--</option>
            {faculties.map((f) => <option key={f}>{f}</option>)}
          </select>
          {formType === "teacher" ? (
            <input name="subject" placeholder="Subject" value={formData.subject || ""} onChange={handleChange} required />
          ) : (
            <input name="batch" placeholder="Batch" value={formData.batch || ""} onChange={handleChange} required />
          )}
          <input name="email" type="email" placeholder="Email" value={formData.email || ""} onChange={handleChange} required />
          <input name="password" type="password" placeholder="Password" value={formData.password || ""} onChange={handleChange} required />
          <select name="college" onChange={handleChange} value={formData.college || ""} required>
            <option value="">--Select College--</option>
            {colleges.map((c) => <option key={c}>{c}</option>)}
          </select>
          <button type="submit">Register {formType}</button>
        </form>
      )}
    </div>
  );
}

export default AdminPortal;
