// app/screens/InstituteLearning.js
import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image,
  Alert,
} from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import debounce from "lodash.debounce";

const API_BASE = "http://10.107.43.191/api";

export default function InstituteLearning() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);

  // --------------------------
  // Fetch User Data
  // --------------------------
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("user");
      if (!storedUser) return;

      const user = JSON.parse(storedUser);
      setUserData(user);
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  // --------------------------
  // Logout (Same as CitizenLearning)
  // --------------------------
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
              await AsyncStorage.removeItem("user");
              await AsyncStorage.removeItem("token");
              router.replace("/screens/login");
            } catch (error) {
              Alert.alert("Error", "Failed to logout");
            }
          },
        },
      ]
    );
  };

  // --------------------------
  // Search System
  // --------------------------
  const doSearch = async (q) => {
    if (!q || q.trim().length < 1) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/resources/search?q=${encodeURIComponent(q)}`);
      const json = await res.json();
      if (json.ok) setResults(json.results);
      else setResults([]);
    } catch (err) {
      console.log(err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const debounced = useCallback(debounce(doSearch, 400), []);
  useEffect(() => {
    debounced(search);
    return () => debounced.cancel();
  }, [search]);

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <LinearGradient colors={["#FF9800", "#FFB74D"]} style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => setShowProfile(!showProfile)}
          >
            <Image source={require("../assets/logo.png")} style={styles.profileImage} />
          </TouchableOpacity>

          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>Institute Learning</Text>
            <Text style={styles.subHeader}>Explore Acts, Articles & Case Laws</Text>
          </View>
        </View>
      </LinearGradient>

      {/* PROFILE MODAL (Same as CitizenLearning) */}
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

      {/* SEARCH BAR */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search Acts, Articles, or Case Laws..."
          placeholderTextColor="#999"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      {loading && <ActivityIndicator style={{ margin: 12 }} size="small" />}

      {/* SEARCH RESULTS */}
      <FlatList
        data={results}
        keyExtractor={(item) => item._id || item.id}
        contentContainerStyle={{ paddingHorizontal: 15, paddingBottom: 200 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push(`/screens/ResourceDetail?id=${item._id || item.id}`)
            }
          >
            <Text style={styles.typeTag}>{item.type}</Text>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDesc} numberOfLines={2}>
              {item.summary || item.desc}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Mock Test Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Mock Tests</Text>
        <Text style={styles.sectionDesc}>
          Test your knowledge of constitutional laws and articles.
        </Text>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#FF9800" }]}
          onPress={() => router.push("/screens/MockList")}
        >
          <Text style={styles.buttonText}>Start Mock Test</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profile</Text>
        <Text style={styles.sectionDesc}>
          Manage institute details, teachers, and course progress.
        </Text>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#4CAF50" }]}
          onPress={() => router.push("/screens/InstituteProfile")}
        >
          <Text style={styles.buttonText}>View Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    padding: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    alignItems: "center",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  profileButton: { marginRight: 15 },
  profileImage: {
    width: 40, height: 40, borderRadius: 20,
    borderWidth: 2, borderColor: "#fff",
  },
  headerTextContainer: { flex: 1, alignItems: "center" },
  headerText: { fontSize: 26, fontWeight: "bold", color: "#fff" },
  subHeader: { fontSize: 14, color: "#fbe9e7", marginTop: 5 },

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
  profileHeader: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  profileModalImage: { width: 50, height: 50, borderRadius: 25, marginRight: 15 },

  closeButton: { position: "absolute", top: 0, right: 0, padding: 5 },
  closeButtonText: { fontSize: 18, color: "#666" },

  profileInfo: { marginBottom: 20 },
  profileLabel: { fontSize: 14, color: "#666", fontWeight: "bold", marginTop: 10 },
  profileValue: { fontSize: 16, color: "#333", marginTop: 2 },

  logoutButton: {
    backgroundColor: "#FF4444",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  logoutButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },

  searchContainer: {
    margin: 15,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: { fontSize: 16, color: "#333" },

  card: {
    backgroundColor: "#FFF3E0",
    marginBottom: 12,
    borderRadius: 15,
    padding: 15,
    elevation: 3,
  },
  typeTag: { fontSize: 12, color: "#FF6F00", fontWeight: "bold" },
  cardTitle: { fontSize: 16, fontWeight: "bold", color: "#333" },
  cardDesc: { fontSize: 14, color: "#555" },

  section: {
    margin: 15,
    backgroundColor: "#FFF8E1",
    borderRadius: 15,
    padding: 15,
    elevation: 3,
  },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#333" },
  sectionDesc: { fontSize: 14, color: "#666", marginVertical: 6 },

  button: {
    marginTop: 10,
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
