// src/application/hooks/useData.js
import { useState, useEffect } from 'react';

export default function useData(fetchFn) {
  const [data, setData] = useState([]);
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
  }, [fetchFn]);

  return { data, loading, error };
}
