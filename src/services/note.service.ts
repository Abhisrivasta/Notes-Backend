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