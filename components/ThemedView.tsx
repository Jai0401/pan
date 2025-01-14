import { View, ViewProps, StyleSheet } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import Colors from '@/constants/Colors';

interface ThemedViewProps extends ViewProps {}

export function ThemedView({ style, ...props }: ThemedViewProps) {
  const colorScheme = useColorScheme();
  const backgroundColor = Colors[colorScheme].background;

  return <View style={[{ backgroundColor }, style]} {...props} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
