import mongoose, { Schema } from "mongoose";
import type { IUser } from "../types/user.types.js"

const userSchema: Schema<IUser> = new Schema(
{
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email"]
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false
  },

  role: {
    type: String,
    enum: ["user", "guest"],
    default: "user"
  },

  isActive: {
    type: Boolean,
    default: true
  }

},
{ timestamps: true }
);

export default mongoose.model<IUser>("User", userSchema);