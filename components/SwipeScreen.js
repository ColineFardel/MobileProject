import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header, Input, Button, ListItem, Icon } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function SwipeScreen() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <View style={styles.buttonContainer}>
        <Icon
          reverse
          name='md-close'
          type='ionicon'
          color='red'
        />
        <Icon
          reverse
          name='md-heart'
          type='ionicon'
          color='green'
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: "row",
  }
});
