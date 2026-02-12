import './MovieItem.css'
import {FaRegHeart} from 'react-icons/fa'

function MovieItem(props){
    return(
        <div className='MovieItem'>
            <div className='content-container'>
                <div className='Movie-header'>
                            <h2>{props.title}</h2>
                            <span className='Year-Category'>{props.year}  · {props.category}</span>
                </div> 
                <div className='content'>
                        <div className='rating'>
                            <span className='Rating'>{props.rating}</span>
                        </div>
                        <div className='mainTag'>
                            <span className='MainTag'>{props.maintag}</span>
                        </div>
                        <div className='tags'>
                            {props.tags && props.tags.map((tag) => (<span className='Tag' key={tag}>{tag}</span>))}
                        </div>
                </div>
            </div>
            <div>
                <div className={`favorite-button ${props.isFavorite ? "Favorited" : ""}`}>
                        <FaRegHeart /> 
                        <span onClick={() => props.handleFavorite(props.id)}> {props.isFavorite ? "Favorited" : "Favorite"}</span>
                        
                </div>                     
            </div>   
        </div>
    );
}

export default MovieItem