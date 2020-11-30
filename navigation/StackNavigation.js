import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../components/Login';
import Signup from '../components/Signup';
import App from '../App';
import Profile from '../components/ProfileScreen';
import Likes from '../components/LikeScreen';
import Friends from '../components/FriendsScreen';
import AddFriend from '../components/AddFriend';

const Stack = createStackNavigator();

const LoginStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
        </Stack.Navigator>
    );
}

const ProfileStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Likes" component={Likes} />
            <Stack.Screen name="Friends" component={Friends} />
            <Stack.Screen name="AddFriend" component={AddFriend} />
        </Stack.Navigator>
    );
}

export { LoginStackNavigator, ProfileStackNavigator };