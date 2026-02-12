import './MovieItemList.css'
import MovieItem from './MovieItem';

function MovieItemList(props) {


    return(
        <div className='MovieItemList'> 
            {props.movies && 
            props.movies.map((movie) => (
                    <MovieItem key={movie.id} title={movie.title} year={movie.year} 
                    category={movie.category} rating={movie.rating} maintag={movie.maintag} tags={movie.tags} 
                    handleFavorite={props.handleFavorite} id={movie.id} />
                )
            )}
        </div>
    )
}

export default MovieItemList