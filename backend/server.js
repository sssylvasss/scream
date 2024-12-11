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
  }
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User"
  // }
})

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
});

const port = process.env.PORT || 8080
const app = express()

app.use(cors())
app.use(express.json())


app.get("/", (req, res) => {
  res.send("Hello Technigo!")

  //return all screams
})

app.get("/screams", async (req, res) => {
  const screams = await Scream.find().sort({ createdAt: "desc" }).limit(20).exec()
  res.json(screams)
});

app.post("/screams", async (req, res) => {

  const { text, user } = req.body

  const scream = new Scream({ text, user })

  try {
    const savedScream = await scream.save()
    res.status(201).json(savedScream)
  } catch (err) {
    res.status(400).json({ message: "Could not save scream to the database", error: err.errors })
  }
})
//signup
//login
//post a scream




// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})