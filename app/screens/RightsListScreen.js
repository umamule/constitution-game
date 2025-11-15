import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Animated, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Card from '../../components/Card';
import { RIGHTS_DATA } from '../../data/rightsData';

export default function RightsListScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const renderShimmerItem = () => (
    <View style={styles.shimmerCard}>
      <View style={styles.shimmerIcon} />
      <View style={styles.shimmerText}>
        <View style={styles.shimmerLine} />
        <View style={[styles.shimmerLine, { width: '60%' }]} />
      </View>
    </View>
  );

  const renderRightItem = ({ item, index }) => (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{
          translateY: fadeAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [20, 0],
          }),
        }],
      }}
    >
      <Card
        title={item.title}
        subtitle={`Articles ${item.articles}\n${item.short}`}
        icon={item.icon}
        onPress={() => router.push({ pathname: '/screens/RightDetailScreen', params: { id: item.id } })}
      />
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fundamental Rights</Text>
      {isLoading ? (
        <FlatList
          data={Array(6).fill({})} // 6 shimmer items
          keyExtractor={(item, index) => `shimmer-${index}`}
          renderItem={renderShimmerItem}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <FlatList
          data={RIGHTS_DATA}
          keyExtractor={(item) => item.id}
          renderItem={renderRightItem}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => router.push('/screens/DeepDiveScreen')}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f4f7fb',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A', // Navy
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  listContainer: {
    paddingBottom: 100,
  },
  shimmerCard: {
    backgroundColor: '#E0E0E0',
    borderRadius: 16,
    padding: 20,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  shimmerIcon: {
    width: 32,
    height: 32,
    backgroundColor: '#C0C0C0',
    borderRadius: 16,
    marginRight: 16,
  },
  shimmerText: {
    flex: 1,
  },
  shimmerLine: {
    height: 16,
    backgroundColor: '#C0C0C0',
    borderRadius: 8,
    marginBottom: 8,
    width: '80%',
  },
  nextButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
