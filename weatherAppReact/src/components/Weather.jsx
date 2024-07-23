import React, { useState, useEffect } from 'react';
import { getRandomCoordinates } from '../helpers/randomCoordinates';
import { saveWeatherData, getWeatherData } from '../utils/LocalStorage';

const Weather = ({ onToggleUnit, isCelsius }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [searchType, setSearchType] = useState('city'); // 'city' or 'coordinates'

  const fetchWeather = async (query, url) => {
    const cachedData = getWeatherData(query);
    if (cachedData) {
      setWeatherData(cachedData);
      setError(null);
      return;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.cod === "200") {
        setWeatherData(data);
        saveWeatherData(query, data);
        setError(null);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to fetch weather data');
    }
  };

  const handleSearch = async () => {
    const apiKey = import.meta.env.VITE_API_KEY;
    if (searchType === 'city' && city) {
      const query = `city=${city}`;
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
      fetchWeather(query, url);
    } else if (searchType === 'coordinates' && latitude && longitude) {
      const query = `lat=${latitude}&lon=${longitude}`;
      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
      fetchWeather(query, url);
    } else {
      setError('Please provide valid input');
    }
  };

  const convertTemp = (temp) => {
    return isCelsius ? temp : (temp * 1.8 + 32).toFixed(2);
  };

  useEffect(() => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const handleSuccess = (position) => {
      const { latitude, longitude } = position.coords;
      const query = `lat=${latitude}&lon=${longitude}`;
      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
      fetchWeather(query, url);
    };

    const handleError = () => {
      const apiKey = import.meta.env.VITE_API_KEY;
      const randomCoordinates = getRandomCoordinates();
      const query = `lat=${randomCoordinates.lat}&lon=${randomCoordinates.lon}`;
      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${randomCoordinates.lat}&lon=${randomCoordinates.lon}&appid=${apiKey}&units=metric`;
      fetchWeather(query, url);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
    } else {
      handleError();
    }
  }, []);

  return (
    <div>
      <h2>Weather</h2>
      <div>
        <label>
          <input
            type="radio"
            value="city"
            checked={searchType === 'city'}
            onChange={() => setSearchType('city')}
          />
          Search by City
        </label>
        <label>
          <input
            type="radio"
            value="coordinates"
            checked={searchType === 'coordinates'}
            onChange={() => setSearchType('coordinates')}
          />
          Search by Coordinates
        </label>
      </div>
      {searchType === 'city' ? (
        <div className='weather-cityinput'>
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
      ) : (
        <div className='weather-numberinputs'>
          <input
            type="number"
            placeholder="Enter latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />
          <input
            type="number"
            placeholder="Enter longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
        </div>
      )}
      <button onClick={handleSearch}>Get Weather</button>
      <button onClick={onToggleUnit}>
        Show in {isCelsius ? 'Fahrenheit' : 'Celsius'}
      </button>
      {error && <p>{error}</p>}
      {weatherData ? (
        <div>
          <p>Location: {weatherData.city.name}</p>
          <p>Temperature: {convertTemp(weatherData.list[0].main.temp)}°{isCelsius ? 'C' : 'F'}</p>
          <p>Weather: {weatherData.list[0].weather[0].description}</p>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default Weather;
