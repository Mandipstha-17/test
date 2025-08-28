import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/AdminPortal.css";
import config from "../config";

function AdminPortal() {
  const [formType, setFormType] = useState("");
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [stats, setStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(false);
  const [activeTab, setActiveTab] = useState("create");
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
      const res = await fetch(`${config.API_BASE_URL}/api/admin/create-user`, {
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

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const res = await fetch(`${config.API_BASE_URL}/api/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch users");
      setUsers(data);
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoadingUsers(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "admin": return "#dc3545";
      case "teacher": return "#007bff";
      case "student": return "#28a745";
      default: return "#6c757d";
    }
  };

  const fetchStats = async () => {
    setLoadingStats(true);
    try {
      const res = await fetch(`${config.API_BASE_URL}/api/admin/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch statistics");
      setStats(data);
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoadingStats(false);
    }
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
      
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button 
          onClick={() => setActiveTab("create")}
          style={{ 
            backgroundColor: activeTab === "create" ? "#007bff" : "#6c757d",
            color: "white", 
            padding: "8px 16px", 
            border: "none", 
            borderRadius: "4px", 
            cursor: "pointer" 
          }}
        >
          Create Users
        </button>
        <button 
          onClick={() => {
            setActiveTab("view");
            fetchUsers();
          }}
          style={{ 
            backgroundColor: activeTab === "view" ? "#007bff" : "#6c757d",
            color: "white", 
            padding: "8px 16px", 
            border: "none", 
            borderRadius: "4px", 
            cursor: "pointer" 
          }}
        >
          View All Users
        </button>
        <button 
          onClick={() => {
            setActiveTab("stats");
            fetchStats();
          }}
          style={{ 
            backgroundColor: activeTab === "stats" ? "#007bff" : "#6c757d",
            color: "white", 
            padding: "8px 16px", 
            border: "none", 
            borderRadius: "4px", 
            cursor: "pointer" 
          }}
        >
          Database Stats
        </button>
      </div>

      {message && <p style={{ color: message.includes("error") ? "red" : "green" }}>{message}</p>}

      {activeTab === "create" && (
        <div>
          <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            <button 
              onClick={() => setFormType("teacher")}
              style={{ 
                backgroundColor: formType === "teacher" ? "#007bff" : "#6c757d",
                color: "white", 
                padding: "8px 16px", 
                border: "none", 
                borderRadius: "4px", 
                cursor: "pointer" 
              }}
            >
              Create Teacher
            </button>
            <button 
              onClick={() => setFormType("student")}
              style={{ 
                backgroundColor: formType === "student" ? "#007bff" : "#6c757d",
                color: "white", 
                padding: "8px 16px", 
                border: "none", 
                borderRadius: "4px", 
                cursor: "pointer" 
              }}
            >
              Create Student
            </button>
          </div>

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
      )}

      {activeTab === "view" && (
        <div>
          <h3>All Users ({users.length})</h3>
          {loadingUsers ? (
            <p>Loading users...</p>
          ) : users.length === 0 ? (
            <p>No users found.</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
                <thead>
                  <tr style={{ backgroundColor: "#f8f9fa" }}>
                    <th style={{ padding: "12px", border: "1px solid #ddd", textAlign: "left" }}>Name</th>
                    <th style={{ padding: "12px", border: "1px solid #ddd", textAlign: "left" }}>Email</th>
                    <th style={{ padding: "12px", border: "1px solid #ddd", textAlign: "left" }}>Role</th>
                    <th style={{ padding: "12px", border: "1px solid #ddd", textAlign: "left" }}>Faculty</th>
                    <th style={{ padding: "12px", border: "1px solid #ddd", textAlign: "left" }}>Subject/Batch</th>
                    <th style={{ padding: "12px", border: "1px solid #ddd", textAlign: "left" }}>College</th>
                    <th style={{ padding: "12px", border: "1px solid #ddd", textAlign: "left" }}>Created</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} style={{ borderBottom: "1px solid #ddd" }}>
                      <td style={{ padding: "12px", border: "1px solid #ddd" }}>{user.name}</td>
                      <td style={{ padding: "12px", border: "1px solid #ddd" }}>{user.email}</td>
                      <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                        <span style={{ 
                          backgroundColor: getRoleColor(user.role), 
                          color: "white", 
                          padding: "4px 8px", 
                          borderRadius: "4px", 
                          fontSize: "12px" 
                        }}>
                          {user.role}
                        </span>
                      </td>
                      <td style={{ padding: "12px", border: "1px solid #ddd" }}>{user.faculty || "-"}</td>
                      <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                        {user.role === "teacher" ? user.subject : user.batch || "-"}
                      </td>
                      <td style={{ padding: "12px", border: "1px solid #ddd" }}>{user.college || "-"}</td>
                      <td style={{ padding: "12px", border: "1px solid #ddd" }}>{formatDate(user.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {activeTab === "stats" && (
        <div>
          <h3>Database Statistics</h3>
          {loadingStats ? (
            <p>Loading statistics...</p>
          ) : stats ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", marginTop: "20px" }}>
              <div style={{ backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "8px", border: "1px solid #ddd" }}>
                <h4 style={{ margin: "0 0 10px 0", color: "#007bff" }}>Users</h4>
                <p><strong>Total:</strong> {stats.users.total}</p>
                <p><strong>Admins:</strong> {stats.users.admins}</p>
                <p><strong>Teachers:</strong> {stats.users.teachers}</p>
                <p><strong>Students:</strong> {stats.users.students}</p>
              </div>
              
              <div style={{ backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "8px", border: "1px solid #ddd" }}>
                <h4 style={{ margin: "0 0 10px 0", color: "#28a745" }}>Assignments</h4>
                <p><strong>Total Assignments:</strong> {stats.assignments.total}</p>
                <p><strong>Total Submissions:</strong> {stats.assignments.submissions}</p>
                <p><strong>Submission Rate:</strong> {stats.assignments.total > 0 ? Math.round((stats.assignments.submissions / stats.assignments.total) * 100) : 0}%</p>
              </div>
              
              <div style={{ backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "8px", border: "1px solid #ddd" }}>
                <h4 style={{ margin: "0 0 10px 0", color: "#dc3545" }}>Recent Users</h4>
                {stats.recent.users.length === 0 ? (
                  <p>No recent users</p>
                ) : (
                  <ul style={{ margin: 0, paddingLeft: "20px" }}>
                    {stats.recent.users.map((user) => (
                      <li key={user._id} style={{ marginBottom: "5px" }}>
                        {user.name} ({user.role}) - {formatDate(user.createdAt)}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              
              <div style={{ backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "8px", border: "1px solid #ddd" }}>
                <h4 style={{ margin: "0 0 10px 0", color: "#ffc107" }}>Recent Assignments</h4>
                {stats.recent.assignments.length === 0 ? (
                  <p>No recent assignments</p>
                ) : (
                  <ul style={{ margin: 0, paddingLeft: "20px" }}>
                    {stats.recent.assignments.map((assignment) => (
                      <li key={assignment._id} style={{ marginBottom: "5px" }}>
                        {assignment.subject} - {formatDate(assignment.createdAt)}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ) : (
            <p>Failed to load statistics</p>
          )}
        </div>
      )}
    </div>
  );
}

export default AdminPortal;
