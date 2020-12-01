import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { Header, Input, Button, ListItem, Icon, Card, Image } from 'react-native-elements';
import * as firebase from 'firebase';

export default function SwipeScreen() {

  const url = 'https://api.themoviedb.org/3/movie/';
  const apiKey = '?api_key=da69f383468c28f2c73b8e53c978a20e';
  const imgUrl = 'https://image.tmdb.org/t/p/w500';

  const [likes, setLikes] = useState([]);
  const [user, setUser] = useState('');
  const [currentMovie, setCurrentMovie] = useState('');

  useEffect(() => {
    getMovie();
    getUserLikes();
  }, [])

  firebase.auth().onAuthStateChanged(user => {
    setUser(user);
  });

  const getMovie = () =>{
    let randomNumber = Math.floor(Math.random() * 10000) + 1;
    fetch(url + randomNumber + apiKey)
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

  const getUserLikes = () => {
    firebase.database().ref(user.uid).on('value', snapshot => {
      const data = snapshot.val();
      if (data != null) {
        setLikes(data.movies);
        //console.log(data.movies);
        //console.log(likes.length);
      }
    });
  }

  const onLike = () => {
    //add movie to db
    if(likes != null){
      //console.log("likes est different de null");
      
      firebase.database().ref(user.uid + "/movies").set([...likes,currentMovie]).then(() => {
        //console.log('the likes have been set');
        setLikes([...likes, currentMovie]);
        getMovie();
      });
    }
    else{
      //console.log("likes est null");
      firebase.database().ref(user.uid + "/movies").set([currentMovie]).then(() => {
        setLikes([currentMovie]);
        getMovie();
      });
    }
    
  }
  //do something when no more movies in list
  const onUnLike = () => {
    //testMoviesLength(changeCurrentMovie);
    getMovie();
  }

  return (
    <View style={styles.container}>
      <View style={styles.cards}>

        <Card style={{ height: '100%', backgroundColor: 'red' }}
          containerStyle={{ height: '95%', padding: -10 }}
        >
          <ImageBackground
            style={{ width: '100%', height: '100%', justifyContent: 'flex-end' }}
            source={{ uri: imgUrl + currentMovie.poster_path }}>
            <View style={styles.desc}>
              <Text style={{ color: 'white' }}>{currentMovie.title}</Text>
              <Text style={{ color: 'white' }}>{currentMovie.release_date}</Text>
              <Text style={{ color: 'white' }}>{currentMovie.overview}</Text>
            </View>
          </ImageBackground>
        </Card>
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
