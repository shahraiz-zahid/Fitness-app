import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function Splash() {
  const router = useRouter();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Animate logo entrance
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate to home after 3 seconds
    const timer = setTimeout(() => {
      router.replace('/');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* Background Gradient Effect */}
      <View style={styles.gradientBg} />

      {/* Logo and Text Container */}
      <Animated.View
        style={[
          styles.contentContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Fitness Icon */}
        <View style={styles.logoCircle}>
          <Text style={styles.logoIcon}>💪</Text>
        </View>

        {/* App Name */}
        <Text style={styles.appName}>FitFlow</Text>
        <Text style={styles.tagline}>Your Personal Fitness Companion</Text>
      </Animated.View>

      {/* Loading Dots */}
      <View style={styles.loaderContainer}>
        <View style={[styles.dot, { backgroundColor: '#ff6b6b' }]} />
        <View style={[styles.dot, { backgroundColor: '#4ecdc4', marginHorizontal: 6 }]} />
        <View style={[styles.dot, { backgroundColor: '#45b7d1' }]} />
      </View>

      {/* Footer Text */}
      <Text style={styles.footerText}>Powered by Fitness App</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientBg: {
    position: 'absolute',
    width: width * 1.5,
    height: height * 1.5,
    borderRadius: 9999,
    backgroundColor: 'rgba(69, 183, 209, 0.1)',
    top: -height * 0.4,
    left: -width * 0.2,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f0f4ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 3,
    borderColor: '#45b7d1',
  },
  logoIcon: {
    fontSize: 60,
  },
  appName: {
    fontSize: 42,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 16,
    color: '#888',
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 60,
  },
  loaderContainer: {
    position: 'absolute',
    bottom: 140,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  footerText: {
    position: 'absolute',
    bottom: 40,
    fontSize: 12,
    color: '#ccc',
    fontWeight: '500',
  },
});
