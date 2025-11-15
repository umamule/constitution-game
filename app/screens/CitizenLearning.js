// app/screens/CitizenLearning.js
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { auth } from "../../firebase";

const CitizenLearning = () => {
  const router = useRouter();
  const [showLessons, setShowLessons] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [userData, setUserData] = useState(null);

  const [modules, setModules] = useState([
    {
      id: 1,
      title: "Fundamental Rights",
      desc: "Learn about your basic rights under the Constitution",
      unlocked: true,
      expanded: false,
      games: [
        { id: 1, title: "Right to Equality (Article 14)", desc: "Equality before law", unlocked: true, completed: false },
        { id: 2, title: "Right to Freedom (Article 19)", desc: "Freedom of speech and more", unlocked: false, completed: false },
        { id: 3, title: "Right Against Exploitation (Article 23)", desc: "Protection from exploitation", unlocked: false, completed: false },
        { id: 4, title: "Right to Constitutional Remedies (Article 32)", desc: "Enforcing fundamental rights", unlocked: false, completed: false },
        { id: 5, title: "Right to Education (Article 21A)", desc: "Free and compulsory education", unlocked: false, completed: false },
      ],
    },
  ]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const firebaseUid = auth.currentUser?.uid;
      if (!firebaseUid) return;

      const response = await fetch(`http://localhost:5000/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firebaseUid }),
      });

      const data = await response.json();
      if (data.ok) {
        setUserData(data.user);
      }
    } catch (error) {
      console.log('Error fetching user data:', error);
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          onPress: async () => {
            try {
              await signOut(auth);
              router.replace("/screens/login");
            } catch (error) {
              Alert.alert("Error", "Failed to logout");
            }
          },
        },
      ]
    );
  };

  const toggleModule = (moduleId) => {
    setModules((prev) =>
      prev.map((module) =>
        module.id === moduleId ? { ...module, expanded: !module.expanded } : module
      )
    );
  };

  const completeGame = (moduleId, gameId) => {
    setModules((prev) =>
      prev.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              games: module.games.map((game, index) =>
                game.id === gameId
                  ? { ...game, completed: true }
                  : game.id === gameId + 1
                  ? { ...game, unlocked: true }
                  : game
              ),
            }
          : module
      )
    );
    router.push(`/screens/QuizScreen?id=${gameId}`);
  };

  return (
    <ScrollView style={styles.container}>
      {/* ✅ Header with gradient */}
      <LinearGradient colors={["#4CAF50", "#81C784"]} style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => setShowProfile(!showProfile)}
          >
            <Image source={require("../assets/logo.png")} style={styles.profileImage} />
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>Citizen Learning</Text>
            <Text style={styles.subHeader}>Know your rights, empower yourself 🇮🇳</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Profile Modal */}
      {showProfile && (
        <Animated.View entering={FadeInUp} style={styles.profileModal}>
          <View style={styles.profileHeader}>
            <Image source={require("../assets/logo.png")} style={styles.profileModalImage} />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowProfile(false)}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          {userData && (
            <View style={styles.profileInfo}>
              <Text style={styles.profileLabel}>Email:</Text>
              <Text style={styles.profileValue}>{userData.email}</Text>

              <Text style={styles.profileLabel}>Role:</Text>
              <Text style={styles.profileValue}>{userData.role}</Text>

              <Text style={styles.profileLabel}>Joined:</Text>
              <Text style={styles.profileValue}>
                {new Date(userData.createdAt).toLocaleDateString()}
              </Text>
            </View>
          )}

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      {/* ✅ Progress card */}
      <Animated.View entering={FadeInUp} style={styles.progressCard}>
        <Text style={styles.sectionTitle}>Your Progress</Text>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${
                  modules.reduce((total, module) => total + module.games.filter((g) => g.completed).length, 0) /
                  modules.reduce((total, module) => total + module.games.length, 0) *
                  100
                }%`,
              },
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          {modules.reduce((total, module) => total + module.games.filter((g) => g.completed).length, 0)}/
          {modules.reduce((total, module) => total + module.games.length, 0)} Games Completed • XP: 1,250
        </Text>
      </Animated.View>

      {/* ✅ Start Learning Button or Lesson List */}
      {!showLessons ? (
        <Animated.View entering={FadeInUp.delay(200)} style={styles.startCard}>
          <Text style={styles.lessonTitle}>Learn Your Rights</Text>
          <Text style={styles.lessonDesc}>
            Explore fundamental rights with fun, interactive lessons and games!
          </Text>
          <TouchableOpacity style={styles.startButton} onPress={() => router.push('/screens/FundamentalRightsHeroScreen')}>
            <Text style={styles.startButtonText}>Start Learning</Text>
          </TouchableOpacity>
        </Animated.View>
      ) : (
        <View style={styles.lessonSection}>
          <Text style={styles.sectionTitle}>Modules</Text>
          {modules.map((module, index) => (
            <Animated.View key={module.id} entering={FadeInUp.delay(index * 150)}>
              <TouchableOpacity
                style={[
                  styles.moduleItem,
                  !module.unlocked && { opacity: 0.5 },
                ]}
                disabled={!module.unlocked}
                onPress={() => toggleModule(module.id)}
              >
                <LinearGradient
                  colors={
                    module.unlocked
                      ? ["#E8F5E9", "#C8E6C9"]
                      : ["#E0E0E0", "#BDBDBD"]
                  }
                  style={styles.moduleGradient}
                >
                  <Text style={styles.moduleText}>
                    {module.expanded ? "📂 " : "📁 "}
                    {module.title}
                  </Text>
                  <Text style={styles.moduleSub}>{module.desc}</Text>
                  <Text style={styles.moduleProgress}>
                    {module.games.filter((g) => g.completed).length}/{module.games.length} Games Completed
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              {module.expanded && (
                <View style={styles.gamesList}>
                  {module.games.map((game, gameIndex) => (
                    <Animated.View key={game.id} entering={FadeInUp.delay(gameIndex * 100)}>
                      <TouchableOpacity
                        style={[
                          styles.gameItem,
                          !game.unlocked && { opacity: 0.5 },
                          game.completed && { borderColor: "#4CAF50", borderWidth: 2 },
                        ]}
                        disabled={!game.unlocked}
                        onPress={() => completeGame(module.id, game.id)}
                      >
                        <LinearGradient
                          colors={
                            game.completed
                              ? ["#A5D6A7", "#81C784"]
                              : game.unlocked
                              ? ["#FFF3E0", "#FFE0B2"]
                              : ["#E0E0E0", "#BDBDBD"]
                          }
                          style={styles.gameGradient}
                        >
                          <Text style={styles.gameText}>
                            {game.completed ? "✅ " : game.unlocked ? "🎮 " : "🔒 "}
                            {game.title}
                          </Text>
                          <Text style={styles.gameSub}>{game.desc}</Text>
                        </LinearGradient>
                      </TouchableOpacity>
                    </Animated.View>
                  ))}
                </View>
              )}
            </Animated.View>
          ))}
        </View>
      )}

      {/* ✅ Optional extra sections */}
      {!showLessons && (
        <>
          {/* Daily Challenge */}
          <Animated.View entering={FadeInUp.delay(400)} style={styles.card}>
            <Text style={styles.sectionTitle}>Daily Challenges</Text>
            <View style={styles.challengeItem}>
              <Text style={styles.challengeText}>🏆 Complete 3 Lessons</Text>
              <Text style={styles.reward}>+100 XP</Text>
            </View>
            <View style={styles.challengeItem}>
              <Text style={styles.challengeText}>🎯 Get 100% in Quiz</Text>
              <Text style={styles.reward}>+150 XP</Text>
            </View>
          </Animated.View>

          {/* Situation-Based Game */}
          <Animated.View entering={FadeInUp.delay(600)} style={styles.card}>
            <Text style={styles.sectionTitle}>Situation-Based Game</Text>
            <Text style={styles.subDesc}>
              Test your rights in real-world inspired scenarios!
            </Text>
            <TouchableOpacity
              style={styles.gameButton}
              onPress={() => router.push("/screens/GameScreen")}
            >
              <Text style={styles.gameButtonText}>Play Now 🎮</Text>
            </TouchableOpacity>
          </Animated.View>
        </>
      )}
    </ScrollView>
  );
};

