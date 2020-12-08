import React, { useState, useEffect } from 'react';
import { Button, ListItem, Text } from 'react-native-elements';
import { StyleSheet, View, FlatList } from 'react-native';

import * as firebase from 'firebase';

export default function FriendsScreen({ route, navigation }) {

  const [friends, setFriends] = useState([]);
  const [matches, setMatches] = useState([]);
  const { user } = route.params.user;

  useEffect(() => {
    getUserData();
  }, [])

  /**
   * Get the user data from database
   */
  const getUserData = () => {
    firebase.database().ref(user.uid).on('value', snapshot => {
      const data = snapshot.val();
      if (data.friends != null) {
        setFriends(data.friends);
      }
      if (data.matches != null) {
        setMatches(data.matches);
      }
    });
  }

  /**
   * Delete the matches with deleted friend
   * @param {Friend deleted} item 
   */
  const deleteUserMatches = (item) => {
    let newMatches = [];
    for (var i = 0; i < matches.length; i++) {
      if (matches[i].friend.key != item.key) {
        newMatches = [...newMatches, matches[i]];
      }
      else {
        deleteFriendMatches(matches[i].friend.key, item);
      }
    }
    firebase.database().ref(user.uid + "/matches").set(newMatches).then(() => {
      console.log('Matches updated');
    });
  }

  /**
   * Delete matches with user
   * @param {Deleted friend id} id 
   */
  const deleteFriendMatches = (id) => {
    firebase.database().ref(id).once('value', snapshot => {
      const data = snapshot.val();
      if (data.matches != null) {
        var newMatches = [];
        for (var i = 0; i < data.matches.length; i++) {
          if (data.matches[i].friend.key != user.uid) {
            newMatches = [...newMatches, data.matches[i]];
          }
        }
        firebase.database().ref(id + "/matches").set(newMatches).then(() => {
          console.log('Matches for friend updated');
        });
      }
    });
  }

  /**
   * Delete the user in the friend's list of the friend deleted
   * @param {Deleted friend} item 
   */
  const deleteUserForFriend = (item) => {
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

  /**
   * Delete friend in user's friend list
   * @param {Deleted friend} index 
   */
  const deleteFriend = (index) => {
    friends.splice(index, 1);
    firebase.database().ref(user.uid + "/friends").set(friends).then(() => {
      console.log('Friend deleted');
    });
  }

  /**
   * Delete the friend and the matches in common
   * @param {Index of friend in array} index 
   * @param {Friend to delete} item 
   */
  const deleteItem = (index, item) => {
    deleteFriend(index);

    deleteUserForFriend(item);

    deleteUserMatches(item);
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

  if (friends.length != 0) {
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
