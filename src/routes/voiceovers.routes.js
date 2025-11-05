import express from "express";
import {
  uploadVoiceoversController,
  getVoiceoversByVideosIdController,
  deleteVoiceoversController,
} from "../controllers/voiceovers.controller.js";
import { verifyToken } from "../middlewares/middleware.js";
import { uploadVoiceover } from "../middlewares/voiceovers.js";

const router = express.Router();

router.post(
  "/upload",
  verifyToken,
  uploadVoiceover.single("audio"),
  uploadVoiceoversController
);
router.get("/:videoId", verifyToken, getVoiceoversByVideosIdController);
router.delete("/delete/:voiceId", verifyToken, deleteVoiceoversController);

export default router;
