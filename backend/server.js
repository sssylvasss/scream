import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import crypto from "crypto";
import bcrypt from "bcryptjs";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/final-project"
mongoose.connect(mongoUrl)
mongoose.Promise = Promise

const Scream = mongoose.model("Scream", {
  text: String,
  collor: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
})

const User = mongoose.model("User", {
  name: {
    type: String,
    unique: true,
  },  email: {
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
});

const authenticateUser = async (req, res, next) => {
  const token = req.header("Authorization");
  const user = await User.findOne({ accessToken: token });
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(403).json({ message: "You need to be logged in to see this" }); 
  }
};

const port = process.env.PORT || 8080
const app = express()


const corsOptions = {
  origin: "https://screamroom.netlify.app",
};

app.use(cors(corsOptions));
app.use(express.json())


app.get("/", (req, res) => {
  res.send("Hello world")

})

app.get("/screams", authenticateUser, async (req, res) => {
  const screams = await Scream.find().sort({ createdAt: "desc" }).limit(20).exec();
  res.json(screams);
});

app.post("/signin", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    res.json({ userId: user._id, accessToken: user.accessToken });
  } else {
    res.status(400).json({ message: "Invalid email or password" });
  }});

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
  

app.post("/screams", async (req, res) => {

  const { text, user } = req.body
  if (!text || text.trim() === "") {
    return res.status(400).json({ message: "Text is required to create a scream" });
  }

  const scream = new Scream({ text, user })

  try {
    const savedScream = await scream.save()
    res.status(201).json(savedScream)
  } catch (err) {
    res.status(400).json({ message: "Could not save scream to the database", error: err.errors })
  }
})


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})

