// routes/auth.js
import express from 'express';
import * as authCtrl from '../controllers/authController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);
router.get('/me', requireAuth, authCtrl.me);
router.post('/logout', authCtrl.logout);

export default router;
