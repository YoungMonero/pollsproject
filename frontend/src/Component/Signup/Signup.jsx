// src/pages/Register.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as api from "../../Api/authLogout";
import { useAuth } from "../../Context/AuthContext";
import styles from "./styles.module.css";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!form.username.trim()) newErrors.username = "Username is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Invalid email format";
    if (!form.password.trim()) newErrors.password = "Password is required";
    else if (form.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    return newErrors;
  };

  async function handleRegister(e) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      await api.register(form);
      // Auto-login after successful registration
      await api.login({ emailOrUsername: form.username, password: form.password });
      setUser({ username: form.username });
      navigate("/dashboard");
    } catch (err) {
      setErrors({ general: err?.error || err?.message || "Registration failed" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Create Your Account</h2>
        <p className={styles.subtitle}>Fill in the details to register your account.</p>

        <form className={styles.form} onSubmit={handleRegister}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="Your name"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          {errors.username && <p className={styles.error}>{errors.username}</p>}

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="user@company.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>}

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          {errors.password && <p className={styles.error}>{errors.password}</p>}
          {errors.general && <p className={styles.error}>{errors.general}</p>}

          <button type="submit" className={styles.primaryBtn} disabled={loading}>
            {loading ? "Please wait..." : "Register"}
          </button>
        </form>

        <div className={styles.divider}>OR REGISTER WITH</div>
        <div className={styles.socialButtons}>
          <button className={styles.googleBtn}>Google</button>
          <button className={styles.appleBtn}>Apple</button>
        </div>

        <p className={styles.switchText}>
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
}
