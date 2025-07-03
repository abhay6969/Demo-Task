import jwt from "jsonwebtoken";
import { readJson } from "../utils/fileUtils.js";

const USERS_FILE = "users.json";

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization token missing or invalid" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const users = await readJson(USERS_FILE);
    const user = users.find((u) => u.id === decoded.id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    console.log(req)
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
