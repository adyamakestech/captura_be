import express from "express";
import { uploadVideoController } from "../controllers/video.controller.js";
import { verifyToken } from "../middlewares/middleware.js";
import { upload } from "../middlewares/video.js";

const router = express.Router();

router.post(
  "/upload",
  verifyToken,
  upload.single("video"),
  uploadVideoController
);

export default router;
