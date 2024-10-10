import { Stack, router } from "expo-router";
import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, TextInput, StyleSheet, SafeAreaView } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';
import { StatusBar } from "expo-status-bar";

export default function AuthenticationScreen() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasBiometricSupport, setHasBiometricSupport] = useState(false);
  const [passkey, setPasskey] = useState('');
  const [inputPasskey, setInputPasskey] = useState('');

  useEffect(() => {
    checkBiometricSupport();
  }, []);

  // Check if the device supports biometric authentication
  const checkBiometricSupport = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    const enrolled = await LocalAuthentication.isEnrolledAsync();
    setHasBiometricSupport(compatible && enrolled);
  };

  // Authenticate using Face ID or Touch ID
  const handleBiometricAuth = async () => {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate with Face ID or Touch ID',
      fallbackLabel: 'Use Passkey',
    });

    if (result.success) {
      Alert.alert('Authenticated successfully!');
      setIsAuthenticated(true);
    } else {
      Alert.alert('Authentication failed. You can use your passkey instead.');
    }
  };

  // Handle passkey submission
  const handlePasskeyAuth = async () => {
    const savedPasskey = await SecureStore.getItemAsync('userPasskey');
    if (savedPasskey === inputPasskey) {
      Alert.alert('Passkey authenticated successfully!');
      setIsAuthenticated(true);
    } else {
      Alert.alert('Incorrect passkey. Please try again.');
    }
  };

  // Save passkey securely (e.g., during registration)
  const savePasskey = async () => {
    if (passkey) {
      await SecureStore.setItemAsync('userPasskey', passkey);
      Alert.alert('Passkey saved securely!');
    }
  };

  // Logout function to "unauthenticate" the user
  const logout = () => {
    setIsAuthenticated(false);
    setInputPasskey('');
    Alert.alert('You have been logged out.');
  };

  // Clear the stored passkey
  const clearPasskey = async () => {
    await SecureStore.deleteItemAsync('userPasskey');
    Alert.alert('Passkey cleared successfully!');
  };

  return (
    <SafeAreaView style={styles.page}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="light" />
      
      <View style={styles.container}>
        {isAuthenticated ? (
          <>
          <Text style={styles.welcomeText}>Welcome! You are authenticated.</Text>
          <Button title="Logout" onPress={logout} />
          <Button title="Clear Passkey" onPress={clearPasskey} color="#f44336" />
          <Button title="Home" onPress={() => { router.push('/(tabs)'); } } />
        </>
        ) : (
          <>
            <Text style={styles.titleText}>Login</Text>

            {/* If biometric support is available, offer Face ID / Touch ID option */}
            {hasBiometricSupport && (
              <Button title="Login with Face ID / Touch ID" onPress={handleBiometricAuth} />
            )}

            <Text style={styles.orText}>OR</Text>

            {/* Passkey input */}
            <TextInput
              placeholder="Enter passkey"
              secureTextEntry
              style={styles.input}
              value={inputPasskey}
              onChangeText={setInputPasskey}
            />
            <Button title="Login with Passkey" onPress={handlePasskeyAuth} />

            {/* Save a new passkey (for demonstration purposes) */}
            <TextInput
              placeholder="Set new passkey"
              secureTextEntry
              style={styles.input}
              value={passkey}
              onChangeText={setPasskey}
            />
            <Button title="Save Passkey" onPress={savePasskey} />

            <Button title="Home" onPress={() => { router.push('/(tabs)'); } } />
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  page: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#15141A',  
  },
  pageContent: {
    padding: 20,
    flex: 1,
  },
  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  orText: {
    marginVertical: 15,
    fontSize: 18,
    color: '#666',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
});
