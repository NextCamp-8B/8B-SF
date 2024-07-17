import { useEffect, useState } from 'react';

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    if (typeof delay !== 'number') {
      console.error('delay: number 타입만을 허용');
      return;
    }

    if (typeof value !== 'string') {
      console.error('value: string 타입만을 허용');
      return;
    }

    const handler = setTimeout(() => {
      setDebouncedValue((prev) => {
        if (prev !== value) {
          return value;
        }

        return prev;
      });
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
