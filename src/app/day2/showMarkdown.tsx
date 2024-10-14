import React, { useContext } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { ThemeContext } from '@hooks/ThemeContext'; // Import your theme context

const markdownContent = `
# ABC
### What is GoCardless?
* GoCardless is a service that helps you make payments automatically through Direct Debit.
* It's an easy way to manage regular payments like subscriptions or invoices.
### Benefits of GoCardless to Customers:
* **Convenience**: No need to remember payment due dates or manually transfer money.
* **Security**: GoCardless uses bank-level encryption to keep your details safe.
* **Control**: You’ll be notified before each payment is taken, and you can cancel any time.
* **No Card Needed**: No worries about expired or lost cards; payments come directly from your bank.
`;

export default function ShowMarkdown() {
  const { theme } = useContext(ThemeContext); // Get the current theme

  // Define styles based on the theme
  const markdownStyles = StyleSheet.create({
    heading1: {
      fontSize: 24,
      fontWeight: 'bold', // 'bold' is valid here
      color: 'yellow', // Apply the theme color
    },
    heading3: {
      fontSize: 16,
      fontWeight: 'bold', // 'bold' is valid here
      color: theme.jrRed, // Apply the theme color
    },
    list_item: {
      fontSize: 14,
      color: theme.textColor, // Apply theme text color to list items
      marginVertical: 4,
    },
  });

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Markdown style={markdownStyles}>
        {markdownContent}
      </Markdown>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
