import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import http from "http";
import { Server } from "socket.io";
import { bannedWords } from "./config/bannedWords.js";

// Database connection
const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/final-project";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

// Models
const Scream = mongoose.model("Scream", {
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

const User = mongoose.model("User", {
  name: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex"),
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware
const authenticateUser = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(403).json({ message: "Authorization header missing." });
  }

  try {
    const user = await User.findOne({ accessToken: token });
    if (!user) {
      return res.status(403).json({ message: "Invalid or expired token." });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const containsBannedWords = (text) => {
  const lowerText = text.toLowerCase();
  return bannedWords.some((word) => lowerText.includes(word));
};

// App and Server setup
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

// CORS and JSON Parsing
app.use(
  cors({
    origin: ["http://localhost:3000", "https://screamroom.netlify.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/screams", authenticateUser, async (req, res) => {
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

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
      res.json({ userId: user._id, accessToken: user.accessToken });
    } else {
      res.status(400).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (await User.findOne({ name })) {
      return res.status(400).json({ message: "Name already exists" });
    }

    if (await User.findOne({ email })) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const user = new User({
      name,
      email,
      password: bcrypt.hashSync(password),
    });

    await user.save();
    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

app.post("/screams", authenticateUser, async (req, res) => {
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
    io.emit("broadcast-scream", savedScream);
    res.status(201).json(savedScream);
  } catch (error) {
    console.error("Error saving scream:", error);
    res.status(400).json({ message: "Could not save scream", error: error.errors });
  }
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start the server
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
