import { Router } from "express";
import { createNotes } from "../controller/note.controller";
import { requireAuth } from "@clerk/express";

const router = Router();

//create note
// router.post("/",requireAuth,createNotes);
router.post("/",createNotes);

export default router;