import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";
import DetailedPage from "./DetailedPage";
import WeatherApp from "./WeatherApp";

function App() {
  return (
    <Router>
      <Navbar />
      <h1 className="text-center text-3xl">Weather Forecast</h1>
      <Routes>
        <Route path="/" element={<WeatherApp />} />
        <Route path="/detailed" element={<DetailedPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
