import express from "express";
import { authenticateUser } from "../middleware/auth.js";
import { Scream } from "../models/Scream.js";
import { bannedWords } from "../config/bannedWords.js";

const router = express.Router();

const containsBannedWords = (text) => {
  const lowerText = text.toLowerCase();
  return bannedWords.some((word) => lowerText.includes(word));
};

router.get("/", authenticateUser, async (req, res) => {
  try {
    const screams = await Scream.find()
      .sort({ createdAt: "desc" })
      .populate("user", "name email")
      .exec();
    res.json(screams);
  } catch (error) {
    console.error("Error fetching screams:", error);
    res.status(500).json({ message: "Failed to fetch screams." });
  }
});

router.post("/", authenticateUser, async (req, res) => {
  const { text } = req.body;
  if (!text.trim()) {
    return res.status(400).json({ message: "Text is required" });
  }

  if (containsBannedWords(text)) {
    return res.status(400).json({ message: "Inappropriate language detected" });
  }

  const scream = new Scream({ text, user: req.user._id });

  try {
    const savedScream = await scream.save();
    req.io.emit("broadcast-scream", savedScream);
    res.status(201).json(savedScream);
  } catch (error) {
    console.error("Error saving scream:", error);
    res.status(400).json({ message: "Could not save scream", error: error.errors });
  }
});

export default router;