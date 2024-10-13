import React from 'react';
import { Text, TextProps, StyleProp, TextStyle } from 'react-native';
import { useContext } from 'react';
import { ThemeContext } from '@hooks/ThemeContext';

// Define the ThemedText component
const ThemedText: React.FC<TextProps> = (props) => {
  const { theme } = useContext(ThemeContext); // Get the current theme from context
  // Merge the theme-based style with any custom styles passed via props
  const combinedStyle: StyleProp<TextStyle> = [
    { color: theme.textColor },   // Theme-based text color
    props.style,                  // Any additional styles passed in
  ];

  return <Text {...props} style={combinedStyle} />;
};

export default ThemedText;
