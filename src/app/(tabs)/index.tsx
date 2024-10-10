import { useContext } from 'react';
import { ThemeContext } from '@hooks/ThemeContext';
import { useRouter } from "expo-router";
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator, Pressable} from 'react-native';

import { Colors } from '@constants/Colors';
import ThemedText from '@components/ThemedText';
import ThemedView from '@components/ThemedView';
import ThemedStatusBar from '@components/ThemedStatusBar';
import ThemedFlatList from '@components/ThemedFlatList';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheck, faChevronRight } from '@fortawesome/pro-regular-svg-icons'; 

// import useFetch from '@hooks/useFetch';
import { useMultiDataContext } from '@hooks/MultiDataContext';

import AccountSummary from '@components/AccountSummary';

export default function HomeScreen() {
  const { theme } = useContext(ThemeContext); // Get the current theme from context
  const { accountItems, loading, error } = useMultiDataContext();
  const router = useRouter();

  // Render functions for different data types
  const renderAccountItem = ({ item }: any) => (
    <ThemedView>
      <TouchableOpacity
        key={item.id}
        onPress={() => {
          router.push({
            pathname: "/account/showDetail", 
            params: { accountCode: item.ddAccountNumber },
          });
        }}>
        <AccountSummary item={item}></AccountSummary>
      </TouchableOpacity>
    </ThemedView>
  );

  const onSetupDD = () => {
    router.push({
      pathname: "/account/setupGoCardless",  // Explicitly specify the pathname
    });
  };

  // Handle loading state
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  // Handle error state
  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Error: {error}</Text>
      </View>
    );
  }

  // Handle successful fetch
  return (
    <ThemedView style={styles.safeArea}>
      <ThemedStatusBar />
     
        <ThemedView style={styles.container} >  
          <ThemedView style={styles.titleContainer} >  
            <ThemedText style={styles.title}>My Accounts</ThemedText>
          </ThemedView>

          <ThemedView style={styles.subTitleContainer} >  
        
            <ThemedFlatList style={{gap: 8 }}
              data={accountItems}
              renderItem={renderAccountItem}
              ItemSeparatorComponent={() => <View style={styles.separator} />}  // Add a separator between items
              keyExtractor={(item) => item.id.toString()}  // Ensure each item has a unique key
              ListHeaderComponent={() => (
                <ThemedView style={styles.boxContainer}>
                  <ThemedView style={[styles.box, {backgroundColor: theme.shadeColor}]}>
                    <TouchableOpacity
                    key={1}
                    onPress={() => { 
                      router.push({
                        pathname: "/account/approvalRequest",  // Explicitly specify the pathname
                      });
                    }}>
                      <ThemedView style={[styles.approvalRow, {backgroundColor: theme.shadeColor}]}>
                        <ThemedView style={[styles.approvalLeftSection, {backgroundColor: theme.shadeColor}]}>
                          <FontAwesomeIcon icon={faCheck} size={20} color={theme.tintColor} />
                          <ThemedText style={styles.approvalText}>Approval requests</ThemedText>
                        </ThemedView>
                        <FontAwesomeIcon style={styles.approvalIconRight} icon={faChevronRight} size={20} color={theme.tintColor} />
                      </ThemedView>
                  </TouchableOpacity>
                  </ThemedView>
                </ThemedView>
              )}
            />
          
          </ThemedView>
          
          <ThemedView style={[styles.boxContainer, {flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'flex-end'}]}>
            <Pressable onPress={onSetupDD} style={[styles.btnStd, {backgroundColor:Colors.dark.jrRed}]}>
              <ThemedText style={styles.btnStdText}>Set up GoCardless DD</ThemedText>
            </Pressable>
          </ThemedView>
        
        </ThemedView>
        
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    justifyContent: 'center',
    flex: 1,
  },
  container: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
    marginTop: 16,
  },
  subTitleContainer: {
    padding: 10,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  boxContainer: {
    paddingTop: 10,
    paddingBottom: 20,  
  },
  box: {
    borderRadius: 10,
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  separator: {
    height: 20,  // Adjust the height for vertical spacing
  },
  error: {
    color: 'red',
  },
  approvalRow: {
    flexDirection: 'row',  // Arrange items horizontally
    justifyContent: 'space-between',  // Space between items (left and right)
    alignItems: 'center',  // Vertically align items in the center
    padding: 10,
  },
  approvalLeftSection: {
    flexDirection: 'row',  // Horizontal arrangement for the icon and text
    alignItems: 'center',  // Vertically center align the icon and text
  },
  approvalIconLeft: {
    //marginLeft: 'auto',  // Push the right icon to the far right
  },
  approvalText: {
    fontWeight: 'bold',
    marginLeft: 10,  // Add some space between the icons and text
  },
  approvalIconRight: {
    marginLeft: 'auto',  // Push the right icon to the far right
  },
  btnStd: {
    borderRadius: 50,
    alignItems: 'center',
    //flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  btnStdText: {
    color: '#FDFDFD',
    fontFamily: 'InterSemi',
    fontSize: 16,
    padding: 15,
    paddingHorizontal: 25,
  },
  
});
