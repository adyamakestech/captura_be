import express from "express";
import {
  uploadVideoController,
  deleteVideoController,
} from "../controllers/video.controller.js";
import { verifyToken } from "../middlewares/middleware.js";
import { upload } from "../middlewares/video.js";

const router = express.Router();

router.post(
  "/upload",
  verifyToken,
  upload.single("video"),
  uploadVideoController
);
router.delete("/delete/:id", verifyToken, deleteVideoController);

export default router;
