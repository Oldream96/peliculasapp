import React from 'react';
import { FlatList, Text, View } from 'react-native';
import  Icon from 'react-native-vector-icons/Ionicons';
import { Cast } from '../interfaces/CreditsInterface';
import { MovieFull } from '../interfaces/movieInterface';
import currencyFormatter  from "currency-formatter";
import CastItem from './CastItem';

interface Props {
    movieFull: MovieFull;
    cast: Cast[];
}

const MovieDetails = ( { movieFull, cast } : Props) => {
    return (
        <>
            {/* Detalles */}
            <View style={{ marginHorizontal: 20 }} >
                <View style={{ flexDirection:'row' }} >
                    <Icon name="star-outline" color="grey" size={16}   />
                    <Text> { movieFull.vote_average } </Text>
                    <Text style={{ marginLeft:5 }} >
                        - { movieFull.genres.map( genre  => genre.name ).join(',')  }
                    </Text>
                </View>

                {/* Historia */}
                <Text style={{ fontSize: 23, marginTop: 10, fontWeight: 'bold' }} >
                    Historia
                </Text>
                <Text style={{ fontSize:15 }} >
                    {movieFull.overview}
                </Text>
                {/* Presupuesto */}
                <Text style={{ fontSize: 23, marginTop: 10, fontWeight: 'bold' }} >
                    Presupuesto
                </Text>
                <Text style={{ fontSize:15 }} >
                    { currencyFormatter.format(movieFull.budget, { code: 'USD' } ) }
                </Text>
            </View>

            {/* casting */}
            <View style={{ marginTop: 10, marginBottom: 100 }} >
                <Text style={{ fontSize: 23, marginTop: 10, fontWeight: 'bold', marginHorizontal:20 }} >
                    Actores
                </Text>
                <FlatList
                    data = { cast }
                    keyExtractor = { ( item) => item.id.toString() } 
                    renderItem={ ({ item }) => <CastItem actor={ item } /> }
                    horizontal={ true }
                    showsHorizontalScrollIndicator= { false }
                    style={{ marginTop: 10, height: 70 }}
                />
                
            </View>
        </>
    );
};

export default MovieDetails;