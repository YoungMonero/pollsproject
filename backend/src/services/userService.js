// services/userService.js
import {pool} from '../db/index.js';

export async function findByEmailOrUsername(identifier) {
  const q = await pool.query(
    'SELECT id, username, email, password_hash FROM users WHERE email=$1 OR username=$1',
    [identifier]
  );
  return q.rows[0] ?? null;
}

export async function createUser({ username, email, password_hash }) {
  const q = await pool.query(
    'INSERT INTO users(username, email, password_hash) VALUES($1, $2, $3) RETURNING id, username, email, created_at',
    [username, email, password_hash]
  );
  return q.rows[0];
}
