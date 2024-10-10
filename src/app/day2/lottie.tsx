import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const LottieScreen = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('@animations/user_confirm.json')} // Update with your JSON file path
        autoPlay
        loop={true}
        style={styles.animation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: 300,
    height: 300,
  },
});

export default LottieScreen;
