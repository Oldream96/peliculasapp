import React from 'react';
import { Image, StyleSheet, Text, View, Dimensions, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/Navigation';
import  Icon from 'react-native-vector-icons/Ionicons'
import useMovieDetails from '../hooks/useMovieDetails';
import MovieDetails from '../components/MovieDetails';

const screenHeight = Dimensions.get('screen').height;

interface Props extends StackScreenProps<RootStackParams,'DetailScreen'>{};

const DetailScreen = ({route, navigation}: Props) => {
    const movie = route.params;
    const uri = `https://image.tmdb.org/t/p/w500${ movie.poster_path }`

    const { isLoading, cast, movieFull } = useMovieDetails( movie.id );



    return (
        <ScrollView>
            <View style={ styles.imageContainer } >
                <View style={ styles.imageBorder }>
                    <Image
                        source={{ uri }}
                        style={ styles.posterImage }
                    />
                </View>
            </View>
            <View style={ styles.marginContainer } >
                <Text style={ styles.subtitle} > { movie.original_title } </Text>
                <Text style={ styles.title} > { movie.title } </Text>
            </View>
            {
                isLoading ?
                <ActivityIndicator size={ 35 } color="grey" style={{ marginTop: 20 }} />
                : <MovieDetails movieFull={movieFull!} cast={ cast } />
            }
            <TouchableOpacity
                style={ styles.backButton }
                onPress={ () => navigation.goBack() }
            >
                <Icon
                    color="white"
                    name="arrow-back-outline"
                    size={ 40 }
                />
            </TouchableOpacity>
                
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    posterImage:{
        flex: 1,
    },
    imageBorder:{
        flex: 1,
        overflow:'hidden',
        borderBottomEndRadius: 25,
        borderBottomStartRadius: 25,
    },
    imageContainer:{
        width: '100%',
        height: screenHeight * 0.65,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
        borderBottomEndRadius: 15,
        borderBottomStartRadius: 15,
    },
    marginContainer:{
        marginHorizontal: 20,
        marginTop: 20,
    },
    subtitle:{
        fontSize:16,
        opacity: 0.8,
    },
    title:{
        fontSize:20
    },
    backButton:{
        position: 'absolute',
        elevation: 9,
        zIndex: 999,
        top: 30,
        left: 5,
    },
});

export default DetailScreen;