
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SuccessContinueScreen() {
  const router = useRouter();
  const badgeAnim = useRef(new Animated.Value(0)).current;
  const textAnim = useRef(new Animated.Value(0)).current;
  const buttonAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    // Start animations sequentially
    Animated.sequence([
      Animated.timing(badgeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(textAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(buttonAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleStartGame = () => {
    router.push('/screens/QuizScreen'); // Navigate to QuizScreen as the first game
  };

  return (
    <LinearGradient
      colors={['#FF9933', '#FFFFFF', '#138808']} // Indian tricolor
      style={styles.container}
    >
      <View style={styles.content}>
        {/* Animated Badge */}
        <Animated.View
          style={[
            styles.badgeContainer,
            {
              transform: [
                {
                  scale: badgeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                  }),
                },
              ],
            },
          ]}
        >
          <Text style={styles.badgeText}>🎉</Text>
        </Animated.View>

        <Animated.Text
          style={[
            styles.title,
            {
              opacity: textAnim,
              transform: [
                {
                  translateY: textAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0],
                  }),
                },
              ],
            },
          ]}
        >
          Continue to Games
        </Animated.Text>

        <Animated.Text
          style={[
            styles.subtitle,
            {
              opacity: textAnim,
              transform: [
                {
                  translateY: textAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0],
                  }),
                },
              ],
            },
          ]}
        >
          Great job! You've learned about real-life scenarios.
          Now test your knowledge with interactive games.
        </Animated.Text>

        <Animated.View
          style={[
            {
              opacity: buttonAnim,
              transform: [
                {
                  translateY: buttonAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <TouchableOpacity
            style={styles.startButton}
            onPress={handleStartGame}
            activeOpacity={0.8}
          >
            <Text style={styles.startButtonText}>Start Game Challenge</Text>
          </TouchableOpacity>
        </Animated.View>
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
  badgeContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  badgeText: {
    fontSize: 48,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A', // Navy
    textAlign: 'center',
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  startButton: {
    backgroundColor: '#138808', // Indian green
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});