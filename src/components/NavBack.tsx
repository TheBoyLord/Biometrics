import { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { Stack, useRouter } from "expo-router";

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/pro-regular-svg-icons'; 

import { ThemeContext } from '@hooks/ThemeContext';
import { ThemedStatusBar } from '@/components/Themed/ThemedComponents';

// Define the props for ListItem
interface NavBackProps {
  title: string;
}

const NavBack: React.FC<NavBackProps> = ({ title }) =>{
  const { theme } = useContext(ThemeContext); // Get the current theme from context
  const navigation = useNavigation(); 

  const router = useRouter();

  return (
    <>
      <ThemedStatusBar />
      <Stack.Screen options={{ 
        headerShown: true, 
        headerStyle: { backgroundColor: theme.headerBackgroundColor, },
        headerTintColor: theme.headerTextColor, 
        contentStyle: { backgroundColor: theme.backgroundColor, },
        headerTitleStyle: { color: theme.textColor },  
        title: title, 
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()} >
            <FontAwesomeIcon icon={faArrowLeft} size={24} color={theme.headerBackColor} />
          </TouchableOpacity>
        )
        }} 
      />
    </>
  )
}
export default NavBack;