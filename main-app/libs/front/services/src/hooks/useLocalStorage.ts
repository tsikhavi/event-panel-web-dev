import { useState } from 'react';

export type LocalStorageKeys = 'USER' | 'TOKEN' | 'WORKSPACE';

function useLocalStorage<T>(key: LocalStorageKeys, initialValue: T | null) {
  const storedValue = localStorage.getItem(key);
  const initial = storedValue ? JSON.parse(storedValue) : initialValue;

  const [value, setValue] = useState<T | null>(initial);

  const setStoredValue = (newValue: T | null) => {
    setValue(newValue);

    if (newValue === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(newValue));
    }
  };

  return [value, setStoredValue] as const;
}

export default useLocalStorage;
