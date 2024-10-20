import React from 'react';
import { useContext } from 'react';
import { ThemeContext } from '@hooks/ThemeContext';
import { ThemedView } from '@/components/Themed/ThemedComponents';
import ListDetail from '@components/ListDetail';

export function Team({ partner, items }: any) {
  const { theme } = useContext(ThemeContext); // Get the current theme from context
  return (
    <ThemedView style={{gap:30}} >
      <ThemedView style={{backgroundColor: theme.shadeColor}}>
        <ListDetail title="Partner" value={partner}></ListDetail>
       </ThemedView>
      <ThemedView style={{backgroundColor: theme.shadeColor}}>
      {items.map((item) => (
        <ListDetail key={item.id} title={item.Description} value={item.fullName}></ListDetail>
      ))}
      </ThemedView>
    </ThemedView>

  )
}
export default Team;