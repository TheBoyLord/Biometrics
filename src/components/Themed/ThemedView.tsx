import React from 'react';
import { View, ViewProps, StyleProp, ViewStyle } from 'react-native';
import { useContext } from 'react';
import { ThemeContext } from '@hooks/ThemeContext';

// Define the ThemedView component
const ThemedView: React.FC<ViewProps> = (props) => {
  const { theme } = useContext(ThemeContext); // Get the current theme from context

  // Merge the theme-based style with any custom styles passed via props
  const combinedStyle: StyleProp<ViewStyle> = [
    { backgroundColor: theme.backgroundColor },   // Theme-based text color
    props.style,                                  // Any additional styles passed in
  ];

  return <View {...props} style={combinedStyle} />;
};

export default ThemedView;