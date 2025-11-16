// app/screens/TFScreen.js

import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { addGlobalScore, addXP } from "../../utils/scoreManager";
import { TF_DATA } from "../../data/rightsData";

export default function TFScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const tfData = TF_DATA[id];
  const fadeAnim = new Animated.Value(1);

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  if (!tfData) {
    return (
      <View style={styles.center}>
        <Text>TF Quiz not found</Text>
      </View>
    );
  }

  // ⭐ update global score
  const handleCorrect = async () => {
    await addGlobalScore();
    await addXP(50);
  };

  const handleAnswer = async (value) => {
    setSelected(value);

    const correct = value === tfData[current].correct;
    setIsCorrect(correct);

    if (correct) {
      await handleCorrect();
    }

    setShowPopup(true);
  };

  const next = () => {
    if (current < tfData.length - 1) {
      setCurrent(current + 1);

      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      });
    } else {
      router.push("/screens/BadgeScreen");
    }
  };

  return (
    <LinearGradient colors={["#FF9933", "#FFFFFF", "#138808"]} style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>True or False</Text>

        <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
          <Text style={styles.number}>
            Statement {current + 1} of {tfData.length}
          </Text>

          <Text style={styles.statement}>{tfData[current].statement}</Text>

          <View style={styles.row}>
            <TouchableOpacity
              style={[
                styles.btn,
                selected === true && {
                  backgroundColor: true === tfData[current].correct ? "#4CAF50" : "#F44336",
                },
              ]}
              disabled={showPopup}
              onPress={() => handleAnswer(true)}
            >
              <Text style={styles.btnText}>True</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.btn,
                selected === false && {
                  backgroundColor: false === tfData[current].correct ? "#4CAF50" : "#F44336",
                },
              ]}
              disabled={showPopup}
              onPress={() => handleAnswer(false)}
            >
              <Text style={styles.btnText}>False</Text>
            </TouchableOpacity>
          </View>

          {showPopup && (
            <View style={styles.popup}>
              <Text style={[styles.popupText, isCorrect ? styles.correct : styles.incorrect]}>
                {isCorrect ? "Correct!" : "Incorrect!"}
              </Text>

              <Text style={styles.explain}>{tfData[current].explanation}</Text>

              <TouchableOpacity
                style={styles.nextBtn}
                onPress={() => {
                  setShowPopup(false);
                  setSelected(null);
                  next();
                }}
              >
                <Text style={styles.nextText}>Continue</Text>
              </TouchableOpacity>
            </View>
          )}
        </Animated.View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 26, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  card: { backgroundColor: "#fff", padding: 20, borderRadius: 15 },
  number: { color: "#777", marginBottom: 10 },
  statement: { fontSize: 18, fontWeight: "bold", marginBottom: 20 },
  row: { flexDirection: "row", justifyContent: "space-around" },
  btn: { backgroundColor: "#eee", padding: 15, borderRadius: 10, width: "40%" },
  btnText: { textAlign: "center", fontSize: 16 },
  popup: { marginTop: 20, backgroundColor: "#E8F5E9", padding: 15, borderRadius: 10 },
  popupText: { fontSize: 18, fontWeight: "bold" },
  correct: { color: "#4CAF50" },
  incorrect: { color: "#F44336" },
  explain: { marginVertical: 10, color: "#333" },
  nextBtn: { backgroundColor: "#4CAF50", padding: 12, borderRadius: 10 },
  nextText: { color: "#fff", fontWeight: "bold", textAlign: "center" },
});
