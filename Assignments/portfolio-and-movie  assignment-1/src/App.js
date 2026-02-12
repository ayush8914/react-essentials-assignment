import './App.css'
import PortfolioCard from './components/PortfolioCard/ProtfolioCard';
import movies from './Data/Movies';
import MovieCard from './components/MovieInterface/MovieCard';
import Header from './components/Header';
import { useState } from 'react';

function App(){
  const [activePage, setActivePage] = useState('portfolio');

  return(
    <div className="App">
      <div>
        <Header active={activePage} setActive={setActivePage} />
      </div>
      <div>
        {activePage === 'portfolio' && <PortfolioCard/> }
      </div>
      <div className='MovieExpolrer'>
        {activePage === 'movies' && <MovieCard movies={movies}/> }
      </div>
    </div>
  );
}

export default App