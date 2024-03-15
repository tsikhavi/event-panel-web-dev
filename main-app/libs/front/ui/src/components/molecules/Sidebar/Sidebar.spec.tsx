import { BrowserRouter } from 'react-router-dom';

import { customRender, fireEvent } from '../../../test-utils';

import { navigations } from './__test-data__';
import Sidebar from './Sidebar';

const handleNavigate = jest.fn();

const TestSidebar = () => (
  <BrowserRouter>
    <Sidebar Footer={<footer>Footer</footer>}>
      {navigations.map((items, index) => (
        <Sidebar.Nav key={index} items={items} onNavigate={handleNavigate} />
      ))}
    </Sidebar>
  </BrowserRouter>
);

describe('Sidebar', () => {
  it('should render', () => {
    const { getByText, queryByText } = customRender(<TestSidebar />);

    expect(queryByText(/map/)).toBeInTheDocument();
    expect(getByText('Workspace')).toBeInTheDocument();
    expect(getByText('Groups')).toBeInTheDocument();

    expect(queryByText(/setting/)).toBeInTheDocument();
    expect(getByText('Settings')).toBeInTheDocument();
    expect(getByText('Import')).toBeInTheDocument();

    expect(getByText('Footer')).toBeInTheDocument();
  });

  it('should change highlighted item on click', () => {
    const { getByText } = customRender(<TestSidebar />);

    fireEvent.click(getByText('Groups'));

    expect(getByText('Groups').className).toContain('active');
    expect(getByText('Workspace').parentElement?.className).not.toContain('active');

    fireEvent.click(getByText('Events'));
    expect(getByText('Groups').className).not.toContain('active');
    expect(getByText('Events').className).toContain('active');
    expect(getByText('Workspace').parentElement?.className).not.toContain('active');

    fireEvent.click(getByText('Import'));
    expect(getByText('Events').className).not.toContain('active');
    expect(getByText('Workspace').className).not.toContain('active');
    expect(getByText('Import').className).toContain('active');
    expect(getByText('Settings').parentElement?.className).not.toContain('active');
  });

  it('should NOT change highlighted item on head click', () => {
    const { getByText } = customRender(<TestSidebar />);

    fireEvent.click(getByText('Groups'));
    expect(getByText('Groups').className).toContain('active');
    expect(getByText('Workspace').parentElement?.className).not.toContain('active');

    fireEvent.click(getByText('Workspace'));
    expect(getByText('Groups').className).toContain('active');
    expect(getByText('Workspace').parentElement?.className).not.toContain('active');
  });
});
