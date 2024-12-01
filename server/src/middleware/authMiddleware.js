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

// admin middleware
export const adminMiddleware = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    //if user is admin, move to next middleware/controller
    next();
    return;
  } else {
    res.status(403).json({ message: "Only admins can do this!" });
  }
});

// creator middleware
export const creatorMiddleware = asyncHandler(async (req, res, next) => {
  if (
    (req.user && req.user.role === "creator") ||
    (req.user && req.user.role === "admin")
  ) {
    //if user is creator, move to next middleware/controller
    next();
    return;
  } else {
    res.status(403).json({ message: "Only creators can do this!" });
  }
});

// verify middleware
export const verifyMiddleware = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isVerified) {
    // if user is verified, move to the next middleware/controller
    next();
    return;
  }
  // if not verified, send 403 Forbidden --> terminate the request
  res.status(403).json({ message: "Please verify your email first!" });
});
