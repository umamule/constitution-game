
// GameScreen.js — Final Clean Version (with scoreManager.js)

import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Speech from "expo-speech";
import { Audio } from "expo-av";
import { useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";

import {
  loadGameProgress,
  saveGameProgress,
  resetGameProgress,
  updateScoreXP,
  updateStreak,
} from "../../utils/scoreManager"; // ✅ Adjusted path

// ---------- SCENARIOS ----------
export const STORY_SCENARIOS = [
  {
    id: "fr_1",
    right: "Article 14 – Right to Equality",
    title: "The School Suspension",
    story:
      "Listen: Riya, a ninth-grade student, is suspended after an argument with her teacher. But another student who argued more aggressively got away without punishment. What should Riya do?",
    options: [
      "Accept the punishment quietly.",
      "Complain to the school management about unequal treatment.",
      "Start a fight with the teacher.",
    ],
    correct: 1,
    consequences: [
      "If Riya stays quiet, the injustice may continue for others too.",
      "If Riya complains, the school holds an inquiry and justice is restored.",
      "If Riya fights, she faces stricter disciplinary action.",
    ],
    explanation:
      "Article 14 guarantees equality before the law. Selective punishment is a violation of that right.",
  },
  {
    id: "fr_2",
    right: "Article 15 – Prohibition of Discrimination",
    title: "The Shopkeeper Denies Entry",
    story:
      "Arjun walks into a clothing store. The shopkeeper stops him and says, 'People from your caste are not allowed inside.' How should Arjun respond?",
    options: [
      "Calmly warn the shopkeeper about violating Article 15.",
      "Shout and break items in the shop.",
      "Walk away without doing anything.",
    ],
    correct: 0,
    consequences: [
      "Reporting will help stop discrimination and may result in a fine.",
      "Breaking items leads to legal trouble for Arjun.",
      "Walking away lets the discriminatory act continue.",
    ],
    explanation:
      "Article 15 prohibits discrimination based on race, caste, religion, sex or place of birth.",
  },
  {
    id: "fr_3",
    right: "Article 21 – Right to Life & Personal Liberty",
    title: "Police Take Away Phone",
    story:
      "Sameer is traveling when police stop him and demand his phone without explanation. They begin checking his private messages. What should Sameer do?",
    options: [
      "Politely ask for a written order or warrant.",
      "Hand over the phone because they are police.",
      "Start recording and shout at the officers.",
    ],
    correct: 0,
    consequences: [
      "Asking for a warrant protects his privacy and could result in the device being returned.",
      "Handing over the phone without reasons may violate his privacy rights.",
      "Recording angrily could escalate the situation and lead to detention.",
    ],
    explanation:
      "Article 21 covers right to life and personal liberty; privacy is protected and searches require legal justification.",
  },
  {
    id: "fr_4",
    right: "Article 19(1)(a) – Freedom of Speech",
    title: "Newspaper Criticism",
    story:
      "Nisha writes an article criticizing local road conditions. A government officer threatens to remove the article. Should Nisha remove it?",
    options: [
      "Remove the article to avoid trouble.",
      "Stand firm because criticism is her constitutional right.",
      "Write fake news to get back at the officer.",
    ],
    correct: 1,
    consequences: [
      "Removing it may prevent change and keep the problem hidden.",
      "Standing firm can open public discussion and lead to improvements.",
      "Spreading fake news is illegal and harmful.",
    ],
    explanation:
      "Freedom of speech allows truthful criticism of the government; unlawful suppression is not permitted.",
  },
  {
    id: "fr_5",
    right: "Article 16 – Equal Opportunity in Public Jobs",
    title: "Blocked at Job Application",
    story:
      "Rahul goes to apply for a government clerk position. A security guard stops him saying he 'doesn't look rich or educated enough.' What should Rahul do?",
    options: [
      "Complain to the recruitment board about unfair denial.",
      "Bribe the guard to get in.",
      "Give up and return home.",
    ],
    correct: 0,
    consequences: [
      "Complaining ensures fair access and the guard may be disciplined.",
      "Bribing is unlawful and creates more problems.",
      "Giving up means losing a legitimate opportunity.",
    ],
    explanation:
      "Article 16 guarantees equal opportunity in public employment; unfair denial is discriminatory.",
  },
];
// XP → Level
function xpToLevel(xp) {
  return Math.floor(Math.sqrt(xp / 10)) + 1;
}

export default function GameScreen() {
  const router = useRouter();

  // State
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const [score, setScore] = useState(0);
  const [xp, setXp] = useState(0);
  const [achievements, setAchievements] = useState([]);
  const [streak, setStreak] = useState(0);
  const [lastPlayedDate, setLastPlayedDate] = useState(null);

  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [speakOn, setSpeakOn] = useState(true);
  const [avatar, setAvatar] = useState("🙂");

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  // Sounds
  const correctSoundRef = useRef(null);
  const wrongSoundRef = useRef(null);

  // Load & Init
  useEffect(() => {
    (async () => {
      const data = await loadGameProgress();
      if (data) {
        setIndex(data.index ?? 0);
        setScore(data.score ?? 0);
        setXp(data.xp ?? 0);
        setAchievements(data.achievements ?? []);
        setStreak(data.streak ?? 0);
        setLastPlayedDate(data.lastPlayedDate ?? null);
      }

      // Load sounds
      try {
        const c = await Audio.Sound.createAsync(require("./assets/correct.mp3"));
        const w = await Audio.Sound.createAsync(require("./assets/wrong.mp3"));
        correctSoundRef.current = c.sound;
        wrongSoundRef.current = w.sound;
      } catch {}

      // Load voices
      try {
        const available = await Speech.getAvailableVoicesAsync();
        setVoices(available);
        const preferred = available.find((v) =>
          v.language.startsWith("en")
        );
        setSelectedVoice(preferred?.identifier || null);
      } catch {}
    })();
  }, []);

  // Animate + Speak on scenario change
  useEffect(() => {
    animateIn();

    const storyText = STORY_SCENARIOS[index].story;

    if (speakOn) {
      Speech.stop();
      Speech.speak(storyText, {
        language: "en-IN",
        voice: selectedVoice,
      });
    }

    Animated.timing(progressAnim, {
      toValue: index / STORY_SCENARIOS.length,
      duration: 600,
      useNativeDriver: false,
    }).start();
  }, [index, selectedVoice, speakOn]);

  // Animate card in
  const animateIn = () => {
    fadeAnim.setValue(0);
    slideAnim.setValue(30);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Option Selection
  const handleOptionPress = async (i) => {
    if (selected !== null) return;

    setSelected(i);

    const current = STORY_SCENARIOS[index];
    const isCorrect = i === current.correct;

    // Sound
    try {
      if (isCorrect) correctSoundRef.current?.replayAsync();
      else wrongSoundRef.current?.replayAsync();
    } catch {}

    setAvatar(isCorrect ? "😄" : "😕");

    // Score + XP
    const updated = updateScoreXP(score, xp, isCorrect);
    setScore(updated.score);
    setXp(updated.xp);

    // Streak
    const streakResult = updateStreak(lastPlayedDate);
    setStreak(streakResult.streak);
    setLastPlayedDate(streakResult.lastPlayedDate);

    setShowExplanation(true);

    await saveGameProgress({
      index: Math.min(index + 1, STORY_SCENARIOS.length - 1),
      score: updated.score,
      xp: updated.xp,
      achievements,
      streak: streakResult.streak,
      lastPlayedDate: streakResult.lastPlayedDate,
    });
  };

  // Next Scenario
  const handleNext = () => {
    setShowExplanation(false);
    setSelected(null);
    setAvatar("🙂");

    if (index < STORY_SCENARIOS.length - 1) {
      setIndex(index + 1);
    } else {
      router.push("/screens/BadgeScreen");
    }
  };

  // Replay Story
  const playStoryAgain = () => {
    Speech.stop();
    Speech.speak(STORY_SCENARIOS[index].story, {
      language: "en-IN",
      voice: selectedVoice,
    });
  };

  // Explanation TTS
  const speakExplanation = () => {
    const curr = STORY_SCENARIOS[index];
    Speech.stop();
    Speech.speak(curr.explanation + " " + curr.consequences[selected], {
      language: "en-IN",
      voice: selectedVoice,
    });
  };

  // Reset
  const handleReset = async () => {
    await resetGameProgress();

    setIndex(0);
    setScore(0);
    setXp(0);
    setStreak(0);
    setLastPlayedDate(null);
    setSelected(null);
    setShowExplanation(false);
    setAvatar("🙂");
  };

  const current = STORY_SCENARIOS[index];
  const level = xpToLevel(xp);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#FF9933", "#FFFFFF", "#138808"]}
        style={styles.container}
      >
        <ScrollView>

          {/* HEADER */}
          <View style={styles.topRow}>
            <View>
              <Text style={styles.header}>Story Mode — Fundamental Rights</Text>
              <Text style={styles.sub}>
                Scenario {index + 1}/{STORY_SCENARIOS.length}
              </Text>
            </View>

            <View style={styles.rightSide}>
              <TouchableOpacity
                onPress={() => {
                  setSpeakOn(!speakOn);
                  if (speakOn) Speech.stop();
                }}
              >
                <Text style={styles.speakerIcon}>{speakOn ? "🔊" : "🔇"}</Text>
              </TouchableOpacity>

              <View style={styles.avatarBox}>
                <Text style={styles.avatarText}>{avatar}</Text>
              </View>
            </View>
          </View>

          {/* PROGRESS */}
          <View style={styles.progressWrap}>
            <Animated.View
              style={[
                styles.progressBar,
                {
                  width: progressAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 300],
                  }),
                },
              ]}
            />
            <Text style={styles.progressLabel}>
              {Math.round((index / STORY_SCENARIOS.length) * 100)}%
            </Text>
          </View>

          {/* CARD */}
          <Animated.View
            style={[
              styles.card,
              { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
            ]}
          >
            <Text style={styles.title}>{current.title}</Text>
            <Text style={styles.rightText}>{current.right}</Text>
            <Text style={styles.story}>{current.story}</Text>

            {current.options.map((opt, i) => {
              const selectedStyle =
                selected !== null
                  ? i === current.correct
                    ? styles.correct
                    : selected === i
                    ? styles.wrong
                    : {}
                  : {};

              return (
                <TouchableOpacity
                  key={i}
                  style={[styles.option, selectedStyle]}
                  onPress={() => handleOptionPress(i)}
                  disabled={selected !== null}
                >
                  <Text style={styles.optionText}>{opt}</Text>
                </TouchableOpacity>
              );
            })}

            {showExplanation && (
              <View style={styles.expBox}>
                <Text style={styles.expTitle}>Explanation</Text>
                <Text style={styles.expText}>{current.explanation}</Text>

                <Text style={styles.smallLabel}>Consequence</Text>
                <Text style={styles.expText}>
                  {current.consequences[selected]}
                </Text>

                <View style={styles.expRow}>
                  <TouchableOpacity style={styles.smallBtn} onPress={playStoryAgain}>
                    <Text>Replay Story</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.smallBtn} onPress={speakExplanation}>
                    <Text>Speak Explanation</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Animated.View>

          {/* FOOTER */}
          <View style={styles.footer}>
            <Text style={styles.score}>Score: {score}</Text>

            <View style={styles.footerRow}>
              <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
                <Text>Reset Progress</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
                <Text style={styles.nextText}>
                  {index < STORY_SCENARIOS.length - 1 ? "Next" : "Finish"}
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.learningText}>
              XP: {xp} • Level: {level} • Streak: {streak}d
            </Text>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    marginTop: 16,
  },
  header: { fontSize: 20, fontWeight: "900" },
  sub: { color: "#475569", marginTop: 4 },
  rightSide: { flexDirection: "row", alignItems: "center" },
  speakerIcon: { fontSize: 22, marginRight: 12 },
  avatarBox: {
    width: 46,
    height: 46,
    backgroundColor: "#fff",
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { fontSize: 26 },

  progressWrap: {
    flexDirection: "row",
    paddingHorizontal: 16,
    alignItems: "center",
    marginBottom: 10,
  },
  progressBar: {
    height: 8,
    backgroundColor: "#10B981",
    borderRadius: 6,
  },
  progressLabel: { marginLeft: 8, fontWeight: "600" },

  card: {
    backgroundColor: "#fff",
    margin: 16,
    padding: 16,
    borderRadius: 14,
    elevation: 3,
  },
  title: { fontSize: 18, fontWeight: "700" },
  rightText: { fontSize: 12, color: "#64748B", marginBottom: 6 },
  story: { marginBottom: 12, lineHeight: 22 },

  option: {
    backgroundColor: "#F1F5F9",
    padding: 12,
    borderRadius: 10,
    marginVertical: 6,
  },
  correct: { backgroundColor: "#DCFCE7" },
  wrong: { backgroundColor: "#FEE2E2" },
  optionText: { color: "#0F172A" },

  expBox: {
    marginTop: 14,
    backgroundColor: "#E2E8F0",
    padding: 12,
    borderRadius: 10,
  },
  expTitle: { fontWeight: "700" },
  expText: { marginTop: 6, lineHeight: 20 },
  smallLabel: { marginTop: 6, fontSize: 12, color: "#64748B" },
  expRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  smallBtn: {
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 8,
  },

  footer: { paddingHorizontal: 16, marginBottom: 40 },
  score: { fontWeight: "700", marginBottom: 8 },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  resetBtn: {
    backgroundColor: "#CBD5E1",
    padding: 12,
    borderRadius: 10,
  },
  nextBtn: {
    backgroundColor: "#10B981",
    padding: 12,
    borderRadius: 10,
  },
  nextText: { color: "white", fontWeight: "700" },
  learningText: { textAlign: "center", fontWeight: "700", marginTop: 6 },
});
