import { useState, useEffect } from 'react';
import './App.css'; 

function App() {
  const [city, setCity] = useState('surat');
  const [searchInput, setSearchInput] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
  const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';


  useEffect(() => {
    const fetchWeather = async (cityName) => {
    if (!cityName.trim()) return;

    setLoading(true);
    setError(null);
    setWeather(null);

    try {
      const response = await fetch(
        `${BASE_URL}?q=${cityName}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('City not found');
        }
        throw new Error('Failed to fetch weather data');
      }

      const data = await response.json();
      setWeather({
        temp: Math.round(data.main.temp),
        feels_like: Math.round(data.main.feels_like),
        humidity: data.main.humidity,
        wind: Math.round(data.wind.speed * 3.6), // m/s → km/h
        condition: data.weather[0].main,
        description: data.weather[0].description,
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        cityName: data.name,
        country: data.sys.country
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
    fetchWeather(city);

    return () => {
      setLoading(false);
      setError(null);
      setWeather(null);
    }
  }, [city]); 



  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setCity(searchInput.trim());
      setSearchInput('');
    }
  };

  return (
    <div className="app">
      <h1>Weather Dashboard</h1>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Enter city name..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          Get Weather
        </button>
      </form>

      {loading && <p className="loading">Loading weather data...</p>}

      {error && <p className="error">{error}</p>}

      {weather && !loading && !error && (
        <div className="weather-card">
          <h2>
            {weather.cityName}, {weather.country}
          </h2>

          <img src={weather.icon} alt={weather.description} />

          <p className="temperature">{weather.temp}°C</p>
          <p className="condition">
            {weather.condition} ({weather.description})
          </p>

          <div className="details">
            <p>Feels like: {weather.feels_like}°C</p>
            <p>Humidity: {weather.humidity}%</p>
            <p>Wind: {weather.wind} km/h</p>
          </div>
        </div>
      )}

      {!weather && !loading && !error && (
        <p>Enter a city to see weather information</p>
      )}
    </div>
  );
}

export default App;