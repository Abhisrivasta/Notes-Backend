import { Router } from "express";
import { createNotes, deleteNotes, getNotes, getSingleNote, restoreNotes, updateNotes } from "../controller/note.controller";
import { requireAuth } from "@clerk/express";

const router = Router();

//create note
// router.post("/",requireAuth,createNotes);
router.post("/", createNotes);
router.get("/",getNotes)
router.patch("/:id", updateNotes);
router.delete("/:id", deleteNotes);
router.patch("/:id/restore", restoreNotes);

router.get("/:id", getSingleNote);

export default router;