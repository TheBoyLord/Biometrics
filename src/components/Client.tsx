import React from 'react';
import { useContext } from 'react';
import { ThemeContext } from '@hooks/ThemeContext';
import { ThemedView } from '@/components/Themed/ThemedComponents';
import ListDetail from '@components/ListDetail';
import Utilities_Dates from '@components/Utilities_Dates';

export function Client({ contact, client }: { contact: any, client: any }) {
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
      <ThemedView style={{backgroundColor: theme.shadeColor}}>
        <ListDetail title="Company Registration" value={client.CompanyRegistrationNo}></ListDetail>
        <ListDetail title="Company Tax Reference" value={client.CompanyTaxReference}></ListDetail>
        <ListDetail title="Year End" value={client.yearend}></ListDetail>
      </ThemedView>
      )}
      
    </ThemedView>
  )
}
export default Client;

