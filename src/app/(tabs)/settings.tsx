import { useContext } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { faKey, faFingerprint, faCircleHalfStroke, faBell, faRightToBracket, faSparkles} from '@fortawesome/pro-regular-svg-icons'; 
import { useNavigation } from '@react-navigation/native'; 

import { ThemeContext } from '@hooks/ThemeContext';
import { ThemedText, ThemedView } from '@/components/Themed/ThemedComponents';

import ListItem from '@/components/ListItem';

const SettingsScreen = () => {
  const { theme } = useContext(ThemeContext); // Get the current theme from context
  const navigation = useNavigation(); 

  // Settings screens
  const DATA = [
    // { id: '1', icon: faKey, iconColor: theme.jrRed, title: 'Change passkey', link: '/user/todo' },
    // { id: '2', icon: faFingerprint, iconColor: '#6666ff', title: 'Face ID login', link: '/user/todo' },
    // { id: '3', icon: faCircleHalfStroke, iconColor: '#8d8d8d', title: 'App appearance', link: '/user/theme' },
    // { id: '4', icon: faBell, iconColor: '#A010A2', title: 'Notification settings', link: '/user/todo' },
    // { id: '5', icon: faRightToBracket, iconColor: '#44aa44', title: 'User login', link: '/user/login', badge: 'New', badgeColor: '#0d6efd'},      
    // { id: '6', icon: faSparkles, iconColor: '#ff5d3f', title: 'Onboarding', link: '/day2/onboarding', badge: '1', badgeColor: '#990024' },            
    { id: '1', icon: faKey, iconColor: theme.jrRed, title: 'Change passkey', link: '/user/todo' },
    { id: '2', icon: faFingerprint, iconColor: theme.jrRed, title: 'Face ID login', link: '/user/todo' },
    { id: '3', icon: faCircleHalfStroke, iconColor: theme.jrRed, title: 'App appearance', link: '/user/theme' },
    { id: '4', icon: faBell, iconColor: theme.jrRed, title: 'Notification settings', link: '/user/todo' },
    { id: '5', icon: faRightToBracket, iconColor: theme.jrRed, title: 'User login', link: '/user/login', badge: 'New', badgeColor: '#0d6efd'},      
    { id: '6', icon: faSparkles, iconColor: theme.jrRed, title: 'Onboarding', link: '/day2/onboarding', badge: '1', badgeColor: '#990024' },            
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
          renderItem={({ item }) => <ListItem icon={item.icon} iconColor={item.iconColor} title={item.title} link={item.link} badge={item.badge} badgeColor={item.badgeColor}  />}
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