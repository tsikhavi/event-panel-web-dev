import { FC, useEffect } from 'react';
import { useCategoriesList } from '@eventpanel/front/api';
import { CategoryDto } from '@eventpanel/shared/dto/categories/category.dto';

import { useSearchField } from '../../hooks/useSearchField';

type Search = {
  value: string;
  onSearch: (value: string) => void;
  suggestions: { label: string; subLabel: string }[];
};

type Categories = {
  list: CategoryDto[];
  getList: () => void;
};

type CategoriesListProps = {
  workspaceId: string;
  children: (props: { search: Search; categories: Categories }) => JSX.Element;
};

const suggestions: Search['suggestions'] = [
  { label: 'Search', subLabel: 'suggestion' },
  { label: 'Another search', subLabel: 'and another suggestion' },
  { label: 'One more search', subLabel: 'and one more suggestion' },
  { label: 'Wubba Lubba', subLabel: 'Dub Dub' },
];

const CategoriesList: FC<CategoriesListProps> = ({ workspaceId, children }) => {
  const { list, getList, status } = useCategoriesList();
  const search = useSearchField();

  useEffect(() => {
    if (status === 'idle') {
      getList({ workspaceId });
    }
  }, [getList, status, workspaceId]);

  return children({
    search: { ...search, suggestions },
    categories: { list, getList: () => getList({ workspaceId }) },
  });
};

export default CategoriesList;
