import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useState, useEffect } from 'react';
import 'react-native-reanimated';
import { View, Text } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';

import * as LocalAuthentication from 'expo-local-authentication';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

    //====================================================================================
  // Biometric functions
  //====================================================================================
  const [deviceHasBiometric, setDeviceHasBiometric] = useState(false);
  const [biometricsFound, setBiometricsFound] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const checkDeviceForHardware = async () => {
    let compatible = await LocalAuthentication.hasHardwareAsync();
    if(compatible) {
      setDeviceHasBiometric(true);
      console.log('App:checkDeviceForHardware:true');
      handleAuthentication();
      
    } else {
      setDeviceHasBiometric(false);
      console.log('App:checkDeviceForHardware:false');
    }
  }
  const checkForBiometrics = async () => {
    let biometricRecords = await LocalAuthentication.isEnrolledAsync();
    if(!biometricRecords) {
      setBiometricsFound(false);
      console.log('App:setBiometricsNotFound');
    } else {
      setBiometricsFound(true);
      console.log('App:setBiometricsFound');
    }
  }
  const handleAuthentication = async() => {
    //this.props.navigation.navigate("HOME")
    //  alert('navigate to swelcome screen');
    let result = await LocalAuthentication.authenticateAsync();
    console.log("handleAuthentication");
    console.log(result);
    if(result.success) {
      //handleLogin();
      console.log('Face ID or Touch ID passed');
      setIsAuthenticated(true);
    } else {
      console.log('Authentication Failed');
      setIsAuthenticated(false);
    }
  }

  useEffect(() => {
    if(loaded) {
      SplashScreen.hideAsync();
      console.log('run on app init');
      checkDeviceForHardware();
      if(deviceHasBiometric) {
        checkForBiometrics();
      } else {
        console.log('App:useEffect: NOT deviceHasBiometric');
      }
      if(biometricsFound) {
        console.log('biometrics enabled and found');
        handleAuthentication();
      } else {
        console.log('biometrics not found or not available');
      }
    }
  }, [loaded]);

  if(!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>  
 
 {isAuthenticated ? 
      <Stack>  
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack> : 

      <View><Text>Not a valid pin</Text></View>}
     
    </ThemeProvider>
  );
}
