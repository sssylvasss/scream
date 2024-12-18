import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { bannedWords } from "./config/bannedWords.js";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/final-project";
mongoose.connect(mongoUrl);
mongoose.Promise = Promise;

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

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(403).json({ message: "Authorization header missing." });
    }

    const user = await User.findOne({ accessToken: token });
    if (user) {
      req.user = user;
      next();
    } else {
      return res.status(403).json({ message: "Invalid or expired token." });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};



const port = process.env.PORT || 8080;
const app = express();

const corsOptions = {
  origin: ["http://localhost:3000", "https://screamroom.netlify.app"], // Allow both local and production frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/screams", authenticateUser, async (req, res) => {
  const screams = await Scream.find().sort({ createdAt: "desc" }).limit(20).populate("user", "name email").exec();
  res.json(screams);
});

app.post("/signin", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    res.json({ userId: user._id, accessToken: user.accessToken });
  } else {
    res.status(400).json({ message: "Invalid email or password" });
  }
});

app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingName = await User.findOne({ name });
    if (existingName) {
      return res.status(400).json({ message: "Name already exists" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const user = new User({
      name,
      email,
      password: bcrypt.hashSync(password),
    });

    await user.save();

    return res.status(201).json({ message: "Signup successful" });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

const containsBannedWords = (text) => {
  const lowerText = text.toLowerCase();
  return bannedWords.some((word) => lowerText.includes(word));
};

app.post("/screams", authenticateUser, async (req, res) => {
  const { text } = req.body;

  if (!text || text.trim() === "") {
    return res.status(400).json({ message: "Text is required to create a scream" });
  }

  if (containsBannedWords(text)) {
    return res.status(400).json({ message: "Your message contains inappropriate language." });
  }

  const scream = new Scream({ text, user: req.user._id });

  try {
    const savedScream = await scream.save();
    res.status(201).json(savedScream);
  } catch (err) {
    res.status(400).json({ message: "Could not save scream to the database", error: err.errors });
  }
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
