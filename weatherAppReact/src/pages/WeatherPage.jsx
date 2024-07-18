import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Weather from '../components/Weather';
import WeatherComparison from '../components/WeatherComparison';

const WeatherPage = ({ currentUser }) => {
  const navigate = useNavigate();
  const [isCelsius, setIsCelsius] = useState(true);

  const handleBackToLogin = () => {
    navigate('/login');
  };

  const toggleUnit = () => {
    setIsCelsius(!isCelsius);
  };

  return (
    <div>
      <h1>Weather</h1>
      {currentUser && <p>Welcome, {currentUser.email}!</p>}
      <Weather isCelsius={isCelsius} onToggleUnit={toggleUnit} />
      <WeatherComparison isCelsius={isCelsius} />
      <button onClick={handleBackToLogin}>Back to Login</button>
    </div>
  );
};

export default WeatherPage;
