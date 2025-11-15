import { useEffect, useRef } from 'react';
import { Animated, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ResultPopup({ visible, isCorrect, explanation, onContinue, onTryAgain }) {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const emojiAnim = useRef(new Animated.Value(1)).current;
  const explanationAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }).start();

      // Animate emoji for celebration
      if (isCorrect) {
        Animated.sequence([
          Animated.timing(emojiAnim, {
            toValue: 1.5,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(emojiAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start();
      }

      // Animate explanation fade-in after a delay
      Animated.timing(explanationAnim, {
        toValue: 1,
        duration: 500,
        delay: 1000, // Delay to appear after the popup and emoji animation
        useNativeDriver: true,
      }).start();
    } else {
      scaleAnim.setValue(0);
      emojiAnim.setValue(1);
      explanationAnim.setValue(0);
    }
  }, [visible, isCorrect]);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.popup,
            {
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          {/* Animated Emoji */}
          <View style={styles.animationContainer}>
            <Animated.Text
              style={[
                styles.emoji,
                {
                  transform: [{ scale: emojiAnim }],
                },
              ]}
            >
              {isCorrect ? '🎉' : '😞'}
            </Animated.Text>
          </View>

          <Text style={[styles.title, isCorrect ? styles.correctTitle : styles.incorrectTitle]}>
            {isCorrect ? 'Correct! ✅' : 'Incorrect! ❌'}
          </Text>

          <Text style={styles.message}>
            {isCorrect ? 'Rights protected' : 'Right Violated'}
          </Text>

          <Animated.Text
            style={[
              styles.explanation,
              {
                opacity: explanationAnim,
                transform: [
                  {
                    translateY: explanationAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [10, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            {explanation}
          </Animated.Text>

          <TouchableOpacity
            style={[styles.button, isCorrect ? styles.continueButton : styles.tryAgainButton]}
            onPress={isCorrect ? onContinue : onTryAgain}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>
              {isCorrect ? 'Continue' : 'Try Again'}
            </Text>
          </TouchableOpacity>

          {!isCorrect && (
            <TouchableOpacity
              style={[styles.button, styles.continueButton]}
              onPress={onContinue}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Continue to Game</Text>
            </TouchableOpacity>
          )}
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    width: '85%',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  animationContainer: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  emoji: {
    fontSize: 80,
    textAlign: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  correctTitle: {
    color: '#138808', // Indian green
  },
  incorrectTitle: {
    color: '#FF0000', // Red
  },
  message: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
  },
  explanation: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
  },
  continueButton: {
    backgroundColor: '#138808', // Indian green
  },
  tryAgainButton: {
    backgroundColor: '#FF9933', // Indian saffron
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
