import { useContext } from 'react';
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { useRouter } from "expo-router";

import { ThemeContext } from '@hooks/ThemeContext';
import { ThemedView, ThemedSafeAreaView, ThemedStatusBar } from '@/components/Themed/ThemedComponents';

import { useMultiDataContext } from '@hooks/MultiDataContext';
import NavBack from '@components/NavBack';
import AccountSummary from '@components/AccountSummary';

import { ThemedText } from '@/components/ZZZ_ThemedText';

export default function ShowTeamScreen() {
  const { accountItems, bookmarkItems, loading, error } = useMultiDataContext();
  const { theme } = useContext(ThemeContext); // Get the current theme from context
  const navigation = useNavigation(); 
  const { accountCode } = useLocalSearchParams();  // Retrieve the query parameters

  const router = useRouter();

  // Step 1: Filter the data for a specific accountCode  
  const accountItem = accountItems?.find((accountItem) => accountItem.ddAccountNumber === accountCode);
  const bookmarkItem = bookmarkItems?.find((bookmarkItem) => bookmarkItem.clientCode === accountCode);
  // Ensure cchBalance is a number
  const cchBalance = parseFloat((accountItem?.ddCCHBalance ?? 0).toString());

  return (
    <ThemedSafeAreaView style={styles.page}>
      <NavBack title="My Team" />
      
      <ThemedView style={styles.pageContent} >  
        <ScrollView style={{backgroundColor: theme.backgroundColor }}>
          <AccountSummary key={accountItem?.id} item={accountItem}></AccountSummary>
          <ThemedText>TEAMS SCREEN: {accountCode}</ThemedText>  
        </ScrollView> 
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
    padding: 10,
    flex: 1,
    gap: 10,
  },
})