export default CitizenLearning;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  header: {
    paddingVertical: 30,
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
  },
  profileButton: {
    marginRight: 15,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#fff",
  },
  headerTextContainer: {
    flex: 1,
    alignItems: "center",
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
    marginBottom: 15,
  },
  profileModalImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  closeButton: {
    position: "absolute",
    top: 0,
    right: 0,
    padding: 5,
  },
  closeButtonText: {
    fontSize: 18,
    color: "#666",
  },
  profileInfo: {
    marginBottom: 20,
  },
  profileLabel: {
    fontSize: 14,
    color: "#666",
    fontWeight: "bold",
    marginTop: 10,
  },
  profileValue: {
    fontSize: 16,
    color: "#333",
    marginTop: 2,
  },
  logoutButton: {
    backgroundColor: "#FF4444",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  headerText: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
  },
  subHeader: {
    color: "#E8F5E9",
    fontSize: 14,
    marginTop: 5,
  },

  progressCard: {
    backgroundColor: "#fff",
    margin: 15,
    padding: 15,
    borderRadius: 15,
    elevation: 5,
  },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#333", marginBottom: 10 },
  progressBar: {
    height: 10,
    backgroundColor: "#E0E0E0",
    borderRadius: 5,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#4CAF50",
  },
  progressText: { fontSize: 13, color: "#777", marginTop: 5 },

  startCard: {
    backgroundColor: "#E8F5E9",
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
  },
  lessonTitle: { fontSize: 20, fontWeight: "bold", color: "#2E7D32", marginBottom: 8 },
  lessonDesc: { fontSize: 14, color: "#4CAF50", textAlign: "center", marginBottom: 15 },
  startButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 12,
  },
  startButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },

  lessonSection: { marginHorizontal: 15, marginTop: 10 },
  moduleItem: {
    marginVertical: 8,
    borderRadius: 12,
    overflow: "hidden",
  },
  moduleGradient: {
    padding: 15,
  },
  moduleText: { fontSize: 16, fontWeight: "bold", color: "#2E7D32" },
  moduleSub: { fontSize: 13, color: "#555", marginTop: 5 },
  moduleProgress: { fontSize: 12, color: "#777", marginTop: 5 },
  gamesList: { marginLeft: 20, marginTop: 10 },
  gameItem: {
    marginVertical: 5,
    borderRadius: 10,
    overflow: "hidden",
  },
  gameGradient: {
    padding: 12,
  },
  gameText: { fontSize: 14, fontWeight: "bold", color: "#2E7D32" },
  gameSub: { fontSize: 12, color: "#555", marginTop: 3 },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 15,
    marginVertical: 10,
    padding: 20,
    borderRadius: 15,
    elevation: 4,
  },
  challengeItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  challengeText: { fontSize: 15, color: "#333" },
  reward: { color: "#4CAF50", fontWeight: "bold" },

  subDesc: { fontSize: 14, color: "#555", marginBottom: 10 },
  gameButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  gameButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
