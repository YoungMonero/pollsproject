import { motion } from "framer-motion";
import { 
  BarChart3, 
  Users, 
  Settings, 
  BookOpen, 
  LogOut, 
  Home,
  PlusCircle,
  Activity
} from "lucide-react";
import styles from "./Sidebar.module.css";

export default function Sidebar({ user, onLogout, activeSection }) {
  const navigationItems = [
    { id: "dashboard", label: "My Sessions", icon: Home, active: activeSection === "dashboard" },
    { id: "analytics", label: "Analytics", icon: BarChart3, active: false },
    { id: "team", label: "Team", icon: Users, active: false },
    { id: "tutorials", label: "Tutorials", icon: BookOpen, active: false },
  ];

  const integrationItems = [
    { id: "powerpoint", label: "PowerPoint", icon: PlusCircle },
    { id: "teams", label: "Microsoft Teams", icon: Activity },
  ];

  return (
    <motion.aside 
      className={styles.sidebar}
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className={styles.sidebarContent}>
        {/* Logo & Brand */}
        <div className={styles.brand}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>P</div>
          </div>
          <div className={styles.brandInfo}>
            <h2 className={styles.brandName}>Pollup</h2>
            <span className={styles.brandSubtext}>{user.username}'s organization</span>
            <span className={styles.ownerBadge}>Owner</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className={styles.navigation}>
          <ul className={styles.navList}>
            {navigationItems.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <button 
                  className={`${styles.navItem} ${item.active ? styles.navItemActive : ''}`}
                >
                  <item.icon className={styles.navIcon} />
                  <span className={styles.navLabel}>{item.label}</span>
                </button>
              </motion.div>
            ))}
          </ul>
        </nav>

        {/* Integrations */}
        <div className={styles.integrations}>
          <h3 className={styles.sectionTitle}>Integrations</h3>
          <ul className={styles.integrationList}>
            {integrationItems.map((item) => (
              <motion.div 
                key={item.id}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <button className={styles.integrationItem}>
                  <item.icon className={styles.integrationIcon} />
                  <span className={styles.integrationLabel}>{item.label}</span>
                </button>
              </motion.div>
            ))}
          </ul>
        </div>
      </div>

      {/* Sidebar Footer */}
      <div className={styles.sidebarFooter}>
        <button 
          onClick={onLogout}
          className={styles.logoutButton}
        >
          <LogOut className={styles.logoutIcon} />
          <span>Logout</span>
        </button>
      </div>
    </motion.aside>
  );
}