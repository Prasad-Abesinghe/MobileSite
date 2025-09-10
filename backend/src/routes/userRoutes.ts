import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  createUser,
  deleteUser,
} from "../controllers/userController";
import { protect, admin } from "../middleware/auth";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

// Admin: list/create/delete users
router.get("/", protect, admin, getUsers);
router.post("/", protect, admin, createUser);
router.delete("/:id", protect, admin, deleteUser);

export default router;
