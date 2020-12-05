
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ImageBackground, TouchableOpacity, FlatList } from 'react-native';
import { Header, Input, Button, ListItem, Icon, Card, Image, Text, } from 'react-native-elements';
import * as firebase from 'firebase';

export default function MovieDetails({ route, navigation }) {

    const { movie } = route.params;

    useEffect(() => {
        //console.log(movie);
        //getMovie();
        //getUserLikes();
    }, [])

    renderItem = ({ item, index }) => (
        <ListItem bottomDivider>
            <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
            </ListItem.Content>
        </ListItem>
    )

    return (
        <View style={styles.container}>
            <Text h3>Title</Text>
            <Text style={styles.infoText}>{movie.currentMovie.title}</Text>
            <Text h3>Overview</Text>
            <Text style={styles.infoText}>{movie.currentMovie.overview}</Text>
            <Text h3>Release Date</Text>
            <Text style={styles.infoText}>{movie.currentMovie.release_date}</Text>
            <Text h3>Average note</Text>
            <Text style={styles.infoText}>{movie.currentMovie.vote_average}</Text>
            <Text h3>Duration</Text>
            <Text style={styles.infoText}>{movie.currentMovie.runtime} minutes</Text>
            <Text h3>Genres</Text>
            <View style={styles.listContainer}>
                <FlatList
                    data={movie.currentMovie.genres}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>

        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 3,
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: 10,
    },
    listContainer: {
        width: '100%',
    },
    infoText: {
        fontSize: 20,
        marginBottom: 10,
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
    desc: {
        backgroundColor: 'black',
        opacity: 0.7,
    },
});