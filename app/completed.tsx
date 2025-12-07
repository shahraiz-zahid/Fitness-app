import React, { useContext } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { ExercisesContext } from './_layout';

const PALETTE = ['#f9f7f3', '#f3fbff', '#f7fff1', '#fff7f3', '#f9f3ff', '#fffdf0'];

export default function Completed() {
  const ctx = useContext(ExercisesContext);
  const router = useRouter();

  if (!ctx) return null;

  const { exercises, toggleCompleted } = ctx;
  const completed = exercises.filter(e => e.completed);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Completed Exercises</Text>
      {completed.length === 0 ? (
        <Text style={{ padding: 12 }}>No completed exercises yet.</Text>
      ) : (
        <View style={styles.listContainer}>
          {completed.map((item, index) => (
            <View key={item.id} style={[styles.cardHorizontal, { backgroundColor: PALETTE[index % PALETTE.length] }]}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text numberOfLines={3} style={styles.cardSub}>{item.description}</Text>
              <View style={{ marginTop: 8 }}>
                <Button title="Unmark" onPress={() => toggleCompleted(item.id)} />
              </View>
            </View>
          ))}
        </View>
      )}

      <View style={{ marginTop: 12 }}>
        <Button title="Back" onPress={() => router.push('/')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: '700', padding: 12 },
  listContainer: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 8, paddingVertical: 8 },
  cardHorizontal: { width: '48%', marginHorizontal: '1%', marginTop: 8, padding: 12, borderRadius: 8, justifyContent: 'flex-start' },
  cardTitle: { fontSize: 16, fontWeight: '600', marginBottom: 6 },
  cardSub: { color: '#555', fontSize: 13 },
});
