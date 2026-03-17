import {z} from "zod"
import mongoose from "mongoose"

//helper for ObjectId validaton
const objectIdSchema = z
    .string()
    .refine(
        (val) => mongoose.Types.ObjectId.isValid(val),
        {message: "Invalid ObjectId"}
    )

export const noteZodSchema = z.object({
    title: z
    .string()
    .trim()
    .min(1,"Title cannot be empty")
    .optional(),

    content: z
    .string()
    .trim()
    .min(1,"Content cannot be empty"),

    owner: objectIdSchema,

    tags: z
    .array(
        z
        .string()
    )
    .default([]),

    backgroundColor: z
    .string()
    .default("white"),

    backgroundImage: z
    .string()
    .url()
    .optional(),

    links: z
    .array(
        z
        .string()
    )
    .default([]),

    images: z
    .array(
        z
        .string()
        .url()
    )
    .default([]),

    audio: z
    .array(
        z
        .string()
        .url()
    )
    .default([]),

    isPinned: z
    .boolean()
    .default(false),

    isQuickNote: z
    .boolean()
    .default(false),

    isDeleted: z
    .boolean()
    .default(false),

    deletedAt: z
    .coerce
    .date()
    .optional()
})


export const createNoteSchema = noteZodSchema.omit({
    isDeleted: true,
    deletedAt:true
})

export const updatedSchema = noteZodSchema.partial()