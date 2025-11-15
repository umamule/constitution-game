import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MATCH_DATA } from '../../data/rightsData';

const MatchingScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [pairs, setPairs] = useState([]);
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [selectedDef, setSelectedDef] = useState(null);

  const [matchedPairs, setMatchedPairs] = useState([]);
  const [score, setScore] = useState(0);

  const [wrongFlash, setWrongFlash] = useState(false); // red highlight for wrong match

  const isComplete = pairs.length > 0 && matchedPairs.length === pairs.length;

  // Load lesson data
  useEffect(() => {
    if (id && MATCH_DATA[id]) {
      const formatted = MATCH_DATA[id].map(item => ({
        term: item.left,
        definition: item.right,
      }));

      setPairs(shuffleArray(formatted));
      setMatchedPairs([]);
      setScore(0);
      setSelectedTerm(null);
      setSelectedDef(null);
      setWrongFlash(false);
    }
  }, [id]);

  // Shuffle function
  const shuffleArray = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const terms = pairs.map(p => p.term);
  const definitions = pairs.map(p => p.definition);

  // ---------------------------
  // Matching Logic (no popup)
  // ---------------------------
  const checkMatch = (term, def) => {
    const pair = pairs.find(p => p.term === term && p.definition === def);

    if (pair) {
      // correct
      setMatchedPairs(prev => [...prev, pair]);
      setScore(prev => prev + 1);
      setSelectedTerm(null);
      setSelectedDef(null);
    } else {
      // wrong → flash red for 600ms
      setWrongFlash(true);
      setTimeout(() => {
        setWrongFlash(false);
        setSelectedTerm(null);
        setSelectedDef(null);
      }, 600);
    }
  };

  const handleSelectTerm = (term) => {
    if (selectedTerm === term) {
      setSelectedTerm(null);
    } else {
      setSelectedTerm(term);
      if (selectedDef) checkMatch(term, selectedDef);
    }
  };

  const handleSelectDef = (def) => {
    if (selectedDef === def) {
      setSelectedDef(null);
    } else {
      setSelectedDef(def);
      if (selectedTerm) checkMatch(selectedTerm, def);
    }
  };

  // Submit results
  const handleSubmitAll = async () => {
    router.push({
      pathname: '/screens/BadgeScreen',
      params: { id, score }
    });

    // Save progress in background
    (async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (userId) {
          fetch(`http://10.44.114.8:5000/api/users/progress/${userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              quizzesCompleted: [id],
              quizScores: { [id]: score },
            }),
          }).catch(() => {});
        }
      } catch {}
    })();
  };

  // Loading screen
  if (!pairs.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading…</Text>
      </View>
    );
  }

  // ---------------------------
  // UI
  // ---------------------------
  return (
    <LinearGradient
              colors={['#FF9933', '#FFFFFF', '#138808']} // Indian tricolor
              style={styles.container}
            >
    <View style={styles.container}>
      <Text style={styles.title}>{id?.toUpperCase()} Matching Game</Text>

      <View style={styles.gameContainer}>
        {/* LEFT COLUMN */}
        <View style={styles.column}>
          <Text style={styles.columnTitle}>Left</Text>

          {terms.map((term, idx) => {
            const matched = matchedPairs.some(p => p.term === term);

            const isSelectedWrong =
              wrongFlash && selectedTerm === term;

            return (
              <TouchableOpacity
                key={`L-${idx}`}
                style={[
                  styles.item,
                  matched && styles.correctItem,
                  selectedTerm === term && !matched && styles.selectedItem,
                  isSelectedWrong && styles.wrongItem
                ]}
                disabled={matched}
                onPress={() => handleSelectTerm(term)}
              >
                <Text style={styles.itemText}>{term}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* RIGHT COLUMN */}
        <View style={styles.column}>
          <Text style={styles.columnTitle}>Right</Text>

          {definitions.map((def, idx) => {
            const matched = matchedPairs.some(p => p.definition === def);

            const isSelectedWrong =
              wrongFlash && selectedDef === def;

            return (
              <TouchableOpacity
                key={`R-${idx}`}
                style={[
                  styles.item,
                  matched && styles.correctItem,
                  selectedDef === def && !matched && styles.selectedItem,
                  isSelectedWrong && styles.wrongItem
                ]}
                disabled={matched}
                onPress={() => handleSelectDef(def)}
              >
                <Text style={styles.itemText}>{def}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* PROGRESS */}
      <View style={styles.progressRow}>
        <Text style={styles.progressText}>
          Matched: {matchedPairs.length}/{pairs.length}
        </Text>
        <Text style={styles.progressText}>Score: {score}</Text>
      </View>

      {/* SUBMIT BUTTON */}
      {isComplete && (
        <View style={styles.submitContainer}>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmitAll}>
            <Text style={styles.submitButtonText}>Submit </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10,  },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },

  gameContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  column: { flex: 1, marginHorizontal: 10 },
  columnTitle: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },

  item: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginBottom: 8,
    borderRadius: 10,
  },

  selectedItem: { backgroundColor: '#CDE7FF' }, // blue selection
  correctItem: { backgroundColor: '#81C784' }, // green correct
  wrongItem: { backgroundColor: '#F44336' }, // red wrong

  itemText: { textAlign: 'center', fontSize: 14 },

  progressRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  progressText: { fontSize: 16, fontWeight: '600' },

  submitContainer: { marginTop: 25, alignItems: 'center' },
  submitButton: { backgroundColor: '#4CAF50', padding: 15, borderRadius: 12 },
  submitButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});

export default MatchingScreen;
