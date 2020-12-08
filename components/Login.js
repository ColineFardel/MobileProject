import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';
import * as firebase from 'firebase';

export default function Login({ navigation }) {

    const [user, setUser] = useState('');

    /**
     * Log in with firebase authentification
     */
    const login = () => {
        if (user.email === '' && user.password === '') {
            Alert.alert('Empty field', 'Please fill the email and the password');
        }
        else {
            firebase.auth()
                .signInWithEmailAndPassword(user.email, user.password)
                .then((res) => {
                    console.log('User logged in successfully!')
                })
                .catch(error => {
                    if (error.code === 'auth/wrong-password') {
                        Alert.alert('Error', 'Your password is false');
                    }
                    if (error.code === 'auth/invalid-email') {
                        Alert.alert('Error', 'Your email is invalid');
                    }
                    if (error.code === 'auth/user-not-found') {
                        Alert.alert('Error', 'No user found with this email address, sign up if you do not already have an account');
                    }
                })
        }
    }

    /**
     * Navigate to the signup screen
     */
    const signup = () => {
        navigation.navigate('Signup');
    }

    return (
        <View style={styles.container}>
            <Input
                placeholder="Email"
                onChangeText={text => setUser({ ...user, email: text })}
                value={user.email}
            />
            <Input
                placeholder="Password"
                onChangeText={text => setUser({ ...user, password: text })}
                value={user.password}
                secureTextEntry={true}
            />
            <Button
                buttonStyle={{ backgroundColor: 'green', marginBottom: 35, width: 150 }}
                onPress={() => login()}
                title="LOG IN" />
            <Button
                type='clear'
                onPress={() => signup()}
                title="SIGN UP" />
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
