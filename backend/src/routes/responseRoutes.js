import express from 'express';
import { submitResponse, getPollResponses } from '../controllers/responsesController.js';

const router = express.Router();

// Participant submits choice
router.post('/submit', submitResponse);

// Host views all responses for a poll
router.get('/:pollId', getPollResponses);

export default router;
