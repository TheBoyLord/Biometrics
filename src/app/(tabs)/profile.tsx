import React, { useState } from 'react';
import { StyleSheet, View, Button, Alert } from 'react-native';
import { useRouter, Link, useNavigation } from 'expo-router';
import * as SecureStore from 'expo-secure-store'
import { useContext } from 'react';

import { ThemeContext } from '@hooks/ThemeContext';
import { ThemedText, ThemedView, ThemedSafeAreaView, ThemedStatusBar } from '@/components/Themed/ThemedComponents';
import SvgJRCA from '@components/icons/SvgJRCA';

  
// type ProfileScreenProps = {
//   onLogout: () => void; // Define the type of the onLogout prop
// };

const ProfileScreen = () => {
  const { theme } = useContext(ThemeContext); // Get the current theme from context

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true); // Default to authenticated for this example
  const router = useRouter();
  const navigation = useNavigation();

  // Function to handle the logout action in the Profile screen
  const handleLogout = async () => {
    setIsAuthenticated(false); // Set authentication to false
    await SecureStore.deleteItemAsync('userPasskey'); // Clear passkey from storage
    //Alert.alert('You have been logged out.');
    //router.dismissAll();
    router.replace('user/logout'); // Navigate to the login screen
  };


  return (
    <ThemedSafeAreaView style={styles.safeArea}>
      <ThemedStatusBar/>
      <ThemedView style={styles.pageContainer}>
        <ThemedView style={styles.pageTitleContainer} >  
          <ThemedText style={styles.pageTitle}>Profile</ThemedText>
        </ThemedView>  
        
        <ThemedView>    
          <ThemedText style={styles.subtitle}>Days</ThemedText>
          <Link style={styles.link} href="/day2/onboarding">day2 - Onboarding</Link>
          <Link style={styles.link} href="/day2/lottie">day2 - lottie Animations</Link>
          <Link style={styles.link} href="/day2/showPDF">day2 - Show PDF</Link>
          <Link style={styles.link} href="/day2/showMarkdown">day2 - Show HTML markdown</Link>
          <Link style={styles.link} href="/screens/day3/authentication">day3 - Authentication</Link>
          <Link style={styles.link} href="/user/theme">user/theme - App theme Settings</Link>
          
          
            <Button  title="Logout" onPress={handleLogout} />
         

          <ThemedText>Here is a custom svg created from a standard SVG converted via SVGR (web) and export to react-native:</ThemedText>
          <SvgJRCA width={200} height={200} fill="#a0a0a0" />
          
          <ThemedText style={styles.subtitle}>Register</ThemedText>
        
          <Link style={styles.link} href="/user/login">Login</Link>
          <Link style={styles.link} href="/user/register">Register</Link>
        
        </ThemedView>
         
      </ThemedView>
    </ThemedSafeAreaView>
  );
}
export default ProfileScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  pageContainer: {
    flex: 1,
  },
  pageTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5,
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
    marginTop: 16,
  },
  page: {
    justifyContent: 'center',
    flex: 1,
  },
  container: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
});
