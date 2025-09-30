import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../../Component/Sidebar/Sidebar";
import DashboardHeader from "../../Component/Header/DashboardHeader";
import SessionsList from "../../Component/SessionsList/SessionList";
import CreateSessionModal from "../../Component/CreateSessionModal/CreateSessionModal";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import * as hostApi from "../../Api/host";
import { logout as authLogout } from "../../Api/authLogout";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const { user, setUser, loading } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTab, setFilterTab] = useState("all");
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await authLogout();
      setUser(null);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (!loading && user) fetchSessions();
  }, [loading, user]);

  async function fetchSessions() {
    try {
      const data = await hostApi.listSessions();
      setSessions(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleCreateSession(title) {
    try {
      const newSession = await hostApi.createSession(title);
      setSessions([newSession, ...sessions]);
      setModalOpen(false);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  const filteredSessions = sessions.filter(session => {
    const matchesSearch = session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         session.code.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterTab === "all") return matchesSearch;
    if (filterTab === "active") return matchesSearch && session.status === "active";
    if (filterTab === "inactive") return matchesSearch && session.status === "inactive";
    
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={styles.error}>
        <p>You are not logged in</p>
      </div>
    );
  }

  return (
    <motion.div 
      className={styles.dashboard}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Sidebar 
        user={user} 
        onLogout={handleLogout}
        activeSection="dashboard"
      />
      
      <main className={styles.mainContent}>
        <DashboardHeader 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onCreateSession={() => setModalOpen(true)}
        />
        
        <div className={styles.contentArea}>
          <SessionsList 
            sessions={filteredSessions}
            filterTab={filterTab}
            onFilterChange={setFilterTab}
            onSessionClick={(sessionId) => navigate(`/sessions/${sessionId}/polls`)}
          />
        </div>
      </main>

      <AnimatePresence>
        {modalOpen && (
          <CreateSessionModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            onCreateSession={handleCreateSession}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}