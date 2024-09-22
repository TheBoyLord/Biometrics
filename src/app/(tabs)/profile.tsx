import { StatusBar } from 'expo-status-bar';
import { Platform, Pressable, Text, View, Button, StyleSheet } from 'react-native';

import { ThemedText } from '@components/ThemedText';
import { ThemedView } from '@components/ThemedView';

import { useRouter, Link } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Profile</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Login</ThemedText>
        <Button title="Log In" onPress={() => { router.push('/login'); } } />
        <Link href="/login" asChild>
         <Pressable>
          <Text>Login</Text>
         </Pressable>
    </Link>
        <ThemedText type="subtitle">Register</ThemedText>
        <Button title="Register" onPress={() => { router.push('/register'); }} />
      </ThemedView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
});
