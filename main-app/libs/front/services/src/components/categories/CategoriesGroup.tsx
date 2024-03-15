import React, { FC, useEffect } from 'react';
import { useCategoriesList } from '@eventpanel/front/api';
import { CategoryDto } from '@eventpanel/shared/dto/categories/category.dto';

import { SearchSuggestion, useSearchDropdown } from '../../hooks/useSearchDropdown';

type RenderProps = {
  selected: string[];
  onChange: (id: string) => void;
  suggestions: SearchSuggestion[];
  selectedCategories: CategoryDto[];
};

type CategoryGroupProps = {
  workspaceId: string;
  children: (props: RenderProps) => React.ReactElement;
};

const CategoryGroup: FC<CategoryGroupProps> = ({ workspaceId, children }) => {
  const { list, getList, status } = useCategoriesList();
  const { selected, suggestions, onChange } = useSearchDropdown(list);

  useEffect(() => {
    if (status === 'idle') {
      getList({ workspaceId });
    }
  }, [getList, status, workspaceId]);

  return children({
    selected,
    onChange,
    suggestions,
    selectedCategories: selected.map((id) => list.find((el) => el.id === id) as CategoryDto),
  });
};

export default CategoryGroup;
