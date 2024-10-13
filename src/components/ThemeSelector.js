import { useState, useEffect, useContext } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSunBright, faSimCard } from '@fortawesome/pro-regular-svg-icons'; 
import { faMoonStars } from '@fortawesome/pro-solid-svg-icons'; 


// App Storage
import AsyncStorage from '@react-native-async-storage/async-storage';
// Theme
import ThemedText from '@/components/Themed/ThemedText';
import ThemedView from '@/components/Themed/ThemedView';
import { ThemeContext } from '@hooks/ThemeContext';

const ThemeSelector = () => {
  const { theme, changeTheme, themeMode } = useContext(ThemeContext);

  const radioOptions = [
    { label: 'Light', value: 'light', icon: faSunBright },
    { label: 'Dark', value: 'dark', icon: faMoonStars },
    { label: 'Use device settings', value: 'system', icon: faSimCard },
  ];

  //==================================================================================== 
  // Fetch the theme from AsyncStorage when the app starts
  //====================================================================================
  const [appTheme, setAppTheme] = useState();

  useEffect(() => {
    const loadAppTheme = async () => {
      const savedAppTheme = (await AsyncStorage.getItem('@app_theme'));
      setAppTheme(savedAppTheme);
    };
    loadAppTheme();
  }, []);
  
  // Store the theme with the correct type
  const storeAppTheme = async (appTheme) => {
    try {
      await AsyncStorage.setItem('@app_theme', appTheme);
    } catch (e) {
      console.error('Failed to save the appTheme.', e);
    }
  };

  return (
    <ThemedView style={[styles.optionBox, { backgroundColor: theme.highlightColor }]}>
      <ThemedView styles={[styles.optionRow, { backgroundColor: theme.highlightColor }]}>
      {radioOptions.map((option) => (
        <ThemedView key={option.value}>
            <TouchableOpacity
            key={option.value}
            style={[styles.radioContainer, { backgroundColor: theme.highlightColor, borderColor: theme.jrGrey }]}
            onPress={() => { 
              changeTheme(option.value); 
              storeAppTheme(option.value); 
              setAppTheme(option.value);
            }}>
            <ThemedView style={[styles.leftContainer, { backgroundColor: theme.highlightColor }]}>
              <ThemedView style={[styles.radioButton, { borderColor: (themeMode === option.value ? theme.tintColor : theme.textColor) }]}>
                {themeMode === option.value && <View style={[styles.radioButtonSelected, { borderColor: theme.tintColor, backgroundColor: theme.tintColor }]} />}
              </ThemedView>
              <ThemedText style={styles.label}>{option.label}</ThemedText>
            </ThemedView>
            <FontAwesomeIcon style={styles.icon} icon={option.icon} size={20} color={(themeMode === option.value ? theme.tintColor : theme.textColor)} />
          </TouchableOpacity>
        </ThemedView>
      ))}
      </ThemedView>
      
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  optionBox: {
    marginTop: 30,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 15,
  },
  optionRow: {
    flexDirection: 'column',

  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', 
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 0.25,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    height: 10,
    width: 10,
    borderRadius: 5,
  },
  label: {
    marginLeft: 10,
    fontSize: 16,
  },
  icon: {
    alignContent: 'flex-end'
  },
});

export default ThemeSelector;
