import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import D from './src/Home/Home';
import Dashboard from './src/Dashboard/Dashboard';
import Login from './src/Login/Login';
import Home from './src/Home/Home';
import Signup from './src/Signup/Signup';
import ErrorBoundary from 'react-native-error-boundary';

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <ErrorBoundary onError={() => {
      <Home />
      return null;
    }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name='Home'
            component={Home}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name='Dashboard'
            component={Dashboard}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name='Login'
            component={Login}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name='Signup'
            component={Signup}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ErrorBoundary>
  )
}

export default App

const styles = StyleSheet.create({})