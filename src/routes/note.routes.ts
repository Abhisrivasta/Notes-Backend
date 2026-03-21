import { Router } from "express";
import { createNotes, getNotes, updateNotes } from "../controller/note.controller";
import { requireAuth } from "@clerk/express";

const router = Router();

//create note
// router.post("/",requireAuth,createNotes);
router.post("/", createNotes);
router.get("/",getNotes)
router.patch("/notes/:id", updateNotes);

export default router;