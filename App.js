import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import * as firebase from 'firebase';
import { LoginStackNavigator } from './navigation/StackNavigation';
import TabNavigation from './navigation/TabNavigation';

export default function App(navigation) {

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

  const [user, setUser] = useState('');


  firebase.auth().onAuthStateChanged(user => {
    if (user != null) {
      setUser(user);
      //console.log('We are authenticated now!');
    }
    else {
      setUser(null);
      //console.log('Jen ai plein le cul la ');
    }
  });

  if (user != null) {
    return (
      < NavigationContainer >
        <TabNavigation />
      </NavigationContainer >
    )
  }
  else {
    return (
      < NavigationContainer >
        <LoginStackNavigator />
      </NavigationContainer >
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
