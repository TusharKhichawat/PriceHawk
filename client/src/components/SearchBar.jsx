import React, { useState } from "react";

export function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");

  const handleInput = (e) => setInput(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(input);
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center my-8">
      <div className="flex w-full max-w-2xl rounded-lg shadow bg-white overflow-hidden border border-gray-200">
        <input
          value={input}
          onChange={handleInput}
          className="flex-1 px-4 py-3 text-lg outline-none bg-transparent"
          type="text"
          placeholder="Search for products..."
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 text-lg font-semibold hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>
    </form>
  );
}
  