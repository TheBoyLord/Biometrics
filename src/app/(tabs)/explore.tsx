import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useContext } from 'react';
import { ThemeContext } from '@hooks/ThemeContext';

import useFetch from '@hooks/useFetch';

export default function TabTwoScreen() {
  const { theme } = useContext(ThemeContext); // Get the current theme from context
 
  // Call the custom hook with the API URL
  const { data, loading, error } = useFetch('https://internaltest.jacrox.cloud/api/mobAction.php?page=statements/createPDF&params=LOR010|0|1');

  // Handle loading state
  if(loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#990024" />
      </View>
    );
  }

  // Handle error state
  if(error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Error: {error}</Text>
      </View>
    );
  }
  console.log('from explore: ', data);
  // Handle successful data fetch
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Fetched Data:</Text>
      
   </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  error: {
    color: 'red',
  },
  item: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
