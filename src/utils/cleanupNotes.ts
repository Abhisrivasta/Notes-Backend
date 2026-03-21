import { Note } from "../models/note.model";

export const deleteExpiredNotes = async () => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const result = await Note.deleteMany({
    isDeleted: true,
    deletedAt: { $lte: sevenDaysAgo },
  });

  console.log(`🧹 Deleted ${result.deletedCount} expired notes`);
};