import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance } from 'react-native';

// Define the type for the theme values
type ThemeType = 'light' | 'dark' | 'system';

// Define the context type
interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

// Create the ThemeContext with default values
export const ThemeContext = createContext<ThemeContextType>({
  theme: 'system',
  setTheme: () => {},
});

// Define the props for the ThemeProvider (children is ReactNode)
interface ThemeProviderProps {
  children: ReactNode;
}

// The ThemeProvider component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  console.log('here');
  const [theme, setTheme] = useState<ThemeType>('system');
 
  // Fetch the theme from AsyncStorage when the app starts
  useEffect(() => {
    console.log('themeContext: ', theme);
    const loadTheme = async () => {
      const savedTheme = (await AsyncStorage.getItem('@app_theme')) as ThemeType;
      setTheme(savedTheme || 'system');
    };
    loadTheme();
    
  }, []);

  // Detect the system theme
  const systemTheme = Appearance.getColorScheme() as ThemeType;

  // Save the theme and update the state
  const changeTheme = async (newTheme: ThemeType) => {
    console.log('themeContext newTheme: ', newTheme);
    setTheme(newTheme);
    await AsyncStorage.setItem('@app_theme', newTheme);
  };

  return (
   
    <ThemeContext.Provider value={{ theme: theme === 'system' ? systemTheme : theme, setTheme: changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
