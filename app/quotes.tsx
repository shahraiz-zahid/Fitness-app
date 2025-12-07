import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

export default function Quotes() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function fetchQuote() {
    setLoading(true);
    try {
      const res = await fetch('https://api.quotable.io/random');
      const data = await res.json();
      setQuote(data);
    } catch (err) {
      setQuote({ content: 'Keep going — consistency builds results.', author: 'Coach' });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchQuote(); }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Motivational Quote</Text>
      {loading ? <ActivityIndicator /> : (
        quote ? (
          <View style={{ padding: 16 }}>
            <Text style={{ fontStyle: 'italic', fontSize: 18 }}>&quot;{quote.content}&quot;</Text>
            <Text style={{ marginTop: 8, textAlign: 'right', fontWeight: '600' }}>— {quote.author || 'Unknown'}</Text>
          </View>
        ) : (
          <Text style={{ padding: 12 }}>No quote available.</Text>
        )
      )}

      <View style={{ marginTop: 12 }}>
        <Button title="New Quote" onPress={fetchQuote} />
      </View>
      <View style={{ marginTop: 8 }}>
        <Button title="Back" onPress={() => router.push('/')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: '700', padding: 12 },
});
