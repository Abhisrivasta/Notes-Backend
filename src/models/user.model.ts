import mongoose, { Schema } from "mongoose";
import type { IUser } from "../types/user.types";

const userSchema = new Schema<IUser>(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
      index: true 
    },

    isPremium: {
      type: Boolean,
      default: false
    },

    premiumExpiresAt: {
      type: Date
    },

    role: {
      type: String,
      enum: ["user", "guest"],
      default: "user"
    }
  },
  {
    timestamps: true
  }
);

export const User = mongoose.model<IUser>("User", userSchema);