import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import * as FileSystem from 'expo-file-system';

const showPDF: React.FC = () => {
  const [pdfUri, setPdfUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const downloadPDF = async () => {
      try {
        // Fetch the PDF from the server
        const response = await fetch('https://internaltest.jacrox.cloud/statements/LOR010.pdf');
        const blob = await response.blob();

        // Convert the blob to base64 (since expo-file-system doesn't support direct blobs)
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = async () => {
          if (typeof reader.result === 'string') {
            const base64data = reader.result.split(',')[1]; // Remove the data URL prefix

            if (base64data) {
              // Save the base64 PDF to local file system
              const fileUri = FileSystem.documentDirectory + 'your-pdf-file.pdf';
              await FileSystem.writeAsStringAsync(fileUri, base64data, {
                encoding: FileSystem.EncodingType.Base64,
              });

              setPdfUri(fileUri); // Set the local file URI to display in WebView
            }
          }
        };
      } catch (error) {
        Alert.alert('Error', 'Failed to download PDF');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    downloadPDF();
  }, []);

  if (loading) {
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
      style={{ flex: 1 }}
    />
  ) : (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default showPDF;
