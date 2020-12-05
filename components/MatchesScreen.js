import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Header, Input, Button, ListItem, Text } from 'react-native-elements';
import { StyleSheet, View, FlatList } from 'react-native';

import * as firebase from 'firebase';

export default function MatchesScreen() {

  const [user, setUser] = useState('');
  const [matches, setMatches] = useState([]);

  firebase.auth().onAuthStateChanged(user => {
    setUser(user);
  });

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      getMatches(user.uid);
    });
  }, [])

  const getMatches = (id) => {
    console.log('GETTING MATCHES');
    console.log(id);
    firebase.database().ref(id).once('value', snapshot => {
      const data = snapshot.val();
      if (data.matches != null) {
        setMatches(data.matches);
        console.log('THE MATCHES ARE SET');
      }
    });
  }

  renderItem = ({ item, index }) => (
    <ListItem bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{item.movie.title}</ListItem.Title>
      </ListItem.Content>
      <ListItem.Title>{item.friend.username}</ListItem.Title>
    </ListItem>
  )

  if (matches.length != 0) {
    return (
      <View style={styles.container}>
        <View style={styles.listContainer}>
          <FlatList
            data={matches}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    )
  }
  else {
    return (
      <View style={styles.container}>
        <Text h2>You don't have any matches :(</Text>
      </View>
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
  listContainer: {
    width: '100%',
  },
});
