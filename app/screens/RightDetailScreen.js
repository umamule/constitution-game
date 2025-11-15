import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RIGHTS_DATA } from '../../data/rightsData';

const games = [
  { id: 1, title: "Multiple Choice Quiz", desc: "Test your knowledge with questions", route: "QuizScreen" },
  { id: 2, title: "True/False Challenge", desc: "Quick true or false questions", route: "TrueFalseScreen" },
  { id: 3, title: "Matching Game", desc: "Match rights with descriptions", route: "MatchingScreen" },
  { id: 4, title: "Scenario Decision", desc: "Make decisions in real scenarios", route: "ScenarioScreen" },
  { id: 5, title: "Flashcard Review", desc: "Review key concepts with flashcards", route: "FlashcardScreen" }
];

export default function RightDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [right, setRight] = useState(null);
  const [showGames, setShowGames] = useState(false);

  useEffect(() => {
    const foundRight = RIGHTS_DATA.find(r => r.id === id);
    setRight(foundRight);
  }, [id]);

  if (!right) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={['#FF9933', '#FFFFFF', '#138808']} // Indian tricolor
      style={styles.container}
    >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.icon}>{right.icon}</Text>
          <Text style={styles.title}>{right.title}</Text>
          <Text style={styles.articles}>Articles {right.articles}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <Text style={styles.sectionText}>{right.short}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Detailed Explanation</Text>
          <Text style={styles.sectionText}>{right.detailed}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Real-Life Example</Text>
          <Text style={styles.sectionText}>{right.example}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.8}
          >
            <Text style={styles.backButtonText}>Back to Rights</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.playGamesButton}
            onPress={() => setShowGames(true)}
            activeOpacity={0.8}
          >
            <Text style={styles.playGamesButtonText}>Play Games</Text>
          </TouchableOpacity>
        </View>

        {showGames && (
          <View style={styles.gamesModal}>
            <Text style={styles.gamesTitle}>Choose a Game</Text>
            {games.map((game) => (
              <TouchableOpacity
                key={game.id}
                style={styles.gameOption}
                onPress={() => {
                  if (game.id === 1) {
                    router.push({ pathname: "/screens/QuizScreen", params: { id } });
                  } else if (game.id === 2) {
                    router.push({ pathname: "/screens/TFScreen", params: { id } });
                  } else if (game.id === 3) {
                    router.push({ pathname: "/screens/MatchScreen", params: { id } });
                  } else {
                    router.push(game.route);
                  }
                }}
                activeOpacity={0.8}
              >
                <Text style={styles.gameTitle}>{game.title}</Text>
                <Text style={styles.gameDesc}>{game.desc}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowGames(false)}
              activeOpacity={0.8}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  icon: {
    fontSize: 64,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A', // Navy
    textAlign: 'center',
    marginBottom: 8,
  },
  articles: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  backButton: {
    backgroundColor: '#138808', // Indian green
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  playGamesButton: {
    backgroundColor: '#FF9933', // Indian saffron
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: 'center',
    flex: 1,
    marginLeft: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  playGamesButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  gamesModal: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  gamesTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 20,
  },
  gameOption: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  gameTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 5,
  },
  gameDesc: {
    fontSize: 14,
    color: '#666',
  },
  closeButton: {
    backgroundColor: '#666',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 50,
  },
});