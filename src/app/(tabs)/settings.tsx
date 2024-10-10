import { useContext } from 'react';
import { useRouter } from "expo-router";
import { FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleRight } from '@fortawesome/pro-regular-svg-icons'; 

import { useNavigation } from '@react-navigation/native'; 

import { ThemeContext } from '@hooks/ThemeContext';
import ThemedText from '@components/ThemedText';
import ThemedView from '@components/ThemedView';
import ThemedStatusBar from '@components/ThemedStatusBar';

const SettingsScreen = () => {
  const { theme } = useContext(ThemeContext); // Get the current theme from context
  const navigation = useNavigation(); 

  // Define the props for ListItem
  interface ListItemProps {
    title: string;    // Title must be a string
    badge?: string;   // Badge is optional (string)
    link: string;
  }
  // Settings screens
  const DATA = [
    { id: '1', title: 'App appearance', link: '/user/theme', badge: 'New' },
    { id: '2', title: 'User login', link: '/user/login'},      
    { id: '3', title: 'Onboarding', link: '/day2/onboarding'},                 
  ];

  // Render each item in the list
  const ListItem: React.FC<ListItemProps> = ({ title, badge, link }) => {
    const { theme } = useContext(ThemeContext); // Get the current theme from context
    const router = useRouter(); 
   
    const handlePress = () => {
      router.push(link);
    };  
    return (
      <TouchableOpacity style={styles.item }
        onPress={handlePress} >
        <ThemedView style={ styles.left }>
          <ThemedText style={ styles.title }>{title}</ThemedText>
        </ThemedView>
        {badge && (
          <ThemedView style={ styles.badgeContainer }>
            <ThemedText style={styles.badge}>{badge}</ThemedText>
          </ThemedView>
        )}
        <FontAwesomeIcon icon={faAngleRight} size={24} color={theme.tintColor} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.page}>
      
      <ThemedStatusBar/>

      <ThemedView style={styles.pageTitleContainer} >  
        <ThemedText style={styles.pageTitle}>Settings</ThemedText>
      </ThemedView>

      <ThemedView style={ styles.container } >  
        <FlatList
          data={DATA}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <ListItem title={item.title} badge={item.badge} link={item.link} />}
        />
      </ThemedView>
     
    </SafeAreaView> 

  )
}
export default SettingsScreen;

const styles = StyleSheet.create({
  page: {
    justifyContent: 'center',
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  pageTitleContainer: {
    paddingLeft: 20,
    paddingTop: 10,
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 6,
    marginRight: 5,
    borderBottomColor: '#a0a0a0',
    borderBottomWidth: 0.5,
  },
  left: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 16,
  },
  badgeContainer: {
    backgroundColor: '#0d6efd',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    marginRight: 10,
  },
  badge: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  icon: {
    marginLeft: 10,
  },
})