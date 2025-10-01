import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import styles from "./DeleteSessionModal.module.css";

export default function DeleteSessionModal({ isOpen, onClose, onDeleteSession, sessionId }) {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    if (!sessionId) {
      setError("No session selected for deletion");
      return;
    }

    setDeleting(true);
    setError("");

    try {
      await onDeleteSession(sessionId);
      setError("");
      onClose();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to delete session");
    } finally {
      setDeleting(false);
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
            <h2 className={styles.modalTitle}>Delete Session</h2>
            <button 
              onClick={onClose} 
              className={styles.closeButton}
              disabled={deleting}
            >
              <X className={styles.closeIcon} />
            </button>
          </div>

          <div className={styles.content}>
            <p>Are you sure you want to delete this session?</p>
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
              disabled={deleting}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className={styles.deleteButton}
              disabled={deleting}
            >
              {deleting ? (
                <>
                  <Loader2 className={styles.loadingIcon} />
                  Deleting...
                </>
              ) : (
                "Delete Session"
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
