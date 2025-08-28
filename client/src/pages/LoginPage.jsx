import React, { useState } from "react";
import './css/LoginPage.css';

const LoginPage = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await res.json();
      if (!res.ok) return setError(data.message || "Login failed");

      localStorage.setItem("token", data.token);

      // ✅ Redirect based on role
      if (data.user.role === "admin") {
        window.location.href = "/admin/:collegeId";
      } else if (data.user.role === "teacher") {
        window.location.href = "/teacher-dashboard";
      } else if (data.user.role === "student") {
        window.location.href = "/student-dashboard";
      }
    } catch (err) {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <h1>EduLearn Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email"
          value={loginData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password"
          value={loginData.password} onChange={handleChange} required />
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
