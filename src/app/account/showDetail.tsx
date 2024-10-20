import { useContext } from 'react';
import { Stack, useLocalSearchParams } from "expo-router";
import { TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { useRouter } from "expo-router";

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faFilePdf, faList, faFaceSmile, faPeopleGroup, faAddressBook, faCircleHalfStroke, faBell, faRightToBracket, faSparkles } from '@fortawesome/pro-regular-svg-icons'; 

import { ThemeContext } from '@hooks/ThemeContext';
import { ThemedText, ThemedView, ThemedSafeAreaView, ThemedStatusBar } from '@/components/Themed/ThemedComponents';

import { useMultiDataContext } from '@hooks/MultiDataContext';

import AccountSummary from '@components/AccountSummary';
import ActionBox from '@components/ActionBox';

export default function ShowDetailScreen() {
  const { accountItems, bookmarkItems, contactItems, loading, error } = useMultiDataContext();
  const { theme } = useContext(ThemeContext); // Get the current theme from context
  const navigation = useNavigation(); 
  const { accountCode } = useLocalSearchParams();  // Retrieve the query parameters

  const router = useRouter();

  interface ActionProps {
    icon: String;
    text: string;
    link: string;
  }

  const DATA = [
    { id: '0', icon: faAddressBook, text: 'Address/Contact details', link: '/account/showAddress' },
    { id: '1', icon: faPeopleGroup, text: 'Personal details', link: 'account/showClient' },
    { id: '2', icon: faPeopleGroup, text: 'My Team', link: '/account/showTeam' },
    { id: '3', icon: faList, text: 'My Jobs', link: '/account/showJobs' },
  ];

  const handleShowStatement = (accountCode: string) => {
    router.push({
      pathname: "/account/showStatement", 
      params: {accountCode},
    });
  };

  const handleAction = (accountCode: string, link: string) => {
    router.push({
      pathname: link, 
      params: {accountCode},
    });
  };
  //=============================================================================================
  // We only need to handle loading and error state here (not on subsequent screens), as we will
  // use the dataContext so we have all the data already
  //
  // Do we need this here now???
  //=============================================================================================
  // Handle loading state
  if(loading) {
    return (
      <ThemedView style={styles.container}>
        <ActivityIndicator size="large" color="#990024" />
      </ThemedView>
    );
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
  //=============================================================================================
  // Step 1: Filter the data for a specific accountCode  
  const accountItem = accountItems?.find((accountItem) => accountItem.ddAccountNumber === accountCode);
  const bookmarkItem = bookmarkItems?.find((bookmarkItem) => bookmarkItem.clientCode === accountCode);
  const contactItem = contactItems?.find((contactItem) => contactItem.clientCode === accountCode);
  // Ensure cchBalance is a number
  const cchBalance = parseFloat((accountItem?.ddCCHBalance ?? 0).toString());
  const contactType = contactItem?.contacttype;

  return (
    <ThemedSafeAreaView style={styles.page}>
      <ThemedStatusBar />
      <Stack.Screen options={{ 
        headerShown: true, 
        headerStyle: { backgroundColor: theme.headerBackgroundColor, },
        headerTintColor: theme.headerTextColor, 
        contentStyle: { backgroundColor: theme.backgroundColor, },
        headerTitleStyle: { color: theme.textColor },  
        title: "Account", 
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()} >
            <FontAwesomeIcon icon={faArrowLeft} size={24} color={theme.headerBackColor} />
          </TouchableOpacity>
        )
        }} 
      />
      <ThemedView style={styles.pageContent} >  
        <ScrollView style={{backgroundColor: theme.backgroundColor }}>
          <ThemedView style={{gap: 10}}>      
            <AccountSummary key={accountItem?.id} item={accountItem}></AccountSummary>
            {cchBalance === 0 ? ( 
            <ActionBox icon={faFaceSmile} text="Happy days, no balance!" color='green'/>
            ) : (
            <TouchableOpacity onPress={() => handleShowStatement(`${accountCode}`) } >
              <ActionBox icon={faFilePdf} text="Show statement" color={theme.tintColor} fontWeight='bold'/>
            </TouchableOpacity>
            )} 
                
            {DATA.map((item, index) => {
            // Conditionally change the text for the third item based on accountType
            const text =
              index === 1
                ? contactType == 'Other Person'
                  ? 'Personal details'
                  : 'Company details'
                : item.text;

            return (
              <TouchableOpacity key={item.id} onPress={() => handleAction(`${accountCode}`, item.link) } >
                <ActionBox icon={item.icon} text={text} color={theme.tintColor} />
              </TouchableOpacity>
            );
          })}
          </ThemedView >
        </ScrollView> 
      </ThemedView>
    </ThemedSafeAreaView> 
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  error: {
    color: 'red',
  },
  page: {
    justifyContent: 'center',
    flex: 1,
  },
  pageContent: {
    padding: 10,
    flex: 1,
    gap: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    paddingTop: 24,
  },
  item: {
    marginBottom: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  box: {
    borderRadius: 10,
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
   
  },
})