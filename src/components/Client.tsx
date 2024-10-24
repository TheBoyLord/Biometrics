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
        <ThemedView style={{backgroundColor: theme.shadeColor}}>
          <ListDetail title="Date created" value={formatDate(company.date_of_creation)}></ListDetail>
          <ListDetail title="Status" value={company.company_status}></ListDetail>
          <ListDetail title="Jurisdiction" value={company.jurisdiction}></ListDetail>
          <ListDetail title="Address in dispute" value={(!company.registered_office_is_in_dispute ? 'false' : 'true')}></ListDetail>
          <ListDetail title="Type" value={company.type}></ListDetail>
        </ThemedView>
        <ThemedView style={{backgroundColor: theme.shadeColor}}>
          <ThemedText style={styles.detailSubTitle}>Last Accounts</ThemedText>
          <ListDetail title="Made up to" value={formatDate(company.accounts.last_accounts.made_up_to)}></ListDetail>
          <ListDetail title="Period" value={formatDate(company.accounts.last_accounts.period_start_on)+' - '+formatDate(company.accounts.last_accounts.period_end_on)}></ListDetail>
          <ListDetail title="Type" value={company.accounts.last_accounts.type}></ListDetail>
        </ThemedView>
        <ThemedView style={{backgroundColor: theme.shadeColor}}>
          <ThemedText style={styles.detailSubTitle}>Next Accounts</ThemedText>
          <ListDetail title="Due on" value={formatDate(company.accounts.next_accounts.due_on)}></ListDetail>
          <ListDetail title="Made up to" value={formatDate(company.accounts.next_made_up_to)}></ListDetail>
        </ThemedView>
        <ThemedView style={{backgroundColor: theme.shadeColor}}>
          <ThemedText style={styles.detailSubTitle}>Confirmation Statement</ThemedText>
          <ListDetail title="Last made up to" value={formatDate(company.confirmation_statement.last_made_up_to)}></ListDetail>
          <ListDetail title="Next made up to" value={formatDate(company.confirmation_statement.next_made_up_to)}></ListDetail>
          <ListDetail title="Next due" value={formatDate(company.confirmation_statement.next_due)}></ListDetail>
        </ThemedView>
        <ThemedView style={{backgroundColor: theme.shadeColor}}>
          <ThemedText style={styles.detailSubTitle}>Registered Address</ThemedText>
          <ListDetail title="Line 1" value={company.registered_office_address.address_line_1}></ListDetail>
          <ListDetail title="Line 2" value={company.registered_office_address.address_line_2}></ListDetail>
          <ListDetail title="Locality" value={company.registered_office_address.locality}></ListDetail>
          <ListDetail title="Postal code" value={company.registered_office_address.postal_code}></ListDetail>
          <ListDetail title="Region" value={company.registered_office_address.region}></ListDetail>
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
    fontSize: 20,
    paddingLeft: 14,
  }, 
  detailSubTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    paddingLeft: 14,
    paddingTop: 14,
  },
})