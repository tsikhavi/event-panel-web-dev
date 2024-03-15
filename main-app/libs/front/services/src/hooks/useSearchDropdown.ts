import { useState } from 'react';

export type SearchSuggestion = {
  name: string;
  id: string;
};

export function useSearchDropdown<T extends SearchSuggestion>(suggestions: T[]) {
  const [selected, setSelected] = useState<string[]>([]);
  return {
    selected,
    onChange: (id: string) => setSelected([...selected, id]),
    suggestions: suggestions.map(({ id, name }) => ({
      id,
      name,
    })),
  };
}
