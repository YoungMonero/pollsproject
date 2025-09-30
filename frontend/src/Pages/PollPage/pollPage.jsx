// src/pages/PollPage.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import * as pollApi from "../../Api/poll.js";
import styles from './style.module.css';

// // Mock API for demonstration
// const pollApi = {
//   listPolls: async () => [],
//   createPoll: async (data) => ({ poll: data }),
//   updatePoll: async () => ({}),
//   deletePoll: async () => ({}),
//   changePollStatus: async () => ({})
// };

export default function PollPage() {
  const { sessionId } = useParams();

  const [polls, setPolls] = useState([]);
  const [selectedPoll, setSelectedPoll] = useState(null);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPolls();
  }, []);

  async function fetchPolls() {
    try {
      const data = await pollApi.listPolls(sessionId);
      setPolls(data);
    } catch (err) {
      console.error("Failed to fetch polls", err);
    }
  }

  function resetForm() {
    setSelectedPoll(null);
    setQuestion("");
    setOptions(["", ""]);
  }

  function handleOptionChange(index, value) {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  }

  function addOption() {
    setOptions([...options, ""]);
  }

  function getVotePercent(optionVotes, poll) {
    if (!Array.isArray(poll.options)) return 0;
    const total = poll.options.reduce((sum, opt) => sum + (opt.votes || 0), 0);
    if (total === 0) return 0;
    return ((optionVotes / total) * 100).toFixed(1);
  }

  async function savePoll() {
    if (!question.trim()) return alert("Please enter a question");
    setLoading(true);
    try {
      if (selectedPoll) {
        await pollApi.updatePoll(selectedPoll.id, { question, options });
      } else {
        const newPoll = await pollApi.createPoll({
          sessionId,
          question,
          options,
          type: "single",
        });
        setPolls([...polls, newPoll.poll]);
      }
      await fetchPolls();
      resetForm();
    } catch (err) {
      console.error(err);
      alert("Failed to save poll");
    } finally {
      setLoading(false);
    }
  }

  async function publishPoll(poll) {
    try {
      await pollApi.changePollStatus(poll.id, "published");
      await fetchPolls();
    } catch (err) {
      console.error("Failed to publish poll", err);
    }
  }

  async function deletePoll(pollId) {
    if (!window.confirm("Are you sure you want to delete this poll?")) return;
    try {
      await pollApi.deletePoll(pollId);
      await fetchPolls();
      if (selectedPoll?.id === pollId) resetForm();
    } catch (err) {
      console.error("Failed to delete poll", err);
    }
  }

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2 className={styles.sidebarTitle}>My Polls</h2>
          <button onClick={resetForm} className={styles.newPollBtn}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add
          </button>
        </div>
        
        <ul className={styles.pollsList}>
          {polls.map((p) => (
            <li key={p.id} className={styles.pollItem}>
              <div className={styles.pollItemContent}>
                <p className={styles.pollItemTitle}>{p.question}</p>
                <span className={`${styles.statusBadge} ${p.status === "published" ? styles.published : styles.draft}`}>
                  {p.status === "published" ? (
                    <>
                      <span className={styles.statusDot}></span>
                      Live
                    </>
                  ) : (
                    'Draft'
                  )}
                </span>
              </div>
              <div className={styles.pollItemActions}>
                <button
                  onClick={() => {
                    setSelectedPoll(p);
                    setQuestion(p.question);
                    setOptions(p.options?.map((o) => o.label) || ["", ""]);
                  }}
                  className={styles.editBtn}
                  title="Edit"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                </button>
                <button
                  onClick={() => deletePoll(p.id)}
                  className={styles.deleteBtn}
                  title="Delete"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <motion.div
        className={styles.mainContent}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.contentHeader}>
          <h1 className={styles.pageTitle}>
            {selectedPoll ? "Edit Poll" : "Create New Poll"}
          </h1>
        </div>

        <div className={styles.formContainer}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Question</label>
            <input
              type="text"
              placeholder="What would you like to ask?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Answer Options</label>
            <div className={styles.optionsList}>
              {options.map((opt, i) => (
                <div key={i} className={styles.optionInput}>
                  <span className={styles.optionNumber}>{i + 1}</span>
                  <input
                    type="text"
                    placeholder={`Option ${i + 1}`}
                    value={opt}
                    onChange={(e) => handleOptionChange(i, e.target.value)}
                    className={styles.input}
                  />
                </div>
              ))}
            </div>
            <button onClick={addOption} className={styles.addOptionBtn}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Add Option
            </button>
          </div>

          <div className={styles.formActions}>
            <button
              onClick={savePoll}
              disabled={loading}
              className={styles.saveBtn}
            >
              {loading ? "Saving..." : selectedPoll ? "Update Poll" : "Save Poll"}
            </button>

            {selectedPoll && selectedPoll.status !== "published" && (
              <button
                onClick={() => publishPoll(selectedPoll)}
                className={styles.publishBtn}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polygon points="10 8 16 12 10 16 10 8"></polygon>
                </svg>
                Publish
              </button>
            )}
          </div>
        </div>

        {/* Results Preview */}
        <div className={styles.resultsSection}>
          <h2 className={styles.sectionTitle}>Live Results</h2>
          <div className={styles.resultsGrid}>
            {polls.map((poll) => (
              <div key={poll.id} className={styles.resultCard}>
                <h3 className={styles.resultTitle}>{poll.question}</h3>
                {poll.options?.length > 0 ? (
                  <div className={styles.optionsResults}>
                    {poll.options.map((opt) => (
                      <div key={opt.id} className={styles.optionResult}>
                        <div className={styles.optionHeader}>
                          <span className={styles.optionText}>{opt.label}</span>
                          <span className={styles.percentage}>{getVotePercent(opt.votes, poll)}%</span>
                        </div>
                        <div className={styles.progressBar}>
                          <div 
                            className={styles.progressFill} 
                            style={{width: `${getVotePercent(opt.votes, poll)}%`}}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className={styles.noOptions}>No options yet.</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}