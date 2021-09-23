import { useEffect, useState } from "react";
import movieDB from "../api/movieDB";
import { MovieFull } from '../interfaces/movieInterface';
import { CreditsResponse, Cast } from '../interfaces/CreditsInterface';

interface MovieDetails {
    isLoading: boolean;
    movieFull?: MovieFull;
    cast : Cast[];
}


const useMovieDetails = (movieId: number) => {
    
    const [state, setState] = useState<MovieDetails>({
        isLoading: true,
        movieFull: undefined,
        cast: [],
    });

    const getMovieDetails = async() =>{
        const movieDetailsPromise = movieDB.get<MovieFull>(`/${ movieId }`);
        const castPromise = movieDB.get<CreditsResponse>(`/${ movieId }/credits`);
        
        const [ movieDetailsResponse, castResponse ] = await Promise.all([ movieDetailsPromise,castPromise ]);
        setState({
            isLoading: false,
            movieFull: movieDetailsResponse.data,
            cast: castResponse.data.cast,
        })
    }

    useEffect(()=>{
        getMovieDetails();
    },[]);


    return{
        ...state
    }

};

export default useMovieDetails;