import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const WebViewComponent = ({ webViewVisible, actualData }: any) => {
    return (
        <View style={{ flex: 1, alignItems: 'flex-end', }}>
            {webViewVisible && actualData && (
                <WebView
                    source={{ uri: `https://example.com?name=${actualData.name}&age=${actualData.age}` }}
                    scalesPageToFit={true}
                    onError={(syntheticEvent) => {
                        const { nativeEvent } = syntheticEvent;
                        console.error('WebView error:', nativeEvent);
                    }}
                    style={{
                        width: 320,
                        height: 300,
                        backgroundColor: 'yellow',  
                        borderWidth: 1, 
                        borderColor: 'red', 
                    }}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    startInLoadingState={true}
                />
            )}
        </View>
    );
};

export default WebViewComponent;
