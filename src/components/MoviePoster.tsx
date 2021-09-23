import { useNavigation } from '@react-navigation/core';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Movie } from '../interfaces/movieInterface';
import { Navigation } from '../navigation/Navigation';

interface Props {
    movie: Movie;
    height?: number;
    width?: number;
}

const MoviePoster = ( {movie, height = 400, width = 250}: Props ) => {

    const uri = `https://image.tmdb.org/t/p/w500${ movie.poster_path }`

    const navigation = useNavigation();
    
    return (
        <TouchableOpacity 
            activeOpacity={0.8}
            onPress={ () => navigation.navigate('DetailScreen' as never, movie as never) }
            style={{ 
                width,
                height,
                marginHorizontal: 2,
                paddingBottom: 10,
                paddingHorizontal: 7
                
            }} 
         >
            <View style={ styles.imageContainer }>
                <Image 
                    style={ styles.image } 
                    source={{ uri }}
                />
            </View>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    image:{
        borderRadius: 18,
        flex:1,
    },
    imageContainer:{
        flex: 1,
        borderRadius: 18,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    },
});



export default MoviePoster;