import { User } from "../models/user.model";
import { getCurrentUser } from "../utils/getCurrentUser";
import { Note } from "../models/note.model";
import { Request, Response } from "express"

export const createNotes = async (req: Request, res: Response) => {
  try {

    // Extract data from request
    const { title, content, tags, backgroundColor, links } = req.body

    // Validate required fields
    if (!title && !content) {
      return res.status(400).json({
        message: "Title or content is required"
      })
    }

    // Get clerk user id from middleware
    const clerkId = (req as any).auth?.userId

    if (!clerkId) {
      return res.status(401).json({
        message: "Unauthorized user"
      })
    }

    // Find user in database
    const user = await getCurrentUser(clerkId)

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      })
    }

    // Create note
    const note = await Note.create({
      title,
      content,
      tags,
      backgroundColor,
      links,
      owner: user._id
    })

    return res.status(201).json({
      success: true,
      message: "Note created successfully",
      data: note
    })

  } catch (error) {

    console.error("Create note error:", error)

    return res.status(500).json({
      message: "Internal server error"
    })
  }
}


