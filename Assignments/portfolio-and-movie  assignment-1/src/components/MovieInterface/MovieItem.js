import './MovieItem.css'

function MovieItem(props){
    return(
        <div className='MovieItem'>
            <div className='header'>
                <div className='Title'>
                        <h2>{props.title}</h2>
                        <span className='Year-Category'>{props.year}  · {props.category}</span>
                </div>
            </div> 
            <div className='rating'>
                <span className='Rating'>{props.rating}</span>
            </div>
            <div className='mainTag'>
                <span className='MainTag'>{props.maintag}</span>
            </div>
            <div className='tags'>
                {props.tags && props.tags.map((tag) => (<span className='Tag'>{tag}</span>))}
            </div>   
            <div className='favorite-button'>
                <button className='favorite' onClick={() => props.handleFavorite(props.id)}>Favorite</button>
            </div>                     
        </div>
    );
}

export default MovieItem