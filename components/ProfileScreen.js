import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Button, ListItem } from 'react-native-elements';
import * as firebase from 'firebase';

export default function ProfileScreen({ navigation }) {

  const [user, setUser] = useState('');
  const [options, setOptions] = useState([]);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setUser(user);
      getUsername(user.uid);
    });
  }, [])

  /**
   * Log off the user
   */
  const logoff = () => {
    firebase.auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
      })
  }

  /**
   * Get the username
   * @param {Id of the current user} id 
   */
  const getUsername = (id) => {
    firebase.database().ref(id).once('value', snapshot => {
      const data = snapshot.val();
      if (data.username != null) {
        setOptions([data.username, 'Likes', 'Friends', 'Settings']);
      }
    });
  }

  /**
   * Navigate to the screen the user selected
   * @param {Screen the user want to see} screen 
   */
  const goToScreen = (screen) => {
    if (screen === 'Likes') {
      navigation.navigate('Likes', { user: { user } });
    }
    if (screen === 'Friends') {
      navigation.navigate('Friends', { user: { user } });
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
        buttonStyle={{ backgroundColor: 'red' , marginBottom:15}}
        onPress={() => logoff()}
        title="LOG OFF"
      />
    </View>
  )
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
