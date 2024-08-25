import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditItem({ movies, setMovies, series, setSeries }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the item to edit
  const item =
    movies.find((m) => m.id === id) || series.find((s) => s.id === id);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [country, setCountry] = useState("");
  const [category, setCategory] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [type, setType] = useState("movie"); // Default type to movie

  useEffect(() => {
    if (item) {
      setName(item.name);
      setDescription(item.description);
      setCountry(item.country);
      setCategory(item.category);
      setThumbnail(item.thumbnail);
      setType(movies.includes(item) ? "movie" : "series");
    }
  }, [item]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (type === "movie") {
      setMovies(
        movies.map((m) =>
          m.id === id
            ? { ...m, name, description, country, category, thumbnail }
            : m
        )
      );
    } else {
      setSeries(
        series.map((s) =>
          s.id === id
            ? { ...s, name, description, country, category, thumbnail }
            : s
        )
      );
    }

    navigate(`/details/${id}`);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Edit {type.charAt(0).toUpperCase() + type.slice(1)}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full p-2 border border-gray-300 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          className="w-full p-2 border border-gray-300 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />
        <input
          className="w-full p-2 border border-gray-300 rounded"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Country"
          required
        />
        <input
          className="w-full p-2 border border-gray-300 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setThumbnail(URL.createObjectURL(e.target.files[0]))}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          type="submit"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditItem;
