import { User } from "../models/User.js";

export const authenticateUser = async (req, res, next) => {
    const token = req.header("Authorization").replace("Bearer ", "");
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