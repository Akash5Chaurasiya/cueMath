import { StyleSheet, Text, View, SafeAreaView, Alert, KeyboardAvoidingView, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import CustomInput from '../Components/InputBox/CustomInput'
import LoadingButton from '../Components/LoadingButton/LoadingButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }: any) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const storedData = AsyncStorage.getItem('auth');
    console.log(storedData)
    const [loading, setLoading] = useState(false);
    const handleChange = (fieldName: any, value: any) => {
        setFormData((prev) => ({
            ...prev,
            [fieldName]: value
        }))
    }
    const handleLogin = async () => {
        try {
            const storedData = await AsyncStorage.getItem('auth');
            if (storedData) {
                const parsedData = JSON.parse(storedData);
                if (parsedData.email == formData.email && parsedData.password == formData.password) {
                    ToastAndroid.show('Login Successful', ToastAndroid.SHORT)
                    setFormData({
                        email: '',
                        password: '',
                    })
                    navigation.navigate('Dashboard')
                } else {
                    Alert.alert('Login failed');
                    ToastAndroid.show('Login Failed', ToastAndroid.SHORT)
                }
            } else {
                Alert.alert('SignUp First')
                console.log("No Data")
            }
        } catch (error) {
            Alert.alert('SignUp First')
            console.error('Error retrieving data from AsyncStorage:', error);
        }
    }
    return (
        <SafeAreaView style={{ backgroundColor: '#000', flex: 1 }}>
            <KeyboardAvoidingView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: '10%' }}>
                        <View>
                            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }} >CUEMATH </Text>
                        </View>
                        <View>
                            <Text style={{ color: 'yellow', marginLeft: 5, fontSize: 20, fontWeight: 'bold' }}>Go!</Text>
                        </View>
                    </View>
                    <View style={{ justifyContent: 'center', marginTop: 63 }}>
                        <View>
                            <CustomInput
                                value={formData.email}
                                onChangeText={(e: any) => handleChange('email', e)}
                                placeholder={"Email ID"}
                                keyboardType={"email-address"}
                            />
                        </View>
                        <View>
                            <CustomInput
                                value={formData.password}
                                onChangeText={(e: any) => handleChange('password', e)}
                                placeholder={"Password"}
                                keyboardType={"default"}
                            />
                        </View>
                    </View>
                </View>
                <View style={{ justifyContent: 'flex-end', marginBottom: 56 }}>
                    <LoadingButton
                        title="Login"
                        isLoading={loading}
                        onPress={handleLogin}
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default Login

const styles = StyleSheet.create({})