import React from 'react';
import Participant from '../../Component/Participant/Participant';
import Login from '../../Component/Login/Login';
import { motion } from "framer-motion";
import styles from './styles.module.css';

const LoginPage = () => {
  return (
    <motion.div
      className={styles.login}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Participant />
      <Login />
    </motion.div>
  );
};

export default LoginPage;
