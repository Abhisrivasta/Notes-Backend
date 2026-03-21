import { Request, Response, NextFunction } from "express";
import { getCurrentUser } from "../utils/getCurrentUser";
import { bulkPermanentDeleteService, bulkRestoreService, bulkSoftDeleteService, createNoteService, deleteNoteService, getNoteService, getSingleNoteService, permanentDeleteService, restoreNoteService, togglePinService, updateNoteService } from "../services/note.service";


//createNotes
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


//GetNotes
export const getNotes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const clerkId = "user_123"; // replace with real auth

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

    const {
      search,
      tag,
      pinned,
      page = "1",
      limit = "10",
    } = req.query;

    //  Base filter
    const filter: any = {
      owner: user._id,
      isDeleted: false,
    };

    //  Pinned filter
    if (pinned === "true") {
      filter.isPinned = true;
    }

    // Tag filter (single)
    if (tag) {
      filter.tags = { $in: [tag] };
    }

    // Search filter
    if (search && typeof search === "string" && search.trim() !== "") {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ];
    }

    // Pagination
    const pageNumber = Math.max(1, parseInt(page as string) || 1);
    const limitNumber = Math.max(1, parseInt(limit as string) || 10);

    const result = await getNoteService(
      filter,
      pageNumber,
      limitNumber
    );

    return res.status(200).json({
      success: true,
      message: "Notes fetched successfully",
      data: result.notes,
      meta: {
        total: result.total,
        page: result.page,
        totalPages: result.totalPages,
      },
    });

  } catch (error) {
    console.error("ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


//updateNotes
export const updateNotes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
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

    const  id   = req.params.id as string; 
    const updatedNote = await updateNoteService(
      id,
      user._id,
      req.body
    );

    if (!updatedNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Note updated successfully",
      data: updatedNote,
    });

  } catch (error) {
    console.error("ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const deleteNotes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
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

    const id = req.params.id as string;

    const deletedNote = await deleteNoteService(
      id,
      user._id
    );

    if (!deletedNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Note deleted successfully",
      data: deletedNote, // optional but useful
    });

  } catch (error) {
    console.error("ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


//restore notes
export const restoreNotes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const clerkId = "user_123"; // temp

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

    const id = req.params.id as string;

    const restoredNote = await restoreNoteService(
      id,
      user._id
    );

    if (!restoredNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found or not deleted",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Note restored successfully",
      data: restoredNote,
    });

  } catch (error) {
    console.error("ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};



//get single notes
export const getSingleNote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const clerkId = "user_123"; // temp

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

    const id = req.params.id as string;

    const note = await getSingleNoteService(id, user._id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Note fetched successfully",
      data: note,
    });

  } catch (error) {
    console.error("ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};



//toggle notes
export const togglePin = async (
  req: Request,
  res: Response
) => {
  try {
    const clerkId = "user_123"; // temp

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

    const id = req.params.id as string;

    const note = await togglePinService(id, user._id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Pin status toggled",
      data: note,
    });

  } catch (error) {
    console.error("ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


//delete notes
export const permanentDeleteNote = async (
  req: Request,
  res: Response
) => {
  try {
    const clerkId = "user_123"; // temp

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

    const id = req.params.id as string;

    const deletedNote = await permanentDeleteService(
      id,
      user._id
    );

    if (!deletedNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found or not in trash",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Note permanently deleted",
    });

  } catch (error) {
    console.error("ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


export const bulkRestoreNotes = async (
  req: Request,
  res: Response
) => {
  try {
    const clerkId = "user_123";

    const user = await getCurrentUser(clerkId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const { ids } = req.body;

    if (!ids || !Array.isArray(ids)) {
      return res.status(400).json({
        success: false,
        message: "Invalid IDs array",
      });
    }

    const result = await bulkRestoreService(ids, user._id);

    return res.status(200).json({
      success: true,
      message: "Notes restored successfully",
      modifiedCount: result.modifiedCount,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


export const bulkDeleteNotes = async (
  req: Request,
  res: Response
) => {
  try {
    const clerkId = "user_123";

    const user = await getCurrentUser(clerkId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const { ids } = req.body;

    if (!ids || !Array.isArray(ids)) {
      return res.status(400).json({
        success: false,
        message: "Invalid IDs array",
      });
    }

    const result = await bulkPermanentDeleteService(
      ids,
      user._id
    );

    return res.status(200).json({
      success: true,
      message: "Notes permanently deleted",
      deletedCount: result.deletedCount,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};



export const bulkSoftDeleteNotes = async (
  req: Request,
  res: Response
) => {
  try {
    const clerkId = "user_123"; // temp

    const user = await getCurrentUser(clerkId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const { ids } = req.body;

    // 🔥 Validation (must have this)
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid IDs array",
      });
    }

    const result = await bulkSoftDeleteService(
      ids,
      user._id
    );

    return res.status(200).json({
      success: true,
      message: "Notes moved to trash",
      modifiedCount: result.modifiedCount,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};