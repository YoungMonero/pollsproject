// routes/voteRoutes.js
import express from 'express';
import { submitVote, getVotesByPoll } from '../controllers/votesController.js';

const router = express.Router();

router.post('/', submitVote); // POST /api/votes
router.get('/:pollId', getVotesByPoll); // GET /api/votes/:pollId

export default router;
