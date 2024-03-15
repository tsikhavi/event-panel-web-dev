import { customRender } from '../../../../test-utils';

import { getEventsList } from './__test-data__';
import EventsTable, { EventsTableProps } from './EventsTable';

const categoryName = 'Category Name';
const eventsAmount = 12;

const events = getEventsList(1);

const getProps = (props: Partial<EventsTableProps> = {}): EventsTableProps => ({
  events,
  ...props,
});

describe('EventsTable', () => {
  it('should render default', () => {
    const { queryByText, getByText } = customRender(<EventsTable {...getProps()} />);

    // Headers
    expect(queryByText('Category')).not.toBeInTheDocument();
    expect(queryByText(categoryName)).not.toBeInTheDocument();
    expect(queryByText(`${eventsAmount} events`)).not.toBeInTheDocument();

    // Table Headers
    expect(getByText('Name')).toBeInTheDocument();
    expect(getByText('Parameters')).toBeInTheDocument();
    expect(getByText('Sources')).toBeInTheDocument();
    expect(getByText('Tags')).toBeInTheDocument();

    // Table Content
    expect(getByText(events[0].name)).toBeInTheDocument();
    expect(getByText(events[0].description)).toBeInTheDocument();
  });

  it('should render with categoryName', () => {
    const { getByText } = customRender(<EventsTable {...getProps({ categoryName })} />);

    expect(getByText('Category')).toBeInTheDocument();
    expect(getByText(categoryName)).toBeInTheDocument();
  });

  describe('eventsAmount', () => {
    it('should render when grater than 2', () => {
      const { getByText } = customRender(<EventsTable {...getProps({ eventsAmount })} />);

      expect(getByText(`${eventsAmount} events`)).toBeInTheDocument();
    });

    it.each<number>([0, 1])('should NOT render when: %s', (eventsAmount) => {
      const { queryByText } = customRender(<EventsTable {...getProps({ eventsAmount })} />);

      expect(queryByText(`${eventsAmount} events`)).not.toBeInTheDocument();
    });
  });
});
