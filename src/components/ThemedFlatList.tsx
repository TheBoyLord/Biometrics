import React, { useContext } from 'react';
import { FlatList, FlatListProps, StyleProp, ViewStyle } from 'react-native';
import { ThemeContext } from '@hooks/ThemeContext';

// Define the ThemedFlatList component as a generic to accept any type of data
const ThemedFlatList = <T,>(props: FlatListProps<T>) => {
  const { theme } = useContext(ThemeContext); // Get the current theme from context

  // Merge the theme-based style with any custom styles passed via props
  const combinedStyle: StyleProp<ViewStyle> = [
    { backgroundColor: theme.backgroundColor }, // Apply theme-based background color
    props.style, // Any additional styles passed in
  ];

  // Return the FlatList with combined styles
  return <FlatList {...props} style={combinedStyle} />;
};

export default ThemedFlatList;
