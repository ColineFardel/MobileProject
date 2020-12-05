import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../components/Login';
import Signup from '../components/Signup';
import Profile from '../components/ProfileScreen';
import Likes from '../components/LikeScreen';
import Friends from '../components/FriendsScreen';
import AddFriend from '../components/AddFriend';
import SwipeScreen from '../components/SwipeScreen';
import MovieDetails from '../components/MovieDetails';

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

const MovieStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="SwipeScreen" component={SwipeScreen} />
            <Stack.Screen name="MovieDetails" component={MovieDetails} />
        </Stack.Navigator>
    ); 
}

export { LoginStackNavigator, ProfileStackNavigator, MovieStackNavigator };