// src/components/ParticipantJoin/ParticipantJoin.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as participantApi from "../../Api/participant";
import styles from './style.module.css';

export default function ParticipantJoin() {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleJoin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await participantApi.joinSession({ code, name, email, phone });

      sessionStorage.setItem("participant", JSON.stringify(res.participant));
      sessionStorage.setItem("participant_polls", JSON.stringify(res.polls));

      navigate("/participant-dashboard");
    } catch (err) {
      console.error("Failed to join session:", err);
      alert("Could not join session. Check code and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
              <div className={styles.header}>
          <div className={styles.iconWrapper}>
            <div className={styles.icon}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
          </div>
          <h1 className={styles.title}>Join Session</h1>
          <p className={styles.subtitle}>Enter your session code to participate</p>
        </div>

      <div className={styles.joinCard}>
        
        <form onSubmit={handleJoin} className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Session Code</label>
            <input
              type="text"
              placeholder="Enter 6-digit code"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              className={`${styles.input} ${styles.codeInput}`}
              required
              maxLength="6"
            />
          </div>
          
          <div className={styles.inputGroup}>
            <label className={styles.label}>Your Name</label>
            <input
              type="text"
              placeholder="How should we call you?"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          
          <div className={styles.optionalSection}>
            <h3 className={styles.sectionTitle}>Optional Information</h3>
            
            <div className={styles.inputGroup}>
              <label className={styles.label}>Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
              />
            </div>
            
            <div className={styles.inputGroup}>
              <label className={styles.label}>Phone</label>
              <input
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={styles.input}
              />
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className={`${styles.submitButton} ${loading ? styles.loading : ''}`}
          >
            {loading ? (
              <span className={styles.loadingContent}>
                <span className={styles.spinner}></span>
                Joining Session...
              </span>
            ) : 'Join Session'}
          </button>
        </form>
      </div>
    </div>
  );
}