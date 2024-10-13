import React from 'react';
import { Stack, router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Pressable } from 'react-native';
// ColorScheme Stuff
import { Colors } from '@constants/Colors';
import { useColorScheme } from '@hooks/useColorScheme';

import { ThemedText, ThemedView, ThemedSafeAreaView, ThemedStatusBar } from '@/components/Themed/ThemedComponents';

import { GestureDetector, Gesture, Directions } from "react-native-gesture-handler";
import Animated,  { FadeIn, FadeOut, SlideInRight, SlideInLeft, SlideOutLeft, SlideOutRight } from 'react-native-reanimated';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser,  faBoltLightning } from '@fortawesome/free-solid-svg-icons'; 
import { faAlien } from '@fortawesome/pro-regular-svg-icons'; 


import SvgJRCA from '@components/icons/SvgJRCA'; 


const onboardingSteps = [
  {
    icon: faUser,
    title: 'Welcome to Jack Ross',
    description: "Keep track of all your accounting needs with Jack Ross Chartered Accountants",
  },
  {
    icon: faAlien,
    title: 'Track every transaction',
    description: "Monitor your spending and contribution, ensuring every penny aligns with your family's aspirations",
  },
  {
    icon: faUser,
    title: 'Step 3',
    description: 'Cursus tellus. Malesuada elementum parturient vel. Fringilla potenti. Bibendum. Gravida. Ad lorem nisi cum Adipiscing fames netus. Orci pretium netus platea tempor lorem, imperdiet. Ultricies vivamus habitasse euismod torquent pretium luctus sit ridiculus ornare penatibus. Nonummy ipsum sodales natoque bibendum.',
  },
  {
    icon: faBoltLightning,
    title: 'Step 4',
    description: 'Iaculis mi facilisis. Gravida pellentesque morbi. Bibendum purus volutpat lorem ultricies pretium sociis eleifend. Proin rhoncus at morbi condimentum vulputate odio risus sagittis nullam. Duis. Egestas felis fusce erat nullam cras Eleifend quis aptent eros ultricies. Nisi elit aliquam posuere.',
  },
  
];

export default function OnboardingScreen() {
  const colorScheme = useColorScheme();
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
  const onBack = () => {
    const isFirstStep = stepIdx === 0;
    if(isFirstStep) {
      endOnboarding();
    } else {
      setStepIdx(stepIdx - 1);
    }
   
  };
  const endOnboarding = () => {
    setStepIdx(0);
    router.back();
  }

  const swipes = Gesture.Simultaneous(
    Gesture.Fling().direction(Directions.LEFT).onEnd(onContinue),
    Gesture.Fling().direction(Directions.RIGHT).onEnd(onBack)
  );

  return (
  <ThemedSafeAreaView style={styles.page}>
    <Stack.Screen options={{ headerShown: false }} />
    
    <ThemedView style={styles.stepIndicatorContainer}>
      {onboardingSteps.map((step, index) => ( 
        <ThemedView key={index} style={[styles.stepIndicator, { backgroundColor: index === stepIdx ? '#990024' : 'grey' }]}></ThemedView>
      ))}
    </ThemedView>

    <GestureDetector gesture={swipes}>
      <ThemedView style={styles.pageContent} key={stepIdx}>  
        <Animated.View entering={FadeIn.duration(1500)} exiting={FadeOut}>
          {stepIdx == 0
            ? <SvgJRCA style={styles.image} width={150} height={150} fill={Colors.light.jrGrey} />
            : <FontAwesomeIcon style={styles.image} icon={data.icon} size={125} color={Colors.light.jrRed} />
          }
        </Animated.View>

        <ThemedView style={styles.footer}>
       
          <Animated.Text 
            entering={ SlideInRight } 
            exiting={ SlideOutLeft } 
            style={[styles.title, { color: (colorScheme == 'dark' ? Colors.dark.textColor : Colors.light.textColor) }]}>
            {data.title}
          </Animated.Text>
       
          <Animated.Text 
            entering={ SlideInRight.delay(50) } 
            exiting={ SlideOutLeft } 
            style={styles.description}>
            {data.description}
          </Animated.Text>
      
        </ThemedView>
        
        <ThemedView style={styles.buttonsRow}>
          <ThemedText onPress={endOnboarding} style={styles.btnSkipText}>Skip</ThemedText>
          <Pressable onPress={onContinue} style={[styles.btnContinue, {backgroundColor:Colors.dark.jrRed}]}>
            <ThemedText style={styles.btnContinueText}>Continue</ThemedText>
          </Pressable>
        </ThemedView>
      </ThemedView>
    </GestureDetector>
  </ThemedSafeAreaView> )
}

const styles = StyleSheet.create({
  page: {
    justifyContent: 'center',
    flex: 1,
  },
  pageContent: {
    padding: 20,
    flex: 1,
  },
  stepIndicatorContainer: {
    flexDirection: 'row',
    gap: 8,
    marginHorizontal: 15,
    marginTop: 20,
  },
  stepIndicator: {
    flex: 1,
    height: 3,
    backgroundColor: 'grey',
    borderRadius: 10
  },
  image: {
    alignSelf: 'center',
    margin: 20,
    marginTop: 50,
  },
  title: {
    fontSize: 32,
    fontFamily: 'InterBlack',
    letterSpacing: 1.3,
    marginVertical: 10,
  },
  description: {
    color: 'grey',
    fontSize: 16,
    fontFamily: 'Inter',
    lineHeight: 24,
  },
  buttonsRow: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  btnSkipText: {
    fontFamily: 'InterSemi',
    fontSize: 16,
    padding: 15,
    paddingHorizontal: 25,
  },
  btnContinue: {
    borderRadius: 50,
    alignItems: 'center',
    flex: 1,
  },
  btnContinueText: {
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