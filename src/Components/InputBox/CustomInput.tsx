import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const CustomInput = ({ value, onChangeText, placeholder,keyboardType }: any) => {
    return (
        <TextInput
            style={{  borderWidth: 1, borderColor: 'white', color: 'white', borderRadius: 5, marginTop: 16,padding:16,width:272,alignSelf:'center' }}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={'white'}
            keyboardType={keyboardType}
        />
    )
}

export default CustomInput

const styles = StyleSheet.create({})