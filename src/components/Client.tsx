import React from 'react';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { ThemeContext } from '@hooks/ThemeContext';
import { ThemedView, ThemedText } from '@/components/Themed/ThemedComponents';
import ListDetail from '@components/ListDetail';
import Utilities_Dates from '@components/Utilities_Dates';

export function Client({ contact, client, company }: { contact: any, client: any, company: any }) {
  const { theme } = useContext(ThemeContext); // Get the current theme from context
  const { formatDate } = Utilities_Dates();

  
  return (
    <ThemedView style={{gap:30}} >
      <ThemedView style={{backgroundColor: theme.shadeColor}}>
        <ListDetail title="Unique Tax Reference" value={contact.UTR}></ListDetail>
      </ThemedView>
      
      {contact.contacttype === 'Other Person' ? (
      <ThemedView style={{backgroundColor: theme.shadeColor}}>
        <ListDetail title="NI Number" value={contact.NINumber}></ListDetail>  
        <ListDetail title="PPSN" value={contact.PPSN}></ListDetail>
        <ListDetail title="Date of birth" value={formatDate(contact.DateOfBirth)}></ListDetail>
      </ThemedView>
      ) : (
      <>
        <ThemedView style={{backgroundColor: theme.shadeColor}}>
          <ListDetail title="Company Registration" value={client.CompanyRegistrationNo}></ListDetail>
          <ListDetail title="Company Tax Reference" value={client.CompanyTaxReference}></ListDetail>
          <ListDetail title="Year End" value={client.yearend}></ListDetail>
        </ThemedView>
        <ThemedText style={styles.detailTitle}>Companies House information</ThemedText>
        <ThemedText style={styles.detailSubTitle}>Accounts</ThemedText>
        <ThemedView style={{backgroundColor: theme.shadeColor}}>
          <ListDetail title="Status" value={company.company_status}></ListDetail>
          <ListDetail title="Jurisdiction" value={company.jurisdiction}></ListDetail>
          <ListDetail title="Accounts due" value={formatDate(company.accounts.next_due)}></ListDetail>
          <ListDetail title="Made up to" value={formatDate(company.accounts.next_made_up_to)}></ListDetail>
        </ThemedView>
        <ThemedText style={styles.detailSubTitle}>Confirmation Statement</ThemedText>
        <ThemedView style={{backgroundColor: theme.shadeColor}}>
          <ListDetail title="Last made up to" value={formatDate(company.confirmation_statement.last_made_up_to)}></ListDetail>
          <ListDetail title="Next made up to" value={formatDate(company.confirmation_statement.next_made_up_to)}></ListDetail>
          <ListDetail title="Next due" value={formatDate(company.confirmation_statement.next_due)}></ListDetail>
        </ThemedView>
      </>
      )} 
      
    </ThemedView>
  )
}
export default Client;

const styles = StyleSheet.create({
  detailTitle: {
    fontWeight: 'normal',
    fontSize: 16,
    paddingLeft: 10,
  }, 
  detailSubTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    paddingLeft: 10,
  },
})