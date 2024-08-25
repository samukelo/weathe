import React from "react";
import { Link } from "react-router-dom";
import MovieItem from "./MovieItem";

function Movies({ movies }) {
  return (
    <div>
      <div className="flex flex-wrap justify-end items-end">
        <button className="bg-blue-600 rounded-full py-1 px-6 mr-64 mt-5 text-white text-xs">
          <Link to="/add">ADD</Link>
        </button>
      </div>
      <div className="row">
        <div className="grid grid-cols-4  gap-20 mt-40">
          {movies.map((movies) => (
            <div className="flex flex-wrap justify-center space-x-16">
              <Link to={`/details/${movies.id}`} key={movies.id}>
                {movies.thumbnail && (
                  <img
                    src={movies.thumbnail}
                    alt={movies.name}
                    className="h-56 w-40 object-container mt-10"
                  />
                )}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Movies;
