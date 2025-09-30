// services/participantService.js
import db from '../db/index.js';

export async function joinSessionService(code, name, email, phone) {
  // find session by code
  const sessionResult = await db.query('SELECT id FROM sessions WHERE code=$1', [code]);
  if (sessionResult.rows.length === 0) {
    throw new Error('Session not found');
  }

  const sessionId = sessionResult.rows[0].id;

  // create participant
  const result = await db.query(
    `INSERT INTO participants (session_id, name, email, phone)
     VALUES ($1, $2, $3, $4) RETURNING id, name, session_id`,
    [sessionId, name, email || null, phone || null]
  );

  return result.rows[0];
}

export async function getPublishedPollsService(sessionId) {
  const polls = await db.query(
    `SELECT 
        p.id, 
        p.title, 
        p.question, 
        p.type, 
        p.status,
        COALESCE(
          json_agg(
            json_build_object('id', o.id, 'label', o.label)  -- ✅ CHANGED text ➝ label
          ) FILTER (WHERE o.id IS NOT NULL), '[]'
        ) AS options
     FROM polls p
     LEFT JOIN poll_options o ON p.id = o.poll_id
     WHERE p.session_id=$1 AND p.status='published'
     GROUP BY p.id
     ORDER BY p.id`,
    [sessionId]
  );

  return polls.rows;
}


