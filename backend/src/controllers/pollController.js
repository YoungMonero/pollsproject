// controllers/pollController.js
import * as pollService from "../services/pollService.js";

export async function createPoll(req, res) {
  try {
    const { sessionId, question, type, options } = req.body;
    const poll = await pollService.createPoll({ sessionId, question, type, options });
    res.json(poll);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function listPolls(req, res) {
  try {
    const { sessionId } = req.params;
    const polls = await pollService.getPollsBySession(sessionId);
    res.json(polls);
  } catch (err) {
    console.error('❌ Error fetching polls:', err); // <-- ADD THIS
    res.status(500).json({ error: err.message });
  }
}

export async function updateStatus(req, res) {
  try {
    const { pollId } = req.params;
    const { status } = req.body;
    const updated = await pollService.changePollStatus(pollId, status);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function results(req, res) {
  try {
    const { pollId } = req.params;
    // implement your logic to get poll results from responses table
    const results = await pollService.getPollResults(pollId);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
