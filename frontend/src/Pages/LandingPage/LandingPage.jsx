import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BarChart3, Users, Shield, TrendingUp, Zap, Globe } from "lucide-react";
import styles from "./styles.module.css";
import heroImage from "../../assets/images/hero-polling.jpg";
import realtimeIcon from "../../assets/images/feature-realtime.png";
import engagementIcon from "../../assets/images/feature-engagement.png";
import secureIcon from "../../assets/images/feature-secure.png";
import DarkModeToggle from "../../Component/DarkModeToggle/DarkModeToggle";

const LandingPage = () => {
  const navigate = useNavigate();

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const features = [
    {
      icon: realtimeIcon,
      title: "Real-Time Analytics",
      description: "Get instant insights with live polling results and comprehensive analytics dashboard"
    },
    {
      icon: engagementIcon,
      title: "Boost Engagement",
      description: "Drive participation with interactive polls that captivate your audience"
    },
    {
      icon: secureIcon,
      title: "Enterprise Security",
      description: "Bank-level encryption and security protocols to protect your sensitive data"
    }
  ];

  const stats = [
    { value: "10M+", label: "Polls Created" },
    { value: "500K+", label: "Active Users" },
    { value: "99.9%", label: "Uptime" },
    { value: "150+", label: "Countries" }
  ];

  return (
    <div className={styles.landingPage}>
      {/* Navigation */}
      <motion.nav 
        className={styles.nav}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.navContainer}>
          <div className={styles.logo}>
            <BarChart3 className={styles.logoIcon} />
            <span className={styles.logoText}>Poll Hub</span>
          </div>
          <div className={styles.navActions}>
            <DarkModeToggle />
            <button 
              className={styles.navButton}
              onClick={() => navigate("/login")}
            >
              Sign In
            </button>
            <button 
              className={styles.navButtonPrimary}
              onClick={() => navigate("/signup")}
            >
              Get Started
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <motion.div 
            className={styles.heroContent}
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div 
              className={styles.badge}
              variants={fadeInUp}
            >
              <Zap size={16} />
              <span>Trusted by Fortune 500 Companies</span>
            </motion.div>
            
            <motion.h1 
              className={styles.heroTitle}
              variants={fadeInUp}
            >
              Transform Feedback Into
              <span className={styles.heroTitleGradient}> Actionable Insights</span>
            </motion.h1>
            
            <motion.p 
              className={styles.heroSubtitle}
              variants={fadeInUp}
            >
              The enterprise-grade polling platform that drives real-time engagement,
              delivers powerful analytics, and scales with your organization
            </motion.p>

            <motion.div 
              className={styles.heroButtons}
              variants={fadeInUp}
            >
              <button 
                className={styles.heroCta}
                onClick={() => navigate("/signup")}
              >
                Register Now
              </button>
              <button 
                className={styles.heroCtaSecondary}
                onClick={() => navigate("/demo")}
              >
                Watch Demo
              </button>
            </motion.div>

            <motion.div 
              className={styles.heroStats}
              variants={fadeInUp}
            >
              <div className={styles.statItem}>
                <Users size={20} />
                <span>Used by 500K+ professionals</span>
              </div>
              <div className={styles.statItem}>
                <Shield size={20} />
                <span>SOC 2 & GDPR Compliant</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            className={styles.heroImage}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className={styles.heroImageWrapper}>
              <img src={heroImage} alt="Poll Hub Platform" />
              <div className={styles.floatingCard1}>
                <TrendingUp size={24} />
                <div>
                  <div className={styles.floatingLabel}>Response Rate</div>
                  <div className={styles.floatingValue}>+89%</div>
                </div>
              </div>
              <div className={styles.floatingCard2}>
                <Globe size={24} />
                <div>
                  <div className={styles.floatingLabel}>Global Reach</div>
                  <div className={styles.floatingValue}>150+ Countries</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <motion.section 
        className={styles.statsSection}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className={styles.statsContainer}>
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              className={styles.statCard}
              variants={fadeInUp}
            >
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Features Section */}
      <section className={styles.features}>
        <motion.div 
          className={styles.featuresContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div className={styles.sectionHeader} variants={fadeInUp}>
            <h2 className={styles.sectionTitle}>
              Everything You Need to Drive Engagement
            </h2>
            <p className={styles.sectionSubtitle}>
              Powerful features designed for enterprise-scale polling and surveys
            </p>
          </motion.div>

          <motion.div 
            className={styles.featuresGrid}
            variants={staggerContainer}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                className={styles.featureCard}
                variants={fadeInUp}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className={styles.featureIconWrapper}>
                  <img src={feature.icon} alt={feature.title} className={styles.featureIcon} />
                </div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <motion.section 
        className={styles.cta}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className={styles.ctaContainer}>
          <motion.h2 
            className={styles.ctaTitle}
            variants={fadeInUp}
          >
            Ready to Transform Your Polling Experience?
          </motion.h2>
          <motion.p 
            className={styles.ctaSubtitle}
            variants={fadeInUp}
          >
            Join thousands of organizations worldwide using Poll Hub
          </motion.p>
          <motion.div 
            className={styles.ctaButtons}
            variants={fadeInUp}
          >
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerContent}>
            <div className={styles.footerBrand}>
              <BarChart3 className={styles.footerLogo} />
              <span className={styles.footerBrandText}>Poll Hub</span>
            </div>
            <p className={styles.footerText}>
              Enterprise polling platform trusted by leading organizations worldwide
            </p>
          </div>
          <div className={styles.footerBottom}>
            <p>&copy; 2024 Poll Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;