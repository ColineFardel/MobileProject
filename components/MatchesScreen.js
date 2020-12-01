import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Header, Input, Button, ListItem, Text } from 'react-native-elements';
import { StyleSheet, View, FlatList } from 'react-native';

import * as firebase from 'firebase';

export default function MatchesScreen() {

  const [user, setUser] = useState('');
  const [matches, setMatches] = useState([]);
  const [likes, setLikes] = useState([]);

  firebase.auth().onAuthStateChanged(user => {
    setUser(user);
  });

  useEffect(() => {
    getUserLikes();
  }, [])

  const getUserLikes = () => {
    firebase.database().ref(user.uid).on('value', snapshot => {
      const data = snapshot.val();
      if (data != null) {
        //setLikes(data.movies);
        console.log('Retreived user likes and send it to get friends likes');
        getFriendsLikes(data.movies);
      }
    });
  }


  const getFriendsLikes = (userLikes) => {
    firebase.database().ref(user.uid).on('value', snapshot => {
      const data = snapshot.val();
      if (data.friends != null) {
        //setFriends(data.friends);
        console.log('retreived friends and start to map them');
        data.friends.map((friend) => {

          console.log('in friend '+friend.username);
          //for each friend get their likes
          firebase.database().ref(friend.key).on('value', snapshot => {
            const data = snapshot.val();
            if (data != null) {
              console.log('retreived movies from friend and start to map them ');
              data.movies.map((movie) => {

                //for each movie in the likes of one friend check with movies of user
                for (var i = 0; i < userLikes.length; i++) {
                  console.log('Comparing movie '+movie.title+' to '+userLikes[i].title);
                  if (movie.title === userLikes[i].title) {
                    console.log('its the same !!');
                    setMatches([...matches, movie]);
                  }
                }
              })
              //setLikes(data.movies);
            }
          });
        })
      }
    });
  }

  renderItem = ({ item, index }) => (
    <ListItem bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{item.title}</ListItem.Title>
      </ListItem.Content>
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
        <Text h3>You don't have any matches :(</Text>
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
