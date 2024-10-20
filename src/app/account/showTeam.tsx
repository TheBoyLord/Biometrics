import { useContext } from 'react';
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, ScrollView } from 'react-native';
import { useRouter } from "expo-router";

import { ThemeContext } from '@hooks/ThemeContext';
import { ThemedView, ThemedSafeAreaView } from '@/components/Themed/ThemedComponents';

import { useMultiDataContext } from '@hooks/MultiDataContext';
import NavBack from '@components/NavBack';
import AccountSummary from '@components/AccountSummary';
import Team from '@components/Team';

export default function ShowTeamScreen() {
  const { accountItems, contactItems, bookmarkItems, teamItems } = useMultiDataContext();
  const { theme } = useContext(ThemeContext); // Get the current theme from context
  const { accountCode } = useLocalSearchParams();  // Retrieve the query parameters

  const router = useRouter();

  // Step 1: Filter the data for a specific accountCode  
  const accountItem = accountItems?.find((accountItem) => accountItem.ddAccountNumber === accountCode);
  const bookmarkItem = bookmarkItems?.find((bookmarkItem) => bookmarkItem.clientCode === accountCode);
  const contactId = bookmarkItem?.contactId;
  const contactItem = contactItems?.find((contactItem) => contactItem.ContactID === contactId);
  const teamList = teamItems?.filter((teamItem) => teamItem.clientCode === accountCode);

  // Format the partner name from: lastname, firstname 
  const name = contactItem?.PartnerName || ''; 
  const [lastName, firstName] = name.split(',').map(part => part.trim());
  const partnerName = `${firstName} ${lastName}`;

  return (
    <ThemedSafeAreaView style={styles.page}>
      <NavBack title="My Team" />
      <ScrollView style={{backgroundColor: theme.backgroundColor }}>
        <ThemedView style={{gap: 10}}>      
          <ThemedView style={styles.pageContent} >  
            <AccountSummary key={accountItem?.id} item={accountItem}></AccountSummary>
          </ThemedView>
        </ThemedView>
        <ThemedView style={styles.detailTop} >
          <Team partner={partnerName} items={teamList}></Team>
        </ThemedView>
      </ScrollView> 
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
  detailTop: {
    marginTop: 20,
  }
})