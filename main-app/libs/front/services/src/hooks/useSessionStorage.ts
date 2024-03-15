import { useState } from 'react';

export type SessionStorageKeys = 'USER';

function useSessionStorage<T>(key: SessionStorageKeys, initialValue: T | null) {
  const storedValue = sessionStorage.getItem(key);
  const initial = storedValue ? JSON.parse(storedValue) : initialValue;

  const [value, setValue] = useState<T | null>(initial);

  const setStoredValue = (newValue: T | null) => {
    setValue(newValue);

    if (newValue === null) {
      sessionStorage.removeItem(key);
    } else {
      sessionStorage.setItem(key, JSON.stringify(newValue));
    }
  };

  return [value, setStoredValue] as const;
}

export default useSessionStorage;
