const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:6000';

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const text = await res.text();
  let data = null;
  try { data = text ? JSON.parse(text) : null; } catch (e) { data = { raw: text }; }
  if (!res.ok) throw data || { message: 'Network error' };
  return data;
}

export const register = (body) => request('/api/auth/register', { method: 'POST', body: JSON.stringify(body) });
export const login = (body)    => request('/api/auth/login',    { method: 'POST', body: JSON.stringify(body) });
export const me = ()           => request('/api/auth/me',       { method: 'GET' });
export const logout = ()       => request('/api/auth/logout',   { method: 'POST' });
