import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

function MovieDetails({ movies, setMovies, series, setSeries }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the item with the matching ID
  const item =
    movies.find((m) => m.id === id) || series.find((s) => s.id === id);

  if (!item) {
    return <div>Movie/Series not found</div>;
  }

  const handleDelete = () => {
    if (movies.some((m) => m.id === id)) {
      // If the item is found in movies, filter it out
      setMovies((prevMovies) => prevMovies.filter((m) => m.id !== id));
    } else if (series.some((s) => s.id === id)) {
      // If the item is found in series, filter it out
      setSeries((prevSeries) => prevSeries.filter((s) => s.id !== id));
    }
    navigate("/");
  };

  return (
    <div>
      <div className="flex flex-wrap justify-center items-center h-screen bg-gray-100">
        {item.thumbnail && (
          <img
            src={item.thumbnail}
            alt={item.name}
            className="w-64 h-auto rounded-lg shadow-md mb-10"
          />
        )}
        <div className="ml-20">
          <h1 className="text-3xl font-bold mb-5">{item.name}</h1>
          <p
            className="w-20 text-wrap text-gray-700 mb-4 whitespace-pre-line"
            id="desc"
          >
            {item.description}
          </p>
          <p>
            <strong>Country:</strong> {item.country}
          </p>
          <p>
            <strong>Year:</strong> {item.category}
          </p>
          <p>
            <strong>Type:</strong> ??
          </p>

          <div className="mt-6 flex space-x-4">
            <button
              className="bg-indigo-500 text-white py-1 px-6 rounded-full"
              style={{
                backgroundColor: "#7379FF",
                borderRadius: "15px 15px 15px 15px",
                padding: "7px 24px",
                width: "82px",
                height: "32px",
                opacity: 1,
              }}
            >
              <Link to={`/edit/${id}`}>Edit</Link>
            </button>
            {/* delete button */}
            <button
              onClick={handleDelete}
              className="bg-indigo-500 text-white py-1 px-6 rounded-full"
              style={{
                backgroundColor: "#7379FF",
                borderRadius: "15px 15px 15px 15px",
                padding: "7px 24px",
                width: "105px",
                height: "32px",
                opacity: 1,
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
