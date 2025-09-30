// controllers/voteController.js
import pool from '../db/index.js'; // adjust path to your Postgres pool/connection file

export const submitVote = async (req, res) => {
  try {
    const { pollId, optionId, participantId } = req.body;

    if (!pollId || !optionId || !participantId) {
      return res.status(400).json({ error: 'pollId, optionId, and participantId are required' });
    }

    const query = `
      INSERT INTO votes (poll_id, option_id, participant_id)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const result = await pool.query(query, [pollId, optionId, participantId]);

    res.status(201).json({
      message: 'Vote submitted successfully',
      vote: result.rows[0],
    });
  } catch (err) {
    console.error('Vote submission failed:', err);
    res.status(500).json({ error: 'Failed to submit vote' });
  }
};

export const getVotesByPoll = async (req, res) => {
  try {
    const { pollId } = req.params;

    const query = `SELECT * FROM votes WHERE poll_id = $1;`;
    const result = await pool.query(query, [pollId]);

    res.json({ votes: result.rows });
  } catch (err) {
    console.error('Failed to fetch votes:', err);
    res.status(500).json({ error: 'Failed to fetch votes' });
  }
};
