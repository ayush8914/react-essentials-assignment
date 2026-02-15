import './App.css'
import PortfolioCard from './components/PortfolioCard/ProtfolioCard';
import movies from './Data/Movies';
import MovieCard from './components/MovieInterface/MovieCard';
import Header from './components/Header';
import { useState } from 'react';

function App() {
  const [activePage, setActivePage] = useState('portfolio');

  return (
    <div className="App">
      <Header active={activePage} setActive={setActivePage} />
      
      {activePage === 'portfolio' && <PortfolioCard />}
      
      {activePage === 'movies' && (
        <div className="movie-explorer-wrapper">
          <MovieCard movies={movies} />
        </div>
      )}
    </div>
  );
}

export default App;