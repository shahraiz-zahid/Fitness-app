import { useRouter } from 'expo-router';
import React, { useContext } from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ExercisesContext } from './_layout';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const COLORS = ['#e8f5e9', '#c8e6c9', '#a5d6a7', '#81c784', '#66bb6a', '#4caf50', '#43a047'];

export default function Stats() {
  const router = useRouter();
  const ctx = useContext(ExercisesContext);

  if (!ctx) return null;

  const { exercises } = ctx;
  const completed = exercises.filter(e => e.completed).length;
  const total = exercises.length;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  // Simulated weekly data (in real app, fetch from AsyncStorage with dates)
  const weeklyActivity = [
    { day: 'Mon', count: 3, color: COLORS[0] },
    { day: 'Tue', count: 4, color: COLORS[1] },
    { day: 'Wed', count: 2, color: COLORS[2] },
    { day: 'Thu', count: 5, color: COLORS[3] },
    { day: 'Fri', count: 3, color: COLORS[4] },
    { day: 'Sat', count: 6, color: COLORS[5] },
    { day: 'Sun', count: 1, color: COLORS[6] },
  ];

  const currentStreak = 5; // Example streak
  const longestStreak = 12; // Example longest streak

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Workout Stats</Text>

      {/* Completion Rate Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Overall Progress</Text>
        <View style={styles.progressContainer}>
          <View style={styles.progressCircle}>
            <Text style={styles.progressText}>{completionRate}%</Text>
          </View>
          <View style={{ marginLeft: 20 }}>
            <Text style={styles.statLabel}>Completed: {completed}/{total}</Text>
            <Text style={styles.statSubLabel}>exercises</Text>
          </View>
        </View>
      </View>

      {/* Streak Cards */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 12, marginVertical: 8 }}>
        <View style={[styles.streakCard, { backgroundColor: '#fff3e0' }]}>
          <Text style={styles.streakLabel}>Current Streak</Text>
          <Text style={styles.streakNumber}>{currentStreak}</Text>
          <Text style={styles.streakUnit}>days</Text>
        </View>
        <View style={[styles.streakCard, { backgroundColor: '#f3e5f5' }]}>
          <Text style={styles.streakLabel}>Longest Streak</Text>
          <Text style={styles.streakNumber}>{longestStreak}</Text>
          <Text style={styles.streakUnit}>days</Text>
        </View>
      </View>

      {/* Weekly Activity */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>This Week</Text>
        <View style={styles.weekContainer}>
          {weeklyActivity.map((day, idx) => (
            <View key={idx} style={styles.dayColumn}>
              <View style={[styles.dayBar, { height: day.count * 15, backgroundColor: day.color }]} />
              <Text style={styles.dayLabel}>{day.day}</Text>
              <Text style={styles.dayCount}>{day.count}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Tips Section */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>💡 Quick Tips</Text>
        <Text style={styles.tipText}>• Aim for 5-6 workouts per week</Text>
        <Text style={styles.tipText}>• Keep your streak going!</Text>
        <Text style={styles.tipText}>• Mix cardio and strength training</Text>
      </View>

      <View style={{ marginTop: 16 }}>
        <Button title="Back to Home" onPress={() => router.push('/')} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa', paddingVertical: 12 },
  title: { fontSize: 28, fontWeight: '700', padding: 16, color: '#1a1a1a' },
  card: { backgroundColor: '#fff', marginHorizontal: 12, marginVertical: 8, padding: 16, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4 },
  cardTitle: { fontSize: 18, fontWeight: '600', marginBottom: 12, color: '#333' },
  progressContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  progressCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#e3f2fd', justifyContent: 'center', alignItems: 'center', borderWidth: 4, borderColor: '#2196f3' },
  progressText: { fontSize: 28, fontWeight: '700', color: '#2196f3' },
  statLabel: { fontSize: 16, fontWeight: '600', color: '#333' },
  statSubLabel: { fontSize: 14, color: '#888', marginTop: 4 },
  streakCard: { flex: 1, marginHorizontal: 6, padding: 16, borderRadius: 10, alignItems: 'center' },
  streakLabel: { fontSize: 14, fontWeight: '500', color: '#666' },
  streakNumber: { fontSize: 36, fontWeight: '700', color: '#ff6f00', marginVertical: 4 },
  streakUnit: { fontSize: 12, color: '#999' },
  weekContainer: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end', height: 140 },
  dayColumn: { alignItems: 'center', flex: 1 },
  dayBar: { width: 20, borderRadius: 4, marginBottom: 8 },
  dayLabel: { fontSize: 12, fontWeight: '600', color: '#333' },
  dayCount: { fontSize: 11, color: '#999', marginTop: 2 },
  tipText: { fontSize: 14, color: '#555', marginVertical: 6, lineHeight: 20 },
});
