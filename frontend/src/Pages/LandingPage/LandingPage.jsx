import React from "react";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";



const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      
      <div className={styles["main-container"]}>
        <div className={styles["side-img"]}>
          <img
            src="https://www.slido.com/static/slido-live-polling-analytics-and-exports.8aa0d7f3.1600.png"
            alt="landing"
          />
        </div>
        <div className={styles["right-side"]}>
          <div className={styles.logo}>
            <img
              width="90"
              height="80"
              src="https://cdn-icons-png.flaticon.com/512/9434/9434533.png"
              alt="Pull Hub Logo"
            />
          </div>

          <h1 className={styles.title}>Pull Hub</h1>
          <p className={styles.text}>Real Time Polling/Survey</p>
          
          <button
           className={styles.join}
           onClick={() => navigate("/signup")}
          >
         Join Now
       </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;