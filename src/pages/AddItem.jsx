import React, { useState } from "react";

function AddItem({ addItem }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [country, setCountry] = useState("");
  const [category, setCategory] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [type, setType] = useState("movie"); // 'movie' or 'series'

  const handleSubmit = (e) => {
    e.preventDefault();
    addItem({ name, description, country, category, thumbnail }, type);
    setName("");
    setDescription("");
    setCountry("");
    setCategory("");
    setThumbnail(null);
  };

  const handleFileChange = (e) => {
    setThumbnail(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Add a Movie or Series</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="movie">Movie</option>
          <option value="series">Series</option>
        </select>
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
          placeholder="Year"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          type="submit"
        >
          Add {type.charAt(0).toUpperCase() + type.slice(1)}
        </button>
      </form>
    </div>
  );
}

export default AddItem;
