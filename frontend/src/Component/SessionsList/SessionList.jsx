import { motion } from "framer-motion";
import { Calendar, Users, MoreHorizontal } from "lucide-react";
import styles from "./SessionsList.module.css";

export default function SessionsList({ 
  sessions, 
  filterTab, 
  onFilterChange, 
  onSessionClick 
}) {
  const tabs = [
    { id: "all", label: "All", count: sessions.length },
    { id: "active", label: "Active & upcoming", count: sessions.filter(s => s.status === "active").length },
    { id: "past", label: "Past", count: sessions.filter(s => s.status === "inactive").length },
  ];

  const formatDate = (dateString) => {
    if (!dateString) return "Recently created";
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      {/* Filter Tabs */}
      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => onFilterChange(tab.id)}
            className={`${styles.tab} ${filterTab === tab.id ? styles.tabActive : ''}`}
            whileHover={{ y: -1 }}
            transition={{ duration: 0.2 }}
          >
            {tab.label} {tab.count > 0 && <span className={styles.tabCount}>{tab.count}</span>}
          </motion.button>
        ))}
      </div>

      {/* Sessions Table */}
      <div className={styles.tableWrapper}>
        <div className={styles.tableHeader}>
          <div className={styles.headerCell}>Session details</div>
          <div className={styles.headerCell}>Status</div>
          <div className={styles.headerCell}>More actions</div>
        </div>

        <div className={styles.tableBody}>
          {sessions.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>
                <Users className={styles.emptyIconSvg} />
              </div>
              <h3 className={styles.emptyTitle}>No sessions yet</h3>
              <p className={styles.emptyDescription}>
                Create your first polling session to get started
              </p>
            </div>
          ) : (
            sessions.map((session, index) => (
              <motion.div
                key={session.id}
                className={styles.tableRow}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => onSessionClick(session.id)}
                whileHover={{ y: -2, boxShadow: "0 8px 25px -8px rgba(0,0,0,0.1)" }}
              >
                <div className={styles.sessionDetails}>
                  <h3 className={styles.sessionTitle}>{session.title}</h3>
                  <div className={styles.sessionMeta}>
                    <span className={styles.sessionCode}>#{session.code}</span>
                    <span className={styles.sessionDate}>
                      <Calendar className={styles.dateIcon} />
                      {formatDate(session.createdAt)}
                    </span>
                  </div>
                </div>

                <div className={styles.statusCell}>
                  <span className={`${styles.statusBadge} ${
                    session.status === "active" ? styles.statusActive : styles.statusInactive
                  }`}>
                    {session.status === "active" ? "Active" : "Inactive"}
                  </span>
                </div>

                <div className={styles.actionsCell}>
                  <button 
                    className={styles.actionsButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle actions menu
                    }}
                  >
                    <MoreHorizontal className={styles.actionsIcon} />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
}