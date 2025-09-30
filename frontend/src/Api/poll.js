// src/api/poll.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/polls", // your backend polls route
  withCredentials: true, // include cookies for auth
});

// Create a poll
export const createPoll = async ({ sessionId, question, options, type = "single" }) => {
  const res = await API.post("/", { sessionId, question, options, type });
  return res.data;
};

// List polls for a session
export const listPolls = async (sessionId) => {
  const res = await API.get(`/${sessionId}`);
  return res.data;
};

// Update a poll (question/options)
export const updatePoll = async (pollId, { question, options }) => {
  const res = await API.patch(`/${pollId}`, { question, options });
  return res.data;
};

// Change poll status (draft/published/closed)
export const changePollStatus = async (pollId, status) => {
  const res = await API.patch(`/${pollId}/status`, { status });
  return res.data;
};

// Get poll results
export const getPollResults = async (pollId) => {
  const res = await API.get(`/${pollId}/results`);
  return res.data;
};
