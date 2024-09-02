import React, { useEffect, useState } from "react";
import CityCard from "./CityCardWithWeather";

const Weather = ({ latitude, longitude, city }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (latitude && longitude) {
      const fetchWeather = async () => {
        try {
          const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const data = await response.json();
          const todayData = {
            maxTemp: data.daily.temperature_2m_max[0],
            minTemp: data.daily.temperature_2m_min[0],
            precipitation: data.daily.precipitation_sum[0],
          };
          setWeatherData(todayData);
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };

      fetchWeather();
    }
  }, [latitude, longitude]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Weather in {city}</h1>
      <p>Max Temperature: {weatherData.maxTemp}°C</p>
      <p>Min Temperature: {weatherData.minTemp}°C</p>
      <p>Precipitation: {weatherData.precipitation}mm</p>
    </div>
  );
};

export default Weather;
