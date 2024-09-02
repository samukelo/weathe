import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import buda from "./assets/budapest.jpg";
import cape from "./assets/capetown.jpg";
import giyani from "./assets/giyani.png";
import joburg from "./assets/joburg.jpg";
import london from "./assets/london.jpg";
import regina from "./assets/regina.jpg";
import rio from "./assets/rio.jpg";
import sydney from "./assets/sydney.jpg";
import CityCardWithWeather from "./CityCardWithWeather";
const WeatherApp = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedLat, setSelectedLat] = useState(null);
  const [selectedLong, setSelectedLong] = useState(null);

  const handleCityClick = (lat, long, city) => {
    setSelectedLat(lat);
    setSelectedLong(long);
    setSelectedCity(city);
  };

  const cities = [
    {
      city: "Budapest",
      latitude: 47.4979,
      longitude: 19.0402,
      image: "src/assets/budapest.jpg",
    },
    {
      city: "London",
      latitude: 51.5074,
      longitude: -0.1278,
      image: "src/assets/london.jpg",
    },
    {
      city: "Cape Town",
      latitude: 33.9221,
      longitude: 18.4231,
      image: "src/assets/capetown.jpg",
    },
    {
      city: "Giyani",
      latitude: -23.3127,
      longitude: 30.7034,
      image: "src/assets/giyani.png",
    }, 
    {
      city: "Johannesburg",
      latitude: -26.2056,
      longitude: 28.0337,
      image: "src/assets/joburg.jpg",
    },{
      city: "Rio de Janeiro",
      latitude: -22.908333,
      longitude: -43.196388,
      image: "src/assets/rio.jpg",
    },{
      city: "Regina",
      latitude: 50.4452,
      longitude: -104.6189,
      image: "src/assets/regina.jpg",
    },{
      city: "Sydney",
      latitude: -33.865143,
      longitude: 151.209900,
      image: "src/assets/sydney.jpg",
    },
  ];

  const [dailyData, setDailyData] = useState([]);
  const [query, setQuery] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
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
  
  <div className="homeform">
             
              <form onSubmit={handleSearch}>
                <p>
                <input 
                className="searchbox border-2 border-blue-600"
                  type="text"
                  placeholder="Enter city"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                </p>
                
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
                <div className="grid gap-4 grid-cols-4">
              
                  {getPaginatedData().map((date, index) => (
              
                   <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
                    <a href="#" key={index}>
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{date}</h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    <p>
                        Max Temperature: {dailyData.temperature_2m_max[index]}°C
                      </p>
                      <p>
                        Min Temperature: {dailyData.temperature_2m_min[index]}°C
                      </p>
                      <p>
                        Precipitation: {dailyData.precipitation_sum[index]} mm
                      </p>
                      
                    </p>
                    <a  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <button onClick={() => handleDetailClick(index)}>
                        View Details
                      </button>
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </a>
                </div> 



                  
                    
                  ))}
            </div> 
              </div>
            )}
            <div className="pagination space-x-4 py-4">
              <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 pr-4"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={
                  currentPage * itemsPerPage >=
                  (dailyData.time ? dailyData.time.length : 0)
                }
              >
                Next
              </button>
            </div>
          
      <div className="grid gap-4 grid-cols-4">
        {cities.map((cityInfo) => (
          <CityCardWithWeather
            key={cityInfo.city}
            city={cityInfo.city}
            latitude={cityInfo.latitude}
            longitude={cityInfo.longitude}
            image={cityInfo.image}
          />
        ))}
        {/* <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
    <a href="#">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
    </a>
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
    <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Read more
        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
    </a>
</div> */}
      </div>
      
    </div>
  );
};

export default WeatherApp;
