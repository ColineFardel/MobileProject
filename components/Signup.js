import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header, Input, Button, ListItem, Icon, Card, Image } from 'react-native-elements';
import * as firebase from 'firebase';

export default function Signup({navigation}) {

    const [user, setUser] = useState('');

    const signup = () => {
        firebase.auth()
            .createUserWithEmailAndPassword(user.email, user.password)
            .then(() => {
                console.log('User account created & signed in!');
                //navigation.navigate('App');
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
