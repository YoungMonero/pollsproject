// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "../../Api/authLogout"; // use the same API logic
import { useAuth } from "../../Context/AuthContext";
import styles from "./styles.module.css";

export default function Login() {
  const [form, setForm] = useState({ emailOrUsername: "", password: "" });
  const [errors, setErrors] = useState({});
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!form.emailOrUsername.trim()) newErrors.emailOrUsername = "Email/Username is required";
    if (!form.password.trim()) newErrors.password = "Password is required";
    else if (form.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    return newErrors;
  };

  async function handleLogin(e) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const data = await api.login(form);
      setUser({ username: data.username }); // store user in context
      navigate("/dashboard");
    } catch (err) {
      setErrors({ general: err?.error || err?.message || "Login failed" });
    }
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginRight}>
        <form className={styles.loginForm} onSubmit={handleLogin}>
          <h2>Welcome Back</h2>
          <p>Enter your email/username and password to access your account.</p>

          <label>Email / Username</label>
          <input
            type="text"
            name="emailOrUsername"
            placeholder="user@company.com"
            value={form.emailOrUsername}
            onChange={(e) => setForm({ ...form, emailOrUsername: e.target.value })}
          />
          {errors.emailOrUsername && <p className={styles.error}>{errors.emailOrUsername}</p>}

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

          <div className={styles.loginOptions}>
            <label>
              <input type="checkbox" /> <p>Remember Me</p>
            </label>
            <a href="#">Forgot Your Password?</a>
          </div>

          <button type="submit" className={styles.loginBtn}>Log In</button>

          <div className={styles.divider}>OR LOGIN WITH</div>
          <div className={styles.socialButtons}>
            <button type="button">Google</button>
            <button type="button">Apple</button>
          </div>

          <p className={styles.switchText}>
            Don’t Have An Account? <a href="/register">Register Now</a>
          </p>
        </form>
      </div>
    </div>
  );
}
