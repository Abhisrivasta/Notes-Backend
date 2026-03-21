import { Router } from "express";
import {
  bulkDeleteNotes,
  bulkRestoreNotes,
  bulkSoftDeleteNotes,
  createNotes,
  deleteNotes,
  getNotes,
  getSingleNote,
  permanentDeleteNote,
  restoreNotes,
  togglePin,
  updateNotes,
} from "../controller/note.controller";

import { requireAuth } from "@clerk/express";
import { validate } from "../middleware/validate.middleware";
import {
  createNoteSchema,
  updateNoteSchema,
  paramsSchema,
  querySchema,
  bulkSchema,
} from "../validators/note.validator";

const router = Router();

// 🔥 Apply auth globally (cleaner)
router.use(requireAuth);

// ✅ Create
router.post(
  "/",
  validate({ body: createNoteSchema }),
  createNotes
);

// ✅ Get all (with query validation)
router.get(
  "/",
  validate({ query: querySchema }),
  getNotes
);

// ✅ Get single
router.get(
  "/:id",
  validate({ params: paramsSchema }),
  getSingleNote
);

// ✅ Update
router.patch(
  "/:id",
  validate({
    params: paramsSchema,
    body: updateNoteSchema,
  }),
  updateNotes
);

// ✅ Soft delete (single)
router.delete(
  "/:id",
  validate({ params: paramsSchema }),
  deleteNotes
);

// ✅ Restore (single)
router.patch(
  "/:id/restore",
  validate({ params: paramsSchema }),
  restoreNotes
);

// ✅ Toggle pin
router.patch(
  "/:id/toggle-pin",
  validate({ params: paramsSchema }),
  togglePin
);

// ✅ Permanent delete
router.delete(
  "/:id/permanent",
  validate({ params: paramsSchema }),
  permanentDeleteNote
);

// 🔥 Bulk operations (fixed paths)

// ✅ Bulk restore
router.patch(
  "/bulk-restore",
  validate({ body: bulkSchema }),
  bulkRestoreNotes
);

// ✅ Bulk soft delete
router.patch(
  "/bulk-delete",
  validate({ body: bulkSchema }),
  bulkSoftDeleteNotes
);

// ✅ Bulk permanent delete
router.delete(
  "/bulk-delete",
  validate({ body: bulkSchema }),
  bulkDeleteNotes
);

export default router;