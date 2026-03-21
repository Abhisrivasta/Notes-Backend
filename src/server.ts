import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/config";
import { clerkMiddleware } from "@clerk/express";
import notesRoutes from "./routes/note.routes";
import "./jobs/cron"
// Load env FIRST
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(clerkMiddleware());

// Routes
app.use("/api/notes", notesRoutes);
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Start server ONLY after DB connects
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();