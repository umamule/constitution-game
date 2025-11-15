import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import Resource from "./models/Resource.js";
import MockTest from "./models/MockTest.js";

// 1️⃣ Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/constitutionApp";
await mongoose.connect(MONGO_URI);
console.log("✅ Connected to MongoDB");

// 2️⃣ Clear old data (optional)
await Resource.deleteMany({});
await MockTest.deleteMany({});
console.log("🗑 Cleared old data");

// 3️⃣ Seed Resources
const resources = await Resource.insertMany([
  {
    type: "Act",
    title: "Right to Information Act, 2005",
    summary: "Empowers citizens to access government information.",
    fullText: "Full act text goes here...",
    tags: ["RTI", "transparency"]
  },
  {
    type: "Article",
    title: "Article 21 - Right to Life",
    articleNumber: "21",
    summary: "No person shall be deprived of his life or personal liberty.",
    tags: ["fundamental-rights", "life"]
  }
]);
console.log("✅ Resources seeded:", resources.length);

// 4️⃣ Seed Mock Tests
const mockTests = await MockTest.insertMany([
  {
    title: "Basic Rights Mock Test",
    description: "Test on Articles 12-35",
    durationMinutes: 10,
    questions: [
      {
        q: "Article 21 guarantees?",
        options: ["Right to Property", "Right to Life", "Right to Religion", "Right to Equality"],
        answerIndex: 1,
        explanation: "Article 21: Life & personal liberty."
      },
      {
        q: "Which act grants access to government records?",
        options: ["RTI Act 2005", "IPC", "CrPC", "None"],
        answerIndex: 0,
        explanation: "RTI Act allows citizens to request info from the government."
      }
    ]
  }
]);
console.log("✅ Mock Tests seeded:", mockTests.length);

// 5️⃣ Seed Game Situations for GameScreen
const gameSituations = await MockTest.create({
  title: "Law Situations Game",
  description: "Situation-based questions on law and rights",
  durationMinutes: 15,
  questions: [
    {
      q: "You find a government office refusing to provide public records. What law helps you?",
      options: ["IPC", "RTI Act 2005", "CrPC", "None"],
      answerIndex: 1,
      explanation: "RTI Act 2005 allows access to government information."
    },
    {
      q: "Someone is denied personal liberty without trial. Which article protects them?",
      options: ["Article 19", "Article 21", "Article 14", "Article 15"],
      answerIndex: 1,
      explanation: "Article 21 guarantees life and personal liberty."
    },
    {
      q: "Which act prevents corruption in public offices?",
      options: ["IPC", "RTI Act", "Prevention of Corruption Act", "CrPC"],
      answerIndex: 2,
      explanation: "The Prevention of Corruption Act deals with corruption in public offices."
    }
  ]
});
console.log("✅ Game Situations seeded:", gameSituations.questions.length);

// 6️⃣ Finish
console.log("🎉 Seeding completed!");
process.exit(0);
