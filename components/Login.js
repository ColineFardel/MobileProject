import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header, Input, Button, ListItem, Icon, Card, Image } from 'react-native-elements';
import * as firebase from 'firebase';

export default function Login({ navigation }) {

    const [user, setUser] = useState('');

    const login = () => {
        if (user.email === '' && user.password === '') {

        }
        else {
            firebase.auth()
                .signInWithEmailAndPassword(user.email, user.password)
                .then((res) => {
                    console.log(res);
                    console.log('User logged in successfully!')
                    //navigation.navigate('App');
                })
        }
    }

    const signup = () => {
        console.log('wesh jtj sa marche pas jme bute');
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
                onPress={() => login()}
                title="LOG IN" />
            <Button
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
