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
export const deleteNoteService = async (
  noteId: string,
  userId: mongoose.Types.ObjectId
) => {
  return await Note.findOneAndUpdate(
    {
      _id: noteId,
      owner: userId,
      isDeleted: false,
    },
    {
      isDeleted: true,
      deletedAt: new Date(),
    },
    { new: true }
  );
};


export const restoreNoteService = async (
  noteId: string,
  userId: mongoose.Types.ObjectId
) => {
  return await Note.findOneAndUpdate(
    {
      _id: noteId,
      owner: userId,
      isDeleted: true,
    },
    {
      isDeleted: false,
      deletedAt: null,
    },
    { new: true }
  );
};


export const getSingleNoteService = async (
  noteId: string,
  userId: mongoose.Types.ObjectId
) => {
  return await Note.findOne({
    _id: noteId,
    owner: userId,
    isDeleted: false,
  });
};

export const togglePinService = async (
  noteId: string,
  userId: mongoose.Types.ObjectId
) => {
  const note = await Note.findOne({
    _id: noteId,
    owner: userId,
  });

  if (!note) return null;

  note.isPinned = !note.isPinned;
  return await note.save();
};

export const getNoteServicefilter = async (
  userId: mongoose.Types.ObjectId,
  query: any
) => {
  const filter: any = {
    owner: userId,
    isDeleted: false,
  };

  if (query.isPinned) {
    filter.isPinned = query.isPinned === "true";
  }

  if (query.search) {
    filter.$or = [
      { title: { $regex: query.search, $options: "i" } },
      { content: { $regex: query.search, $options: "i" } },
    ];
  }

  return await Note.find(filter).sort({ createdAt: -1 });
};

export const permanentDeleteService = async (
  noteId: string,
  userId: mongoose.Types.ObjectId
) => {
  return await Note.findOneAndDelete({
    _id: noteId,
    owner: userId,
  });
};