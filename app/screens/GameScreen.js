import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import API_BASE from "../../config/api"; // ✅ Backend base URL

export default function GameScreen() {
  const router = useRouter();

  // States
  const [situations, setSituations] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch data from backend API
  useEffect(() => {
    const fetchSituations = async () => {
      try {
        const response = await fetch(`${API_BASE}/mock`);
        const data = await response.json();
        setSituations(data);
      } catch (error) {
        console.error("❌ Error fetching situations:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSituations();
  }, []);

  // Loading UI
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2979ff" />
        <Text style={{ color: "#fff", marginTop: 10 }}>Loading game...</Text>
      </View>
    );
  }

  // Handle if no data
  if (!situations.length) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "#fff" }}>No situations found. Please add data in backend.</Text>
      </View>
    );
  }

  // Current situation
  const situation = situations[current];

  // Handle option select
  const handleOptionPress = (option) => {
    setSelected(option);
    setShowExplanation(true);
    if (option === situation.correctAnswer) {
      setScore(score + 1);
    }
  };

  // Handle Next button
  const handleNext = () => {
    setSelected(null);
    setShowExplanation(false);
    if (current < situations.length - 1) {
      setCurrent(current + 1);
    } else {
      alert(`🎉 Game Over!\nYour Score: ${score}/${situations.length}`);
      router.push('/screens/BadgeScreen');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>🧩 Situation-Based Law Game</Text>

      <View style={styles.card}>
        <Text style={styles.situation}>{situation.situation}</Text>

        {situation.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.option,
              selected === option && {
                backgroundColor: option === situation.correctAnswer ? "#4caf50" : "#e53935",
              },
            ]}
            onPress={() => !showExplanation && handleOptionPress(option)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}

        {showExplanation && (
          <>
            <Text style={styles.explanationTitle}>Explanation:</Text>
            <Text style={styles.explanation}>{situation.explanation}</Text>
            <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111", padding: 16 },
  header: { fontSize: 22, fontWeight: "bold", color: "#fff", textAlign: "center", marginBottom: 20 },
  card: { backgroundColor: "#1e1e1e", padding: 16, borderRadius: 12, elevation: 4 },
  situation: { fontSize: 16, color: "#fff", marginBottom: 20 },
  option: {
    backgroundColor: "#263238",
    padding: 12,
    borderRadius: 10,
    marginVertical: 8,
  },
  optionText: { color: "#fff", fontSize: 16 },
  explanationTitle: { fontWeight: "bold", color: "#4caf50", marginTop: 20 },
  explanation: { color: "#bbb", marginVertical: 10 },
  nextButton: {
    backgroundColor: "#2979ff",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  nextButtonText: { color: "#fff", fontWeight: "bold" },
  center: {
    flex: 1,
    backgroundColor: "#111",
    justifyContent: "center",
    alignItems: "center",
  },
});
