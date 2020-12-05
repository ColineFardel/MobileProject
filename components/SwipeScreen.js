import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import { Header, Input, Button, ListItem, Icon, Card, Image } from 'react-native-elements';
import * as firebase from 'firebase';

export default function SwipeScreen({ navigation }) {

  const url = 'https://api.themoviedb.org/3/movie/';
  const apiKey = '?api_key=da69f383468c28f2c73b8e53c978a20e';
  const imgUrl = 'https://image.tmdb.org/t/p/w500';

  const [likes, setLikes] = useState(false);
  const [user, setUser] = useState('');
  const [currentMovie, setCurrentMovie] = useState('');
  const [matches, setMatches] = useState([]);
  const [username, setUsername] = useState('');

  /**
   * Get the logged user
   */
  firebase.auth().onAuthStateChanged(user => {
    setUser(user);
  });

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      //getMatches(user.uid);
      getUserData(user.uid);
    });
    getMovie();
  }, [])

  /**
   * Get the movie to show to the user
   */
  const getMovie = () => {
    let randomNumber = Math.floor(Math.random() * 10000) + 1;
    fetch(url + 5488 + apiKey)
      .then((response) => response.json())
      .then((data) => {
        if (data.success != false) {
          setCurrentMovie(data);
        }
        else {
          getMovie();
        }
      })
      .catch(error => {
        Alert.alert('Error', error);
      })
  }

  /**
   * Get the movies the user liked
   */
  const getUserData = (id) => {
    console.log('GETTING MATCHES, LIKES AND USERNAME');
    console.log(id);
    firebase.database().ref(id).once('value', snapshot => {
      const data = snapshot.val();
      if (data.movies != null) {
        setLikes(data.movies);
        console.log('THE LIKES ARE SET');
      }
      if (data.matches != null) {
        setMatches(data.matches);
        console.log('THE MATCHES ARE SET');
      }
      if (data.username != null) {
        setUsername(data.username);
        console.log('THE USERNAME IS SET');
      }
    });
  }

  /**
   * Add the movie to the database when the user like it and get a new one
   */
  const onLike = () => {
    //add movie to db

    //console.log(likes);
    if (likes != false) {
      //console.log("likes est different de null");
      //console.log([...likes, currentMovie]);
      firebase.database().ref(user.uid + "/movies").set([...likes, currentMovie]).then(() => {
        //console.log('the likes have been set');
        setLikes([...likes, currentMovie]);
        getMovie();
      });
    }
    else {
      //console.log("likes est null");
      firebase.database().ref(user.uid + "/movies").set([currentMovie]).then(() => {
        setLikes([currentMovie]);
        getMovie();
      });
    }

    //check si ya des matches
    getFriendsLikes();

  }

  /**
   * Get a new movie when user unlike the current one
   */
  const onUnLike = () => {
    getMovie();
  }

  const getFriendsLikes = () => {
    let id = user.uid;
    firebase.database().ref(id).once('value', snapshot => {
      const data = snapshot.val();
      if (data.friends != null) {
        data.friends.map((friend) => {
          firebase.database().ref(friend.key).once('value', snapshot => {
            const data = snapshot.val();
            if (data != null) {
              data.movies.map((movie) => {
                console.log('Comparing movie ' + movie.title + ' to ' + currentMovie.title);
                if (movie.title === currentMovie.title) {
                  let match = { movie: currentMovie, friend: { key: friend.key, username: friend.username } };
                  let friendMatch = { movie: currentMovie, friend: { key: id, username: username } };
                  saveMatches([...matches, match]);
                  setMatches([...matches, match]);
                  if (data.matches != null) {
                    saveFriendMatches([...data.matches, friendMatch], friend.key);
                  }
                  else {
                    saveFriendMatches([friendMatch], friend.key);
                  }


                }
              })
            }
          });
        })
      }
    });
  }

  /**
   * Save the matches in the database for the current user
   * @param {*} matches 
   */
  const saveMatches = (matches) => {
    console.log('ici on save dans la db du user');

    firebase.database().ref(user.uid + "/matches").set(matches).then(() => {
      console.log('The matches have been saved in the database of the user');
    });

  };

  const saveFriendMatches = (matches, id) => {
    console.log('ici on save dans la db du friend');

    firebase.database().ref(id + "/matches").set(matches).then(() => {
      console.log('The matches have been saved in the database of the friend');
    });

  };

  /**
   * Navigate to the Movie Details screen when the user press on the card
   */
  const showDetails = () => {
    navigation.navigate('MovieDetails', { movie: { currentMovie } })
  }

  if (likes != null) {
    return (
      <View style={styles.container}>
        <View style={styles.cards}>

          <TouchableOpacity onPress={() => showDetails()}>
            <Card pointerEvents="none" style={{ height: '100%', backgroundColor: 'red' }}
              containerStyle={{ height: '95%', padding: -10 }}
            >
              <ImageBackground
                style={{ width: '100%', height: '100%', justifyContent: 'flex-end' }}
                source={{ uri: imgUrl + currentMovie.poster_path }}>
                <View style={styles.desc}>
                  <Text style={{ color: 'white', fontSize: 30 }}>{currentMovie.title}</Text>
                  <Text style={{ color: 'white' }}>{currentMovie.release_date}</Text>
                  <Text style={{ color: 'white' }}>{currentMovie.overview}</Text>
                </View>
              </ImageBackground>
            </Card>
          </TouchableOpacity>

        </View>
        <View style={styles.buttonContainer}>
          <Icon
            reverse
            name='md-close'
            type='ionicon'
            color='red'
            onPress={() => onUnLike()}
          />
          <Icon
            reverse
            name='md-heart'
            type='ionicon'
            color='green'
            onPress={() => onLike()}
          />
        </View>
        <StatusBar style="auto" />
      </View>
    );
  }
  else {
    getUserLikes();
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }


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
    marginBottom: 20,
  },
  cards: {
    flex: 1,
    marginTop: 40,
    width: '100%',
  },
  desc: {
    backgroundColor: 'black',
    opacity: 0.7,
  },
});
