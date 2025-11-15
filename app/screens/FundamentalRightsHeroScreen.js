import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
// import LottieView from 'lottie-react-native';
import { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function FundamentalRightsHeroScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  // const lottieRef = useRef(null);

  useEffect(() => {
    // Start animations on mount
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Play Lottie animation
    // if (lottieRef.current) {
    //   lottieRef.current.play();
    // }
  }, []);

  return (
    <LinearGradient
      colors={['#FF9933', '#FFFFFF', '#138808']} // Indian tricolor
      style={styles.container}
    >
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        {/* Placeholder for Lottie Animation - Indian Flag waving or Book opening */}
        <View style={styles.animationContainer}>
          <Text style={styles.placeholderText}>📚</Text>
        </View>

        <Text style={styles.title}>Fundamental Rights</Text>

        <Text style={styles.description}>
          Fundamental Rights are the basic human rights enshrined in the Constitution of India.
          They protect citizens from arbitrary actions of the state and ensure equality, freedom,
          and justice for all. Discover these essential rights that form the foundation of our democracy.
        </Text>

        <TouchableOpacity
          style={styles.exploreButton}
          onPress={() => router.push('/screens/RightsListScreen')}
          activeOpacity={0.8}
        >
          <Text style={styles.exploreButtonText}>Explore Rights</Text>
        </TouchableOpacity>
      </Animated.View>
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
    paddingVertical: 40,
  },
  animationContainer: {
    width: width * 0.6,
    height: width * 0.6,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
  },
  placeholderText: {
    fontSize: 100,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1A1A1A', // Navy
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  description: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  exploreButton: {
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
  exploreButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
