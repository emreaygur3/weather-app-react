import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Weather from '../components/Weather';
import WeatherComparison from '../components/WeatherComparison';
import '../css/WeatherPage.css'; 

const WeatherPage = ({ currentUser }) => {
  const navigate = useNavigate();
  const [isCelsius, setIsCelsius] = useState(true);

  const handleGoExcel = () => {
    navigate('/excel');
  };

  const toggleUnit = () => {
    setIsCelsius(!isCelsius);
  };

  return (
    <div className="weather-container">
      <h1 className='pageHeader'>Welcome to Quick Weather</h1>
      <div className="weather-content">
        <div className="card">
          <Weather isCelsius={isCelsius} onToggleUnit={toggleUnit} />
          <label>You can use excel as a source</label>
          <button className="excel-button" onClick={handleGoExcel}>Excel</button>
        </div>
        <div className="top-cities-card">
          <WeatherComparison isCelsius={isCelsius} />
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;
