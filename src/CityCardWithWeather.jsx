import React, { useEffect, useState } from "react";

const CityCardWithWeather = ({ city, latitude, longitude, image }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
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
  }, [latitude, longitude]);

  if (loading) return <div>Loading weather data for {city}...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
   
    
      <div className="2xl:px-10 2xl:pr-8">
        
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 2xl:size-[600px] 2xl:px-10 2xl:py-10">
      <div className=" ">
      <img src={image} alt={city} style={{ width: "100%", height: "200px", objectFit: "cover" }}  className=" 2xl:h-56 2xl:w-screen " />

      </div>
    <a href="#">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white 2xl:text-3xl 2xl:pt-10"><h2>{city}</h2></h5>
    </a>
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 2xl:pt-10 2xl:text-2xl">
    <p>Max Temperature: {weatherData.maxTemp}°C</p>
      <p>Min Temperature: {weatherData.minTemp}°C</p>
      <p>Precipitation: {weatherData.precipitation}mm</p>
    </p>
    
    
</div>

    </div>
    </>
  );
};

export default CityCardWithWeather;
