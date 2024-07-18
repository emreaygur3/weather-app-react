import React, { useState, useEffect } from 'react';

const cities = [
  { name: 'Istanbul', lat: 41.0082, lon: 28.9784 },
  { name: 'Ankara', lat: 39.9334, lon: 32.8597 },
  { name: 'Izmir', lat: 38.4237, lon: 27.1428 },
  { name: 'Bursa', lat: 40.1828, lon: 29.0665 },
  { name: 'Adana', lat: 37.0, lon: 35.3213 },
  { name: 'Antalya', lat: 36.8969, lon: 30.7133 },
  { name: 'Gaziantep', lat: 37.0662, lon: 37.3833 },
  { name: 'Konya', lat: 37.8715, lon: 32.4845 },
  { name: 'Kayseri', lat: 38.7312, lon: 35.4787 },
  { name: 'Mersin', lat: 36.8121, lon: 34.6415 },
];

const WeatherComparison = ({ isCelsius }) => {
  const [weatherData, setWeatherData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const apiKey = 'e24e3522f1b728a0f81048a30a41a7da';
      try {
        const promises = cities.map(city =>
          fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(data => ({ city: city.name, temp: data.main.temp }))
        );

        const results = await Promise.all(promises);
        setWeatherData(results);
      } catch (err) {
        setError('Failed to fetch weather data');
      }
    };

    fetchWeatherData();
  }, []);

  const getTop5Cities = () => {
    return weatherData
      .sort((a, b) => b.temp - a.temp)
      .slice(0, 5);
      
  };

  const convertTemp = (temp) => {
    return isCelsius ? temp : (temp * 1.8 + 32).toFixed(2);
  };

  return (
    <div>
      <h2>Top 5 Hottest Cities in Turkey</h2>
      {error && <p>{error}</p>}
      <ul>
        {getTop5Cities().map((data, index) => (
          <li key={index}>
            {data.city}: {convertTemp(data.temp)}°{isCelsius ? 'C' : 'F'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeatherComparison;
