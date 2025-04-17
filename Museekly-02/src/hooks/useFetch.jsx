// src/hooks/useFetch.js
import { useState, useEffect } from 'react';

const useFetch = (initialUrl = '', initialData = null) => {
  const [url, setUrl] = useState(initialUrl);
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (url) => {
    if (!url) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Erreur réseau: ${response.status}`);
      }
      
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(error.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (url) {
      fetchData(url);
    }
  }, [url]);

  return { data, loading, error, setUrl, refetch: () => fetchData(url) };
};

export default useFetch;