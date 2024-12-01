import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/auth/user.model.js";

export const protect = asyncHandler(async (req, res, next) => {
  try {
    // check if user is login
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Not authorized, plase login!" });
    }
    // verify the token
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    // get user from the token
    const user = await User.findById(decode.id).select("-password");

    // check if user exists
    if (!user) {
      res.status(404).json({ message: "User not found!" });
    }

    // set user details in the request object
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized, token failed!" });
  }
});
