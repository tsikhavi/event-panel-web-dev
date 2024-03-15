import { useEffect, useState } from 'react';

type UseSearchFieldProps = Partial<{
  initValue: string;
  loadSuggestions: (value: string) => void;
}>;

export function useSearchField({ initValue, loadSuggestions }: UseSearchFieldProps = {}) {
  const [search, setSearch] = useState(initValue ?? '');

  useEffect(() => {
    // ToDo Add Debounce
    search && loadSuggestions?.(search);
  }, [loadSuggestions, search]);

  return { value: search, onSearch: setSearch };
}
