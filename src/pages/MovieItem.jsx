import React from "react";
import { Link } from "react-router-dom";

function MovieItem({ movie }) {
  return (
    <div className="p-4 border border-gray-300 rounded">
      {movie.thumbnail && (
        <img
          src={movie.thumbnail}
          alt={movie.name}
          className="w-full h-48 object-cover mb-2"
        />
      )}
      <h2 className="text-lg font-bold">{movie.name}</h2>
      <p>{movie.description}</p>
      <p>
        <strong>Country:</strong> {movie.country}
      </p>
      <p>
        <strong>Category:</strong> {movie.category}
      </p>
      <Link to={`/details/${movie.id}`} className="text-blue-500">
        <h3 className="text-xl font-bold">{movie.name}</h3>
      </Link>
    </div>
  );
}

export default MovieItem;
