import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firebaseUid: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  role: { type: String, enum: ["citizen","institute"], required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("User", userSchema);
