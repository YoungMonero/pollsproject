import { Search, Plus } from "lucide-react";
import { motion } from "framer-motion";
import styles from "./DashboardHeader.module.css";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
// import DarkModeToggle from "../../components/DarkModeToggle/DarkModeToggle";

export default function DashboardHeader({ 
  searchQuery, 
  onSearchChange, 
  onCreateSession 
}) {
  return ( 
    <motion.header 
      className={styles.header}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <div className={styles.headerContent}>
        <div className={styles.searchSection}>
          <div className={styles.searchWrapper}>
            <Search className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search by name, owner, code"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>
        
        <div className={styles.actionsGroup}>
          <motion.button
            onClick={onCreateSession}
            className={styles.createButton}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus className={styles.createIcon} />
            Create Session
          </motion.button>
        </div>
        <div className={styles.darkmode}>
          <DarkModeToggle/>
        </div>
      </div>
    </motion.header>
  );
}