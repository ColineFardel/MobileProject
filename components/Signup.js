import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Header, Input, Button, ListItem, Icon, Card, Image } from 'react-native-elements';
import * as firebase from 'firebase';

export default function Signup({ navigation }) {

    const [user, setUser] = useState('');
    const [username, setUsername] = useState('');
    const [users, setUsers] = useState([]);
    const [check, setCheck] = useState(false);

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        firebase.database().ref().on('value', snapshot => {
            const data = snapshot.val();
            if (data != null) {
                setUsers(Object.values(data));
                //console.log('data is not null');
            }
        });
    }

    const checkUsernameExists = () => {
        if (users != null) {
            users.map((value) => {
                console.log(value.username + ' compared to ' + username);
                if (username === value.username) {
                    console.log('now check is true');
                    setCheck(true);
                }
                else {
                    console.log('not doing anything');
                    //setCheck(false);
                }
            })
        }
        else {
            getData();
        }
    }

    const signup = () => {
        if (users != null) {

            var check = () => {
                for (var i = 0; i < users.length; i++) {
                    if (users[i].username === username) {
                        Alert.alert('You cannot sign up', 'The username already exists, choose another one');
                        return true;
                    }
                }
                return false;
            }

            if (check() === false) {
                firebase.auth()
                    .createUserWithEmailAndPassword(user.email, user.password)
                    .then(() => {
                        if (firebase.auth().currentUser) {
                            var userId = firebase.auth().currentUser.uid;
                            if (userId) {
                                firebase.database().ref(userId).set({username: username});
                            }
                        }
                        console.log('User account created & signed in!');
                    })
                    .catch(error => {
                        if (error.code === 'auth/email-already-in-use') {
                            console.log('That email address is already in use!');
                        }

                        if (error.code === 'auth/invalid-email') {
                            console.log('That email address is invalid!');
                        }

                        console.error(error);
                    });
            }
        }
        else {
            getData();
        }
    }

    return (
        <View style={styles.container}>
            <Input
                placeholder="Email"
                onChangeText={text => setUser({ ...user, email: text })}
                value={user.email}
            />
            <Input
                placeholder="Username"
                onChangeText={text => { setUsername(text), setCheck(false) }}
                value={username}
            />
            <Input
                placeholder="Password"
                onChangeText={text => setUser({ ...user, password: text })}
                value={user.password}
                secureTextEntry={true}
            />
            <Button
                onPress={() => signup()}
                title="SIGN UP" />
            <Button
                onPress={() => navigation.navigate('Login')}
                title="LOG IN" />
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
});
