import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Header, Input, Button, ListItem } from 'react-native-elements';
import { StyleSheet, Text, View, FlatList } from 'react-native';

import * as firebase from 'firebase';

export default function LikeScreen({ route, navigation }) {

  const [likes, setLikes] = useState([]);
  const { user } = route.params.user;

  const getUserLikes = () => {
    firebase.database().ref(user.uid).on('value', snapshot => {
      const data = snapshot.val();
      if (data != null) {
        setLikes(data.movies);
      }
    });
  }

  useEffect(() => {
    getUserLikes();
  }, [])

  const deleteItem = (index) => {
    likes.splice(index, 1);
    firebase.database().ref(user.uid + "/movies").set(likes).then(() => {
      console.log('Like deleted');
    });
  }

  renderItem = ({ item, index }) => (
    <ListItem bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{item.title}</ListItem.Title>
      </ListItem.Content>
      <Button raised icon={{ name: 'delete', color: 'grey' }}
        onPress={() => deleteItem(index)}
        type="clear"
      />
    </ListItem>
  )


  if(likes!=null){
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
  else{
    return(
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
