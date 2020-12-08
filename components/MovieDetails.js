import React from 'react';
import { StyleSheet, ScrollView, View, FlatList } from 'react-native';
import { ListItem, Text, } from 'react-native-elements';

export default function MovieDetails({ route, navigation }) {

    const { movie } = route.params;

    renderItem = ({ item, index }) => (
        <ListItem bottomDivider>
            <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
            </ListItem.Content>
        </ListItem>
    )

    return (
        <View style={styles.container}>
            <ScrollView style={{ width: '100%' }}>
                <Text h3>Title</Text>
                <Text style={styles.infoText}>{movie.currentMovie.title}</Text>
                <Text h3>Overview</Text>
                <Text style={styles.infoText}>{movie.currentMovie.overview}</Text>
                <Text h3>Release Date</Text>
                <Text style={styles.infoText}>{movie.currentMovie.release_date}</Text>
                <Text h3>Average note</Text>
                <Text style={styles.infoText}>{movie.currentMovie.vote_average}/10</Text>
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
            </ScrollView>
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
});