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
        setMovies([...movies.map((movie) => movie.id === id ? movie : movie)]);
        setFavMovies([...movies.filter((movie) => movie.isFavorite === true)]);
    }

    return(
        <div className='MovieCard'>
            <div className='card-header'>
                <h1>Movie Explorer</h1>
                <p className='bio'>Search, filter, and favorite movies. Designed for a single-page React component structure.</p>
            </div>
            <div className='search-section'>
                <input onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery} type="text" placeholder="Search Movies (e.g. 'The Matrix')" className='search-input'/>
                <button className='search-cancel' onClick={handleReset}  >x</button>
                <button className='reset-button' onClick={handleReset}>Reset</button>
            </div>
            <div className='Movie-section'>
                <h3>All Movies</h3>
                <div className='All-Movies'>
                    <div className='Fliter-List'>
                        <h3>Matching Movies</h3>
                        <div className='Matching-Movies'>
                           <div className='Movies-List'>
                            { filteredMovies.length > 0 && <MovieItemList movies={filteredMovies} handleFavorite={handleFavorite} />}
                           </div>
                        </div>
                    </div>
                    <div className='Favorite-Movies'>
                        <h3>Favorite Movies</h3>
                        { favMovies.length > 0 ? <MovieItemList movies={favMovies}/> : (
                            <p className='no-favorites'>You haven't added any favorites yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>

    );
}


export default MovieCard;