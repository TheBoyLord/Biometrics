import { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeContext } from '@hooks/ThemeContext';

const ThemedStatusBar = () => {
  const { theme } = useContext(ThemeContext); // Get the current theme from context

  // Determine whether to use 'light-content' or 'dark-content' based on the theme background color
  const isDarkBackground = theme.backgroundColor === '#151718'; // Adjust this condition based on your theme colors
  
  return (
    <StatusBar
      style={isDarkBackground ? 'light' : 'dark'} // Set the status bar text/icon style (light or dark)
      backgroundColor='#000000' // Set the background color for Android
      animated={true} // Enable animation for status bar transitions
    />
  );
};

export default ThemedStatusBar;
