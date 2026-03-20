import { Document, Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId; 

  clerkId: string;

  isPremium: boolean;
  premiumExpiresAt?: Date;

  role: "user" | "guest";

  createdAt: Date;
  updatedAt: Date;
}