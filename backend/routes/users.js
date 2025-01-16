import express from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/User.js";

const router = express.Router();

router.post("/signin", async (req, res) => {
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

router.post("/signup", async (req, res) => {
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

export default router;