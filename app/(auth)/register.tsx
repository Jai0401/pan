import { useState } from 'react';
import { StyleSheet, Alert, ScrollView } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { Link, router } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedButton } from '@/components/ThemedButton';
import { ThemedInput } from '@/components/ThemedInput';

interface FormData {
  panNumber: string;
  name: string;
  password: string;
  email: string;
  mobile: string;
  address: string;
}

export default function RegisterScreen() {
  const [scanMode, setScanMode] = useState<'camera' | 'upload'>('camera');
  const [panImage, setPanImage] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    panNumber: '',
    name: '',
    password: '',
    email: '',
    mobile: '',
    address: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const handleScanPan = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Camera permission is needed to scan PAN card');
      return;
    }
    //simulate PAN data extraction
    simulatePanExtraction();
  };

  const handleUploadPan = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPanImage(result.assets[0].uri);
      // Simulate PAN data extraction
      simulatePanExtraction();
    }
  };

  const simulatePanExtraction = () => {
    // Simulate extracting PAN details
    setFormData(prev => ({
      ...prev,
      panNumber: 'ABCDE1234F',
      name: 'John Doe',
    }));
    Alert.alert('Success', 'PAN details extracted successfully');
  };

  const validateForm = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.panNumber) {
      newErrors.panNumber = 'PAN number is required';
    }
    if (!formData.name) {
      newErrors.name = 'Name is required';
    }
    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (formData.mobile && !/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Enter valid 10-digit mobile number';
    }
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Enter valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = () => {
    if (validateForm()) {
      Alert.alert(
        'Registration Successful',
        'You have been registered successfully!',
        [
          {
            text: 'OK',
            onPress: () => router.push('/(auth)/login'),
          },
        ]
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.content}>
        <ThemedText type="title">Register</ThemedText>
        
        <ThemedView style={styles.panSection}>
          <ThemedText type="subtitle">PAN Card Verification</ThemedText>
          <ThemedView style={styles.scanOptions}>
            <ThemedButton
              onPress={() => setScanMode('camera')}
              title="Scan PAN"
              variant={scanMode === 'camera' ? 'primary' : 'secondary'}
            />
            <ThemedButton
              onPress={() => setScanMode('upload')}
              title="Upload PAN"
              variant={scanMode === 'upload' ? 'primary' : 'secondary'}
            />
          </ThemedView>

          {scanMode === 'camera' ? (
            <ThemedButton onPress={handleScanPan} title="Open Camera" />
          ) : (
            <ThemedButton onPress={handleUploadPan} title="Choose File" />
          )}
        </ThemedView>

        <ThemedInput
          label="PAN Number"
          value={formData.panNumber}
          onChangeText={(text) => setFormData({ ...formData, panNumber: text })}
          error={errors.panNumber}
          editable={false}
        />

        <ThemedInput
          label="Name"
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
          error={errors.name}
          editable={false}
        />

        <ThemedInput
          label="Password"
          value={formData.password}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
          secureTextEntry
          error={errors.password}
        />

        <ThemedInput
          label="Mobile (Optional)"
          value={formData.mobile}
          onChangeText={(text) => setFormData({ ...formData, mobile: text })}
          keyboardType="phone-pad"
          error={errors.mobile}
        />

        <ThemedInput
          label="Email (Optional)"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          keyboardType="email-address"
          error={errors.email}
        />

        <ThemedInput
          label="Address (Optional)"
          value={formData.address}
          onChangeText={(text) => setFormData({ ...formData, address: text })}
          multiline
          error={errors.address}
        />

        <ThemedButton
          onPress={handleRegister}
          title="Register"
          style={styles.registerButton}
        />

        <Link href="/(auth)/login" asChild>
          <ThemedText style={styles.loginLink}>
            Already have an account? Login here
          </ThemedText>
        </Link>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    gap: 16,
  },
  panSection: {
    gap: 8,
  },
  scanOptions: {
    flexDirection: 'row',
    gap: 8,
  },
  registerButton: {
    marginTop: 16,
  },
  loginLink: {
    textAlign: 'center',
    marginTop: 16,
    textDecorationLine: 'underline',
  },
}); 