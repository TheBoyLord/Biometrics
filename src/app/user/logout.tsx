import { useContext } from 'react';

import { StyleSheet, Pressable } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { useNavigation } from '@react-navigation/native';

import { ThemeContext } from '@hooks/ThemeContext';
import { ThemedText, ThemedView, ThemedSafeAreaView, ThemedStatusBar } from '@/components/Themed/ThemedComponents';

import SvgJRCA from '@components/icons/SvgJRCA';

// ColorScheme Stuff
import { Colors } from '@constants/Colors';
import { useColorScheme } from '@hooks/useColorScheme';

const LogoutScreen = () => {
  const { theme } = useContext(ThemeContext); // Get the current theme from context
  const navigation = useNavigation(); 
  const colorScheme = useColorScheme();
  const router = useRouter();

  const onLogin = () => {
    router.replace('/user/login');

  };
  return (
    <ThemedSafeAreaView style={styles.safeArea}>
      <ThemedStatusBar/>
      <ThemedView style={styles.pageContainer}>
       
          <SvgJRCA style={{marginTop: 40}} width={150} height={150} fill="#a0a0a0" />
          <ThemedText style={styles.centreTitle}>You are now logged out</ThemedText>
          <ThemedView style={styles.buttonsRow}>
            <Pressable onPress={onLogin} style={[styles.btnLogin, {backgroundColor:Colors.dark.jrRed}]}>
              <ThemedText style={styles.btnLoginText}>Login</ThemedText>
            </Pressable>
          </ThemedView>
   
      </ThemedView>    
    </ThemedSafeAreaView>
  );
}
export default LogoutScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  pageContainer: {
    flex: 1,
    alignItems: 'center',
  },
  centreTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 32,
    marginTop: 40,
  },
  buttonsRow: {
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  btnLogin: {
    borderRadius: 50,
    alignItems: 'center',
    paddingLeft: 40,
    paddingRight: 40,
  },
  btnLoginText: {
    color: '#FDFDFD',
    fontFamily: 'InterSemi',
    fontSize: 16,
    padding: 15,
    paddingHorizontal: 25,
  },
});
