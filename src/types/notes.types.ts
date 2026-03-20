import { Document, Types } from "mongoose";

export interface INote extends Document {
  _id: Types.ObjectId; 

  title?: string;
  content: string;

  owner: Types.ObjectId;

  tags: string[];

  backgroundColor: string;
  backgroundImage?: string;

  links: string[];
  images: string[];
  audio: string[];

  isPinned: boolean;
  isQuickNote: boolean;

  isDeleted: boolean;
  deletedAt?: Date;

  createdAt: Date;
  updatedAt: Date;
}