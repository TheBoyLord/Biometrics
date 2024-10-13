import React from 'react';
import { StyleSheet } from 'react-native';
import { useContext } from 'react';
import { ThemeContext } from '@hooks/ThemeContext';
import ThemedText from '@/components/Themed/ThemedText';
import ThemedView from '@/components/Themed/ThemedView';


export function Address({ item }: any) {
  const { theme } = useContext(ThemeContext); // Get the current theme from context
  return (
    <ThemedView style={[styles.box, {backgroundColor: theme.shadeColor}]}>
      <ThemedText style={styles.boxTitle}>Address on file:</ThemedText>
      <ThemedText style={styles.boxSubTitle}>{item.addressLine1}</ThemedText>
      <ThemedText style={styles.boxSubTitle}>{item.addressLine2}</ThemedText>
      <ThemedText style={styles.boxSubTitle}>{item.addressLine3}</ThemedText>
      <ThemedText style={styles.boxSubTitle}>{item.town}</ThemedText>
      <ThemedText style={styles.boxSubTitle}>{item.county}</ThemedText>
    </ThemedView>
  )
}
export default Address;

const styles = StyleSheet.create({
  box: {
    borderRadius: 10,
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
   
  },
  boxTitle: {
    fontSize: 18,
    lineHeight: 24,
  },
  boxSubTitle: {
    fontSize: 12,
    lineHeight: 20,
  },
});

