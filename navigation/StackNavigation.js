import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../components/Login';
import Signup from '../components/Signup';
import App from '../App';
import Profile from '../components/ProfileScreen';

const Stack = createStackNavigator();

const LoginStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="App" component={App} />
        </Stack.Navigator>
    );
}

const ProfileStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="App" component={App} />
        </Stack.Navigator>
    );
}

export { LoginStackNavigator, ProfileStackNavigator };