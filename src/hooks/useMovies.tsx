import { useEffect, useState } from 'react';
import movieDB from '../api/movieDB';
import { MovieDbMoviesResponse, Movie } from '../interfaces/movieInterface';

interface MovieState {
    nowPlaying: Movie[];
    popular: Movie[];
    topRated: Movie[];
    upcoming: Movie[];
}

const useMovies = () => {

    const [isLoading, setisLoading] = useState(true);

    const [movieState, setMovieState] = useState<MovieState>({
        nowPlaying : [],
        popular : [],
        topRated : [],
        upcoming : [],
    });


    const getMovies = async () =>{
        const nowPlayingPromise = movieDB.get< MovieDbMoviesResponse >('/now_playing');
        const popularPromise    = movieDB.get< MovieDbMoviesResponse >('/popular');
        const topRatedPromise   = movieDB.get< MovieDbMoviesResponse >('/top_rated');
        const upcomingPromise   = movieDB.get< MovieDbMoviesResponse >('/upcoming');

        const resps = await Promise.all([
            nowPlayingPromise,
            popularPromise,
            topRatedPromise,
            upcomingPromise 
        ]);
        
        setMovieState({
            nowPlaying: resps[0].data.results,
            popular : resps[1].data.results,
            topRated : resps[2].data.results,
            upcoming : resps[3].data.results,
        })

        setisLoading(false);
    }


    useEffect(() => {
        //now playing
        getMovies();
    }, []);





    return {
        ...movieState,
        isLoading
    }
};

export default useMovies;