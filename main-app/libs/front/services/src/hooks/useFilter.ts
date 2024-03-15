import { useEffect, useState } from 'react';

type UseFilterProps = Partial<{
  initValue: string[];
  loadOptions: (value: string) => void;
}>;

export function useFilter({ loadOptions, initValue = [] }: UseFilterProps = {}) {
  const [search, setSearch] = useState('');
  const [value, setValue] = useState(initValue);

  useEffect(() => {
    search && loadOptions?.(search);
  }, [loadOptions, search]);

  return { value, onChange: setValue, onSearch: setSearch };
}
