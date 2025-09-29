import { submitResponseService, getPollResponsesService } from '../services/responseService.js';

// Participant submits a choice
export const submitResponse = async (req, res) => {
  try {
    const { pollId, participantId, optionId } = req.body;
    if (!pollId || !participantId || !optionId) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const response = await submitResponseService(pollId, participantId, optionId);
    res.status(201).json({ message: 'Response submitted successfully', response });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to submit response' });
  }
};

// Host gets all responses for a poll
export const getPollResponses = async (req, res) => {
  try {
    const { pollId } = req.params;
    const responses = await getPollResponsesService(pollId);
    res.json({ responses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch responses' });
  }
};
