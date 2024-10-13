import React from 'react';
import { StyleSheet } from 'react-native';
import { useContext } from 'react';
import { ThemeContext } from '@hooks/ThemeContext';
import ThemedText from '@/components/Themed/ThemedText';
import ThemedView from '@/components/Themed/ThemedView';

import { useMultiDataContext } from '@hooks/MultiDataContext';

const formatToPound = (amount: number): string => {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(amount);
};

export function AccountSummary({ item }: any) {
  const { theme } = useContext(ThemeContext);
  const { contactItems, loading, error } = useMultiDataContext();

  const contactItem = contactItems?.find((contactItem) => contactItem.clientCode === item.ddAccountNumber);
  //console.log('AccountSummary:', contactItem);
  return (
    <ThemedView style={[styles.box, {backgroundColor: theme.shadeColor}]}>
      <ThemedText style={styles.boxTitle}>{item.ddAccountNumber}</ThemedText>
      <ThemedText style={styles.boxSubTitle}>{item.ddFullName}</ThemedText>
      <ThemedView style={[styles.balanceRow, {backgroundColor: theme.shadeColor}]}>
        <ThemedView style={[styles.badgeContainer, {backgroundColor: theme.shadeColor}]}>
          <ThemedText style={styles.boxBusiness}>{contactItem?.BusinessType}</ThemedText>
        </ThemedView>
        <ThemedText style={styles.boxBalance}>{formatToPound(item.ddCCHBalance)}</ThemedText>
      </ThemedView>
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
    fontWeight: '600', // Small fix: fontWeight should be a string
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  badgeContainer: {
    justifyContent: 'flex-end', // Ensures alignment to bottom of container
  },
  boxBusiness: {
    fontSize: 12,
    fontStyle: 'italic',
    lineHeight: 16, // Ensuring line height does not break alignment
    alignSelf: 'flex-end', // Align to bottom of its container
  },
  boxBalance: {
    fontSize: 24,
    textAlign: 'right',
    alignSelf: 'flex-end', // Ensure alignment at the bottom
  },
});
