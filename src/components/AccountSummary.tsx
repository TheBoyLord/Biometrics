import React from 'react';
import { StyleSheet } from 'react-native';
import { useContext } from 'react';
import { ThemeContext } from '@hooks/ThemeContext';
import ThemedText from '@components/ThemedText';
import ThemedView from '@components/ThemedView';

const formatToPound = (amount: number): string => {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(amount);
};

export function AccountSummary({ item }: any) {
  const { theme } = useContext(ThemeContext); // Get the current theme from context
  return (
    <ThemedView style={[styles.box, {backgroundColor: theme.shadeColor}]}>
      <ThemedText style={styles.boxTitle}>{item.ddAccountNumber}</ThemedText>
      <ThemedText style={styles.boxSubTitle}>{item.ddFullName}</ThemedText>
      <ThemedText style={styles.boxBalance}>{formatToPound(item.ddCCHBalance)}</ThemedText>
    </ThemedView>
  )
}
export default AccountSummary;

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
  boxBalance: {
    fontSize: 24,
    lineHeight: 30,
    textAlign: 'right',
  },
  
});

