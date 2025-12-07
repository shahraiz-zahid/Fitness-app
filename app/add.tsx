import { useRouter } from 'expo-router';
import React, { useContext, useState } from 'react';
import { Alert, Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { ExercisesContext } from './_layout';

export default function Add() {
  const ctx = useContext(ExercisesContext);
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  if (!ctx) return null;

  const { addExercise } = ctx;

  function onSave() {
    if (!name.trim()) {
      Alert.alert('Validation', 'Please provide a name');
      return;
    }
    const newItem = {
      id: Date.now().toString(),
      name: name.trim(),
      description: description.trim() || 'No description',
      image: image || 'https://images.unsplash.com/photo-1517964107933-3f7d0f6b86df?w=800',
      completed: false,
    };
    addExercise(newItem);
    router.push('/');
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 24 }}>
      <Text style={styles.title}>Add Exercise</Text>
      <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Description" value={description} onChangeText={setDescription} style={[styles.input, { height: 100 }]} multiline />
      <TextInput placeholder="Image URL (optional)" value={image} onChangeText={setImage} style={styles.input} />
      <View style={{ marginTop: 8 }}>
        <Button title="Save" onPress={onSave} />
      </View>
      <View style={{ height: 8 }} />
      <Button title="Cancel" onPress={() => router.push('/')} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: '700', padding: 12 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 8, margin: 8, borderRadius: 6 },
});
