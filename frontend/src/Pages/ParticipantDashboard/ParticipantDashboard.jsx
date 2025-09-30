import { useEffect, useState } from "react";
import * as participantApi from "../../Api/participant";
import styles from './style.module.css';

export default function ParticipantDashboard() {
  const [polls, setPolls] = useState(() => {
    const stored = sessionStorage.getItem("participant_polls");
    return stored ? JSON.parse(stored) : [];
  });

  const [votingState, setVotingState] = useState({}); // track which polls/options are being voted on
  const [votedOptions, setVotedOptions] = useState({}); // track submitted votes

  const participant = JSON.parse(sessionStorage.getItem("participant"));

  useEffect(() => {
    if (!participant) return;

    async function fetchPolls() {
      try {
        const data = await participantApi.getPublishedPolls(participant.session_id);
        setPolls(data.polls || []);
        sessionStorage.setItem("participant_polls", JSON.stringify(data.polls || []));
      } catch (err) {
        console.error("Error fetching polls:", err);
      }
    }

    fetchPolls();
  }, [participant]);

  // Handle voting
  const handleVote = async (pollId, optionId) => {
    if (!participant) return;

    try {
      setVotingState((prev) => ({ ...prev, [pollId]: optionId }));

      await participantApi.voteOnPoll(pollId, optionId, participant.id);

      setVotedOptions((prev) => ({ ...prev, [pollId]: optionId }));
      
      // Show success notification
      const notification = document.createElement('div');
      notification.className = styles.notification;
      notification.textContent = 'Vote submitted successfully!';
      document.body.appendChild(notification);
      setTimeout(() => {
        notification.remove();
      }, 3000);
      
    } catch (err) {
      console.error("Error submitting vote:", err);
      alert(err.message || "Failed to submit vote.");
    } finally {
      setVotingState((prev) => ({ ...prev, [pollId]: null }));
    }
  };

  if (!participant) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorCard}>
          <div className={styles.errorIcon}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
          </div>
          <h2 className={styles.errorTitle}>Session Not Found</h2>
          <p className={styles.errorMessage}>
            No participant session found. Please join a session first.
          </p>
          <a href="/join" className={styles.joinButton}>Join Session</a>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.welcomeSection}>
          <h1 className={styles.welcomeTitle}>Welcome, {participant.name}!</h1>
          <div className={styles.sessionInfo}>
            <span className={styles.sessionBadge}>Session: {participant.session_id}</span>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        {polls.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 12l2 2 4-4"></path>
                <path d="M21 12c.552 0 1-.448 1-1V8c0-.552-.448-1-1-1H3c-.552 0-1 .448-1 1v3c0 .552.448 1 1 1h9l4-4h5z"></path>
              </svg>
            </div>
            <h2 className={styles.emptyTitle}>No Polls Available</h2>
            <p className={styles.emptyMessage}>
              The host hasn't published any polls yet. Stay tuned!
            </p>
          </div>
        ) : (
          <div className={styles.pollsList}>
            {polls.map((poll) => (
              <div key={poll.id} className={styles.pollCard}>
                <div className={styles.pollHeader}>
                  <h2 className={styles.pollQuestion}>{poll.question}</h2>
                  <div className={styles.pollMeta}>
                    {poll.options.length} options available
                  </div>
                </div>
                
                <div className={styles.optionsList}>
                  {poll.options.map((opt) => {
                    const isVoted = votedOptions[poll.id] === opt.id;
                    const isLoading = votingState[poll.id] === opt.id;
                    const isDisabled = votedOptions[poll.id] && !isVoted;

                    return (
                      <div
                        key={opt.id}
                        className={`${styles.optionItem} ${isVoted ? styles.voted : ''} ${isDisabled ? styles.disabled : ''}`}
                      >
                        <div className={styles.optionContent}>
                          <span className={styles.optionLabel}>{opt.label}</span>
                          {isVoted && (
                            <div className={styles.votedIndicator}>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="20,6 9,17 4,12"></polyline>
                              </svg>
                            </div>
                          )}
                        </div>
                        
                        <button
                          disabled={isVoted || isLoading || isDisabled}
                          onClick={() => handleVote(poll.id, opt.id)}
                          className={`${styles.voteButton} ${isVoted ? styles.votedButton : ''}`}
                        >
                          {isVoted ? (
                            'Voted'
                          ) : isLoading ? (
                            <span className={styles.loadingContent}>
                              <span className={styles.spinner}></span>
                              Voting...
                            </span>
                          ) : (
                            'Vote'
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}