import { useContext } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { useNavigation } from '@react-navigation/native'; 

import { ThemeContext } from '@hooks/ThemeContext';
import { ThemedText, ThemedView } from '@/components/Themed/ThemedComponents';

import ListItem from '@/components/ListItem';

const SettingsScreen = () => {
  const { theme } = useContext(ThemeContext); // Get the current theme from context
  const navigation = useNavigation(); 

  // Settings screens
  const DATA = [
    { id: '1', title: 'Change passkey', link: '/user/todo' },
    { id: '2', title: 'Face ID login', link: '/user/todo' },
    { id: '3', title: 'App appearance', link: '/user/theme' },
    { id: '4', title: 'Notification settings', link: '/user/todo' },
    { id: '5', title: 'User login', link: '/user/login', badge: 'New', badgeColor: '#0d6efd'},      
    { id: '6', title: 'Onboarding', link: '/day2/onboarding', badge: '1', badgeColor: '#990024' },            
  ];

  return (
    <ThemedView style={styles.pageContainer}>
      <ThemedView style={styles.pageTitleContainer} >  
        <ThemedText style={styles.pageTitle}>Settings</ThemedText>
      </ThemedView>
      <ThemedView style={[ styles.container, {backgroundColor: theme.shadeColor} ] } >  
        <FlatList
          data={DATA}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <ListItem title={item.title} link={item.link} badge={item.badge} badgeColor={item.badgeColor}  />}
        />
      </ThemedView>
    </ThemedView>
  )
}
export default SettingsScreen;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
  pageTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5,
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
    marginTop: 16,
  },
  page: {
    justifyContent: 'center',
    flex: 1,
  },
  container: {
    flex: 1,

    // padding: 10,
  },
})