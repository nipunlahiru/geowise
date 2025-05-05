import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Custom hook for making API requests with error handling and loading states
 * @param {string} url - The API endpoint URL
 * @param {Object} options - Additional axios options
 * @returns {Object} - { data, loading, error, refetch }
 */
const useApi = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log(`Fetching data from: ${url}`);
      const response = await axios.get(url, { 
        ...options,
        timeout: 15000, // 15 second timeout
      });
      console.log(`API Response status: ${response.status}`);
      console.log(`API Response data type: ${typeof response.data}`);
      console.log(`API Response data length: ${Array.isArray(response.data) ? response.data.length : 'Not an array'}`);
      setData(response.data);
    } catch (err) {
      console.error(`API Error fetching from ${url}:`, err);
      console.error(`Error details:`, {
        message: err.message,
        status: err.response?.status,
        statusText: err.response?.statusText,
        data: err.response?.data
      });
      
      setError({
        message: err.response?.data?.message || err.message || 'An error occurred',
        status: err.response?.status,
        code: err.code
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loading, error, refetch: fetchData };
};

export default useApi; 