import { useContext } from 'react';
import { useRouter } from "expo-router";
import { TouchableOpacity, StyleSheet } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleRight } from '@fortawesome/pro-regular-svg-icons'; 

import { useNavigation } from '@react-navigation/native'; 

import { ThemeContext } from '@hooks/ThemeContext';
import { ThemedText, ThemedView } from '@/components/Themed/ThemedComponents';

// Define the props for ListItem
interface ListItemProps {
  title: string;    // Title must be a string
  link: string;
  badge?: string;   // Badge is optional (string)
  badgeColor?: string; 
}

const ListItem: React.FC<ListItemProps> = ({ title, link, badge, badgeColor }) =>{
  const { theme } = useContext(ThemeContext); // Get the current theme from context
  const router = useRouter(); 
  const navigation = useNavigation(); 

  // Define the props for ListItem
  interface ListItemProps {
    title: string;    // Title must be a string
    link: string;
    badge?: string;   // Badge is optional (string)
    badgeColor?: string; 
  }
  const handlePress = () => {
    router.push( link );
  };  
  return (
    <TouchableOpacity style={styles.listItem }
      onPress={handlePress} >
      <ThemedView style={ [styles.listItemLeft, {backgroundColor: theme.shadeColor}] }>
        <ThemedText style={ styles.listItemText }>{title}</ThemedText>
      </ThemedView>
      {badge && (
        <ThemedView style={ [styles.listItemBadgeContainer, { backgroundColor: badgeColor} ] }>
          <ThemedText style={styles.listItemBadge}>{badge}</ThemedText>
        </ThemedView>
      )}
      <FontAwesomeIcon icon={faAngleRight} size={24} color={theme.tintColor} />
    </TouchableOpacity>
  );
}
export default ListItem;

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 6,
    marginRight: 5,
    borderBottomColor: '#a0a0a0',
    borderBottomWidth: 0.5,
  },
  listItemLeft: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  listItemText: {
    fontSize: 16,
  },
  listItemBadgeContainer: {
    backgroundColor: '#0d6efd',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    marginRight: 10,
  },
  listItemBadge: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
})