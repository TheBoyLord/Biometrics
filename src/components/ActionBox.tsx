import React from 'react';

import { useContext } from 'react';
import { ThemeContext } from '@hooks/ThemeContext';
// import { useRouter } from "expo-router";

import { StyleSheet, TouchableOpacity } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronRight } from '@fortawesome/pro-regular-svg-icons'; 
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'; // For typing the icon prop

import ThemedText from '@/components/Themed/ThemedText';
import ThemedView from '@/components/Themed/ThemedView';

// Define the type for the props
interface ActionBoxProps {
  icon: IconDefinition;  // FontAwesome icons follow the IconDefinition type
  text: string;          // The label text to display
}

const ActionBox: React.FC<ActionBoxProps> = ({ icon, text }) => {
  const { theme } = useContext(ThemeContext); // Get the current theme from context

  return (
    <ThemedView style={styles.boxContainer}>
      <ThemedView style={[styles.box, { backgroundColor: theme.shadeColor }]}>
        <ThemedView style={[styles.actionRow, { backgroundColor: theme.shadeColor }]}>
          <ThemedView style={[styles.actionLeftSection, { backgroundColor: theme.shadeColor }]}>
            <FontAwesomeIcon icon={icon} size={20} color={theme.tintColor} />
            <ThemedText style={styles.actionText}>{text}</ThemedText>
          </ThemedView>
          <FontAwesomeIcon style={styles.actionIconRight} icon={faChevronRight} size={20} color={theme.tintColor} />
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  boxContainer: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  box: {
    borderRadius: 10,
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  actionRow: {
    flexDirection: 'row', // Arrange items horizontally
    justifyContent: 'space-between', // Space between items (left and right)
    alignItems: 'center', // Vertically align items in the center
    padding: 5,
  },
  actionLeftSection: {
    flexDirection: 'row', // Horizontal arrangement for the icon and text
    alignItems: 'center', // Vertically center align the icon and text
  },
  actionIconLeft: {
    
  },
  actionText: {
    fontWeight: 'bold',
    marginLeft: 10, // Add some space between the icons and text
  },
  actionIconRight: {
    marginLeft: 'auto', // Push the right icon to the far right
  },
});

export default ActionBox;
