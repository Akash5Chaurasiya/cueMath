import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Home = ({ navigation }: any) => {
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                <View>
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }} >CUEMATH </Text>
                </View>
                <View>
                    <Text style={{ color: 'yellow', marginLeft: 5, fontSize: 20, fontWeight: 'bold' }}>Go!</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
                <TouchableOpacity style={{ borderWidth: 1, borderColor: 'white', width: 132, height: 44, paddingVertical: 12, paddingHorizontal: 16, borderRadius: 5, backgroundColor: 'white',marginRight:12 }} onPress={() => navigation.navigate('Signup')}>
                    <View >
                        <Text style={{ color: 'black', alignSelf: 'center' }}>Signup</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{ borderWidth: 1, borderColor: 'white', width: 132, height: 44, paddingVertical: 12, paddingHorizontal: 16, borderRadius: 5, backgroundColor: 'black' }} onPress={() => navigation.navigate('Login')}>
                    <View>
                        <Text style={{ color: 'white', alignSelf: 'center' }}>Login</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({})