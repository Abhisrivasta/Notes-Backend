import { Request, Response, NextFunction } from "express";
import { getCurrentUser } from "../utils/getCurrentUser";
import { createNoteService } from "../services/note.service";
import { string } from "zod";

export const createNotes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const clerkId = (req as any).auth?.userId;
    const clerkId = "user";

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
    return next(error);
  }
};