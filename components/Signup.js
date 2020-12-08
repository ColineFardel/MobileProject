import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';
import * as firebase from 'firebase';

export default function Signup({ navigation }) {

    const [user, setUser] = useState('');
    const [username, setUsername] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getAllUsers();
    }, [])

    /**
     * Get all users from database
     */
    const getAllUsers = () => {
        firebase.database().ref().on('value', snapshot => {
            const data = snapshot.val();
            if (data != null) {
                setUsers(Object.values(data));
            }
        });
    }

    /**
     * Compare username with existing users
     * Sign up the new user into firebase authentification
     * Add the username of the new user in the database with its id
     */
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
                                firebase.database().ref(userId).set({ username: username });
                            }
                        }
                        console.log('User account created & signed in!');
                    })
                    .catch(error => {
                        if (error.code === 'auth/email-already-in-use') {
                            Alert.alert('Email already used', 'Please use another email address or log in');
                        }

                        if (error.code === 'auth/invalid-email') {
                            Alert.alert('Email invalid', 'That email address is invalid please use a valid one');
                            console.log('That email address is invalid!');
                        }

                        console.error(error);
                    });
            }
        }
        else {
            getAllUsers();
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
                onChangeText={text => { setUsername(text) }}
                value={username}
            />
            <Input
                placeholder="Password"
                onChangeText={text => setUser({ ...user, password: text })}
                value={user.password}
                secureTextEntry={true}
            />
            <Button
                buttonStyle={{ backgroundColor: 'green', marginBottom: 35, width: 150 }}
                onPress={() => signup()}
                title="SIGN UP" />
            <Button
                type='clear'
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
