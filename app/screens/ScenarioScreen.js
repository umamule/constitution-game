import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
// import LottieView from 'lottie-react-native';
import { useEffect, useState } from 'react';
import { Animated, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ResultPopup from '../../components/ResultPopup';
import { SCENARIOS } from '../../data/rightsData';

export default function ScenarioScreen() {
  const router = useRouter();
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [progressAnim] = useState(new Animated.Value(0));

  const currentScenario = SCENARIOS[currentScenarioIndex];

  useEffect(() => {
    // Animate progress bar
    Animated.timing(progressAnim, {
      toValue: (currentScenarioIndex + 1) / SCENARIOS.length,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [currentScenarioIndex]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsCorrect(option.correct);
    setShowPopup(true);
  };

  const handleContinue = () => {
    setShowPopup(false);
    setSelectedOption(null);

    if (currentScenarioIndex < SCENARIOS.length - 1) {
      setCurrentScenarioIndex(currentScenarioIndex + 1);
    } else {
      // Navigate to StoryNotFoundScreen
      router.push('/screens/StoryNotFoundScreen');
    }
  };

  const handleTryAgain = () => {
    setShowPopup(false);
    setSelectedOption(null);
  };

  return (
    <LinearGradient
      colors={['#FF9933', '#FFFFFF', '#138808']} // Indian tricolor
      style={styles.container}
    >
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          Step {currentScenarioIndex + 1} of {SCENARIOS.length}
        </Text>
        <View style={styles.progressBar}>
          <Animated.View
            style={[
              styles.progressFill,
              {
                width: progressAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          />
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Scenario Card */}
        <View style={styles.scenarioCard}>
          <View style={styles.scenarioHeader}>
            <Text style={styles.scenarioTitle}>Real-Life Scenario</Text>
            {/* Placeholder Illustration */}
            <View style={styles.illustrationContainer}>
              <Text style={styles.placeholderEmoji}>📚</Text>
            </View>
          </View>

          <Text style={styles.scenarioText}>{currentScenario.scenario}</Text>
        </View>

        {/* Options */}
        <View style={styles.optionsContainer}>
          <Text style={styles.questionText}>
            Which fundamental right is being violated?
          </Text>

          {currentScenario.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionCard,
                selectedOption === option && styles.selectedOption,
              ]}
              onPress={() => handleOptionSelect(option)}
              activeOpacity={0.8}
              disabled={selectedOption !== null}
            >
              <Text style={styles.optionText}>{option.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Result Popup */}
      <ResultPopup
        visible={showPopup}
        isCorrect={isCorrect}
        explanation={currentScenario.explanation}
        onContinue={handleContinue}
        onTryAgain={handleTryAgain}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  progressContainer: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 10,
  },
  progressText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#138808', // Indian green
    borderRadius: 4,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scenarioCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  scenarioHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  scenarioTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  illustrationContainer: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderEmoji: {
    fontSize: 40,
  },
  scenarioText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  optionsContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 15,
  },
  optionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  selectedOption: {
    backgroundColor: '#E8F5E9', // Light green highlight
    borderColor: '#138808',
    borderWidth: 2,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
});
