import { useEffect, useState } from 'react';
import { Alert, Button, FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// Simple single-file React Native app implementing the requested screens.
// Designed for Expo / React Native environment as `index.js` (or you can
// rename to `App.js` if your project uses that entry).

const SAMPLE_EXERCISES = [
  {
    id: '1',
    name: 'Push Ups',
    description: 'A bodyweight exercise that works chest, shoulders and triceps.',
    image: 'https://images.unsplash.com/photo-1594737625785-7f9a8a1a1b3e?w=800',
    completed: false,
  },
  {
    id: '2',
    name: 'Squats',
    description: 'A lower-body exercise targeting quads, glutes and hamstrings.',
    image: 'https://images.unsplash.com/photo-1558611848-73f7eb4001d5?w=800',
    completed: false,
  },
  {
    id: '3',
    name: 'Plank',
    description: 'Core-strengthening isometric hold for abs and lower back.',
    image: 'https://images.unsplash.com/photo-1594737625779-4b7b3f2c4f1e?w=800',
    completed: false,
  },
  {
    id: '4',
    name: 'Lunges',
    description: 'Single-leg movement to build balance and leg strength.',
    image: 'https://images.unsplash.com/photo-1558611847-3ac8c8a7b3f2?w=800',
    completed: false,
  },
  {
    id: '5',
    name: 'Burpees',
    description: 'Full-body cardio move that builds strength and endurance.',
    image: 'https://images.unsplash.com/photo-1554284126-aa88f22d8d15?w=800',
    completed: false,
  },
  {
    id: '6',
    name: 'Jumping Jacks',
    description: 'Simple cardio exercise to raise heart rate and warm up.',
    image: 'https://images.unsplash.com/photo-1526403224746-3d6f3b8b4e22?w=800',
    completed: false,
  },
];

export default function App() {
  const [screen, setScreen] = useState('home'); // home | detail | add | completed | quotes
  const [exercises, setExercises] = useState(SAMPLE_EXERCISES);
  const [selected, setSelected] = useState(null);

  // Add-exercise form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  // Quotes
  const [quote, setQuote] = useState(null);
  const [loadingQuote, setLoadingQuote] = useState(false);

  useEffect(() => {
    if (screen === 'quotes') fetchQuote();
  }, [screen]);

  function openDetail(item) {
    setSelected(item);
    setScreen('detail');
  }

  function addExercise() {
    if (!name.trim()) {
      Alert.alert('Validation', 'Please enter a name for the exercise.');
      return;
    }
    const id = Date.now().toString();
    const newEx = { id, name: name.trim(), description: description.trim() || 'No description', image: image || 'https://images.unsplash.com/photo-1517964107933-3f7d0f6b86df?w=800', completed: false };
    setExercises(prev => [newEx, ...prev]);
    setName('');
    setDescription('');
    setImage('');
    setScreen('home');
  }

  function toggleCompleted(id) {
    setExercises(prev => prev.map(e => e.id === id ? { ...e, completed: !e.completed } : e));
  }

  async function fetchQuote() {
    setLoadingQuote(true);
    try {
      const res = await fetch('https://api.quotable.io/random');
      const data = await res.json();
      setQuote(data);
    } catch (err) {
      setQuote({ content: 'Keep going — consistency builds results.', author: 'Coach' });
    } finally {
      setLoadingQuote(false);
    }
  }

  function renderHome() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Exercises</Text>
        <FlatList
          data={exercises}
          keyExtractor={i => i.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => openDetail(item)}>
              <Image source={{ uri: item.image }} style={styles.thumb} />
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text numberOfLines={2} style={styles.cardSub}>{item.description}</Text>
                <View style={{ flexDirection: 'row', marginTop: 6 }}>
                  <Button title={item.completed ? 'Completed' : 'Mark Complete'} onPress={() => toggleCompleted(item.id)} />
                </View>
              </View>
            </TouchableOpacity>
          )}
        />

        <View style={styles.footerRow}>
          <Button title="Add Exercise" onPress={() => setScreen('add')} />
          <Button title="Completed" onPress={() => setScreen('completed')} />
          <Button title="Quotes" onPress={() => setScreen('quotes')} />
        </View>
      </SafeAreaView>
    );
  }

  function renderDetail() {
    if (!selected) return <Text>No exercise selected</Text>;
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Image source={{ uri: selected.image }} style={styles.detailImage} />
          <Text style={styles.title}>{selected.name}</Text>
          <Text style={styles.description}>{selected.description}</Text>
          <View style={{ marginTop: 12 }}>
            <Button title={selected.completed ? 'Mark as not completed' : 'Mark as completed'} onPress={() => { toggleCompleted(selected.id); setSelected(prev => ({ ...prev, completed: !prev.completed })); }} />
          </View>
          <View style={{ height: 12 }} />
          <Button title="Back" onPress={() => setScreen('home')} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  function renderAdd() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Add Exercise</Text>
        <ScrollView>
          <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
          <TextInput placeholder="Description" value={description} onChangeText={setDescription} style={[styles.input, { height: 100 }]} multiline />
          <TextInput placeholder="Image URL (optional)" value={image} onChangeText={setImage} style={styles.input} />
          <View style={{ marginTop: 8 }}>
            <Button title="Save" onPress={addExercise} />
          </View>
          <View style={{ height: 8 }} />
          <Button title="Cancel" onPress={() => setScreen('home')} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  function renderCompleted() {
    const completed = exercises.filter(e => e.completed);
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Completed Exercises</Text>
        {completed.length === 0 ? <Text style={{ padding: 12 }}>No completed exercises yet.</Text> : (
          <FlatList data={completed} keyExtractor={i => i.id} renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.thumb} />
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text numberOfLines={2} style={styles.cardSub}>{item.description}</Text>
              </View>
            </View>
          )} />
        )}
        <View style={{ marginTop: 8 }}>
          <Button title="Back" onPress={() => setScreen('home')} />
        </View>
      </SafeAreaView>
    );
  }

  function renderQuotes() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Motivational Quote</Text>
        {loadingQuote ? <Text style={{ padding: 12 }}>Loading...</Text> : quote ? (
          <View style={{ padding: 16 }}>
            <Text style={{ fontStyle: 'italic', fontSize: 18 }}>"{quote.content}"</Text>
            <Text style={{ marginTop: 8, textAlign: 'right', fontWeight: '600' }}>— {quote.author || 'Unknown'}</Text>
          </View>
        ) : (
          <Text style={{ padding: 12 }}>No quote available.</Text>
        )}
        <View style={{ marginTop: 12 }}>
          <Button title="New Quote" onPress={fetchQuote} />
        </View>
        <View style={{ marginTop: 8 }}>
          <Button title="Back" onPress={() => setScreen('home')} />
        </View>
      </SafeAreaView>
    );
  }

  if (screen === 'home') return renderHome();
  if (screen === 'detail') return renderDetail();
  if (screen === 'add') return renderAdd();
  if (screen === 'completed') return renderCompleted();
  if (screen === 'quotes') return renderQuotes();

  return (
    <SafeAreaView style={styles.container}><Text>Unknown screen</Text></SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: '700', padding: 12 },
  card: { flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderColor: '#eee', alignItems: 'center' },
  thumb: { width: 90, height: 60, borderRadius: 6, marginRight: 8 },
  cardTitle: { fontSize: 16, fontWeight: '600' },
  cardSub: { color: '#444', marginTop: 4 },
  footerRow: { flexDirection: 'row', justifyContent: 'space-around', padding: 12 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 8, margin: 8, borderRadius: 6 },
  detailImage: { width: '100%', height: 240, resizeMode: 'cover' },
  description: { padding: 12, fontSize: 16, color: '#333' },
});
