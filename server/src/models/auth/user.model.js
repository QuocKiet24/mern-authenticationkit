import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      trim: true,
      match: [
        /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/,
        "Please provide a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please provide your password"],
    },
    avatar: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "not yet",
    },
    role: {
      type: String,
      enum: ["admin", "user", "creator"],
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, minimized: true }
);

const User = mongoose.model("User", userSchema);

export default User;
