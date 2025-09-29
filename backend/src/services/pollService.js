// services/pollService.js
import pool from '../db/index.js';

export async function createPoll({ sessionId, question, type = 'single', options = [] }) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const r = await client.query(
      'INSERT INTO polls(session_id, question, type) VALUES($1, $2, $3) RETURNING id, session_id, question, type, status, created_at',
      [sessionId, question, type]
    );
    const poll = r.rows[0];

    // insert options if any and type is not 'open'
    let insertedOptions = [];
    if (Array.isArray(options) && options.length > 0 && type !== 'open') {
      const inserts = [];
      for (let i = 0; i < options.length; i++) {
        inserts.push(
          client.query(
            'INSERT INTO poll_options(poll_id, label, position) VALUES($1, $2, $3) RETURNING id, label, position',
            [poll.id, options[i], i]
          )
        );
      }
      const results = await Promise.all(inserts);
      insertedOptions = results.map(r => r.rows[0]);
    }

    await client.query('COMMIT');
    return { poll, options: insertedOptions };
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

export async function getPollsBySession(sessionId) {
  const q = await pool.query(
    `SELECT p.id, p.question, p.type, p.status, p.created_at,
      COALESCE(
        json_agg(
          json_build_object(
            'id', o.id,
            'label', o.label,
            'position', o.position,
            'votes', COALESCE(vc.count, 0)
          )
          ORDER BY o.position
        ) FILTER (WHERE o.id IS NOT NULL), '[]') as options
     FROM polls p
     LEFT JOIN poll_options o ON o.poll_id = p.id
     LEFT JOIN (
        SELECT option_id, COUNT(*) as count
        FROM votes
        GROUP BY option_id
     ) vc ON vc.option_id = o.id  -- ✅ FIXED: using option_id
     WHERE p.session_id = $1
     GROUP BY p.id
     ORDER BY p.created_at ASC`,
    [sessionId]
  );
  return q.rows;
}



export async function updatePoll(pollId, { question, options }) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    if (question) {
      await client.query('UPDATE polls SET question = $1 WHERE id = $2', [question, pollId]);
    }

    // if options provided, for simplicity delete existing options and reinsert
    if (Array.isArray(options)) {
      await client.query('DELETE FROM poll_options WHERE poll_id = $1', [pollId]);
      for (let i = 0; i < options.length; i++) {
        await client.query(
          'INSERT INTO poll_options(poll_id, label, position) VALUES ($1, $2, $3)',
          [pollId, options[i], i]
        );
      }
    }

    await client.query('COMMIT');
    return true;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

export async function changePollStatus(pollId, status) {
  const valid = ['draft', 'published', 'closed'];
  if (!valid.includes(status)) throw new Error('Invalid status');
  const q = await pool.query(
    'UPDATE polls SET status = $1 WHERE id = $2 RETURNING id, status',
    [status, pollId]
  );
  return q.rows[0] ?? null;
}
