import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function Detail() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.emoji}>💪</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title}>Exercise Details</Text>
        <Text style={styles.description}>Learn proper form and technique for maximum results.</Text>
        
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>✓ Duration: 15-20 minutes</Text>
          <Text style={styles.infoText}>✓ Difficulty: Intermediate</Text>
          <Text style={styles.infoText}>✓ Equipment: Bodyweight</Text>
        </View>

        <View style={styles.tipsBox}>
          <Text style={styles.tipsTitle}>💡 Tips:</Text>
          <Text style={styles.tipText}>• Keep your form proper</Text>
          <Text style={styles.tipText}>• Breathe steadily</Text>
          <Text style={styles.tipText}>• Rest between sets</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.backButton} onPress={() => router.push('/')}>
        <Text style={styles.backButtonText}>← Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16, justifyContent: 'space-between' },
  header: { height: 120, justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  emoji: { fontSize: 60 },
  content: { flex: 1 },
  title: { fontSize: 24, fontWeight: '700', color: '#1a1a1a', marginBottom: 8 },
  description: { fontSize: 14, color: '#666', lineHeight: 20, marginBottom: 16 },
  infoBox: { backgroundColor: '#f5f5f5', padding: 12, borderRadius: 8, marginBottom: 16 },
  infoText: { fontSize: 14, color: '#333', marginVertical: 4 },
  tipsBox: { backgroundColor: '#fffaf0', padding: 12, borderRadius: 8, marginBottom: 16 },
  tipsTitle: { fontSize: 14, fontWeight: '600', color: '#ff6b6b', marginBottom: 6 },
  tipText: { fontSize: 13, color: '#555', marginVertical: 3 },
  backButton: { backgroundColor: '#45b7d1', paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  backButtonText: { fontSize: 16, fontWeight: '600', color: '#fff' },
});
