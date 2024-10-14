import { useContext } from 'react';
import { Stack } from "expo-router";
import { ScrollView, TouchableOpacity, StyleSheet, Alert, Pressable } from 'react-native';
import * as Linking from 'expo-linking';

import Animated,  { FadeIn, FadeOut} from 'react-native-reanimated';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons'; 
import { faArrowLeft } from '@fortawesome/pro-regular-svg-icons'; 
import { useNavigation } from '@react-navigation/native'; 

import { ThemeContext } from '@hooks/ThemeContext';
import { ThemedText, ThemedView, ThemedSafeAreaView, ThemedStatusBar } from '@/components/Themed/ThemedComponents';

import Markdown from 'react-native-markdown-display';
const markdownContent = `
### What is GoCardless?
* GoCardless is a service that helps you make payments automatically through Direct Debit.
* It's an easy way to manage regular payments like subscriptions or invoices.
### Benefits of GoCardless to Customers:
* **Convenience**: No need to remember payment due dates or manually transfer money.
* **Security**: GoCardless uses bank-level encryption to keep your details safe.
* **Control**: You’ll be notified before each payment is taken, and you can cancel any time.
* **No Card Needed**: No worries about expired or lost cards; payments come directly from your bank.
`;

export default function SetupGoCardlessScreen() {
  const { theme } = useContext(ThemeContext); // Get the current theme from context
  const navigation = useNavigation(); 

  // Define styles based on the theme
  const markdownStyles = StyleSheet.create({
    heading3: {
      fontSize: 16,
      fontWeight: 'bold', // 'bold' is valid here
      color: theme.jrRed, // Apply the theme color
    },
    list_item: {
      fontSize: 14,
      color: theme.textColor, // Apply theme text color to list items
      marginVertical: 4,
    },
  });

  const onSetupGoCardless = async () => {
    const url: string = 'https://jrx.to.ddebits';
    try {
      // Check if the URL can be opened
      const supported: boolean = await Linking.canOpenURL(url);
      if(supported) {
        // Open the link with the default browser
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    } catch (error: any) {
      Alert.alert('Failed to open the URL:', error.message);
    }
  };

return (
    <ThemedSafeAreaView style={styles.page}>
      <ThemedStatusBar />
      <Stack.Screen options={{ 
        headerShown: true, 
        headerStyle: { backgroundColor: theme.headerBackgroundColor },
        headerTintColor: theme.headerTextColor,
        contentStyle: { backgroundColor: theme.backgroundColor },
        headerTitleStyle: { color: theme.textColor },  
        title: 'GoCardless', 
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()} >
            <FontAwesomeIcon icon={faArrowLeft} size={24} color={theme.headerBackColor} />
          </TouchableOpacity>
        )
        }} 
      />
     
      <ThemedView style={styles.pageContent} >  
        <>
        <ScrollView style={{backgroundColor: theme.backgroundColor }}>
          <Animated.View entering={FadeIn.duration(1500)} exiting={FadeOut}>
            <FontAwesomeIcon style={styles.image} icon={faMoneyBillTransfer} size={100} color={theme.jrRed} />
          </Animated.View>

          
            <Markdown style={markdownStyles}>
              {markdownContent}
            </Markdown>
          </ScrollView>
        </>

        <ThemedView style={styles.footerContainer}>
          <Pressable onPress={onSetupGoCardless} style={[styles.btnStd, {backgroundColor:theme.jrRed}]}>
            <ThemedText style={styles.btnStdText}>Complete GoCardless set up</ThemedText>
          </Pressable>
        </ThemedView>
       
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
    margin: 10,
    //marginTop: 50,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    marginBottom: 10,
  },
  description: {
    textAlign: 'center',
    fontSize: 16,
    paddingTop: 16,
  },
  textHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 18,
    marginTop: 5,
  },
  textDetail: {
    fontSize: 13,
    lineHeight: 18,
  },
  btnStd: {
    borderRadius: 50,
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  btnStdText: {
    color: '#FDFDFD',
    fontFamily: 'InterSemi',
    fontSize: 16,
    padding: 15,
    paddingHorizontal: 25,
  },
  footerContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
})