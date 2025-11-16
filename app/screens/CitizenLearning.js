// app/screens/CitizenLearning.js

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Animated,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FadeInUp } from "react-native-reanimated";

// ⭐ IMPORT GLOBAL SCORE MANAGER
import { getGlobalScore, TOTAL_SCORE } from "../../utils/scoreManager";

export default function CitizenLearning() {
  const router = useRouter();

  const [showProfile, setShowProfile] = useState(false);
  const [userData, setUserData] = useState(null);

  const [globalScore, setGlobalScore] = useState(0);
  const [xp, setXp] = useState(0);

  // Animated progress bar
  const progressWidth = useState(new Animated.Value(0))[0];

  // ----------------------------------------------------
  // Load User, Global Score, XP
  // ----------------------------------------------------
  useEffect(() => {
    loadUser();
    loadScore();
    loadXP();
  }, []);

  const loadUser = async () => {
    try {
      const stored = await AsyncStorage.getItem("user");
      if (stored) setUserData(JSON.parse(stored));
    } catch (e) {
      console.log("User load error:", e);
    }
  };

  const loadScore = async () => {
    try {
      const score = await getGlobalScore();
      console.log("Loaded Global Score:", score);
      setGlobalScore(score);
    } catch (e) {
      console.log("Score load error:", e);
    }
  };

  const loadXP = async () => {
    try {
      const xpStored = await AsyncStorage.getItem("xp");
      setXp(xpStored ? parseInt(xpStored) : 0);
    } catch (e) {
      console.log("XP load error:", e);
    }
  };

  // ----------------------------------------------------
  // Animate progress bar
  // ----------------------------------------------------
  useEffect(() => {
    const percent = (globalScore / TOTAL_SCORE) * 100;

    Animated.timing(progressWidth, {
      toValue: percent,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  }, [globalScore]);

  // ----------------------------------------------------
  // Logout
  // ----------------------------------------------------
  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        onPress: async () => {
          await AsyncStorage.removeItem("user");
          await AsyncStorage.removeItem("token");
          router.replace("/screens/login");
        },
      },
    ]);
  };

  // ----------------------------------------------------
  // RENDER UI
  // ----------------------------------------------------
  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <LinearGradient colors={["#4CAF50", "#81C784"]} style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => setShowProfile(true)}>
            <Image
              source={require("../assets/logo.png")}
              style={styles.profileImage}
            />
          </TouchableOpacity>

          <View style={styles.headerTextBox}>
            <Text style={styles.headerTitle}>Citizen Learning</Text>
            <Text style={styles.headerSub}>Know your rights 🇮🇳</Text>
          </View>
        </View>
      </LinearGradient>

      {/* PROFILE MODAL */}
      {showProfile && (
        <Animated.View entering={FadeInUp} style={styles.profileModal}>
          <View style={styles.profileHeader}>
            <Image
              source={require("../assets/logo.png")}
              style={styles.profileImageLarge}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowProfile(false)}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          {userData && (
            <View style={styles.profileInfo}>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.value}>{userData.email}</Text>

              <Text style={styles.label}>Role</Text>
              <Text style={styles.value}>{userData.role}</Text>

              <Text style={styles.label}>Joined</Text>
              <Text style={styles.value}>
                {new Date(userData.createdAt).toLocaleDateString()}
              </Text>
            </View>
          )}

          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      {/* PROGRESS CARD */}
      <Animated.View entering={FadeInUp} style={styles.progressCard}>
        <Text style={styles.sectionTitle}>Your Progress</Text>

        <View style={styles.progressBar}>
          <Animated.View
            style={{
              height: "100%",
              backgroundColor: "#4CAF50",
              width: progressWidth.interpolate({
                inputRange: [0, 100],
                outputRange: ["0%", "100%"],
              }),
            }}
          />
        </View>

        <Text style={styles.progressText}>
          Score: {globalScore} / {TOTAL_SCORE} • XP: {xp}
        </Text>
      </Animated.View>

      {/* START LEARNING */}
      <Animated.View entering={FadeInUp.delay(150)} style={styles.bigCard}>
        <Text style={styles.bigTitle}>Start Learning</Text>
        <Text style={styles.bigDesc}>
          Interactive lessons and quizzes based on your rights.
        </Text>

        <TouchableOpacity
          style={styles.greenBtn}
          onPress={() => router.push("/screens/FundamentalRightsHeroScreen")}
        >
          <Text style={styles.greenBtnText}>Start Now</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* DAILY CHALLENGES */}
      <Animated.View entering={FadeInUp.delay(300)} style={styles.card}>
        <Text style={styles.sectionTitle}>Daily Challenges</Text>

        <Text style={styles.challenge}>🏆 Answer 5 questions • +25 XP</Text>
        <Text style={styles.challenge}>🎯 Get 3 correct in a row • +40 XP</Text>
      </Animated.View>

      {/* GAME */}
      <Animated.View entering={FadeInUp.delay(450)} style={styles.card}>
        <Text style={styles.sectionTitle}>Situation-Based Game</Text>
        <Text style={styles.desc}>
          Real world scenarios to test your constitutional rights.
        </Text>

        <TouchableOpacity
          style={styles.greenBtn}
          onPress={() => router.push("/screens/GameScreen")}
        >
          <Text style={styles.greenBtnText}>Play Now</Text>
        </TouchableOpacity>
      </Animated.View>
    </ScrollView>
  );
}

// ----------------------------------------------------
// STYLES
// ----------------------------------------------------

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAFAFA" },

  header: {
    paddingVertical: 30,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  headerTextBox: { marginLeft: 15 },
  headerTitle: { color: "#fff", fontSize: 24, fontWeight: "bold" },
  headerSub: { color: "#E8F5E9", marginTop: 4 },

  profileImage: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 2,
    borderColor: "#fff",
  },
  profileImageLarge: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },

  profileModal: {
    backgroundColor: "#fff",
    margin: 15,
    padding: 20,
    borderRadius: 15,
    elevation: 10,
    position: "absolute",
    top: 120,
    left: 15,
    right: 15,
    zIndex: 1000,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    right: 0,
    top: 0,
    padding: 5,
  },
  closeButtonText: { fontSize: 20, color: "#444" },

  profileInfo: { marginVertical: 15 },
  label: { fontSize: 14, color: "#666", fontWeight: "bold" },
  value: { fontSize: 16, color: "#333" },

  logoutBtn: {
    backgroundColor: "#FF4444",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  logoutText: { color: "#fff", fontWeight: "bold" },

  progressCard: {
    backgroundColor: "#fff",
    margin: 15,
    padding: 15,
    borderRadius: 15,
    elevation: 4,
  },
  sectionTitle: { fontSize: 18, fontWeight: "bold" },

  progressBar: {
    height: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
    overflow: "hidden",
    marginTop: 10,
  },
  progressText: { marginTop: 10, color: "#555", fontSize: 14 },

  bigCard: {
    backgroundColor: "#E8F5E9",
    margin: 15,
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
  },
  bigTitle: { fontSize: 20, fontWeight: "bold", color: "#2E7D32" },
  bigDesc: { color: "#444", marginVertical: 10, textAlign: "center" },

  greenBtn: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  greenBtnText: { color: "#fff", fontWeight: "bold", fontSize: 16 },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 15,
    marginBottom: 12,
    padding: 20,
    borderRadius: 15,
    elevation: 4,
  },
  challenge: { marginVertical: 5, fontSize: 15 },
  desc: { color: "#555", marginBottom: 10 },
});
