import { TextInput, TextInputProps, StyleSheet, View } from 'react-native';
import { ThemedText } from './ThemedText';

interface ThemedInputProps extends TextInputProps {
  label: string;
  error?: string;
}

export function ThemedInput({ label, error, style, ...props }: ThemedInputProps) {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.label}>{label}</ThemedText>
      <TextInput 
        style={[styles.input, error && styles.inputError, style]}
        placeholderTextColor="#666"
        {...props}
      />
      {error && <ThemedText style={styles.errorText}>{error}</ThemedText>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  inputError: {
    borderColor: '#ff4444',
  },
  errorText: {
    color: '#ff4444',
    fontSize: 12,
  },
}); 