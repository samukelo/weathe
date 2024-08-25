import React from "react";
import { useLocation } from "react-router-dom";

const getWeatherCondition = (data) => {
  if (data.precipitation_sum > 10) {
    return "Rainy"; // Adjust threshold as needed
  } else if (data.wind_speed > 20) {
    return "Windy"; // Adjust threshold as needed
  } else if (data.temperature_2m_max > 25) {
    return "Sunny"; // Adjust threshold as needed
  }
  return "Clear"; // Default condition
};

const DetailedPage = () => {
  const location = useLocation();
  const state = location.state;

  if (!state) {
    return <p>No data available</p>;
  }

  const weatherCondition = getWeatherCondition(state);

  return (
    <div>
      <h2>Detailed Weather Stats</h2>
      <p>Date: {state.date}</p>
      <p>Max Temperature: {state.temperature_2m_max}°C</p>
      <p>Min Temperature: {state.temperature_2m_min}°C</p>
      <p>Precipitation: {state.precipitation_sum} mm</p>
      <p>Humidity: {state.humidity}</p>
      <p>Wind Speed: {state.wind_speed} km/h</p>
      <p>Condition: {weatherCondition}</p>
    </div>
  );
};

export default DetailedPage;
