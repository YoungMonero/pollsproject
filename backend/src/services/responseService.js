import db from '../db/index.js'; // your pg or sequelize instance

export const submitResponseService = async (pollId, participantId, optionId) => {
  const result = await db.query(
    'INSERT INTO responses (poll_id, participant_id, option_id) VALUES ($1, $2, $3) RETURNING *',
    [pollId, participantId, optionId]
  );
  return result.rows[0];
};

export const getPollResponsesService = async (pollId) => {
  const result = await db.query(
    `SELECT r.id, r.participant_id, r.option_id, p.label AS option_label, pa.name AS participant_name
     FROM responses r
     JOIN poll_options p ON r.option_id = p.id
     JOIN participants pa ON r.participant_id = pa.id
     WHERE r.poll_id = $1`,
    [pollId]
  );
  return result.rows;
};
