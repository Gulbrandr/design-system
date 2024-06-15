import { useState, useEffect } from 'react';
import { services } from '../pages/api/[[...service]]';

export default function useService<T>(service: keyof typeof services) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();

  const fetchData = async () => {
    try {
      const data = await fetch('http://localhost:3000/api/' + service);
      const dataJson = await data.json();
      setData(dataJson as T[]);
    } catch (error) {
      console.log('error', error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (error) {
      console.error(error);
    }
    if (data) {
      console.log(data);
    }
  }, [data, error]);

  return { data, error, loading };
}
