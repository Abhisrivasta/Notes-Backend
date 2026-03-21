import { z } from "zod";
import mongoose from "mongoose";

// 🔹 ObjectId validator
export const objectIdSchema = z.string().refine(
  (val) => mongoose.Types.ObjectId.isValid(val),
  { message: "Invalid ObjectId" }
);

export const createNoteSchema = z.object({
  title: z.string().trim().min(1).optional(),

  content: z.string().trim().min(1, "Content is required"),

  tags: z.array(z.string().trim()).default([]),

  backgroundColor: z.string().default("white"),

  backgroundImage: z.string().url().optional(),

  links: z.array(z.string().url()).default([]),

  images: z.array(z.string().url()).default([]),

  audio: z.array(z.string().url()).default([]),

  isPinned: z.boolean().optional(),

  isQuickNote: z.boolean().optional(),
});


export const updateNoteSchema = createNoteSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update",
  });


export const paramsSchema = z.object({
  id: objectIdSchema,
});


export const querySchema = z.object({
  page: z.coerce.number().min(1).default(1),

  limit: z.coerce.number().min(1).max(50).default(10),

  search: z.string().trim().optional(),

  isPinned: z
    .enum(["true", "false"])
    .transform((val) => val === "true")
    .optional(),

  isDeleted: z
    .enum(["true", "false"])
    .transform((val) => val === "true")
    .optional(),
});


export const bulkSchema = z.object({
  ids: z
    .array(objectIdSchema)
    .min(1, "At least one ID is required"),
});

