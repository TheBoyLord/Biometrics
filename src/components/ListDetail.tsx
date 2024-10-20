import { useContext } from 'react';
import { useRouter } from "expo-router";
import { TouchableOpacity, StyleSheet } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleRight } from '@fortawesome/pro-regular-svg-icons'; 

import { useNavigation } from '@react-navigation/native'; 

import { ThemeContext } from '@hooks/ThemeContext';
import { ThemedText, ThemedView } from '@/components/Themed/ThemedComponents';

// Define the props for ListItem
interface ListDetailProps {
  title: string;    // Title must be a string
  value: string;
  link?: string;
}

const ListDetail: React.FC<ListDetailProps> = ({ title, value, link }) =>{
  const { theme } = useContext(ThemeContext); // Get the current theme from context
  const router = useRouter(); 
  const navigation = useNavigation(); 

  const handlePress = () => {
    router.push( {pathname: link} );
  };  

  return (
  <TouchableOpacity 
    style={[styles.listItem, !link && styles.disabledListItem]}
    onPress={link ? handlePress : undefined}
    disabled={!link}  >
    <ThemedView style={[styles.listItemContainer, { backgroundColor: theme.shadeColor }]}>
      <ThemedText style={styles.listItemTitleText} numberOfLines={1} >{title}</ThemedText>
      <ThemedView style={[styles.listItemRight, { backgroundColor: theme.shadeColor }]}>
        <ThemedText style={[styles.listItemValueText, {color: theme.jrGrey}]} numberOfLines={1} ellipsizeMode="tail">{value}</ThemedText>
        {link ? (
          <FontAwesomeIcon icon={faAngleRight} size={24} color={theme.tintColor} />
        ) : (<></>)}
      </ThemedView>
    </ThemedView>
  </TouchableOpacity>
  );
}
export default ListDetail;

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    padding: 14,
    alignItems: 'center',
    borderBottomColor: '#a0a0a0',
    borderBottomWidth: 0.5,
  },
  listItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Ensure left and right sections are spaced out
    flex: 1,
    alignItems: 'center',
    minWidth: 0, // Prevents flexbox constraints from cutting off the text
  },
  listItemTitleText: {
    flex: 1, // Allows the title to take up the available space
    textAlign: 'left',
    flexShrink: 1, // Shrinks the text to prevent overflow
    flexWrap: 'wrap', // Wraps the text to the next line if it's too long
    minWidth: 0, // Prevents flexbox constraints from cutting off the text
  },
  listItemRight: {
    flexDirection: 'row', // Ensure the value and icon are laid out horizontally
    alignItems: 'center',
    justifyContent: 'flex-end', // Align the text and icon to the right
  },
  listItemValueText: {
    marginRight: 10, // Add space between the value text and the icon (if present)
    textAlign: 'right',
    flexShrink: 1, // Prevent overflow by shrinking the value text
    //flexWrap: 'wrap', // Ensure the value text wraps if it's too long
  },
  disabledListItem: {
    // Optionally reduce opacity or add disabled styles
  },
});
