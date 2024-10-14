
import { StyleSheet } from 'react-native';
import { useRouter, Link } from 'expo-router';
import SvgJRCA from '@components/icons/SvgJRCA';

import { useContext } from 'react';
import { ThemeContext } from '@hooks/ThemeContext';
import { ThemedText, ThemedView, ThemedSafeAreaView, ThemedStatusBar } from '@/components/Themed/ThemedComponents';

const ProfileScreen = () => {
  const { theme } = useContext(ThemeContext); // Get the current theme from context

  const router = useRouter();

  return (
    <ThemedSafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>

      <ThemedStatusBar />
      
      <ThemedView style={styles.container} >  
        <ThemedView style={styles.titleContainer} >  
          <ThemedText style={styles.title}>Profile</ThemedText>
        </ThemedView>

        <ThemedView>  
          <ThemedText style={styles.subtitle}>Days</ThemedText>
          <Link style={styles.link} href="/day2/onboarding">day2 - Onboarding</Link>
          <Link style={styles.link} href="/day2/lottie">day2 - lottie Animations</Link>
          <Link style={styles.link} href="/day2/showPDF">day2 - Show PDF</Link>
          <Link style={styles.link} href="/day2/showMarkdown">day2 - Show HTML markdown</Link>
          <Link style={styles.link} href="/screens/day3/authentication">day3 - Authentication</Link>
          <Link style={styles.link} href="/user/theme">user/theme - App theme Settings</Link>
          <ThemedText>DOES THIS HAVE THE CORRECT STYLE</ThemedText>
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
    justifyContent: 'center',
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
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
