// services/sessionService.js
import pool from '../db/index.js';

function randomCode(len = 6) {
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'; // avoid confusing chars
  let out = '';
  for (let i = 0; i < len; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

export async function generateUniqueCode() {
  for (let i = 0; i < 10; i++) {
    const code = randomCode();
    const q = await pool.query('SELECT id FROM sessions WHERE code = $1', [code]);
    if (q.rowCount === 0) return code;
  }
  throw new Error('Failed to generate unique session code');
}

export async function createSession({ hostId, title }) {
  const code = await generateUniqueCode();
  const q = await pool.query(
    'INSERT INTO sessions(host_id, title, code) VALUES($1, $2, $3) RETURNING id, host_id, title, code, created_at',
    [hostId, title, code]
  );
  return q.rows[0];
}

export async function getSessionsByHost(hostId) {
  const q = await pool.query('SELECT id, title, code, created_at FROM sessions WHERE host_id = $1 ORDER BY created_at DESC', [hostId]);
  return q.rows;
}

export async function getSessionById(sessionId) {
  const q = await pool.query('SELECT * FROM sessions WHERE id = $1', [sessionId]);
  return q.rows[0] ?? null;
}
