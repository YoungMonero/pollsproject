import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/participants", // participant-specific routes
  withCredentials: true,
});

const VOTE_API = axios.create({
  baseURL: "http://localhost:5000/api/votes", // vote-specific routes
  withCredentials: true,
});

// Generic error wrapper for clean error handling
const handleRequest = async (request) => {
  try {
    const res = await request;
    return res.data;
  } catch (err) {
    if (err.response) {
      throw new Error(err.response.data.error || "Request failed");
    } else if (err.request) {
      throw new Error("No response from server. Check your connection.");
    } else {
      throw new Error(err.message || "Unexpected error");
    }
  }
};

// Join a session as participant
export const joinSession = async ({ code, name, email, phone }) =>
  handleRequest(API.post("/join", { code, name, email, phone }));

// Get published polls for a session
export const getPublishedPolls = async (sessionId) =>
  handleRequest(API.get(`/polls/${sessionId}`));

// Submit a vote (pollId + optionId + participantId)
export const voteOnPoll = async (pollId, optionId, participantId) =>
  handleRequest(VOTE_API.post("/", { pollId, optionId, participantId }));

// Get all votes for a given poll (useful for host dashboard)
export const getVotesForPoll = async (pollId) =>
  handleRequest(VOTE_API.get(`/${pollId}`));
