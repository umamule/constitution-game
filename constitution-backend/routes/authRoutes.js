import express from "express";
import User from "../models/User.js";

const router = express.Router();

// POST /api/auth/signup
// Expects: { email, password, role } in body
// Note: Firebase signup should be handled on frontend, this just creates the DB entry
router.post("/signup", async (req, res) => {
  const { firebaseUid, email, role } = req.body;
  if (!firebaseUid || !email || !role) {
    return res.status(400).json({ ok: false, message: "firebaseUid, email, and role required" });
  }
  if (!["citizen", "institute"].includes(role)) {
    return res.status(400).json({ ok: false, message: "Invalid role" });
  }

  try {
    const user = new User({ firebaseUid, email, role });
    await user.save();
    res.json({ ok: true, user });
  } catch (error) {
    console.error("Signup DB error:", error);
    res.status(500).json({ ok: false, message: "Database error" });
  }
});

// POST /api/auth/login
// Expects: { firebaseUid } in body
router.post("/login", async (req, res) => {
  const { firebaseUid } = req.body;
  if (!firebaseUid) {
    return res.status(400).json({ ok: false, message: "firebaseUid required" });
  }

  try {
    const user = await User.findOne({ firebaseUid });
    if (!user) {
      return res.status(404).json({ ok: false, message: "User not found" });
    }
    res.json({ ok: true, role: user.role });
  } catch (error) {
    console.error("Login DB error:", error);
    res.status(500).json({ ok: false, message: "Database error" });
  }
});

export default router;
