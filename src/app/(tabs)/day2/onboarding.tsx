import { Stack, router } from "expo-router";
import { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, Pressable } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const onboardingSteps = [
  {
    icon: 'balance-scale',
    title: 'Welcome to Jack Ross',
    description: "Keep track of all your accounting needs with Jack Ross Chartered Accountants",
  },
  {
    icon: 'people-arrows',
    title: 'Track every transaction',
    description: "Monitor your spending and contribution, ensuring every penny aligns with your family's aspirations",
  },
  {
    icon: 'hands-helping',
    title: 'Step 2',
    description: 'Heping you all the way',
  },
  
];

export default function OnboardingScreen() {
  const [stepIdx, setStepIdx] = useState(0);
 
  const data = onboardingSteps[stepIdx];
 
  const onContinue = () => {
    const isLastStep = stepIdx === onboardingSteps.length - 1;
    if(isLastStep) {
      endOnboarding();
    } else {
      setStepIdx(stepIdx + 1);
    }
  };

  const endOnboarding = () => {
    setStepIdx(0);
    router.back();
  }

  return (
  <SafeAreaView style={styles.page}>
    <Stack.Screen options={{ headerShown: false }} />
    <View style={styles.pageContent}>
      <FontAwesome5 style={styles.image} name={data.icon} size={100} color="#990024" />
      <View style={styles.footer}>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.description}>{data.description}</Text>
      </View>
      <View style={styles.buttonsRow}>
        <Text onPress={endOnboarding} style={styles.buttonText}>Skip</Text>
        <Pressable onPress={onContinue} style={styles.button}>
          <Text style={styles.buttonText}>Continue</Text>
        </Pressable>
      </View>
    </View>
  </SafeAreaView> )
}

const styles = StyleSheet.create({
  page: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#15141A',  
  },
  pageContent: {
    padding: 20,
    flex: 1,
  },
  image: {
    alignSelf: 'center',
    margin: 20,
  },
  title: {
    color: '#FDFDFD',
    fontSize: 40,
    fontFamily: 'InterBlack',
    letterSpacing: 1.3,
    marginVertical: 10,
  },
  description: {
    color: 'grey',
    fontSize: 20,
    fontFamily: 'Inter',
    lineHeight: 28,
  },
  buttonsRow: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  button: {
    backgroundColor: '#990024',
    
    borderRadius: 50,
    alignItems: 'center',
    flex: 1,
  },
  buttonText: {
    color: '#FDFDFD',
    fontFamily: 'InterSemi',
    fontSize: 16,
    padding: 15,
    paddingHorizontal: 25,
  },
  footer: {
    marginTop: 'auto',
  },
})