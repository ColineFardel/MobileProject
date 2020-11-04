import React from 'react';
import { StyleSheet } from 'react-native';
import MatchesScreen from './components/MatchesScreen';
import ProfileScreen from './components/ProfileScreen';
import SwipeScreen from './components/SwipeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function App() {

  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
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
            return <Ionicons name={iconName} size={size} color={color}/>;
          },
        })}>
        <Tab.Screen name="Movies" component={SwipeScreen} />
        <Tab.Screen name="Matches" component={MatchesScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
