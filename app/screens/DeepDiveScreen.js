import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { RIGHTS } from '../../data/rights';

export default function DeepDiveScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentRight = RIGHTS[currentIndex];

  const nextRight = () => {
    if (currentIndex < RIGHTS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      router.push('/screens/ScenariosScreen');
    }
  };

  const prevRight = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      router.back();
    }
  };

  return (
    <LinearGradient
      colors={['#4facfe', '#00f2fe']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* Progress bar */}
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            {currentIndex + 1} of {RIGHTS.length}
          </Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${((currentIndex + 1) / RIGHTS.length) * 100}%` },
              ]}
            />
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>Deep Dive: {currentRight.title}</Text>

        {/* Article Section */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>📜 Articles</Text>
          <Text style={styles.articleText}>{currentRight.articles}</Text>
        </View>

        {/* Explanation */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>💡 Explanation</Text>
          <Text style={styles.explanationText}>{currentRight.short}</Text>
        </View>

        {/* Example */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>🌟 Example</Text>
          <Text style={styles.exampleText}>{currentRight.example}</Text>
        </View>

      </ScrollView>

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={prevRight}>
          <Text style={styles.backButtonText}>⬅️ Back</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.nextButton} onPress={nextRight}>
          <Text style={styles.nextButtonText}>
            {currentIndex < RIGHTS.length - 1 ? 'Next Right ➡️' : 'Continue to Scenarios 🎯'}
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  progressText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  progressBar: {
    width: '80%',
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    padding: 24,
    borderRadius: 16,
    marginVertical: 12,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  articleText: {
    fontSize: 16,
    color: '#1A73E8',
    fontWeight: 'bold',
  },
  explanationText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  exampleText: {
    fontSize: 16,
    color: '#4CAF50',
    fontStyle: 'italic',
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 30,
    left: 16,
    right: 16,
  },
  backButton: {
    backgroundColor: '#FF5722',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 30,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  nextButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 30,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
