import React, { useState, useEffect } from 'react';
import { Input, Button, ListItem } from 'react-native-elements';
import { StyleSheet, View, FlatList } from 'react-native';

import * as firebase from 'firebase';

export default function AddFriend({ route, navigation }) {

    const [friends, setFriends] = useState([]);
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [users, setUsers] = useState([]);
    const { user } = route.params.user;

    useEffect(() => {
        getUserData();
    }, [])

    /**
     * Get the user data from database
     */
    const getUserData = () => {
        firebase.database().ref(user.uid).once('value', snapshot => {
            const data = snapshot.val();
            if (data.friends != null) {
                setFriends(data.friends);
            }
            if (data.username != null) {
                setUsername(data.username);
            }
        });
    }

    /**
     * Get the users with similar to the name entered by the user
     */
    const getUsers = () => {
        firebase.database().ref().on('value', snapshot => {
            const data = snapshot.val();
            if (data != null) {
                var us = Object.values(data);
                var keys = Object.keys(data);
                for (var i = 0; i < us.length; i++) {
                    if (us[i].username.includes(name)) {
                        if (users.includes({ username: us[i].username })) {
                            console.log('JSP');
                        }
                        else {
                            setUsers([...users, { username: us[i].username, key: keys[i] }])
                        }
                    }
                }
            }
        });
    }

    /**
     * Add the user to the friend's list of friends
     * @param {Friend added} item 
     */
    const addUserToFriend = (item) => {
        var friends = [];
        firebase.database().ref(item.key).once('value', snapshot => {
            const data = snapshot.val();
            if (data.friends != null) {
                friends = data.friends;
            }
            var newFriend = { username: username, key: user.uid };
            firebase.database().ref(item.key + "/friends").set([...friends, newFriend]).then(() => {
                console.log('User added to friend');
            });
        });
    }

    /**
     * Add the friend to the user's list of friends
     * @param {Friend to add} item 
     */
    const addFriend = (item) => {
        if (friends != null) {
            setFriends([...friends, item]);
            firebase.database().ref(user.uid + "/friends").set([...friends, item]).then(() => {
                console.log('Friend added with set');
            });
        }
        else {
            setFriends([item]);
            firebase.database().ref(user.uid + "/friends").set([item]).then(() => {
                console.log('Friend added with push');
            });
        }
        navigation.goBack();
    }

    renderItem = ({ item, index }) => (
        <ListItem bottomDivider>
            <ListItem.Content>
                <ListItem.Title>{item.username}</ListItem.Title>
            </ListItem.Content>
            <Button raised icon={{ name: 'add', color: 'green' }}
                onPress={() => { addFriend(item), addUserToFriend(item) }}
                type="clear"
            />
        </ListItem>
    )

    return (
        <View style={styles.container}>
            <Input placeholder='Username'
                onChangeText={text => { setName(text), setUsers([]) }}
                value={name} />
            <Button
                onPress={() => getUsers()}
                title="Search"
            />
            <View style={styles.listContainer}>
                <FlatList
                    data={users}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </View>
    );
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
