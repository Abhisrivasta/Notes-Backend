import { Request, Response, NextFunction } from "express";
import { getCurrentUser } from "../utils/getCurrentUser";
import { createNoteService, getNoteService } from "../services/note.service";


export const createNotes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const clerkId = (req as any).auth?.userId;
    // console.log("auth:", (req as any).auth);
    const clerkId = "user_123"

    if (!clerkId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }

    const user = await getCurrentUser(clerkId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const note = await createNoteService(req.body, user._id);

    return res.status(201).json({
      success: true,
      message: "Note created successfully",
      data: note,
    });

  } catch (error) {
    console.error("ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

export const getNotes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const clerkId = (req as any).auth?.userId;
    const clerkId = "user_123";

    if (!clerkId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }

    const user = await getCurrentUser(clerkId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const notes = await getNoteService(user._id);

    return res.status(200).json({
      success: true,
      message: "Notes fetched successfully",
      data: notes,
    });

  } catch (error) {
    console.error("ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};