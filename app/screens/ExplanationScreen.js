import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ExplanationScreen() {
  const router = useRouter();
  const [fadeAnim] = useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Text style={styles.title}>What Are Fundamental Rights?</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Basic Rights</Text>
          <Text style={styles.cardText}>
            Fundamental rights are the basic human rights enshrined in the Constitution of India.
            They protect citizens from arbitrary actions of the state and ensure equality and freedom.
          </Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Protection</Text>
          <Text style={styles.cardText}>
            These rights cannot be taken away except in rare circumstances as prescribed by law.
            They form the foundation of democracy and justice in India.
          </Text>
        </View>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => router.push('/screens/RightsListScreen')}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f7fb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '90%',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A73E8',
    textAlign: 'center',
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginVertical: 10,
    width: '100%',
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  nextButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 30,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
