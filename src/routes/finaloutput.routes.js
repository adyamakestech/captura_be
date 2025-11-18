import express from "express";
import {
  createFinalOutputController,
  getFinalOutputByVideoIdController,
  deleteFinalOutputController,
} from "../controllers/finaloutput.controller.js";
import { verifyToken } from "../middlewares/middleware.js";

const router = express.Router();

router.post("/", verifyToken, createFinalOutputController);
router.get("/video/:videoId", verifyToken, getFinalOutputByVideoIdController);
router.delete("/:id", verifyToken, deleteFinalOutputController);

export default router;
