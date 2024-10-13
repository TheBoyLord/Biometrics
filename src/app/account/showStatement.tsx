import React, { useState, useEffect, useContext, useLayoutEffect } from 'react';
import { StyleSheet, TouchableOpacity, ActivityIndicator, View, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { useRoute } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import { useNavigation } from 'expo-router';

import { ThemeContext } from '@hooks/ThemeContext';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/pro-regular-svg-icons'; 

import useFetch from '@hooks/useFetch';

interface PdfViewerProps {
  url: string; // Accept URL as a prop
}

interface PdfResponse {
  status: string;
  message: string;
  pdfUrl: string; // This is the URL for the generated PDF
}

// const showStatement: React.FC<PdfViewerProps> = ({ url }) => {
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
  const [isRendered, setIsRendered] = useState(false);
  const [loading, setLoading] = useState(true);

  // Step 1: Call the API to generate the PDF using your custom hook
  const { data: pdfData, loading: generatingPdf, error: generationError } = useFetch<PdfResponse>(
    `https://internaltest.jacrox.cloud/api/mobAction.php?page=statements/createPDF&params=${accountCode}|0|1`
  );
  // Step 2: Download and display the PDF once the URL is available
  useEffect(() => {
    console.log('PDF Data:', pdfData);
    if (pdfData && pdfData.pdfUrl) {
      const downloadPDF = async () => {
        try {
          const pdfUrl = pdfData.pdfUrl; // Get the URL from the API response
          const response = await fetch(pdfUrl);
          const blob = await response.blob();
          // Convert the blob to base64
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = async () => {
            if (typeof reader.result === 'string') {
              const base64data = reader.result.split(',')[1]; // Remove the data URL prefix
              if (base64data) {
                // Save the base64 PDF to local file system
                const fileUri = FileSystem.documentDirectory + `${accountCode}-statement.pdf`;
                await FileSystem.writeAsStringAsync(fileUri, base64data, {
                  encoding: FileSystem.EncodingType.Base64,
                });
                setPdfUri(fileUri); // Set the local file URI to display in WebView
              }
            }
          };
        } catch (error) {
          Alert.alert('Error', 'Failed to download the PDF');
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
      downloadPDF(); // Download the PDF using the provided URL
    } else if (generationError) {
      Alert.alert('Error', 'Failed to generate the PDF');
      console.error('PDF Generation Error:', generationError);
    }
  }, [pdfData, generationError, accountCode]);

  // Step 3: Trigger the delete after the PDF has been rendered in the WebView
  const { loading: deletingPdf, error: deleteError } = useFetch<string>(
    isRendered ? `https://internaltest.jacrox.cloud/api/deleteFile.php?filename=/statements/${accountCode}.pdf` : ''
  );

   // Show loading indicator while generating or downloading the PDF
   if (generatingPdf || !pdfUri || deletingPdf) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return pdfUri ? (
      <WebView
        source={{ uri: pdfUri }}
        originWhitelist={['*']}
        allowingReadAccessToURL={pdfUri} // Ensures that iOS can read local file URLs
        style={styles.webView}
        onLoadEnd={() => {
          setIsRendered(true); // Set the rendered state after WebView finishes loading
        }}
      />
    
  ) : (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
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
