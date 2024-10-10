import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';
import { useContext } from 'react';

import { Colors } from '@constants/Colors';
import { useColorScheme } from '@hooks/useColorScheme';
// FontAwesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faUser, faGear } from '@fortawesome/pro-thin-svg-icons'; 

import { ThemeContext } from '@hooks/ThemeContext';

const TabLayout = () => {
  const colorScheme = useColorScheme();

  const { theme } = useContext(ThemeContext); // Get the current theme from context

  return (
    <Tabs
      // screenOptions={{
      //   tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tintColor,
      //   headerShown: false,
      // }}
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.tabBarBackgroundColor, // Background color for the tab bar
        },
        tabBarActiveTintColor: theme.tabBarActiveTintColor, // Active tab text/icon color
        tabBarInactiveTintColor: theme.tabBarInactiveTintColor, // Inactive tab text/icon color
        headerStyle: {
          backgroundColor: theme.backgroundColor, // Set the header background color
        },
        headerTitleStyle: {
          color: theme.textColor, // Set the header text color
        },
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesomeIcon style={styles.icon} icon={faHome} color={focused ? '#990024' : 'gray'} size={focused ? 30 : 25} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Account',
          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesomeIcon style={styles.icon} icon={faUser} color={focused ? '#990024' : 'gray'} size={focused ? 30 : 25} />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesomeIcon style={styles.icon} icon={faGear} color={focused ? '#990024' : 'gray'} size={focused ? 30 : 25} />
          ),
        }}
      />
     
    </Tabs>
  );
}
export default TabLayout

const styles = StyleSheet.create({
  icon: {
    marginTop: 4,  
  },
})
