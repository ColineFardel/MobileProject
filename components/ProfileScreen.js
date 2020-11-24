import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Header, Input, Button, ListItem } from 'react-native-elements';
import * as firebase from 'firebase';

export default function ProfileScreen({ navigation }) {

  const [user, setUser] = useState('');
  const [options, setOptions] = useState(['Likes', 'Friends', 'Settings']);

  const logoff = () => {
    firebase.auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
        //navigation.navigate('App');
      })
  }

  firebase.auth().onAuthStateChanged(user => {
    setUser(user);
  });

  const goToScreen = (screen) => {
    console.log(screen);
    if (screen === 'Likes') {
      navigation.navigate('Likes',{user : {user}});
    }
  }

  renderItem = ({ item, index }) => (
    <ListItem bottomDivider
      onPress={() => goToScreen(item)}>
      <ListItem.Content>
        <ListItem.Title>{item}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  )

  return (
    <View style={styles.container}>
      <Text>Hello {user.email}</Text>
      <StatusBar style="auto" />
      <View style={styles.listContainer}>
        <FlatList
          data={options}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
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
  listContainer: {
    flex: 3,
    width: '100%',
  },
});
