import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function StoryNotFoundScreen() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const handlePlayGame = () => {
    router.push('/screens/QuizScreen');
  };

  return (
    <LinearGradient
      colors={['#FF9933', '#FFFFFF', '#138808']} // Indian tricolor
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Story Not Found</Text>
        <Text style={styles.message}>
          No more stories available at the moment. You've completed all the scenarios!
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.goBackButton}
            onPress={handleGoBack}
            activeOpacity={0.8}
          >
            <Text style={styles.goBackButtonText}>Go Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.playGameButton}
            onPress={handlePlayGame}
            activeOpacity={0.8}
          >
            <Text style={styles.playGameButtonText}>Play Game</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    width: '100%',
    gap: 15,
  },
  goBackButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  goBackButtonText: {
    color: '#138808',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  playGameButton: {
    backgroundColor: '#138808',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  playGameButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
