import express from 'express';
import { joinSession, getPublishedPolls } from '../controllers/participantController.js';

const router = express.Router();

router.post('/join', joinSession);
router.get('/polls/:sessionId', getPublishedPolls);

export default router;
