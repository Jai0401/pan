import { Pressable, StyleSheet, PressableProps, ViewStyle } from 'react-native';
import { ThemedText } from './ThemedText';

interface ThemedButtonProps extends PressableProps {
  title: string;
  variant?: 'primary' | 'secondary';
  style?: ViewStyle | ((state: { pressed: boolean }) => ViewStyle);
}

export function ThemedButton({ title, variant = 'primary', style, ...props }: ThemedButtonProps) {
  return (
    <Pressable 
      style={({ pressed }) => [
        styles.button,
        variant === 'secondary' ? styles.buttonSecondary : undefined,
        style instanceof Function ? style({ pressed }) : style,
      ]}
      {...props}
    >
      <ThemedText style={[styles.text, variant === 'secondary' ? styles.textSecondary : undefined]}>
        {title}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#2196F3',
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  textSecondary: {
    color: '#2196F3',
  },
}); 