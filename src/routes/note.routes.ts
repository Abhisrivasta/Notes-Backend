import { Router } from "express";
import { createNotes, deleteNotes, getNotes, updateNotes } from "../controller/note.controller";
import { requireAuth } from "@clerk/express";

const router = Router();

//create note
// router.post("/",requireAuth,createNotes);
router.post("/", createNotes);
router.get("/",getNotes)
router.patch("/:id", updateNotes);
router.delete("/:id", deleteNotes);

export default router;