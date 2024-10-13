import { useState, useEffect } from 'react';
// Custom hook to fetch data from a given URL
const useFetch = <T,>(url: string) => {
  const [data, setData] = useState<T | null>(null); 
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState<string | null>(null); 

  //console.log('useFetch: ', url);
  useEffect(() => {
    // Fetch data from the given URL
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        // uncomment to debug (if non-formed JSON returned)
        //const myText = await response.text();
        //console.log(myText);
        const json = await response.json();
        setData(json); 
      } catch (err) {
        // Cast the error to Error and access the message
        const errorMessage = (err as Error).message;
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchData();  // Call fetch function when component mounts
  }, [url]);

  return { data, loading, error };  // Return data, loading, and error states
};

export default useFetch;