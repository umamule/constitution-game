// app/screens/login.js
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    try {
      const response = await fetch("http://10.250.96.8:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Login Response:", data);

      if (!response.ok) {
        Alert.alert("Login failed", data.message || "Invalid login");
        return;
      }

      // -----------------------------
      // Save user
      // -----------------------------
      await AsyncStorage.setItem("user", JSON.stringify(data));

      // ⭐ Only store token if it exists
      if (data.token) {
        await AsyncStorage.setItem("token", data.token);
      } else {
        console.log("⚠ No token received from backend");
      }

      // -----------------------------
      // Score reset for NEW users
      // -----------------------------
      const lastUser = await AsyncStorage.getItem("lastLoggedUser");

      if (lastUser !== email) {
        await AsyncStorage.setItem("quizScore", "0");
        await AsyncStorage.setItem("xp", "0");
        console.log("🔄 New user → Score reset");
      }

      await AsyncStorage.setItem("lastLoggedUser", email);

      // -----------------------------
      // Redirect based on role
      // -----------------------------
      if (data.role === "citizen") {
        router.replace("/screens/CitizenLearning");
      } else if (data.role === "institute") {
        router.replace("/screens/InstituteDashboard");
      } else {
        Alert.alert("Error", "Unknown user role");
      }

    } catch (error) {
      console.log("❌ Login error:", error);
      Alert.alert("Login failed", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />

      <Text style={styles.title}>Welcome Back!</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => router.replace("/screens/signup")}
      >
        <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f8ff", justifyContent: "center", alignItems: "center", padding: 20 },
  logo: { width: 120, height: 120, marginBottom: 20, borderRadius: 20 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20, color: "#333" },
  input: {
    width: "100%", borderWidth: 1, borderColor: "#ccc",
    borderRadius: 10, padding: 12, marginBottom: 15, backgroundColor: "#fff"
  },
  button: {
    width: "100%", backgroundColor: "#4CAF50",
    padding: 15, borderRadius: 10, alignItems: "center", marginBottom: 10
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  linkButton: { marginTop: 5 },
  linkText: { color: "#4CAF50", fontSize: 16 }
});
