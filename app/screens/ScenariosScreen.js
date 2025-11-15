import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ScenariosScreen() {
  const router = useRouter();
  const [currentScenario, setCurrentScenario] = useState(0);

  const scenarios = [
    {
      question: "You see a friend being denied entry to a restaurant because of their caste. What right is being violated?",
      options: [
        "Right to Equality",
        "Right to Freedom",
        "Right Against Exploitation",
        "Right to Education"
      ],
      correct: 0,
      explanation: "This violates the Right to Equality (Article 14), which ensures equality before the law and prohibits discrimination based on caste."
    },
    {
      question: "A newspaper is censored and cannot publish articles criticizing the government. Which right is affected?",
      options: [
        "Right to Religion",
        "Right to Freedom",
        "Right to Constitutional Remedies",
        "Cultural & Educational Rights"
      ],
      correct: 1,
      explanation: "This affects the Right to Freedom (Article 19), which includes freedom of speech and expression."
    },
    {
      question: "A child is forced to work in a factory instead of going to school. What right is being violated?",
      options: [
        "Right to Equality",
        "Right Against Exploitation",
        "Right to Education",
        "Right to Constitutional Remedies"
      ],
      correct: 1,
      explanation: "This violates the Right Against Exploitation (Article 23-24), which prohibits forced labor and child labor."
    }
  ];

  const handleAnswer = (selectedIndex) => {
    const scenario = scenarios[currentScenario];
    if (selectedIndex === scenario.correct) {
      Alert.alert("Correct!", scenario.explanation, [
        { text: "Next", onPress: nextScenario }
      ]);
    } else {
      Alert.alert("Incorrect", "Try again or read the explanation.", [
        { text: "Try Again" },
        { text: "Show Answer", onPress: () => Alert.alert("Answer", scenario.explanation, [{ text: "Next", onPress: nextScenario }]) }
      ]);
    }
  };

  const nextScenario = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
    } else {
      router.push('/screens/QuizScreen');
    }
  };

  const scenario = scenarios[currentScenario];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Real-Life Scenarios</Text>
      <Text style={styles.question}>{scenario.question}</Text>
      <View style={styles.optionsContainer}>
        {scenario.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionButton}
            onPress={() => handleAnswer(index)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        style={styles.skipButton}
        onPress={() => router.push('/screens/QuizScreen')}
      >
        <Text style={styles.skipButtonText}>Skip to Mini Games</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f7fb',
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A73E8',
    textAlign: 'center',
    marginBottom: 30,
  },
  question: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  optionsContainer: {
    marginBottom: 30,
  },
  optionButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    elevation: 2,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  skipButton: {
    backgroundColor: '#FF9800',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignSelf: 'center',
  },
  skipButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
