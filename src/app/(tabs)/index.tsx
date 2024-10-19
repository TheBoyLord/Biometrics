import { useContext } from 'react';
import { ThemeContext } from '@hooks/ThemeContext';
import { useRouter } from "expo-router";
import { View, StyleSheet, TouchableOpacity, ActivityIndicator, Pressable} from 'react-native';

import { Colors } from '@constants/Colors';
import { ThemedText, ThemedView, ThemedFlatList } from '@/components/Themed/ThemedComponents';
import { faCheck } from '@fortawesome/pro-regular-svg-icons'; 

import { useMultiDataContext } from '@hooks/MultiDataContext';

import AccountSummary from '@components/AccountSummary';
import ActionBox from '@components/ActionBox';

export default function HomeScreen() {
  const { theme } = useContext(ThemeContext); // Get the current theme from context
  const { accountItems, contactItems, loading, error } = useMultiDataContext();
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

  const onApprovalRequests = () => {
    router.push({
      pathname: "/account/approvalRequest", 
    });
  };

  const onSetupDD = () => {
    router.push({
      pathname: "/account/setupGoCardless",  // Explicitly specify the pathname
    });
  };
  //=============================================================================================
  // We only need to handle loading and error state here (not on subsequent screens), as we will
  // use the dataContext so we have all the data already
  //=============================================================================================
  // Handle loading state
  if(loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  // Handle error state
  if(error) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={styles.error}>Error: {error}</ThemedText>
      </ThemedView>
    );
  }
  //=============================================================================================
  // Handle successful fetch
  return (
    <ThemedView style={styles.pageContainer}>
      <ThemedView style={styles.pageTitleContainer} >  
        <ThemedText style={styles.pageTitle}>My Accounts</ThemedText>
      </ThemedView>
     
        <ThemedView style={styles.listContainer}>
          <ThemedFlatList 
            data={accountItems}
            renderItem={renderAccountItem}
            ItemSeparatorComponent={() => <View style={styles.separator} />}  // Add a separator between items
            keyExtractor={(item) => item.id.toString()}  // Ensure each item has a unique key
            ListHeaderComponent={() => (
              <TouchableOpacity style={{paddingBottom: 10 }} onPress={() => onApprovalRequests() } >
                <ActionBox icon={faCheck} text="Approval requests" color={theme.tintColor} />
              </TouchableOpacity>
            )}    
            ListEmptyComponent={<ThemedText>No items available</ThemedText>} 
            contentContainerStyle={styles.flatListContent}
          />
        </ThemedView>  
     
      <ThemedView style={styles.footerContainer}>
        <Pressable onPress={onSetupDD} style={[styles.btnStd, {backgroundColor:Colors.dark.jrRed}]}>
          <ThemedText style={styles.btnStdText}>Set up GoCardless DD</ThemedText>
        </Pressable>
      </ThemedView>
    </ThemedView>
  );
}
const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  pageTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5,
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
    marginTop: 16,
  },
  listContainer: {
    flex: 1,  // Ensures the FlatList takes up available space
    padding: 5,
  },
  separator: {
    height: 10, // Adjust the height for vertical spacing
  },
  error: {
    color: 'red',
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnStd: {
    borderRadius: 50,
    alignItems: 'center',
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
  flatListContent: {
    flexGrow: 1, // Makes FlatList content grow to fill the screen
    justifyContent: 'flex-start', // Ensure the items are packed at the top
    paddingBottom: 100, // Give some space for the footer
  },
  flatListFooter: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center', // Center the content inside the footer
  },

});
