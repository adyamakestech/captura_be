import express from "express";
import {
  createUserController,
  getAllUserController,
  searchUserController,
  updateUserController,
  deleteUserController,
} from "../controllers/user.controllers.js";

const router = express.Router();

router.post("/", createUserController);
router.get("/", getAllUserController);
router.post("/search", searchUserController);
router.put("/:id", updateUserController);
router.delete("/:id", deleteUserController);

export default router;
