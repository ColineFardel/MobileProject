import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MatchesScreen from '../components/MatchesScreen';
import SwipeScreen from '../components/SwipeScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ProfileStackNavigator } from './StackNavigation';

export default function TabNavigation() {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Movies') {
                        iconName = 'ios-film';
                    }
                    else if (route.name === 'Matches') {
                        iconName = 'md-heart';
                    }
                    else if (route.name === 'Profile') {
                        iconName = 'md-person';
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}>
            <Tab.Screen name="Movies" component={SwipeScreen} />
            <Tab.Screen name="Matches" component={MatchesScreen} />
            <Tab.Screen name="Profile" component={ProfileStackNavigator} />
        </Tab.Navigator>
    )
}