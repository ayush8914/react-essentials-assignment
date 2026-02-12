import './MovieCard.css'
import MovieItemList from './MovieItemList';
import { useEffect, useState } from 'react';

function MovieCard(props){
    const [movies, setMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState(''); 
    const [favMovies, setFavMovies] = useState([]);

    useEffect(() => setMovies(props.movies), [props.movies]);
    useEffect(() => setFavMovies(movies.filter((movie) => movie.isFavorite === true)), [movies]);
    
    const filteredMovies = movies.filter((movie) => searchQuery === '' || 
    movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    movie.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
    movie.maintag.toLowerCase().includes(searchQuery.toLowerCase()) ||
    movie.year.toString().includes(searchQuery)
    );

    
    const handleReset = () => {
        setSearchQuery('');
        setMovies(props.movies);
        setFavMovies([]);
    }

    const handleFavorite = (id) => {
        const movie = movies.find((movie) => movie.id === id);
        movie.isFavorite = !movie.isFavorite;
        setMovies([...movies]);
        setFavMovies([...movies.filter((movie) => movie.isFavorite === true)]);
    }

    return(
        <div className='MovieCard'>
            <div className='header'>
                <h2>Movie Explorer</h2>
                <p>Search, filter, and favorite movies. Designed for a single-page React component structure.</p>
            </div>
            <div className='search-section'>
                <input onChange={(e) => setSearchQuery(e.target.value)} type="text" placeholder="Search Movies (e.g. 'The Matrix')" className='search-input'/>
                <button className='search-cancel'>x</button>
                <button className='reset-button'>Reset</button>
            </div>
            <div className=''>
                <div className='Matching-Movies'>
                   <h3>All Movies</h3>
                   <h3>Matching Movies</h3>
                   { filteredMovies.length > 0 && <MovieItemList movies={filteredMovies} handleFavorite={handleFavorite} />}
                </div>
                <div className='Favorite-Movies'>
                    <h3>Favorite Movies</h3>
                    { favMovies.length > 0 && <MovieItemList movies={favMovies} />}
                </div>
            </div>
        </div>

    );
}


export default MovieCard;