import { useContext } from 'react';
import { Stack, useLocalSearchParams } from "expo-router";
import { TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { useRouter } from "expo-router";

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/pro-regular-svg-icons'; 
import { faFilePdf } from '@fortawesome/pro-regular-svg-icons'; 


import { ThemeContext } from '@hooks/ThemeContext';
import { ThemedText, ThemedView, ThemedSafeAreaView, ThemedStatusBar } from '@/components/Themed/ThemedComponents';

import { useMultiDataContext } from '@hooks/MultiDataContext';

import AccountSummary from '@components/AccountSummary';
import Address from '@components/Address';
import Team from '@components/Team';
import ActionBox from '@components/ActionBox';

export default function ShowDetailScreen() {
  const { accountItems, bookmarkItems, loading, error } = useMultiDataContext();
  const { theme } = useContext(ThemeContext); // Get the current theme from context
  const navigation = useNavigation(); 
  const { accountCode } = useLocalSearchParams();  // Retrieve the query parameters

  const router = useRouter();

  const handleShowStatement = (accountCode: string) => {
    router.push({
      pathname: "/account/showStatement", 
      params: {accountCode},
    });
  };

  // Handle loading state
  if(loading) {
    return (
      <ThemedView style={styles.container}>
        <ActivityIndicator size="large" color="#990024" />
      </ThemedView>
    );
  }

  // Handle error state
  if(error) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={styles.error}>Error: {error}</ThemedText>
      </ThemedView>
    );
  }
  // Handle successful fetch

  // Step 1: Filter the data for a specific accountCode  
  const filteredAccountItems = accountItems?.filter((accountItem) => accountItem.ddAccountNumber === accountCode);
  const filteredBookmarkItems = bookmarkItems?.filter((bookmarkItem) => bookmarkItem.clientCode === accountCode);

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
        title: "Account", 
        //headerBackTitle: 'Back',
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()} >
            <FontAwesomeIcon icon={faArrowLeft} size={24} color={theme.headerBackColor} />
          </TouchableOpacity>
        )
        }} 
      />
      <ThemedView style={styles.pageContent} >  
       
        {filteredAccountItems && filteredAccountItems.length > 0 ? (
          filteredAccountItems.map((accountItem) => (
            <AccountSummary key={accountItem.id} item={accountItem}></AccountSummary>
         ))
        ) : (
          <ThemedText style={ styles.noDataFound }>No details found for this account code.</ThemedText>  // Display a message if no results match the filter
        )}
        
        <TouchableOpacity onPress={() => handleShowStatement(`${accountCode}`) } >
          <ActionBox icon={faFilePdf} text="Show statement" />
        </TouchableOpacity>

        {filteredBookmarkItems && filteredBookmarkItems.length > 0 ? (
          filteredBookmarkItems.map((bookmarkItem) => (
             <ThemedView key={bookmarkItem.id} style={{gap: 10}}>        
              <Address item={bookmarkItem}></Address>
              <Team item={bookmarkItem}></Team>
            </ThemedView>
         ))
        ) : (
          <ThemedText style={ styles.noDataFound }>No details found for this account code.</ThemedText>  // Display a message if no results match the filter
        )}
      </ThemedView>
     
    </ThemedSafeAreaView> 

  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  error: {
    color: 'red',
  },
  page: {
    justifyContent: 'center',
    flex: 1,
  },
  pageContent: {
    padding: 20,
    flex: 1,
    gap: 10,
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
  item: {
    marginBottom: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  noDataFound: {
    textAlign: 'center',
    color: 'red',
  },
})