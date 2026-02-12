import './MovieCard.css'
import MovieItemList from './MovieItemList';
import { useEffect, useState } from 'react';
import { FaRegHeart ,  FaSearch, FaTimes, FaSyncAlt  } from 'react-icons/fa';

function MovieCard(props){
    const [movies, setMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState(''); 
    

    useEffect(() => setMovies(props.movies), [props.movies]);
    
      const handleReset = () => {
        setSearchQuery('');
        setMovies(props.movies);
    }

    const handleFavorite = (id) => {
      setMovies(prevMovies =>
  prevMovies.map(movie =>
    movie.id === id 
      ? { ...movie, isFavorite: !movie.isFavorite } 
      : movie
  )
);
    }

    const filteredMovies = movies.filter((movie) => searchQuery === '' || 
    movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    movie.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
    movie.maintag.toLowerCase().includes(searchQuery.toLowerCase()) ||
    movie.year.toString().includes(searchQuery)
    );

    const favMovies = movies.filter((movie) => movie.isFavorite);


    return(
        <div className='MovieCard'>
            <div className='card-header'>
                <h1>Movie Explorer</h1>
                <p className='bio'>Search, filter, and favorite movies. Designed for a single-page React component structure.</p>
            </div>
            <div className='search-section'>
                <div className='search-box'>
                    <span className='lni'><FaSearch /></span>
                    <input className='search-input' onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery} type="text" placeholder="Search Movies (e.g. 'The Matrix')" className='search-input'/>
                    <span className='lni lni-xmark' onClick={handleReset} > <FaTimes /></span>
                </div>
                <div className='reset-button' onClick={handleReset}>
                    <span><FaSyncAlt /></span> <span>Reset</span>
                </div>
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
                        { favMovies.length > 0 ? 
                        (
                            <div className='Fav-Movies-List'>
                                {favMovies.map((movie) => <p key={movie.id} className='Fav-Movie'><FaRegHeart style={{color:"red"}}/> &nbsp;{movie.title}</p>)} 
                            </div>
                        ) : (
                            <p className='no-favorites'>You haven't added any favorites yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>

    );
}


export default MovieCard;