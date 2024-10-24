import { Tabs, Stack, useRouter } from 'expo-router';
import { StyleSheet, Button } from 'react-native';
import React, { useContext, useState } from 'react';
import { useColorScheme } from '@hooks/useColorScheme';
// FontAwesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faUser, faGear, faListDots } from '@fortawesome/pro-thin-svg-icons'; 

import { ThemedView } from '@/components/Themed/ThemedComponents';
import { ThemeContext } from '@hooks/ThemeContext';

const TabLayout = () => {
  const colorScheme = useColorScheme();
  const { theme } = useContext(ThemeContext); // Get the current theme from context

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.tabBarBackgroundColor,
        },
        tabBarActiveTintColor: theme.tabBarActiveTintColor,
        tabBarInactiveTintColor: theme.tabBarInactiveTintColor,
        headerStyle: {
          backgroundColor: theme.backgroundColor,
        },
        headerTitleStyle: {
          color: theme.textColor,
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
            <FontAwesomeIcon style={styles.icon} icon={faListDots} color={focused ? '#990024' : 'gray'} size={focused ? 30 : 25} />
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

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <FontAwesomeIcon
              style={styles.icon}
              icon={faUser}
              color={focused ? '#990024' : 'gray'}
              size={focused ? 30 : 25}
            />
          ),
        }}
      />


    </Tabs>
  );
}

// Main layout component with authentication logic
const Layout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true); // Simulate initial authenticated state
  const router = useRouter();

  return isAuthenticated ? (
    <TabLayout/> 
  ) : (
    <ThemedView style={styles.centered}>
      <Button title="Go to Login" onPress={() => router.replace('/user/login')} />
    </ThemedView>
  );
};

export default Layout;

const styles = StyleSheet.create({
  icon: {
    marginTop: 4,  
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
