// ThemeContext.js
import { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Colors } from '@constants/Colors';
const lightTheme = Colors.light;
const darkTheme = Colors.dark;

// Define a constant key for AsyncStorage
const THEME_KEY = '@app_theme';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme(); // Detect system theme (light/dark)
  const [theme, setTheme] = useState(systemColorScheme === 'dark' ? darkTheme : lightTheme); // Default to system theme
  const [themeMode, setThemeMode] = useState(systemColorScheme === 'dark' ? 'dark' : 'light'); // Track current mode (light, dark, system)
  // Function to load the theme from AsyncStorage
  const loadTheme = async () => {
    try {
      const storedTheme = await AsyncStorage.getItem(THEME_KEY);
      if(storedTheme) {
        if(storedTheme === 'system') {
          const parsedTheme = (systemColorScheme === 'dark' ? darkTheme : lightTheme);
          const parsedThemeMode = (systemColorScheme === 'dark' ? 'dark' : 'light');
          setTheme(parsedTheme); // Apply stored theme if found
          setThemeMode('system');
        } else {
          const parsedTheme = storedTheme === 'dark' ? darkTheme : lightTheme;
          const parsedThemeMode = storedTheme === 'dark' ? 'dark' : 'light';
          setTheme(parsedTheme); // Apply stored theme if found
          setThemeMode(parsedThemeMode);        
        }
      } else {
        // Fallback to system theme if no app theme is set
        setTheme(systemColorScheme === 'dark' ? darkTheme : lightTheme);
        setThemeMode('system');
      }
    } catch (e) {
      console.error('Failed to load theme from AsyncStorage', e);
    }
  };

  const changeTheme = async (selectedMode) => {
    setThemeMode(selectedMode);
    if (selectedMode === 'light') {
      setTheme(lightTheme);
      setThemeMode('light');
    } else if (selectedMode === 'dark') {
      setTheme(darkTheme);
      setThemeMode('dark');
    } else if (selectedMode === 'system') {   
      setTheme(systemColorScheme);
      setThemeMode('system');
    }
    // Persist the selected theme to AsyncStorage
    try {
      await AsyncStorage.setItem(THEME_KEY, theme === darkTheme ? 'dark' : (systemColorScheme === 'dark' ? 'dark' : 'light'));
    } catch (e) {
      console.error('Failed to save theme to AsyncStorage', e);
    }
  };

  useEffect(() => {
    loadTheme();
  }, []);

  // useEffect(() => {
  //   setSystemMode(systemColorScheme.backgroundColor === '#fff' ? 'light' : 'dark')
  // }, [systemColorScheme]);
  useEffect(() => {
    if(themeMode === 'system') {
      const systemTheme = systemColorScheme === 'dark' ? darkTheme : lightTheme;
      setTheme(systemTheme);
    }
  }, [systemColorScheme, themeMode]);

  return (
    <ThemeContext.Provider value={{ theme, changeTheme, themeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to access the theme
const useTheme = () => useContext(ThemeContext);

export { ThemeContext, ThemeProvider, useTheme };
