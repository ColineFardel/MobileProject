import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Header, Input, Button, ListItem } from 'react-native-elements';
import * as firebase from 'firebase';

export default function ProfileScreen({ navigation }) {

  const [user, setUser] = useState('');
  const [options, setOptions] = useState([]);
  const [username, setUsername] = useState('');

  firebase.auth().onAuthStateChanged(user => {
    setUser(user);
  });

  useEffect(() => {
    getUsername();
  }, [])

  const logoff = () => {
    firebase.auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
        //navigation.navigate('App');
      })
  }

  const getUsername = () => {
    //console.log(user.uid);
    firebase.database().ref(user.uid).on('value', snapshot => {
      const data = snapshot.val();
      if (data != null) {
        //console.log(data.username);
        setUsername(data.username);
        setOptions([data.username, 'Likes', 'Friends','Settings']);
      }
    });
    
  }

  

  const goToScreen = (screen) => {
    //console.log(screen);
    if (screen === 'Likes') {
      navigation.navigate('Likes',{user : {user}});
    }
    if (screen === 'Friends') {
      navigation.navigate('Friends',{user : {user}});
    }
  }

  renderItem = ({ item, index }) => (
    <ListItem bottomDivider
      onPress={() => goToScreen(item)}>
      <ListItem.Content>
        <ListItem.Title>{item}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  )

  if(username!=null){
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.listContainer}>
          <FlatList
            data={options}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <Button
          onPress={() => logoff()}
          title="LOG OFF"
        />
      </View>
    );
  }
  else{
    getUsername();
    return(
      <View>
        <Text>Loading...</Text>
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
    flex: 3,
    width: '100%',
  },
});
