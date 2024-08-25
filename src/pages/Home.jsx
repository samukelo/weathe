import React from "react";
import { Link } from "react-router-dom";

function Home({ movies, series }) {
  return (
    <div>
      <section className="Home page">
        <div className="flex flex-row">
          <div class="basis-1/4"></div>
          <div class="basis-1/2">
            <div className="mt-20 mb-20 text-center decoration text-xl">
              LATEST MOVIES
            </div>
            <div className="row">
              <div className="grid grid-cols-4  gap-20 mt-40">
                {movies.map((movie) => (
                  <div className="flex flex-wrap justify-center space-x-16">
                    <Link to={`/details/${movie.id}`} key={movie.id}>
                      {movie.thumbnail && (
                        <img
                          src={movie.thumbnail}
                          alt={movie.name}
                          className="h-56 w-100 object-container mt-10"
                        />
                      )}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div class="basis-1/4"></div>
        </div>
        <div className="flex flex-wrap justify-end items-end">
          <button className="bg-blue-600 rounded-full py-1 px-6 mr-64 mt-5 text-white text-xs">
            <Link to="/movies">More</Link>
          </button>
        </div>
        <br /> <br />
        <div className="flex flex-row">
          <div class="basis-1/4"></div>
          <div class="basis-1/2">
            <div className="mt-20 mb-20 text-center decoration text-xl">
              LATEST SERIES
            </div>
            <div className="row">
              <div className="grid grid-cols-4  gap-20 mt-40">
                {series.map((series) => (
                  <div className="flex flex-wrap justify-center space-x-16">
                    <Link to={`/details/${series.id}`} key={series.id}>
                      {series.thumbnail && (
                        <img
                          src={series.thumbnail}
                          alt={series.name}
                          className="h-56 w-40 object-container mt-10"
                        />
                      )}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div class="basis-1/4"></div>
        </div>
        <div className="flex flex-wrap justify-end items-end">
          <button className="bg-blue-600 rounded-full py-1 px-6 mr-64 mt-5 text-white text-xs">
            <Link to="/series">More</Link>
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;
