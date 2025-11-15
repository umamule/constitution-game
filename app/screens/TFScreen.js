import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { LinearGradient } from 'expo-linear-gradient';

import { Animated, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TF_DATA } from "../../data/rightsData";

const ResultPopup = ({ visible, isCorrect, onContinue, onTryAgain, explanation }) => {
  if (!visible) return null;
  return (
    <View style={styles.resultCard}>
      <Text style={[styles.resultText, isCorrect ? styles.correct : styles.incorrect]}>
        {isCorrect ? "Correct!" : "Incorrect!"}
      </Text>
      <Text style={styles.explanation}>{explanation}</Text>
      <TouchableOpacity style={styles.finishButton} onPress={onContinue}>
        <Text style={styles.finishButtonText}>Continue</Text>
      </TouchableOpacity>
      {!isCorrect && (
        <TouchableOpacity style={styles.tryAgainButton} onPress={onTryAgain}>
          <Text style={styles.tryAgainButtonText}>Try Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default function TFScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(1));

  // Find the TF data based on id
  const tfData = TF_DATA[id];

  if (!tfData) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>TF Quiz not found!</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleNext = () => {
    if (currentQuestion < tfData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      });
    } else {
      // Quiz completed
      router.push('/screens/BadgeScreen');
    }
  };

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    setIsCorrect(answer === tfData[currentQuestion].correct);
    setShowPopup(true);
  };

  const handleContinue = () => {
    setShowPopup(false);
    setSelectedAnswer(null);
    handleNext();
  };

  const handleTryAgain = () => {
    setShowPopup(false);
    setSelectedAnswer(null);
  };

  return (
    <LinearGradient
      colors={['#FF9933', '#FFFFFF', '#138808']} // Indian tricolor
      style={styles.container}
    >
      <ScrollView style={styles.container}>
        <Text style={styles.title}>True or False Quiz</Text>

        <Animated.View style={[styles.quizCard, { opacity: fadeAnim }]}>
          <Text style={styles.questionNumber}>Statement {currentQuestion + 1} of {tfData.length}</Text>
          <Text style={styles.question}>{tfData[currentQuestion].statement}</Text>
          <View style={styles.tfContainer}>
            <TouchableOpacity
              style={[
                styles.tfButton,
                selectedAnswer === true && {
                  backgroundColor: true === tfData[currentQuestion].correct ? "#4CAF50" : "#F44336",
                },
              ]}
              onPress={() => !showPopup && handleAnswer(true)}
              disabled={showPopup}
            >
              <Text style={styles.tfButtonText}>True</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tfButton,
                selectedAnswer === false && {
                  backgroundColor: false === tfData[currentQuestion].correct ? "#4CAF50" : "#F44336",
                },
              ]}
              onPress={() => !showPopup && handleAnswer(false)}
              disabled={showPopup}
            >
              <Text style={styles.tfButtonText}>False</Text>
            </TouchableOpacity>
          </View>

          {/* Result Popup */}
          <ResultPopup
            visible={showPopup}
            isCorrect={isCorrect}
            onContinue={handleContinue}
            onTryAgain={handleTryAgain}
            explanation={tfData[currentQuestion].explanation}
          />
        </Animated.View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
  },
  errorText: {
    fontSize: 18,
    color: "#F44336",
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2E7D32",
    textAlign: "center",
    marginBottom: 20,
  },
  quizCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    elevation: 5,
  },
  questionNumber: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  question: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  tfContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  tfButton: {
    backgroundColor: "#F5F5F5",
    padding: 15,
    borderRadius: 10,
    width: '40%',
    alignItems: 'center',
  },
  tfButtonText: {
    fontSize: 16,
    color: "#333",
    fontWeight: 'bold',
  },
  resultCard: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#E8F5E9",
    borderRadius: 10,
  },
  resultText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 10,
  },
  explanation: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  correct: {
    color: "#4CAF50",
  },
  incorrect: {
    color: "#F44336",
  },
  finishButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: "center",
  },
  finishButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  tryAgainButton: {
    backgroundColor: "#FF9800",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  tryAgainButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
