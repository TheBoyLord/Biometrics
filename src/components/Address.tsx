import React from 'react';
import { useContext } from 'react';
import { ThemeContext } from '@hooks/ThemeContext';
import { ThemedView } from '@/components/Themed/ThemedComponents';
import ListDetail from '@components/ListDetail';

export function Address({ item }: any) {
  const { theme } = useContext(ThemeContext); // Get the current theme from context
  return (
    <ThemedView style={{gap:30}} >
      <ThemedView style={{backgroundColor: theme.shadeColor}}>
        <ListDetail title="Address line 1" value={item.Address1}></ListDetail>
        <ListDetail title="Address line 2" value={item.Address2}></ListDetail>
        <ListDetail title="Address line 3" value={item.Address3}></ListDetail>
        <ListDetail title="Town" value={item.Town}></ListDetail>
        <ListDetail title="County" value={item.County}></ListDetail>
        <ListDetail title="Country" value={item.Country}></ListDetail>
        <ListDetail title="Postcode" value={item.PostCode}></ListDetail>
      </ThemedView>
      <ThemedView style={{backgroundColor: theme.shadeColor}}>
        <ListDetail title="Email" value={item.Email}></ListDetail>
      </ThemedView>
      <ThemedView style={{backgroundColor: theme.shadeColor}}>
        <ListDetail title="Phone" value={item.Phone}></ListDetail>
        <ListDetail title="Mobile" value={item.Mobile}></ListDetail>
      </ThemedView>
    </ThemedView>
  )
}
export default Address;

