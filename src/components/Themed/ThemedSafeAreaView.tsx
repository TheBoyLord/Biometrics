import React, { useContext } from 'react';
import { SafeAreaView, ViewProps, StyleProp, ViewStyle } from 'react-native';
import { ThemeContext } from '@hooks/ThemeContext';

// ThemedSafeAreaView Component
const ThemedSafeAreaView: React.FC<ViewProps> = (props) => {
  const { theme } = useContext(ThemeContext); // Get the current theme from context

  // Merge the theme's background color with any custom styles
  const combinedStyle: StyleProp<ViewStyle> = [
    { backgroundColor: theme.backgroundColor },
    props.style,
  ];

  return <SafeAreaView {...props} style={combinedStyle} />;
};

export default ThemedSafeAreaView;
