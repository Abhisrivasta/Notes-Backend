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
  filter: any,
  page: number,
  limit: number
) => {
  const notes = await Note.find(filter)
    .sort({ isPinned: -1, createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();

  const total = await Note.countDocuments(filter);

  return {
    notes,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
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
    isDeleted : false
  });

  if (!note) return null;

  note.isPinned = !note.isPinned;
  return await note.save();
};


export const permanentDeleteService = async (
  noteId: string,
  userId: mongoose.Types.ObjectId
) => {
  return await Note.findOneAndDelete({
    _id: noteId,
    owner: userId,
    isDeleted: true, 
  });
};

export const bulkRestoreService = async (
  ids: string[],
  userId: mongoose.Types.ObjectId
) => {
  return await Note.updateMany(
    {
      _id: { $in: ids },
      owner: userId,
      isDeleted: true, 
    },
    {
      isDeleted: false,
      deletedAt: null,
    }
  );
};


export const bulkPermanentDeleteService = async (
  ids: string[],
  userId: mongoose.Types.ObjectId
) => {
  return await Note.deleteMany({
    _id: { $in: ids },
    owner: userId,
    isDeleted: true, 
  });
};


export const bulkSoftDeleteService = async (
  ids: string[],
  userId: mongoose.Types.ObjectId
) => {
  return await Note.updateMany(
    {
      _id: { $in: ids },
      owner: userId,
      isDeleted: false, 
    },
    {
      isDeleted: true,
      deletedAt: new Date(),
    }
  );
};