import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useState, useEffect } from 'react';
import 'react-native-reanimated';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useColorScheme } from '@hooks/useColorScheme';

import * as LocalAuthentication from 'expo-local-authentication';

import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_900Black } from '@expo-google-fonts/inter'; 
import { 
  AmaticSC_400Regular, 
  AmaticSC_700Bold
} from '@expo-google-fonts/amatic-sc'; 
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
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
    //  alert('navigate to welcome screen');
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

  let [fontsLoaded, fontError] = useFonts ({
    Inter: Inter_400Regular,
    InterSemi: Inter_600SemiBold,
    InterBold: Inter_700Bold,
    InterBlack: Inter_900Black,
    Amatic: AmaticSC_400Regular,
    AmaticBold: AmaticSC_700Bold,
  });

  useEffect(() => {
    if(fontsLoaded || fontError) {
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
  }, [fontsLoaded, fontError]);

  if(!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>  
 
 {/* {isAuthenticated ?  */}

  <Stack>  
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
{/* : 

      <View><Text style={styles.myStyle}>Not a valid pin</Text></View>}
      */}
    </ThemeProvider>
  );
}
const styles = StyleSheet.create({
  myStyle: {
    fontFamily: 'AmaticBold',
  },
  
});