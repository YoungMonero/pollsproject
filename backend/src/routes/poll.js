import { Router } from "express";
import * as pollCtrl from "../controllers/pollController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/", requireAuth, pollCtrl.createPoll);
router.get("/:sessionId", requireAuth, pollCtrl.listPolls);
router.patch("/:pollId/status", requireAuth, pollCtrl.updateStatus);
router.get("/:pollId/results", requireAuth, pollCtrl.results);

export default router;
