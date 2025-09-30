import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/host',
  withCredentials: true,
});

export const createSession = async (title) => {
  const res = await API.post('/sessions', { title });
  return res.data;
};

export const listSessions = async () => {
  const res = await API.get('/sessions');
  return res.data.sessions;
};
