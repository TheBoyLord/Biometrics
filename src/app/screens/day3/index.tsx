import { View, Button, Text } from 'react-native';
import React from 'react';
import { Link, Stack } from "expo-router";

const DayDetailsScreen = () => {
  return (
    <View>
      <Stack.Screen options={{ title: 'Check Authentication' }} />
      <Text>Authentication</Text>
    </View>
  );

};