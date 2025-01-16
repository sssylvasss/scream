import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import http from "http";
import { Server } from "socket.io";
import userRoutes from "./routes/users.js";
import screamRoutes from "./routes/screams.js";
import indexRoutes from "./routes/index.js";

// Database connection
const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/final-project";
mongoose.connect(mongoUrl);
mongoose.Promise = Promise;

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 8080;

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "https://screamroom.netlify.app"],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("new-scream", (data) => {
    io.emit("broadcast-scream", data);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

// Middleware
app.use(
  cors({
    origin: ["http://localhost:3000", "https://screamroom.netlify.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// Routes
app.use("/", indexRoutes); // Use indexRoutes for general routes
app.use("/screams", (req, res, next) => {
  req.io = io;
  next();
}, screamRoutes); // Use screamRoutes for screams-related routes
app.use("/users", userRoutes); // Use userRoutes for user-related routes

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

// Start the server
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});