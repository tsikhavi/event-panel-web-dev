import React, { FC, useEffect } from 'react';
import { useEventsList, useSourcesList } from '@eventpanel/front/api';
import { EventDto } from '@eventpanel/shared/dto/events/event.dto';
import { SourceDto } from '@eventpanel/shared/dto/sources/source.dto';

import { useFilter } from '../../hooks/useFilter';
import { useSearchField } from '../../hooks/useSearchField';

type Search = {
  value: string;
  onSearch: (value: string) => void;
  suggestions: { label: string; subLabel: string }[];
};

type Option = {
  id: string;
  label: string;
};

type Filter = {
  value: string[];
  options: Record<string, Option>;
  onSearch: (value: string) => void;
  onChange: (value: string[]) => void;
};

type Events = {
  list: EventDto[];
  getList: () => void;
};

export type EventsProps = {
  workspaceId: string;
  children: (props: {
    search: Search;
    tagsFilter: Filter;
    sourcesFilter: Filter;
    categoriesFilter: Filter;
    events: Events;
    sources: SourceDto[];
  }) => React.ReactElement;
};

const suggestions: Search['suggestions'] = [
  { label: 'Search', subLabel: 'suggestion' },
  { label: 'Another search', subLabel: 'and another suggestion' },
  { label: 'One more search', subLabel: 'and one more suggestion' },
  { label: 'Wubba Lubba', subLabel: 'Dub Dub' },
];

const options: Filter['options'] = {
  '1': { id: '1', label: 'Label 1' },
  '2': { id: '2', label: 'Label 2' },
  '3': { id: '3', label: 'Label 3' },
  '4': { id: '4', label: 'Label 4' },
  '5': { id: '5', label: 'Label 5' },
  '6': { id: '6', label: 'This label has too many words' },
};

const EventsList: FC<EventsProps> = ({ workspaceId, children }) => {
  const { list, getList, status } = useEventsList();
  const { list: sources, getList: getSources } = useSourcesList();
  const search = useSearchField();

  const tagsFilter = useFilter();
  const sourcesFilter = useFilter();
  const categoriesFilter = useFilter();

  useEffect(() => {
    if (status === 'idle') {
      getList({ workspaceId });
      getSources({ workspaceId });
    }
  }, [getList, getSources, status, workspaceId]);

  const sourcesOptions: Record<string, Option> = Object.fromEntries(
    sources.map((source) => [source.id, { id: source.id, label: source.name }])
  );

  return children({
    search: { ...search, suggestions },
    tagsFilter: { ...tagsFilter, options },
    sourcesFilter: { ...sourcesFilter, options: sourcesOptions },
    categoriesFilter: { ...categoriesFilter, options },
    events: { list, getList: () => getList({ workspaceId }) },
    sources: sources,
  });
};

export default EventsList;
