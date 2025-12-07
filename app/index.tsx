import { useRouter } from 'expo-router';
import React, { useContext, useMemo, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ExercisesContext } from './_layout';

const PALETTE = ['#f9f7f3', '#f3fbff', '#f7fff1', '#fff7f3', '#f9f3ff', '#fffdf0'];

export default function Index() {
  const router = useRouter();
  const ctx = useContext(ExercisesContext);

  if (!ctx) return null;

  const { exercises } = ctx;
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return exercises;
    return exercises.filter(e => e.name.toLowerCase().includes(q) || e.description.toLowerCase().includes(q));
  }, [exercises, query]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Exercises</Text>

      <View style={styles.searchRow}>
        <TextInput placeholder="Search exercises..." value={query} onChangeText={setQuery} style={styles.searchInput} />
        <Button title="Clear" onPress={() => setQuery('')} />
      </View>

      <View style={styles.listContainer}>
        {filtered.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.cardHorizontal, { backgroundColor: PALETTE[index % PALETTE.length] }]}
            onPress={() => router.push({ pathname: '/detail', params: { id: item.id } })}
          >
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text numberOfLines={3} style={styles.cardSub}>{item.description}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footerRow}>
        <Button title="Add Exercise" onPress={() => router.push('/add')} />
        <Button title="Completed" onPress={() => router.push('/completed')} />
        <Button title="Stats" onPress={() => router.push('/stats')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: '700', padding: 12, color: '#222' },
  listContainer: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 8, paddingVertical: 8 },
  cardHorizontal: { width: '48%', marginHorizontal: '1%', marginTop: 8, padding: 12, borderRadius: 8, justifyContent: 'flex-start' },
  cardTitle: { fontSize: 16, fontWeight: '600', marginBottom: 6 },
  cardSub: { color: '#555', fontSize: 13 },
  footerRow: { flexDirection: 'row', justifyContent: 'space-around', padding: 12 },
  searchRow: { flexDirection: 'row', paddingHorizontal: 12, alignItems: 'center', marginBottom: 8 },
  searchInput: { flex: 1, borderWidth: 1, borderColor: '#ddd', padding: 8, borderRadius: 6, marginRight: 8 },
});

