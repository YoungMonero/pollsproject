import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './styles.module.css';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Participant = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!code.trim()) return;
    navigate("./Session"); // Navigate to session if code is valid
  };

  // Motion variants
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({ opacity: 1, x: 0, transition: { delay: i * 0.1, duration: 0.4 } })
  };

  return (

    <div className={styles.body}>
      <motion.div
        className={styles.participant}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2 variants={inputVariants} custom={0}>Joining as a participant ?</motion.h2>
        <motion.p variants={inputVariants} custom={1}>No account needed</motion.p>

        <motion.div className={styles.handleinput} variants={inputVariants} custom={2}>
          <form onSubmit={handleSubmit}>
            <label>
              <motion.input
                type="text"
                placeholder="Enter slido code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                variants={inputVariants}
                custom={3}
              />
            </label>
            <motion.button type="submit" variants={inputVariants} custom={4}>
              <ArrowRight />
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Participant;
