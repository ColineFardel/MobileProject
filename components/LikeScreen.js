import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Header, Input, Button, ListItem } from 'react-native-elements';
import { StyleSheet, Text, View, FlatList } from 'react-native';

import * as firebase from 'firebase';

export default function LikeScreen({ route, navigation }) {

  const [likes, setLikes] = useState([]);
  const [matches, setMatches] = useState([]);
  const { user } = route.params.user;

  const getUserData = () => {
    firebase.database().ref(user.uid).on('value', snapshot => {
      const data = snapshot.val();
      if (data.movies != null) {
        setLikes(data.movies);
      }
      if (data.matches != null) {
        setMatches(data.matches);
      }
    });
  }

  useEffect(() => {
    getUserData();
  }, [])

  const deleteItem = (item, index) => {
    likes.splice(index, 1);

    firebase.database().ref(user.uid + "/movies").set(likes).then(() => {
      console.log('Like deleted');
    });

    checkMatches(item);
  }

  const checkMatches = (item) => {
    let newMatches = [];
    for (var i = 0; i < matches.length; i++) {
      //console.log(matches[i].movie.title);
      //console.log(item.title);
      if (matches[i].movie.title != item.title) {
        newMatches = [...newMatches, matches[i]];
      }
      else {
        removeMatchFromFriend(matches[i].friend.key, item);
      }
    }

    console.log('Matches for user' + newMatches);

    firebase.database().ref(user.uid + "/matches").set(newMatches).then(() => {
      console.log('Matches updated');
    });

  }

  const removeMatchFromFriend = (id, item) => {
    firebase.database().ref(id).on('value', snapshot => {
      const data = snapshot.val();
      if (data.matches != null) {
        var newMatches = [];
        for (var i = 0; i < data.matches.length; i++) {
          if (data.matches[i].movie.title != item.title) {
            newMatches = [...newMatches, data.matches[i]];
          }
          else {
            if (data.matches[i].friend.key != user.uid) {
              newMatches = [...newMatches, data.matches[i]];
            }
          }
        }

        console.log('Matches for friend' + newMatches);

        firebase.database().ref(id + "/matches").set(newMatches).then(() => {
          console.log('Matches for friend updated');
        });

        //setMatches(data.matches);
      }
    });
  }

  renderItem = ({ item, index }) => (
    <ListItem bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{item.title}</ListItem.Title>
      </ListItem.Content>
      <Button raised icon={{ name: 'delete', color: 'grey' }}
        onPress={() => deleteItem(item, index)}
        type="clear"
      />
    </ListItem>
  )


  if (likes != null) {
    return (
      <View style={styles.container}>
        <View style={styles.listContainer}>
          <FlatList
            data={likes}
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
        <Text>You don't have any likes</Text>
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
