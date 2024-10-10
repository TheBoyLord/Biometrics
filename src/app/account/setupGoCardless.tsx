import { useContext } from 'react';
import { Stack } from "expo-router";
import { TouchableOpacity, StyleSheet } from 'react-native';

import { Colors } from '@constants/Colors';

import ThemedStatusBar from '@components/ThemedStatusBar';
import Animated,  { FadeIn, FadeOut} from 'react-native-reanimated';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons'; 
import { faArrowLeft } from '@fortawesome/pro-regular-svg-icons'; 
import { useNavigation } from '@react-navigation/native'; 

import { ThemeContext } from '@hooks/ThemeContext';
import ThemedText from '@components/ThemedText';
import ThemedView from '@components/ThemedView';
import ThemedSafeAreaView from '@components/ThemedSafeAreaView';

export default function SetupGoCardlessScreen() {
  const { theme } = useContext(ThemeContext); // Get the current theme from context
  const navigation = useNavigation(); 
return (
 
    <ThemedSafeAreaView style={styles.page}>
      <ThemedStatusBar />
      <Stack.Screen options={{ 
        headerShown: true, 
        headerStyle: {
          backgroundColor: theme.headerBackgroundColor, // Set the background color of the header based on the theme
        },
        headerTintColor: theme.headerTextColor, // Set the text color of the header
        contentStyle: {
          backgroundColor: theme.backgroundColor, // Set the background color for the entire screen
        },
        headerTitleStyle: { color: theme.textColor },  
        title: 'GoCardless', 
        //headerBackTitle: 'Back',
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()} >
            <FontAwesomeIcon icon={faArrowLeft} size={24} color={theme.headerBackColor} />
          </TouchableOpacity>
        )
        }} 
      />
     
      <ThemedView style={styles.pageContent} >  
        <Animated.View entering={FadeIn.duration(1500)} exiting={FadeOut}>
          <FontAwesomeIcon style={styles.image} icon={faMoneyBillTransfer} size={100} color={theme.jrRed} />
        </Animated.View>

        <ThemedText style={ styles.title }>Setup GoCardless</ThemedText>
        <ThemedText style={ styles.description }>Use this screen to configure all details for GoCardless</ThemedText>
       
      </ThemedView>
     
    </ThemedSafeAreaView> 

  )
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
  image: {
    alignSelf: 'center',
    margin: 20,
    marginTop: 50,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    paddingTop: 24,
  },
  description: {
    textAlign: 'center',
    fontSize: 16,
    paddingTop: 16,
  },
})