// routes/host.js
import express from 'express';
import * as hostCtrl from '../controllers/hostControllers.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// create & list sessions
router.post('/sessions', requireAuth, hostCtrl.createSession);
router.get('/sessions', requireAuth, hostCtrl.listSessions);

// polls under a session
router.post('/sessions/:sessionId/polls', requireAuth, hostCtrl.createPoll);
router.get('/sessions/:sessionId/polls', requireAuth, hostCtrl.listPolls);

// poll actions
router.post('/polls/:pollId/publish', requireAuth, hostCtrl.publishPoll);
router.post('/polls/:pollId/hide', requireAuth, hostCtrl.hidePoll);
router.post('/polls/:pollId/close', requireAuth, hostCtrl.closePoll);

// update poll (question / options)
router.patch('/polls/:pollId', requireAuth, hostCtrl.updatePoll);

export default router;
