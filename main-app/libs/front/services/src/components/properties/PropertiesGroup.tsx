import React, { FC, useEffect } from 'react';
import { usePropertiesList } from '@eventpanel/front/api';
import { PropertyDto } from '@eventpanel/shared/dto/properties/property.dto';

import { SearchSuggestion, useSearchDropdown } from '../../hooks/useSearchDropdown';

type RenderProps = {
  selected: string[];
  onChange: (id: string) => void;
  suggestions: SearchSuggestion[];
  selectedProperties: PropertyDto[];
};

type PropertiesGroupProps = {
  workspaceId: string;
  children: (props: RenderProps) => React.ReactElement;
};

const PropertiesGroup: FC<PropertiesGroupProps> = ({ workspaceId, children }) => {
  const { list, getList, status } = usePropertiesList();
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
    selectedProperties: selected.map((id) => list.find((el) => el.id === id) as PropertyDto),
  });
};

export default PropertiesGroup;
