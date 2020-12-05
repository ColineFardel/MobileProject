import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as firebase from 'firebase';
import {LoginStackNavigator} from './navigation/StackNavigation';
import TabNavigation from './navigation/TabNavigation';

export default function App() {

  const [user, setUser] = useState('');

  /**
   * Firebase configuration
   */
  var firebaseConfig = {
    apiKey: "AIzaSyCJT-5r7xoWagyEWSlOzXGtl2o1nvvMpSc",
    authDomain: "mobileproject-fa32e.firebaseapp.com",
    databaseURL: "https://mobileproject-fa32e.firebaseio.com",
    projectId: "mobileproject-fa32e",
    storageBucket: "mobileproject-fa32e.appspot.com",
    messagingSenderId: "936634225190",
    appId: "1:936634225190:web:88d43ade5cc810f0e40ce7"
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  /**
   * Check if the user is already logged in
   */
  firebase.auth().onAuthStateChanged(user => {
    if (user != null) {
      setUser(user);
    }
    else {
      setUser(null);
    }
  });

  /**
   * If the user is already logged in, show the tab navigation
   */
  if (user != null) {
    return (
      < NavigationContainer >
        <TabNavigation />
      </NavigationContainer >
    )
  }
  /**
   * If the user is not logged in, show the screens to log in or sign up
   */
  else {
    return (
      < NavigationContainer >
        <LoginStackNavigator />
      </NavigationContainer >
    )
  }
}