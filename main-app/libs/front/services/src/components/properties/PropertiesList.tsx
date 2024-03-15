import { FC, useEffect } from 'react';
import { usePropertiesList } from '@eventpanel/front/api';
import { PropertyDto } from '@eventpanel/shared/dto/properties/property.dto';

import { useSearchField } from '../../hooks/useSearchField';

type Search = {
  value: string;
  onSearch: (value: string) => void;
  suggestions: { label: string; subLabel: string }[];
};

type Properties = {
  list: PropertyDto[];
  getList: () => void;
};

type PropertiesListProps = {
  workspaceId: string;
  children: (props: { search: Search; properties: Properties }) => JSX.Element;
};

const suggestions: Search['suggestions'] = [
  { label: 'Search', subLabel: 'suggestion' },
  { label: 'Another search', subLabel: 'and another suggestion' },
  { label: 'One more search', subLabel: 'and one more suggestion' },
  { label: 'Wubba Lubba', subLabel: 'Dub Dub' },
];

const PropertiesList: FC<PropertiesListProps> = ({ workspaceId, children }) => {
  const { list, getList, status } = usePropertiesList();
  const search = useSearchField();

  useEffect(() => {
    if (status === 'idle') {
      getList({ workspaceId });
    }
  }, [getList, status, workspaceId]);

  return children({
    search: { ...search, suggestions },
    properties: { list, getList: () => getList({ workspaceId }) },
  });
};

export default PropertiesList;
