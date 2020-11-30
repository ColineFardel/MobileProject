import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Header, Input, Button, ListItem } from 'react-native-elements';
import { StyleSheet, Text, View, FlatList } from 'react-native';

import * as firebase from 'firebase';

export default function FriendsScreen({ route, navigation }) {

  const [friends, setFriends] = useState([]);
  const { user } = route.params.user;

  const getUserFriends = () => {
    firebase.database().ref(user.uid).on('value', snapshot => {
      const data = snapshot.val();
      if (data != null) {
        setFriends(data.friends);
      }
    });
  }

  useEffect(() => {
    getUserFriends();
  }, [])

  const deleteItem = (index) => {
    likes.splice(index, 1);
    firebase.database().ref(user.uid + "/friends").set(likes).then(() => {
      console.log('Friend deleted');
    });
  }

  renderItem = ({ item, index }) => (
    <ListItem bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{item.username}</ListItem.Title>
      </ListItem.Content>
      <Button raised icon={{ name: 'delete', color: 'grey' }}
        onPress={() => deleteItem(index)}
        type="clear"
      />
    </ListItem>
  )

  return (
    <View style={styles.container}>
      <Button
          onPress={() => navigation.navigate('AddFriend',{user : {user}})}
          title="Add a new friend"
        />
      <View style={styles.listContainer}>
        <FlatList
          data={friends}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
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
    flex: 1,
    width: '100%',
  },
});
