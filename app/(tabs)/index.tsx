import { StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedButton } from '@/components/ThemedButton';

export default function LandingScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Welcome</ThemedText>
      <ThemedText style={styles.subtitle}>
        Register with your PAN card to get started
      </ThemedText>
      <ThemedButton
        title="Register Now"
        onPress={() => router.push('/(auth)/register')}
        style={styles.button}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 32,
    marginBottom: 16,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 32,
  },
  button: {
    width: '100%',
    maxWidth: 300,
  },
}); 