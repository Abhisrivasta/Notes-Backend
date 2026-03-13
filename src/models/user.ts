import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  name: string
  email: string
  password: string
  role: "user" | "guest"
}

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
    lowercase: true
  },

  password: {
    type: String,
    required: true,
    select: false
  },

  role: {
    type: String,
    enum: ["user", "guest"],
    default: "user"
  }

},
{ timestamps: true }
);

export default mongoose.model<IUser>("User", userSchema);