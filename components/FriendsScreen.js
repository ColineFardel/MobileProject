import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Header, Input, Button, ListItem, Text } from 'react-native-elements';
import { StyleSheet, View, FlatList } from 'react-native';

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

  const deleteItem = (index, item) => {
    friends.splice(index, 1);
    firebase.database().ref(user.uid + "/friends").set(friends).then(() => {
      console.log('Friend deleted');
    });

    firebase.database().ref(item.key).once('value', snapshot => {
      const data = snapshot.val();
      if (data.friends != null) {
        let friendFriends = data.friends;
        let newFriends = [];
        for (var i = 0; i < friendFriends.length; i++) {
          if (friendFriends[i].key != user.uid) {
            newFriends = [...newFriends, friendFriends[i]];
          }
        }

        firebase.database().ref(item.key + "/friends").set(newFriends).then(() => {
          console.log('User deleted from friend friends');
        });

      }
    });

  }

  renderItem = ({ item, index }) => (
    <ListItem bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{item.username}</ListItem.Title>
      </ListItem.Content>
      <Button raised icon={{ name: 'delete', color: 'grey' }}
        onPress={() => deleteItem(index, item)}
        type="clear"
      />
    </ListItem>
  )

  if (friends != null) {
    return (
      <View style={styles.container}>
        <Button
          onPress={() => navigation.navigate('AddFriend', { user: { user } })}
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
  else {
    return (
      <View style={styles.container}>
        <Button
          onPress={() => navigation.navigate('AddFriend', { user: { user } })}
          title="Add a new friend"
        />
        <Text h3>You don't have any friends :(</Text>
      </View>
    );
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
    flex: 1,
    width: '100%',
  },
});
