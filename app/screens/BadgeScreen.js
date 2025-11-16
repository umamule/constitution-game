// app/screens/BadgeScreen.js

import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { getGlobalScore, TOTAL_SCORE } from "../../utils/scoreManager";

export default function BadgeScreen() {
  const router = useRouter();

  const [score, setScore] = useState(0);
  const [xp, setXp] = useState(0);

  useEffect(() => {
    loadScore();
    loadXP();
  }, []);

  // ⭐ Load Global Score
  const loadScore = async () => {
    try {
      const global = await getGlobalScore();
      setScore(global);
    } catch (e) {
      console.log("Error loading global score:", e);
      setScore(0);
    }
  };

  // ⭐ Load XP
  const loadXP = async () => {
    try {
      const stored = await AsyncStorage.getItem("xp");
      setXp(stored ? parseInt(stored) : 0);
    } catch (e) {
      console.log("Error loading XP:", e);
      setXp(0);
    }
  };

  const stars = [1, 2, 3, 4, 5];

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Congratulations!</Text>

        <Text style={styles.subtitle}>
          You've completed the Fundamental Rights Journey
        </Text>

        <View style={styles.badgeContainer}>
          <Image
            source={require("../assets/logo.png")}
            style={styles.badge}
          />
          <Text style={styles.badgeText}>Rights Champion</Text>
        </View>

        {/* ⭐ ALWAYS 5 STARS */}
        <View style={styles.starsContainer}>
          {stars.map((s) => (
            <Text key={s} style={styles.star}>⭐</Text>
          ))}
        </View>

        {/* ⭐ Global Score Display */}
        <Text style={styles.scoreMessage}>
          Your Total Score: {score} / {TOTAL_SCORE}
        </Text>

        {/* ⭐ XP Display */}
        <Text style={styles.scoreMessage}>
          XP Earned: {xp}
        </Text>

        <TouchableOpacity
          style={styles.finishButton}
          onPress={() => router.replace("/screens/CitizenLearning")}
        >
          <Text style={styles.finishButtonText}>Back to Dashboard</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

//
// ---------------- STYLES ----------------
//

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f7fb",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1A73E8",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 30,
    width: "80%",
  },
  badgeContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  badge: {
    width: 110,
    height: 110,
    marginBottom: 10,
  },
  badgeText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  starsContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  star: {
    fontSize: 30,
    marginHorizontal: 5,
  },
  scoreMessage: {
    fontSize: 16,
    color: "#4CAF50",
    marginBottom: 10,
    textAlign: "center",
  },
  finishButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
  },
  finishButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
