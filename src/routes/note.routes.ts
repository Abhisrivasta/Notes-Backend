import { Router } from "express";
import { createNotes, getNotes } from "../controller/note.controller";
import { requireAuth } from "@clerk/express";

const router = Router();

//create note
// router.post("/",requireAuth,createNotes);
router.post("/", createNotes);
router.get("/",getNotes)

export default router;