import mongoose from "mongoose";

const ScreamSchema = new mongoose.Schema({
  text: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Scream = mongoose.model("Scream", ScreamSchema);