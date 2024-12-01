import express from "express";
import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
} from "../controllers/auth/user.controller.js";
import {
  adminMiddleware,
  creatorMiddleware,
  protect,
} from "../middleware/authMiddleware.js";
import {
  deleteUser,
  getAllUser,
} from "../controllers/auth/admin.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/profile", protect, getUser);
router.patch("/user", protect, updateUser);

// admin route
router.delete("/admin/users/:id", protect, adminMiddleware, deleteUser);
router.get("/users", protect, creatorMiddleware, getAllUser);

export default router;
