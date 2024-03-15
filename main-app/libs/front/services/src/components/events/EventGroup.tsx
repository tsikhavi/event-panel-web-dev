import React, { FC, useEffect } from 'react';
import { useEventsList } from '@eventpanel/front/api';
import { EventDto } from '@eventpanel/shared/dto/events/event.dto';

import { SearchSuggestion, useSearchDropdown } from '../../hooks/useSearchDropdown';

type RenderProps = {
  selected: string[];
  onChange: (id: string) => void;
  suggestions: SearchSuggestion[];
  selectedEvents: EventDto[];
};

type EventGroupProps = {
  workspaceId: string;
  children: (props: RenderProps) => React.ReactElement;
};

const EventGroup: FC<EventGroupProps> = ({ workspaceId, children }) => {
  const { list, getList, status } = useEventsList();
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
    selectedEvents: selected.map((id) => list.find((el) => el.id === id) as EventDto),
  });
};

export default EventGroup;
