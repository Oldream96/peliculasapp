import axios from "axios";

const movieDB = axios.create({
        baseURL: 'https://api.themoviedb.org/3/movie',
        params:{
            api_key: 'a3686e40425695d7f7e57d46a13f3d95',
            language: 'es-ES'
        }
})


export default movieDB;