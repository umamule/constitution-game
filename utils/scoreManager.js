// utils/scoreManager.js

import AsyncStorage from "@react-native-async-storage/async-storage";

export const TOTAL_SCORE = 110;

// ⭐ Add +1 to global score
export const addGlobalScore = async () => {
  try {
    const stored = await AsyncStorage.getItem("globalScore");
    const oldScore = stored ? parseInt(stored) : 0;

    const newScore = Math.min(oldScore + 1, TOTAL_SCORE);

    await AsyncStorage.setItem("globalScore", newScore.toString());
    return newScore;
  } catch (e) {
    console.log("Error updating global score:", e);
  }
};

// ⭐ Add XP
export const addXP = async (value = 50) => {
  try {
    const stored = await AsyncStorage.getItem("xp");
    const oldXp = stored ? parseInt(stored) : 0;

    await AsyncStorage.setItem("xp", (oldXp + value).toString());
  } catch (e) {
    console.log("Error updating XP:", e);
  }
};

// ⭐ Get global score
export const getGlobalScore = async () => {
  try {
    const stored = await AsyncStorage.getItem("globalScore");
    return stored ? parseInt(stored) : 0;
  } catch (e) {
    console.log("Error fetching global score:", e);
    return 0;
  }
};
// scoreManager.js
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const STORAGE_KEY = "FR_GAME_PROGRESS_FINAL_V2";

// // Load game progress
// export async function loadGameProgress() {
//   try {
//     const raw = await AsyncStorage.getItem(STORAGE_KEY);
//     return raw ? JSON.parse(raw) : null;
//   } catch (e) {
//     console.warn("Load progress error:", e);
//     return null;
//   }
// }

// // Save game progress
// export async function saveGameProgress(data) {
//   try {
//     await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
//   } catch (e) {
//     console.warn("Save progress error:", e);
//   }
// }

// // Reset everything
// export async function resetGameProgress() {
//   try {
//     await AsyncStorage.removeItem(STORAGE_KEY);
//   } catch (e) {
//     console.warn("Reset progress error:", e);
//   }
// }

// // Update score & XP
// export function updateScoreXP(oldScore, oldXp, isCorrect) {
//   const gainedScore = isCorrect ? 1 : 0;
//   const gainedXp = isCorrect ? 20 : 5;

//   return {
//     score: oldScore + gainedScore,
//     xp: oldXp + gainedXp,
//   };
// }

// // Calculate new streak
// export function updateStreak(lastDate) {
//   const today = new Date().toDateString();

//   if (!lastDate) return { streak: 1, lastPlayedDate: today };

//   const yesterday = new Date();
//   yesterday.setDate(yesterday.getDate() - 1);

//   if (lastDate === yesterday.toDateString()) {
//     return { streak: 1 + 1, lastPlayedDate: today }; // increment streak
//   }

//   return { streak: 1, lastPlayedDate: today };
// }
// export async function getGlobalScore() {
//   try {
//     const raw = await AsyncStorage.getItem("FR_GAME_PROGRESS_FINAL_V2");
//     if (!raw) return 0;

//     const data = JSON.parse(raw);
//     return data.score ?? 0;
//   } catch (e) {
//     console.warn("getGlobalScore error:", e);
//     return 0;
//   }
// }

