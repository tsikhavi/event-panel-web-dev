import { FC, useEffect } from 'react';
import { useGroupsList } from '@eventpanel/front/api';
import { GroupDto } from '@eventpanel/shared/dto/groups/group.dto';

import { useSearchField } from '../../hooks/useSearchField';

type Search = {
  value: string;
  onSearch: (value: string) => void;
  suggestions: { label: string; subLabel: string }[];
};

type Groups = {
  list: GroupDto[];
  getList: () => void;
};

type GroupsListProps = {
  workspaceId: string;
  children: (props: { search: Search; groups: Groups }) => JSX.Element;
};

const suggestions: Search['suggestions'] = [
  { label: 'Search', subLabel: 'suggestion' },
  { label: 'Another search', subLabel: 'and another suggestion' },
  { label: 'One more search', subLabel: 'and one more suggestion' },
  { label: 'Wubba Lubba', subLabel: 'Dub Dub' },
];

const GroupsList: FC<GroupsListProps> = ({ workspaceId, children }) => {
  const { list, getList, status } = useGroupsList();
  const search = useSearchField();

  useEffect(() => {
    if (status === 'idle') {
      getList({ workspaceId });
    }
  }, [getList, status, workspaceId]);

  return children({
    search: { ...search, suggestions },
    groups: { list, getList: () => getList({ workspaceId }) },
  });
};

export default GroupsList;
