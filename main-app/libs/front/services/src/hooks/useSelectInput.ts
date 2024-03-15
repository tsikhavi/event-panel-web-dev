import { useState } from 'react';

import { SearchSuggestion } from './useSearchDropdown';

export function useSelectInput<T extends SearchSuggestion>(suggestions: T[]) {
  const [selected, setSelected] = useState<string[]>([]);
  return {
    selected,
    onChange: (ids: string[]) => setSelected(ids),
    suggestions: suggestions.map(({ id, name }) => ({
      id,
      name,
    })),
  };
}
