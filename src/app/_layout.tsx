
import { useState, useEffect, useCallback, useContext } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import { TextInput, Button, StyleSheet, Alert } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';

import { ThemedText, ThemedView, ThemedSafeAreaView } from '@/components/Themed/ThemedComponents';

import { MultiDataProvider } from '@hooks/MultiDataContext';

import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_900Black } from '@expo-google-fonts/inter'; 
import { 
  AmaticSC_400Regular, 
  AmaticSC_700Bold
} from '@expo-google-fonts/amatic-sc'; 

import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { ThemeProvider} from '@hooks/ThemeContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  //====================================================================================
  // Biometric functions
  //====================================================================================
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [hasBiometricSupport, setHasBiometricSupport] = useState<boolean>(false);
  const [passkey, setPasskey] = useState<string>('');
  const [inputPasskey, setInputPasskey] = useState<string>('');

  // Load custom fonts
  const [fontsLoaded, fontError] = useFonts ({
    Inter: Inter_400Regular,
    InterSemi: Inter_600SemiBold,
    InterBold: Inter_700Bold,
    InterBlack: Inter_900Black,
    Amatic: AmaticSC_400Regular,
    AmaticBold: AmaticSC_700Bold,
  });

  useEffect(() => {
    if(fontsLoaded || fontError) {
      handleLoadingComplete();
    } 
  }, [fontsLoaded, fontError]);

  // After fonts and assets are loaded, hide splash screen and check for biometric support
  const handleLoadingComplete = useCallback(async () => {
    await SplashScreen.hideAsync();
      console.log('run on app init');
      checkBiometricSupport();
      // Trigger Face ID/Touch ID prompt
      handleBiometricAuth();
  }, []);

  // Check if the device supports biometric authentication
  const checkBiometricSupport = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    const enrolled = await LocalAuthentication.isEnrolledAsync();
    if(compatible && enrolled) {
      setHasBiometricSupport(true);
    } else {
      setHasBiometricSupport(false);
      Alert.alert(
        'Biometric Authentication Unavailable',
        'Your device does not support Face ID / Touch ID. You can use your passkey to log in instead.'
      );
    }
  }
  
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
  
  if(!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <MultiDataProvider>
      <ThemeProvider>
        <ThemedSafeAreaView style={styles.safeArea}>
        
          {isAuthenticated ? (
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Stack>  
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>     
          </GestureHandlerRootView>
          ) : (
          <ThemedView>
            <ThemedText style={styles.titleText}>Login</ThemedText>
            {hasBiometricSupport ? (
              <>
                <Button title="Login with Face ID / Touch ID" onPress={handleBiometricAuth} />
                <ThemedText style={styles.orText}>OR</ThemedText>
              </>
            ) : (
              <ThemedText style={styles.errorText}>Biometric authentication not supported.</ThemedText>
            )}
            {/* Passkey input */}
            <TextInput
              placeholder="Enter passkey"
              secureTextEntry
              style={styles.input}
              value={inputPasskey}
              onChangeText={setInputPasskey}
            />
            <Button title="Login with Passkey" onPress={handlePasskeyAuth} />

            {/* Save a new passkey */}
            <TextInput
              placeholder="Set new passkey"
              secureTextEntry
              style={styles.input}
              value={passkey}
              onChangeText={setPasskey}
            />
            <Button title="Save Passkey" onPress={savePasskey} />
          </ThemedView>
          )}

        </ThemedSafeAreaView>
      </ThemeProvider>
    </MultiDataProvider>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    justifyContent: 'center',
    flex: 1,
  },
  myStyle: {
    fontFamily: 'AmaticBold',
  },
  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
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
  errorText: {
    color: 'red',
  }
});