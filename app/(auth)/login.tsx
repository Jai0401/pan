import { StyleSheet } from 'react-native';
import { Link, router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedButton } from '@/components/ThemedButton';
import { ThemedInput } from '@/components/ThemedInput';

export default function LoginScreen() {
  const handleLogin = () => {
    router.push('/(tabs)');
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Login</ThemedText>
      
      <ThemedInput
        label="PAN Number"
        placeholder="Enter PAN Number"
      />
      
      <ThemedInput
        label="Password"
        placeholder="Enter Password"
        secureTextEntry
      />

      <ThemedButton
        title="Login"
        onPress={handleLogin}
        style={styles.button}
      />

      <Link href="/(auth)/register" asChild>
        <ThemedText style={styles.registerLink}>
          Don't have an account? Register here
        </ThemedText>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
    justifyContent: 'center',
  },
  button: {
    marginTop: 16,
  },
  registerLink: {
    textAlign: 'center',
    marginTop: 16,
    textDecorationLine: 'underline',
  },
}); 