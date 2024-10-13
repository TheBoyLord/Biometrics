import { useContext } from 'react';
import { Stack, useLocalSearchParams } from "expo-router";
import { TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { useRouter } from "expo-router";

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/pro-regular-svg-icons'; 
import { faFilePdf } from '@fortawesome/pro-regular-svg-icons'; 
import { faFaceSmile } from '@fortawesome/pro-regular-svg-icons';

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
  const accountItem = accountItems?.find((accountItem) => accountItem.ddAccountNumber === accountCode);
  const bookmarkItem = bookmarkItems?.find((bookmarkItem) => bookmarkItem.clientCode === accountCode);
  // Ensure cchBalance is a number
  const cchBalance = parseFloat((accountItem?.ddCCHBalance ?? 0).toString());

  return (
    <ThemedSafeAreaView style={styles.page}>
      <ThemedStatusBar />
      <Stack.Screen options={{ 
        headerShown: true, 
        headerStyle: { backgroundColor: theme.headerBackgroundColor, },
        headerTintColor: theme.headerTextColor, 
        contentStyle: { backgroundColor: theme.backgroundColor, },
        headerTitleStyle: { color: theme.textColor },  
        title: "Account", 
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()} >
            <FontAwesomeIcon icon={faArrowLeft} size={24} color={theme.headerBackColor} />
          </TouchableOpacity>
        )
        }} 
      />
      <ThemedView style={styles.pageContent} >  
        <AccountSummary key={accountItem?.id} item={accountItem}></AccountSummary>
        
        {cchBalance === 0 ? ( 
          <ActionBox icon={faFaceSmile} text="Happy days, no balance!" color='green'/>
        ) : (
          <TouchableOpacity onPress={() => handleShowStatement(`${accountCode}`) } >
            <ActionBox icon={faFilePdf} text="Show statement" color={theme.tintColor}/>
          </TouchableOpacity>
        )} 
        
        <ThemedView key={bookmarkItem?.id} style={{gap: 10}}>        
          <Address item={bookmarkItem}></Address>
          <Team item={bookmarkItem}></Team>
        </ThemedView>
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
  title: {
    textAlign: 'center',
    fontSize: 24,
    paddingTop: 24,
  },
  item: {
    marginBottom: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
})