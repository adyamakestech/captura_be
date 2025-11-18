import express from "express";
import { verifyToken } from "../middlewares/middleware.js";
import {
  createCaptionController,
  getCaptionByVoiceoverController,
  updateCaptionController,
  deleteCaptionController,
} from "../controllers/caption.controller.js";

const router = express.Router();

router.get("/:voiceoverId", verifyToken, getCaptionByVoiceoverController);
router.post("/:voiceoverId", verifyToken, createCaptionController);
router.patch("/edit/:captionId", verifyToken, updateCaptionController);
router.delete("/delete/:captionId", verifyToken, deleteCaptionController);

export default router;
