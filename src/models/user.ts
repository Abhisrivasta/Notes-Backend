import mongoose, { Schema } from "mongoose";
import type { IUser } from "../types/user.types"

const userSchema = new Schema<IUser>(
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
      trim: true
    },

    password: {
      type: String,
      required: true
    },

    isActive: {
      type: Boolean,
      default: true
    },

    isPremium: {
      type: Boolean,
      default: false
    },

    notesCount: {
      type: Number,
      default: 0
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
)

export default mongoose.model<IUser>("User", userSchema);