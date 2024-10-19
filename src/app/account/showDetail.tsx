import { useContext } from 'react';
import { Stack, useLocalSearchParams } from "expo-router";
import { TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { useRouter } from "expo-router";

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faFilePdf, faList, faFaceSmile, faPeopleGroup, faAddressBook, faCircleHalfStroke, faBell, faRightToBracket, faSparkles } from '@fortawesome/pro-regular-svg-icons'; 

import { ThemeContext } from '@hooks/ThemeContext';
import { ThemedText, ThemedView, ThemedSafeAreaView, ThemedStatusBar } from '@/components/Themed/ThemedComponents';

import { useMultiDataContext } from '@hooks/MultiDataContext';

import AccountSummary from '@components/AccountSummary';
import Address from '@components/Address';
import Team from '@components/Team';
import ActionBox from '@components/ActionBox';
import ListItem from '@/components/ListItem';

export default function ShowDetailScreen() {
  const { accountItems, bookmarkItems, loading, error } = useMultiDataContext();
  const { theme } = useContext(ThemeContext); // Get the current theme from context
  const navigation = useNavigation(); 
  const { accountCode } = useLocalSearchParams();  // Retrieve the query parameters

  const router = useRouter();

  const DATA = [
    // { id: '1', icon: faKey, iconColor: theme.jrRed, title: 'Change passkey', link: '/user/todo' },
    // { id: '2', icon: faFingerprint, iconColor: '#6666ff', title: 'Face ID login', link: '/user/todo' },
    // { id: '3', icon: faCircleHalfStroke, iconColor: '#8d8d8d', title: 'App appearance', link: '/user/theme' },
    // { id: '4', icon: faBell, iconColor: '#A010A2', title: 'Notification settings', link: '/user/todo' },
    // { id: '5', icon: faRightToBracket, iconColor: '#44aa44', title: 'User login', link: '/user/login', badge: 'New', badgeColor: '#0d6efd'},      
    // { id: '6', icon: faSparkles, iconColor: '#ff5d3f', title: 'Onboarding', link: '/day2/onboarding', badge: '1', badgeColor: '#990024' },            
    { id: '1', icon: faAddressBook, iconColor: theme.jrRed, title: 'Address', link: '/user/addressScreen' },
    { id: '2', icon: faPeopleGroup, iconColor: theme.jrRed, title: 'Team', link: 'account/teamScreen' },
    { id: '3', icon: faCircleHalfStroke, iconColor: theme.jrRed, title: 'App appearance', link: '/user/theme' },
    { id: '4', icon: faBell, iconColor: theme.jrRed, title: 'Notification settings', link: '/user/todo' },
    { id: '5', icon: faRightToBracket, iconColor: theme.jrRed, title: 'User login', link: '/user/login', badge: 'New', badgeColor: '#0d6efd'},      
    { id: '6', icon: faSparkles, iconColor: theme.jrRed, title: 'Onboarding', link: '/day2/onboarding', badge: '1', badgeColor: '#990024' },            
  ];

  const handleShowStatement = (accountCode: string) => {
    router.push({
      pathname: "/account/showStatement", 
      params: {accountCode},
    });
  };
  const handleShowAddress = (accountCode: string) => {
    router.push({
      pathname: "/account/showAddress", 
      params: {accountCode},
    });
  };
  const handleShowTeam = (accountCode: string) => {
    router.push({
      pathname: "/account/showTeam", 
      params: {accountCode},
    });
  };
  const handleShowJobs = (accountCode: string) => {
    router.push({
      pathname: "/account/showJobs", 
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
  // Ensure cchBalance is a number
  const cchBalance = parseFloat((accountItem?.ddCCHBalance ?? 0).toString());

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
                
            <TouchableOpacity onPress={() => handleShowAddress(`${accountCode}`) } >
              <ActionBox icon={faAddressBook} text="Address details" color={theme.tintColor} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleShowTeam(`${accountCode}`) } >
              <ActionBox icon={faPeopleGroup} text="My Team" color={theme.tintColor}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleShowJobs(`${accountCode}`) } >
              <ActionBox icon={faList} text="My Jobs" color={theme.tintColor}/>
            </TouchableOpacity>
          
            <ThemedView key={bookmarkItem?.id} style={{gap: 10}}>        
              <Address item={bookmarkItem}></Address>
              <Team item={bookmarkItem}></Team>
              <ThemedView style={[styles.box, {backgroundColor: theme.shadeColor}]}>
                <ListItem icon={DATA[0].icon} iconColor={DATA[0].iconColor} title={DATA[0].title} link={DATA[0].link} badge={DATA[0].badge} badgeColor={DATA[0].badgeColor}  />
                <ListItem icon={DATA[1].icon} iconColor={DATA[1].iconColor} title={DATA[1].title} link={DATA[1].link} badge={DATA[1].badge} badgeColor={DATA[1].badgeColor}  />
                <ListItem icon={DATA[2].icon} iconColor={DATA[2].iconColor} title={DATA[2].title} link={DATA[2].link} badge={DATA[2].badge} badgeColor={DATA[2].badgeColor}  />
                <ListItem icon={DATA[3].icon} iconColor={DATA[3].iconColor} title={DATA[3].title} link={DATA[3].link} badge={DATA[3].badge} badgeColor={DATA[3].badgeColor}  />
              </ThemedView>
            </ThemedView>
            
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