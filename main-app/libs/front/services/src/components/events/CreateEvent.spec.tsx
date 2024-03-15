import React from 'react';
import * as authHook from '@eventpanel/front/api';
import { CreateEventDto } from '@eventpanel/shared/dto/events/create-event.dto';
import { EventDto } from '@eventpanel/shared/dto/events/event.dto';

import { fireEvent } from '../../../jest.setup';
import { customRender } from '../../test-utils';
import { FormContainerRenderProps } from '../form/FormContainer';

import CreateEvent, { CreateEventProps } from './CreateEvent';

type ResultType = ReturnType<typeof authHook.useCreateEvent>;
const mockCreateEvent = jest.fn();
const getResult = (result: Partial<ResultType> = {}): ResultType => ({
  event: null,
  error: null,
  status: 'idle',
  isLoading: false,
  createEvent: mockCreateEvent,
  ...result,
});
jest.mock('@eventpanel/front/api', () => ({
  useCreateEvent: jest.fn<ResultType, unknown[]>(() => getResult()),
}));

const getForm = (form: Partial<CreateEventDto> = {}): CreateEventDto => ({
  name: 'Event Name',
  source_ids: [],
  workspaceId: '2d04ecdf-b247-469d-99e0-a0ca1f7f1ab5',
  ...form,
});

const renderForm = (control: FormContainerRenderProps<CreateEventDto>['control'], form: CreateEventDto = getForm()) => {
  control.current.setValue('name', form.name);
  control.current.setValue('description', form.description);
  control.current.setValue('source_ids', form.source_ids);
  return <div />;
};

const getProps = (props: Partial<CreateEventProps> = {}): CreateEventProps => ({
  onSuccess: jest.fn(),
  workspaceId: '2d04ecdf-b247-469d-99e0-a0ca1f7f1ab5',
  render: ({ field: { control } }) => renderForm(control),
  ...props,
});

describe('CreateEvent', () => {
  it('should render default', () => {
    const test = 'test';
    const props = getProps({ render: () => <div>{test}</div> });
    const { getByText } = customRender(<CreateEvent {...props} />);

    expect(props.onSuccess).not.toHaveBeenCalled();
    expect(getByText(test)).toBeInTheDocument();
  });

  it('should call onSuccess', () => {
    jest.spyOn(authHook, 'useCreateEvent').mockReturnValue(getResult({ event: {} as EventDto, status: 'success' }));

    const props = getProps();
    customRender(<CreateEvent {...props} />);

    expect(props.onSuccess).toHaveBeenCalledTimes(1);
  });

  describe('createEvent', () => {
    it('should call when form has NO errors', () => {
      const { getByRole } = customRender(<CreateEvent {...getProps()} />);

      fireEvent.submit(getByRole('form'));
      expect(mockCreateEvent).toHaveBeenCalledTimes(1);
      expect(mockCreateEvent).toHaveBeenCalledWith(getForm());
    });

    it.each<[string, CreateEventDto]>([
      ['name too short', getForm({ name: 'Q' })],
      ['name too long', getForm({ name: new Array(50).fill('Q').join('') })],
    ])('should NOT call when: %s', (_, form) => {
      const props = getProps({ render: ({ field: { control } }) => renderForm(control, form) });
      const { getByRole } = customRender(<CreateEvent {...props} />);

      fireEvent.submit(getByRole('form'));
      expect(mockCreateEvent).not.toHaveBeenCalled();
    });
  });
});
