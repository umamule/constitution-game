// app/screens/QuizScreen.js

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
import { MCQ_DATA } from "../../data/rightsData";

export default function QuizScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const quizData = MCQ_DATA[id];
  const fadeAnim = new Animated.Value(1);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  if (!quizData) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Quiz not found!</Text>
      </View>
    );
  }

  // ⭐ update global score + XP
  const handleCorrectAnswer = async () => {
    await addGlobalScore(); // +1 globally
    await addXP(50); // XP +50
  };

  const handleAnswer = async (index) => {
    setSelectedAnswer(index);

    const correct = index === quizData[currentQuestion].correct;
    setIsCorrect(correct);

    if (correct) {
      await handleCorrectAnswer();  // ⭐ update score + XP
    }

    setShowPopup(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);

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
    <LinearGradient colors={["#FF9933", "#FFFFFF", "#138808"]} style={{ flex: 1 }}>
      <ScrollView style={{ padding: 20 }}>
        <Text style={styles.title}>Quiz</Text>

        <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
          <Text style={styles.questionNumber}>
            Question {currentQuestion + 1} of {quizData.length}
          </Text>

          <Text style={styles.question}>{quizData[currentQuestion].question}</Text>

          {quizData[currentQuestion].options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.option,
                selectedAnswer === index && {
                  backgroundColor:
                    index === quizData[currentQuestion].correct ? "#4CAF50" : "#F44336",
                },
              ]}
              disabled={showPopup}
              onPress={() => handleAnswer(index)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}

          {showPopup && (
            <View style={styles.popup}>
              <Text
                style={[
                  styles.popupText,
                  isCorrect ? styles.correct : styles.incorrect,
                ]}
              >
                {isCorrect ? "Correct!" : "Incorrect!"}
              </Text>

              <TouchableOpacity
                style={styles.nextBtn}
                onPress={() => {
                  setShowPopup(false);
                  setSelectedAnswer(null);
                  nextQuestion();
                }}
              >
                <Text style={styles.nextBtnText}>Continue</Text>
              </TouchableOpacity>
            </View>
          )}
        </Animated.View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 15, textAlign: "center" },
  card: { backgroundColor: "#fff", padding: 20, borderRadius: 15 },
  questionNumber: { fontSize: 15, color: "#777" },
  question: { fontSize: 18, fontWeight: "bold", marginVertical: 10 },
  option: {
    padding: 15,
    backgroundColor: "#eee",
    borderRadius: 10,
    marginBottom: 10,
  },
  optionText: { fontSize: 16 },
  popup: {
    marginTop: 15,
    padding: 15,
    backgroundColor: "#E8F5E9",
    borderRadius: 10,
  },
  popupText: { fontSize: 18, fontWeight: "bold" },
  correct: { color: "#4CAF50" },
  incorrect: { color: "#F44336" },
  nextBtn: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  nextBtnText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
});
