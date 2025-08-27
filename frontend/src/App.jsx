// src/App.jsx
import React from "react";
import MovieGenerator from "./componnets/MovieGenerator";

function App() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6">
          🎬 AI Movie Recommender
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Enter a <span className="font-semibold">genre</span> and your{" "}
          <span className="font-semibold">mood</span> to get personalized
          movie recommendations powered by AI.
        </p>
        <MovieGenerator />
      </div>
    </div>
  );
}

export default App;
