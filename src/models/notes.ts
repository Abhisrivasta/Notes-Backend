import mongoose, { Schema } from "mongoose"
import type { INote } from "../types/notes.types"

const noteSchema = new Schema<INote>(
  {
    title: {
      type: String,
      trim: true
    },

    content: {
      type: String,
      required: true
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    tags: {
      type: [String],
      default: []
    },

    backgroundColor: {
      type: String,
      default: "white"
    },

    backgroundImage: {
      type: String
    },

    links: {
      type: [String],
      default: []
    },

    images: {
      type: [String],
      default: []
    },

    audio: {
      type: [String],
      default: []
    },

    isPinned: {
      type: Boolean,
      default: false
    },

    isQuickNote: {
      type: Boolean,
      default: false
    },

    isDeleted: {
      type: Boolean,
      default: false
    },

    deletedAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
)

export const Note = mongoose.model<INote>("Note", noteSchema)