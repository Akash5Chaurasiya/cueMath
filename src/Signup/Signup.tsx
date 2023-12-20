import { Alert, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomInput from '../Components/InputBox/CustomInput'
import { useSafeAreaFrame } from 'react-native-safe-area-context'
import LoadingButton from '../Components/LoadingButton/LoadingButton'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Signup = ({ navigation }: any) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        age: 0
    });
    const [loading, setLoading] = useState(false);
    const handleChange = (fieldName: any, value: any) => {
        setFormData((prev) => ({
            ...prev,
            [fieldName]: value
        }))
    }
    const handleSignUp = async () => {
        try {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                Alert.alert('Invalid email format');
                return;
            }
            if (formData.password !== formData.confirmPassword) {
                Alert.alert('Password and confirm password should match');
                return;
            }
            if (formData.password.length < 8) {
                Alert.alert('Password should be at least 8 characters long');
                return;
            }
            setLoading(true);
            console.log(formData);
            await AsyncStorage.setItem('auth', JSON.stringify(formData));
            ToastAndroid.show('Sign up successful', ToastAndroid.SHORT)
            setLoading(false);
        } catch (error) {
            console.error('Error during signup:', error);
            setLoading(false);
            Alert.alert('An error occurred during signup. Please try again.');
        } finally {
            setFormData({
                email: '',
                password: '',
                confirmPassword: '',
                firstName: '',
                age: 0
            })
            navigation.navigate('Home')
        }
    };
    return (
        <SafeAreaView style={{ backgroundColor: '#000', flex: 1 }}>
            <KeyboardAvoidingView style={{ flex: 1 }}>
                <View>
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
                        <View>
                            <CustomInput
                                value={formData.confirmPassword}
                                onChangeText={(e: any) => handleChange('confirmPassword', e)}
                                placeholder={"Confirm Password"}
                                keyboardType={"default"}
                            />
                        </View>
                        <View>
                            <CustomInput
                                value={formData.firstName}
                                onChangeText={(e: any) => handleChange('firstName', e)}
                                placeholder={"First Name"}
                                keyboardType={"default"}
                            />
                        </View>
                        <View>
                            <CustomInput
                                value={formData.age}
                                onChangeText={(e: any) => handleChange('age', e)}
                                placeholder={"Age"}
                                keyboardType={"numeric"}
                            />
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: '40%' }}>
                    <LoadingButton
                        title="Create Account"
                        isLoading={loading}
                        onPress={handleSignUp}
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default Signup

const styles = StyleSheet.create({})