import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import styles from "./CreateSessionModal.module.css";

export default function CreateSessionModal({ isOpen, onClose, onCreateSession }) {
  const [title, setTitle] = useState("");
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Session title is required");
      return;
    }

    setCreating(true);
    setError("");

    try {
      await onCreateSession(title.trim());
      setTitle("");
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create session");
    } finally {
      setCreating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className={styles.overlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className={styles.modal}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.modalHeader}>
            <h2 className={styles.modalTitle}>Create New Session</h2>
            <button 
              onClick={onClose}
              className={styles.closeButton}
              disabled={creating}
            >
              <X className={styles.closeIcon} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="sessionTitle" className={styles.label}>
                Session Title
              </label>
              <input
                id="sessionTitle"
                type="text"
                placeholder="Enter a descriptive title for your session"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (error) setError("");
                }}
                className={`${styles.input} ${error ? styles.inputError : ''}`}
                disabled={creating}
                autoFocus
              />
              {error && (
                <motion.p 
                  className={styles.errorMessage}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {error}
                </motion.p>
              )}
            </div>

            <div className={styles.actions}>
              <button
                type="button"
                onClick={onClose}
                className={styles.cancelButton}
                disabled={creating}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={creating || !title.trim()}
                className={styles.createButton}
              >
                {creating ? (
                  <>
                    <Loader2 className={styles.loadingIcon} />
                    Creating...
                  </>
                ) : (
                  "Create Session"
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}