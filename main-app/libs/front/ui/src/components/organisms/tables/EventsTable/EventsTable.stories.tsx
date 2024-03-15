import { Meta, StoryObj } from '@storybook/react';

import { getEventsList } from './__test-data__';
import EventsTable, { EventsTableProps } from './EventsTable';

export default {
  component: EventsTable,
  args: {
    eventsAmount: 4,
  },
} as Meta<EventsTableProps>;

type Story = StoryObj<EventsTableProps>;

export const Default: Story = {
  render: ({ eventsAmount = 0, ...args }) => (
    <>
      <div style={{ width: '100%' }}>
        <EventsTable {...args} events={getEventsList(eventsAmount)} />
      </div>

      <div style={{ width: '100%' }}>
        <EventsTable
          {...args}
          events={getEventsList(eventsAmount)}
          categoryName="Landing"
          eventsAmount={eventsAmount}
        />
      </div>
    </>
  ),
};
