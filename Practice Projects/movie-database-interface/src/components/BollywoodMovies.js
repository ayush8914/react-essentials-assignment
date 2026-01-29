import React , {useState} from "react";
import './BollywoodMovies.css';

const BollywoodMovies = [
    {
        id: 1,
        title: "3 Idiots",
        rating: 8.4,
        genre : "Comedy, Drama",
        year : 2009,
        director: "Rajkumar Hirani",
        image :"https://m.media-amazon.com/images/M/MV5BOTIzNzc3OTMtMmQ0Mi00YzM1LTlhZjQtNGJmOTY5MmI5Zjg1XkEyXkFqcGc@._V1_FMjpg_UX500_.jpg",
        cast : ["Aamir Khan", "R. Madhavan", "Sharman Joshi"],
    },
    {
        id: 2,
        title: "Dangal",
        rating: 8.4,
        genre : "Biography, Drama, Sport",
        year : 2016,
        director: "Nitesh Tiwari",
        image :"https://m.media-amazon.com/images/M/MV5BMDkxYmI5NzUtMDBmYy00ODdhLTkwMmEtNmZkZjMxMjRmNThiXkEyXkFqcGc@._V1_FMjpg_UY452_.jpg",
        cast : ["Aamir Khan", "Sakshi Tanwar", "Fatima Sana Shaikh"],
    },
    {
        id: 3,
        title: "Lagaan",
        rating: 8.1,
        genre : "Drama, Sport",
        year : 2001,
        director: "Ashutosh Gowariker",
        image :"https://m.media-amazon.com/images/M/MV5BNDM5ZWM2ZTktZTM5My00NGQzLWFkYmItZjAyNDU0ZTliOGIyXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        cast : ["Aamir Khan", "Gracy Singh", "Rachel Shelley"],
    },
    {
        id: 4,
        title: "Kabhi Khushi Kabhie Gham",
        rating: 7.5,
        genre : "Drama, Romance",
        year : 2001,
        director: "Karan Johar",
        image :"https://m.media-amazon.com/images/M/MV5BN2MyZGVhNmMtY2JkNy00ZmIzLTkwOGItY2NiM2MyOGMxODkzXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        cast : ["Amitabh Bachchan", "Jaya Bachchan", "Shah Rukh Khan"],
    },
    {
        id: 5,
        title: "Barfi!",
        rating: 8.1,
        genre : "Comedy, Drama, Romance",
        year : 2012,
        director: "Anurag Basu",
        image :"https://m.media-amazon.com/images/M/MV5BMTQzMTEyODY2Ml5BMl5BanBnXkFtZTgwMjA0MDUyMjE@._V1_FMjpg_UX709_.jpg",
        cast : ["Ranbir Kapoor", "Priyanka Chopra", "Ileana D'Cruz"],
    },
    {
        id: 6,
        title: "Zindagi Na Milegi Dobara",
        rating: 8.1,
        genre : "Adventure, Comedy, Drama",
        year : 2011,
        director: "Zoya Akhtar",
        image :"https://m.media-amazon.com/images/M/MV5BMDUwZjE1ZTMtNTcwZi00YTJhLTkyZmYtNjU4ZGIzNWFmZjE2XkEyXkFqcGc@._V1_FMjpg_UX1038_.jpg",
        cast : ["Hrithik Roshan", "Farhan Akhtar", "Abhay Deol"],
    },
    {
        id: 7,
        title: "Swades",
        rating: 8.2,
        genre : "Drama",
        year : 2004,
        director: "Ashutosh Gowariker",
        image :"https://bollywoodmovieposters.com/wp-content/uploads/2024/02/swades-movie-poster-original-srk-shah-rukh-khan-film.jpg",
        cast : ["Shah Rukh Khan", "Gayatri Joshi", "Kishori Ballal"],
    },
    {
        id: 8,
        title: "Queen",
        rating: 8.2,
        genre : "Adventure, Comedy, Drama",
        year : 2013,
        director: "Vikas Bahl",
        image :"https://m.media-amazon.com/images/M/MV5BMTM3ZGUwYTEtZTI5NS00ZmMyLTk2YmQtMWU4YjlhZTI3NjRjXkEyXkFqcGc@._V1_FMjpg_UY4096_.jpg",
        cast : ["Kangana Ranaut", "Rajkummar Rao", "Lisa Haydon"],
    },
    {
        id: 9,
        title: "Padmaavat",
        rating: 7.0,
        genre : "Drama, History, Romance",
        year : 2018,
        director: "Sanjay Leela Bhansali",
        image :"https://m.media-amazon.com/images/M/MV5BZmQzZjVkZTUtYjI4ZC00ZDJmLWI0ZDUtZTFmMGM1Mzc5ZjIyXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        cast : ["Deepika Padukone", "Shahid Kapoor", "Ranveer Singh"],
    } ,
    {
        id: 10,
        title: "Bajrangi Bhaijaan",
        rating: 9.2,
        genre : "Adventure, Comedy, Drama",
        year : 2015,
        director: "Kabir Khan",
        image :"https://stat5.bollywoodhungama.in/wp-content/uploads/2025/01/Toxic.jpg",
        cast : ["Salman Khan", "Harshaali Malhotra", "Nawazuddin Siddiqui"],
    }   
];


export default function BollywoodMovie() {
    
    //state to manage loading
    const [Loading, setLoading] = useState(false);

    //state for genre filtering
    const [selectedGenre, setSelectedGenre] = useState('All');

    //state for movies data
    const [movies, setMovies] = useState(BollywoodMovies);

    //state for search term
    const [searchTerm, setSearchTerm] = useState('');

    //state for sorting
    const [sortBy, setSortBy] = useState('title');

    const RatingCategory = (rating) => {
        if (rating >= 9.0) return 'blockbuster';
        if (rating >= 8.5) return 'superhit';
        if (rating >= 7.5) return 'hit';
        return 'average';
    }

    const filterAndSortMovies = () => {
        let filteredMovies = movies;

        // Apply search filter
        if (searchTerm) {
            filteredMovies = filteredMovies.filter(movie =>
                movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                movie.director.toLowerCase().includes(searchTerm.toLowerCase()) ||
                movie.cast.some(actor => actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                movie.genre.toLowerCase().includes(searchTerm.toLowerCase())
            )
            );
        }
        return filteredMovies;
    };  



    return (
        <div className={"bollywood-movies"}>
            <h1>bollywood Hits</h1>

            {
                Loading ? (
                    <div className="loading-spinner">
                        <p>Loading Movie...</p>
                    </div>
                ) : 
                (
                    <div className="main-content">
                        <div className="search-section">
                            <input
                                type="text"
                                placeholder="Search by title, director, or cast..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                        </div>
                       <div className="movie-grid">
                        {   filterAndSortMovies().map((movie) => (
                            <div key={movie.id} className={`movie-card ${RatingCategory(movie.rating)}`}>
                                <img src={movie.image} alt={movie.title} className="movie-image" />
                                <h3 className="movie-title">{movie.title}</h3>
                                <p className="movie-year">{movie.year}</p>
                                <p className="movie-genre">{movie.genre}</p>
                                <p className="movie-rating">Rating: {movie.rating}</p>
                                <p className="movie-director">Director: {movie.director}</p>
                                <div className={`movie-rating rating-${RatingCategory(movie.rating)}`}>{movie.rating}/10</div>
                                <p className="movie-cast">Cast: {movie.cast.join(', ')}</p>
                            </div>
                        ))

                        }
                       </div>
                    </div>
                )
            }

        </div>
    );
}
