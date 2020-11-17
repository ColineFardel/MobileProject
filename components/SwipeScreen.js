import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { Header, Input, Button, ListItem, Icon, Card, Image } from 'react-native-elements';

export default function SwipeScreen() {

  const url = 'https://api.themoviedb.org/3/movie/';
  const apiKey = '?api_key=da69f383468c28f2c73b8e53c978a20e';
  const imgUrl = 'https://image.tmdb.org/t/p/w500';
  const [movies, setMovies] = useState([]);


  const [currentMovie, setCurrentMovie] = useState('');

  const getMovies = () => {
    for (let i = 0; i < 3; i++) {
      let randomNumber = Math.floor(Math.random() * 500) + 1;
      fetch(url + randomNumber + apiKey)
        .then((response) => response.json())
        .then((data) => {
          if (data.success != false) {
            setMovies([...movies, data]);
            //console.log('MOVIES ------ > ');
            //console.log(movies);
            setCurrentMovie(data);
            //console.log(data);
          }
        })
        .catch(error => {
          Alert.alert('Error', error);
        })
    }
    
  }

  useEffect(() => {
    getMovies();

  }, [])

  const onLike = () => {
    //console.log('LIKE----');
    movies.splice(movies.length-1, 1);
    //console.log(movies);
    setCurrentMovie(movies[movies.length - 1]);
    //console.log(currentMovie);
  }

  const onUnLike = () => {

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
            <Text style={{color:'red'}}>{currentMovie.title}</Text>
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
});
