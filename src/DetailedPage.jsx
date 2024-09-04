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
    <div className="text-xl text-center py-4">
      <h2 className="pb-4 text-2xl">Detailed Weather Statso</h2>
      <div className="flex justify-center space-x-2">
        <div>
        <h3 className="text-blue-900 text-2xl">Date: </h3>
        </div>
        <div>
        <p > {state.date}</p>
        </div>
      </div>
      <div className="flex justify-center space-x-2">
        <div>
        <h3  className="text-blue-800 text-2xl">Max Temperature:</h3>
        </div>
        <div>
        <p> {state.temperature_2m_max}°C</p>
        </div>
      </div>
     <div className="flex justify-center space-x-2">
     <h3  className="text-blue-800 text-2xl">Min Temperature: </h3>
     <p> {state.temperature_2m_min}°C</p>
     </div>
      
      <div className="flex justify-center space-x-2">
      <h3  className="text-blue-800 text-2xl">Precipitation:</h3>
      <p> {state.precipitation_sum} mm</p>
      </div>
      <div className="flex justify-center space-x-2">
      <h3  className="text-blue-800 text-2xl">Humidity:</h3>
      <p>  {state.humidity}</p>

      </div>
      <div className="flex justify-center space-x-2">
      <h3  className="text-blue-800 text-2xl">Wind Speed: </h3>
      <p> {state.wind_speed} km/h</p>
      </div>
      <div className="flex justify-center space-x-2">
      <h3  className="text-blue-800 text-2xl">Condition: </h3>
      <p> {weatherCondition}</p>

      </div>
    </div>
  );
};

export default DetailedPage;
