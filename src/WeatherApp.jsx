import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const WeatherApp = () => {
  const [dailyData, setDailyData] = useState([]);
  const [query, setQuery] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const API_KEY_GEOCODING = "a3ce3860d56143a0827c1a50e120572d"; // Replace with your OpenCage API key
  const API_KEY_WEATHER = "YOUR_OPEN_METEO_API_KEY"; // Replace with your Open-Meteo API key

  const API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`;

  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      fetchWeather();
    }
  }, [latitude, longitude, currentPage]);

  const fetchWeather = async () => {
    try {
      const response = await axios.get(API_URL);
      setDailyData(response.data.daily);
      setError("");
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("Error fetching weather data");
    }
  };

  const fetchCoordinates = async (city) => {
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${API_KEY_GEOCODING}`
      );
      const results = response.data.results;
      if (results.length > 0) {
        const { lat, lng } = results[0].geometry;
        setLatitude(lat);
        setLongitude(lng);
        setError("");
      } else {
        setError("City not found");
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      setError("Error fetching coordinates");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchCoordinates(query);
  };

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return dailyData.time
      ? dailyData.time.slice(startIndex, startIndex + itemsPerPage)
      : [];
  };

  const handleDetailClick = (index) => {
    const dayData = {
      date: dailyData.time[index],
      temperature_2m_max: dailyData.temperature_2m_max[index],
      temperature_2m_min: dailyData.temperature_2m_min[index],
      precipitation_sum: dailyData.precipitation_sum[index],
      humidity: dailyData.humidity_2m_max
        ? dailyData.humidity_2m_max[index]
        : "N/A", // Handle optional data
      wind_speed: dailyData.wind_speed_10m_max
        ? dailyData.wind_speed_10m_max[index]
        : "N/A", // Handle optional data
    };
    navigate("/detailed", { state: dayData });
  };

  return (
    <div>
      <section className="homesection">
        <div className="flex">
          <div className="grow h-14"></div>
          <div className="grow-0 h-14">
            {" "}
            <div className="homeform">
              <h1>Weather Forecast</h1>
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="Enter city"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                >
                  Search
                </button>
              </form>
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {dailyData.time && (
              <div>
                <h2>Daily Forecast</h2>
                <ul>
                  {getPaginatedData().map((date, index) => (
                    <li key={index}>
                      <h3>{date}</h3>
                      <p>
                        Max Temperature: {dailyData.temperature_2m_max[index]}°C
                      </p>
                      <p>
                        Min Temperature: {dailyData.temperature_2m_min[index]}°C
                      </p>
                      <p>
                        Precipitation: {dailyData.precipitation_sum[index]} mm
                      </p>
                      <button onClick={() => handleDetailClick(index)}>
                        View Details
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="pagination">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={
                  currentPage * itemsPerPage >=
                  (dailyData.time ? dailyData.time.length : 0)
                }
              >
                Next
              </button>
            </div>
          </div>
          <div className="grow h-14"></div>
        </div>
      </section>
    </div>
  );
};

export default WeatherApp;
