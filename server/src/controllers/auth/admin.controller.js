import asyncHandler from "express-async-handler";
import User from "../../models/auth/user.model.js";

export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // attempt to find and delete the user
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Cannot Delete User" });
  }
});

export const getAllUser = asyncHandler(async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });

    if (!users) {
      res.status(404).json({ message: "Users not found" });
    }
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Cannot Get Users" });
  }
});
