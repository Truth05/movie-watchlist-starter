import MovieCard from "./MovieCard.jsx";
import { useState, useEffect } from "react";

export default function MovieList() {
  // TASK 3: stop using sampleMovies. Fetch "/movies.json" in a useEffect.
  // Keep three pieces of state: movies, loading, error. Show "Loading..." and an error message.
  // Abort the request in the cleanup function.
  // TASK 4b: later, move all of that into your useFetch hook.
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  const controller = new AbortController();
  async function load() {
  try {
  
   const res = await fetch("/movies.json", {
    signal: controller.signal
  });
  
  if (!res.ok) {
    throw new Error("Failed to load movies");
  }
  const data = await res.json();
  setMovies(data);
  setLoading(false);

  } 
  
  catch (err) {
    if (err.name === "AbortError") return;

    setError(err.message);
    setLoading(false);

  }
}

load();

return () => controller.abort();

}, []);
  if (loading) {
  return <p>Loading movies...</p>;
}

if (error) {
  return <p>{error}</p>;
}

return (
  <div className="grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
