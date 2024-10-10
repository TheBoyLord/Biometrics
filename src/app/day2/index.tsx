import { View, Button, Text } from 'react-native';
import React from 'react';
import { Link, Stack } from "expo-router";

const DayDetailsScreen = () => {
  return (
    <View>
      <Stack.Screen options={{ title: 'Login Screen' }} />
      <Text>Day Details Screen</Text>
      <Link href={"/day2/onboarding"}>
        <Button title="Onboarding" />
      </Link>
    </View>
  );

};