import React, { useState, useEffect, useContext, useLayoutEffect } from 'react';
import { StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { useRoute } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import { useNavigation } from 'expo-router';

import { ThemeContext } from '@hooks/ThemeContext';
import { ThemedText, ThemedView } from '@/components/Themed/ThemedComponents';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/pro-regular-svg-icons'; 

import useFetch from '@hooks/useFetch';

interface PdfResponse {
  status: string;
  message: string;
  pdfData?: string; // This is the URL for the generated PDF
}

const showStatement: React.FC = () => {
  const route = useRoute();
  const { theme } = useContext(ThemeContext); // Get the current theme from context
  const { accountCode } = route.params as { accountCode: string }; // Get accountCode from route params
  const navigation = useNavigation();

  // Dynamically set the title and back button behavior
  useLayoutEffect(() => {
    navigation.setOptions({
      //title: `${accountCode}`, // Set the dynamic title
      title: 'Statement',
      headerShown: true, 
      headerStyle: { backgroundColor: theme.headerBackgroundColor },
      headerTintColor: theme.headerTextColor,
      contentStyle: { backgroundColor: theme.backgroundColor },
      headerTitleStyle: { color: theme.textColor },  
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} >
          <FontAwesomeIcon icon={faArrowLeft} size={24} color={theme.headerBackColor} />
        </TouchableOpacity>
      )

    });
  }, [navigation, accountCode]);
  
  const [pdfUri, setPdfUri] = useState<string | null>(null);
  const [pdfError, setPdfError] = useState<string | null>(null);

  // Step 1: Generate the PDF
  const { data: pdfData, loading: generatingPdf, error: generationError } = useFetch<PdfResponse>(
    `https://internaltest.jacrox.cloud/api/mobAction.php?page=statements/createPDFData&params=${accountCode}`
  );
  // Step 2: Save the PDF to local filesystem once the data is returned
  useEffect(() => {
    if (pdfData) {
      if (pdfData.status === 'OK' && pdfData.pdfData) {
        const savePDF = async () => {
          try {
            const base64data = pdfData.pdfData!; // Get the base64 PDF data
            const fileUri = FileSystem.documentDirectory + `${accountCode}-statement.pdf`;
            await FileSystem.writeAsStringAsync(fileUri, base64data, {
              encoding: FileSystem.EncodingType.Base64,
            });
            setPdfUri(fileUri); // Set the local file URI to display in WebView
          } catch (error) {
            Alert.alert('Error', 'Failed to save the PDF');
            console.error('PDF Save Error:', error);
            setPdfError('Failed to save the PDF');
          }
        };
        savePDF();
      } else if (pdfData.status === 'WARNING' || pdfData.status === 'FAILED') {
        // Handle cases where there's no PDF to download
        setPdfError(pdfData.message);
      }
    } else if(generationError) {
      Alert.alert('Error', 'Failed to generate the PDF');
      console.error('PDF Generation Error:', generationError);
      setPdfError('Failed to generate the PDF');
    }
  }, [pdfData, generationError, accountCode]);

   // Step 3: Display the error if any
  if (pdfError) {
    return (
      <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ThemedText>{pdfError}</ThemedText>
      </ThemedView>
    );
  }

  // Step 4: Show loading indicator while generating the PDF
  if (generatingPdf || !pdfUri) {
    return (
      <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }

  // Step 5: Show the PDF in WebView after it has been saved
  return pdfUri ? (
    <WebView
      source={{ uri: pdfUri }}
      originWhitelist={['*']}
      allowingReadAccessToURL={pdfUri}
      style={styles.webView}
    />
  ) : (
    <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </ThemedView>
  );
};


export default showStatement;

const styles = StyleSheet.create({
  page: {
    justifyContent: 'center',
    flex: 1,
  },
  webView: {
    flex: 1,
  },
});
