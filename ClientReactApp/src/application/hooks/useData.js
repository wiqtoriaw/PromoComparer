// src/application/hooks/useData.js
import { useState, useEffect } from 'react';

/**
 * Custom hook for data fetching.
 * @param {Function} fetchFn - The function that returns a promise resolving to data.
 * @param {Array} deps - Dependency array controlling when to re-run fetch.
 */
export default function useData(fetchFn, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchFn()
      .then(result => {
        if (mounted) setData(result);
      })
      .catch(err => {
        if (mounted) setError(err);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => { mounted = false; };
  }, deps);

  return { data, loading, error };
}
