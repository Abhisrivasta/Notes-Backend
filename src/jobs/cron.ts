import cron from "node-cron"
import { deleteExpiredNotes } from "../utils/cleanupNotes"

cron.schedule("0 0 * * * *",async() => {
    console.log("Running cleanup job...")
    await deleteExpiredNotes()
})