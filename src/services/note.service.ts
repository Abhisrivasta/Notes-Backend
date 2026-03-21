import mongoose from "mongoose";
import { Note } from "../models/note.model";

export const createNoteService = async (
  data: any,
  userId: mongoose.Types.ObjectId
) => {
  return await Note.create({
    ...data,
    owner: userId,
  });
};

export const getNoteService = async (
  userId: mongoose.Types.ObjectId
) => {
  return await Note.find({
    owner: userId,
    isDeleted: false, 
  });
};

export const updateNoteService = async (
  noteId: string,
  userId: mongoose.Types.ObjectId,
  data: any
) => {
  return await Note.findOneAndUpdate(
    {
      _id: noteId,
      owner: userId,
      isDeleted: false,
    },
    data,
    { new: true },
  );
};

