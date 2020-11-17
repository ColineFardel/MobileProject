import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header, Input, Button, ListItem } from 'react-native-elements';
import * as firebase from 'firebase';

export default function ProfileScreen({navigation}) {

  const logoff = () => {
    firebase.auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
        //navigation.navigate('App');
      })
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <Button
        onPress={() => logoff()}
        title="LOG OFF"
      />
    </View>
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
