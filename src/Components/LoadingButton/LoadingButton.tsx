import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from "react-native"
const LoadingButton = ({ title, onPress, isLoading, buttonStyle, textStyle }: any) => {
    return (
        <TouchableOpacity
            style={[styles.button, buttonStyle]}
            onPress={!isLoading ? onPress : null}
            disabled={isLoading}
        >
            {
                isLoading ? (
                    <ActivityIndicator size='small' color='white' />
                ) : (
                    <Text style={[styles.buttonText, textStyle]}>{title}</Text>
                )
            }
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    button: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width:272,
        alignSelf: 'center'
    },
    buttonText: {
        color: '#000',
        fontSize: 16,
    },
});

export default LoadingButton;