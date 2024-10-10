import { useState, useEffect } from 'react';

// Custom hook to fetch data from a given URL
const useFetch = (url) => {
  const [data, setData] = useState(null);  // State for storing the fetched data
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);  // Error state

  useEffect(() => {
    // Fetch data from the given URL
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const json = await response.json();
        console.log('fetched: ' + url);
        setData(json.result);  // Store the fetched data
      } catch (err) {
        setError(err.message);  // Set any errors
      } finally {
        setLoading(false);  // Stop loading
      }
    };

    fetchData();  // Call fetch function when component mounts
  }, [url]);  // Re-run the effect if the URL changes

  return { data, loading, error };  // Return data, loading, and error states
};

export default useFetch;
