import { View, Text, StyleSheet } from 'react-native';

export default function IndexScreen() {
  
  return (
    <View style={styles.container}>
      <Text style={styles.titleContainer}>index for /user/index</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

});
