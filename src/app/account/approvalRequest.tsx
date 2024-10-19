import { useContext } from 'react';
import { Stack } from "expo-router";
import { TouchableOpacity, StyleSheet } from 'react-native';

import Animated,  { FadeIn, FadeOut} from 'react-native-reanimated';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'; 
import { faArrowLeft } from '@fortawesome/pro-regular-svg-icons'; 
import { useNavigation } from '@react-navigation/native'; 

import { ThemeContext } from '@hooks/ThemeContext';
import { ThemedText, ThemedView, ThemedSafeAreaView, ThemedStatusBar } from '@/components/Themed/ThemedComponents';


export default function ApprovalRequestScreen() {
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
        title: 'Approval requests', 
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
          <FontAwesomeIcon style={styles.image} icon={faCircleCheck} size={100} color='green' />
        </Animated.View>

        <ThemedText style={ styles.title }>Approval Requests</ThemedText>
        <ThemedText style={ styles.subTitle }>Good news, you have nothing to approve.</ThemedText>
        <ThemedText style={ styles.description }>If you do have anything to approve, you'll find it here.</ThemedText>
       
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
    fontSize: 28,
  },
  subTitle: {
    textAlign: 'center',
    fontSize: 24,
    marginTop: 20,
    marginBottom: 20
  },
  description: {
    textAlign: 'center',
    fontSize: 16,
  },
})