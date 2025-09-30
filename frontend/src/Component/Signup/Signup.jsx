// src/pages/Register.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // <-- Import framer-motion
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
      await api.login({ emailOrUsername: form.username, password: form.password });
      setUser({ username: form.username });
      navigate("/dashboard");
    } catch (err) {
      setErrors({ general: err?.error || err?.message || "Registration failed" });
    } finally {
      setLoading(false);
    }
  }

  // Framer Motion variants
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({ opacity: 1, x: 0, transition: { delay: i * 0.1, duration: 0.4 } })
  };

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.card}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className={styles.title}>Create Your Account</h2>
        <p className={styles.subtitle}>Fill in the details to register your account.</p>

        <form className={styles.form} onSubmit={handleRegister}>
          <motion.label variants={inputVariants} custom={0}>Username</motion.label>
          <motion.input
            type="text"
            name="username"
            placeholder="Your name"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            variants={inputVariants}
            custom={1}
          />
          {errors.username && <p className={styles.error}>{errors.username}</p>}

          <motion.label variants={inputVariants} custom={2}>Email</motion.label>
          <motion.input
            type="email"
            name="email"
            placeholder="user@company.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            variants={inputVariants}
            custom={3}
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>}

          <motion.label variants={inputVariants} custom={4}>Password</motion.label>
          <motion.input
            type="password"
            name="password"
            placeholder="Enter password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            variants={inputVariants}
            custom={5}
          />
          {errors.password && <p className={styles.error}>{errors.password}</p>}
          {errors.general && <p className={styles.error}>{errors.general}</p>}

          <motion.button
            type="submit"
            className={styles.primaryBtn}
            disabled={loading}
            variants={inputVariants}
            custom={6}
          >
            {loading ? "Please wait..." : "Register"}
          </motion.button>
        </form>

        <motion.div
          className={styles.divider}
          variants={inputVariants}
          custom={7}
        >
          OR REGISTER WITH
        </motion.div>
        <motion.div
          className={styles.socialButtons}
          variants={inputVariants}
          custom={8}
        >
          <button className={styles.googleBtn}> <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
           <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
           </svg><h4>Google</h4></button>
          <button className={styles.appleBtn}> <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
           <path d="M 44.527344 34.75 C 43.449219 37.144531 42.929688 38.214844 41.542969 40.328125 C 39.601563 43.28125 36.863281 46.96875 33.480469 46.992188 C 30.46875 47.019531 29.691406 45.027344 25.601563 45.0625 C 21.515625 45.082031 20.664063 47.03125 17.648438 47 C 14.261719 46.96875 11.671875 43.648438 9.730469 40.699219 C 4.300781 32.429688 3.726563 22.734375 7.082031 17.578125 C 9.457031 13.921875 13.210938 11.773438 16.738281 11.773438 C 20.332031 11.773438 22.589844 13.746094 25.558594 13.746094 C 28.441406 13.746094 30.195313 11.769531 34.351563 11.769531 C 37.492188 11.769531 40.8125 13.480469 43.1875 16.433594 C 35.421875 20.691406 36.683594 31.78125 44.527344 34.75 Z M 31.195313 8.46875 C 32.707031 6.527344 33.855469 3.789063 33.4375 1 C 30.972656 1.167969 28.089844 2.742188 26.40625 4.78125 C 24.878906 6.640625 23.613281 9.398438 24.105469 12.066406 C 26.796875 12.152344 29.582031 10.546875 31.195313 8.46875 Z"></path>
           </svg><h4>Apple</h4></button>
        </motion.div>

        <motion.p
          className={styles.switchText}
          variants={inputVariants}
          custom={9}
        >
          Already have an account? <Link to="/login">Log In</Link>
        </motion.p>
      </motion.div>
    </div>
  );
}
