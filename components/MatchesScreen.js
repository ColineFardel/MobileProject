import React, { useState, useEffect } from 'react';
import { ListItem, Text } from 'react-native-elements';
import { StyleSheet, View, FlatList } from 'react-native';
import * as firebase from 'firebase';

export default function MatchesScreen({ navigation }) {

  const [user, setUser] = useState('');
  const [matches, setMatches] = useState([]);

  /**
   * Get the logged user
   */
  firebase.auth().onAuthStateChanged(user => {
    setUser(user);
  });

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      getMatches(user.uid);
    });
  }, [])

  /**
   * Get matches of the user from database
   * @param {Id of the current user} id 
   */
  const getMatches = (id) => {
    firebase.database().ref(id).on('value', snapshot => {
      const data = snapshot.val();
      if (data.matches != null) {
        setMatches(data.matches);
      }
      else {
        setMatches([]);
      }
    });
  }

  /**
   * Navigate to show the movie details
   * @param {Movie the user want to see} currentMovie 
   */
  const showDetails = (currentMovie) => {
    navigation.navigate('MovieDetails', { movie: { currentMovie } })
  }

  renderItem = ({ item, index }) => (
    <ListItem bottomDivider
      onPress={() => showDetails(item.movie)}>
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
