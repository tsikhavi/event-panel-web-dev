import { FC, useEffect } from 'react';
import { useCreateEvent } from '@eventpanel/front/api';
import { CreateEventDto } from '@eventpanel/shared/dto/events/create-event.dto';
import { EventDto } from '@eventpanel/shared/dto/events/event.dto';

import FormContainer, { FormContainerRenderProps } from '../form/FormContainer';

type RenderPros = {
  field: FormContainerRenderProps<CreateEventDto>;
  isLoading: boolean;
  error: string | null;
};

export type CreateEventProps = {
  workspaceId: string;
  onSuccess: (data: EventDto) => void;
  render: (props: RenderPros) => JSX.Element;
};

const CreateEvent: FC<CreateEventProps> = ({ workspaceId, onSuccess, render }) => {
  const { event, createEvent, isLoading, error, status } = useCreateEvent();

  useEffect(() => {
    if (status === 'success' && event) {
      onSuccess(event);
    }
  }, [event, onSuccess, status]);

  return (
    <FormContainer
      initForm={{ workspaceId, name: '', source_ids: [] }}
      onSubmit={createEvent}
      Resolver={CreateEventDto}
      render={(field) => render({ field, isLoading, error })}
    />
  );
};

export default CreateEvent;
