import React from 'react';
import { StyleSheet } from 'react-native';
import { useContext } from 'react';
import { ThemeContext } from '@hooks/ThemeContext';
import ThemedText from '@/components/Themed/ThemedText';
import ThemedView from '@/components/Themed/ThemedView';

export function Team({ item }: any) {
  const { theme } = useContext(ThemeContext); // Get the current theme from context
  return (
    <ThemedView style={[styles.box, {backgroundColor: theme.shadeColor}]}>
      <ThemedText style={styles.boxTitle}>Team contacts:</ThemedText>
      <ThemedText style={styles.boxSubTitle}>Partner: {item.Partner}</ThemedText>
      <ThemedText style={styles.boxSubTitle}>Client manager: {item.ClientManager}</ThemedText>
      <ThemedText style={styles.boxSubTitle}>Manager: {item.Manager}</ThemedText>
      <ThemedText style={styles.boxSubTitle}>Accountant: {item.Accountant}</ThemedText>
      <ThemedText style={styles.boxSubTitle}>Tax preparer: {item.TaxStaff}</ThemedText>
      <ThemedText style={styles.boxSubTitle}>Payroll staff: {item.PayrollStaff}</ThemedText>
      <ThemedText style={styles.boxSubTitle}>Administrator: {item.Admin}</ThemedText>
    </ThemedView>
  )
}
export default Team;

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

