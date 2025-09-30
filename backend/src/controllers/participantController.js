import { joinSessionService, getPublishedPollsService } from '../services/participantService.js';

export const joinSession = async (req, res) => {
  try {
    const { code, name, email, phone } = req.body;
    if (!code || !name) {
      return res.status(400).json({ error: 'code and name are required' });
    }

    // Join session and get participant object
    const participant = await joinSessionService(code, name, email, phone);

    // Fetch published polls right after joining
    const polls = await getPublishedPollsService(participant.session_id);

    return res.status(201).json({
      message: 'Joined successfully',
      participant,
      polls, // 👈 include polls directly in the join response
    });
  } catch (err) {
    console.error(err);
    if (err.message === 'Session not found') {
      return res.status(404).json({ error: err.message });
    }
    res.status(500).json({ error: 'Failed to join session' });
  }
};

export const getPublishedPolls = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const polls = await getPublishedPollsService(sessionId);
    return res.json({ polls });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not fetch polls' });
  }
};
