import useSWR from 'swr';
import PeopleService from '@/mocks/services/people';
import { useState, useEffect } from 'react';
export default function usePeople(
  timeOut: number = 1500,
  testError: boolean = false,
  testEmpty: boolean = false
) {
  const [data, setData] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    setIsLoading(false);
    setData(PeopleService.getPeople());
  }, []);
  return {
    data: data,
    isLoading,
    isError: error !== null,
  };
}
