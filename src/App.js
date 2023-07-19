import {useEffect, useState} from 'react';
import './App.css'
import SearchIcon from './search.svg';
import MovieCard from './movieCard'
import MoviePopup from './MoviePopup';


const API_URL = 'https://www.omdbapi.com/?apikey=c032e2d7'


const App = () => {
    const [movies, setMovies] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedMovie, setSelectedMovie] = useState(null);
    

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`)
        const data = await response.json()

        console.log(data.Search);
        setMovies(data.Search);
    }

    const fetchMovieDetails = async (imdbID) => {
        const response = await fetch(`${API_URL}&i=${imdbID}`);
        const data = await response.json();

        console.log(data);
        setSelectedMovie(data);
    };
    

    useEffect(() => {
        searchMovies('Spiderman')
        //fetchMovieDetails('')
    }, []);

    const handleMovieClick = (movie) => {
        fetchMovieDetails(movie.imdbID);
    };
    
    const closePopup = () => {
        setSelectedMovie(null);
    };

    return (
        <div className='app'>
            <h1>Movie App</h1>

            <div className='search'>
                <input placeholder='search for movies' value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon} alt='Search' 
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {
                movies.length > 0 
                ? (
                    <div className='container'>
                        {movies.map((movie) => (
                            <div key={movie.imdbID}>
                                <MovieCard movie={movie} onClick={() => handleMovieClick(movie)} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='empty'>
                        <h2>No movies found</h2>
                    </div>
                )
            }

            {selectedMovie && <MoviePopup movie={selectedMovie} onClose={closePopup} />}
        </div>
    );
}

export default App;



