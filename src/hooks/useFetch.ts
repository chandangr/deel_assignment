import { useEffect, useState } from 'react';

export const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    try {
      const fetchData = async () => {
        setIsLoading(true);
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
        setIsLoading(false);
    };

      fetchData();
    } catch (error) {
      console.log(error);
      setIsError(true);
      setIsLoading(false);
    }
  }, [url]);

  return { data, isLoading, isError };
}; 