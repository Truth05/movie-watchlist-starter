// TASK 4b: move your fetch logic from MovieList into this hook.
// It takes a url and returns { data, loading, error }.
import { useState, useEffect } from "react";
export default function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
  const controller = new AbortController();
  setLoading(true);
  setError(null);
  async function load() {
  try {
  
   const res = await fetch(url, {
    signal: controller.signal
  });
  
  if (!res.ok) {
    throw new Error("Failed to load movies");
  }
  const data = await res.json();
  setData(data);
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

}, [url]);

 return { data, loading, error };
}
