import { Stack } from 'expo-router';


import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import { Link, useNavigation, useRouter } from "expo-router";

import * as LocalAuthentication from 'expo-local-authentication';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();
  const navigation = useNavigation();

  const authenticate = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    const createTwoButtonAlert = (title:string, message:string, btnText:string, btnFunction:any)  =>
      Alert.alert(title, message, [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: btnText, onPress: btnFunction},
      ]);

    if(hasHardware && isEnrolled) {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate',
      });

      if (result.success) {
        createTwoButtonAlert('Biometrics Available', 'Used biometrics to login:', 'OK', () => console.log('logged in with face'));
        router.push("/explore"); // Navigate to the Home screen
      }
    } else {
      return createTwoButtonAlert('Biometrics Unavailable', 'Cannot use biometrics to login', 'OK', () => console.log('error'));
    }
  };

  

  return (
    <View>
      <Stack.Screen options={{ title: 'Login Screen' }} />
      <Text>Login</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="Log In" onPress={() => { router.push('/(tabs)'); } } />
      <Button title="Log In with Biometric" onPress={authenticate} />
    </View>
  );

};