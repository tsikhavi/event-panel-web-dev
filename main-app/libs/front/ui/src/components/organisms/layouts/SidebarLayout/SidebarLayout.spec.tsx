import { BrowserRouter } from 'react-router-dom';

import { customRender } from '../../../../test-utils';

import SidebarLayout from './SidebarLayout';

describe('SidebarLayout', () => {
  it('should render', () => {
    const label = 'label';
    const Footer = 'Footer';
    const children = 'children';
    const { getByText } = customRender(
      <BrowserRouter>
        <SidebarLayout navigations={[[{ label, variant: 'item', path: '/' }]]} onNavigate={jest.fn()} Footer={Footer}>
          {children}
        </SidebarLayout>
      </BrowserRouter>
    );

    expect(getByText(label)).toBeInTheDocument();
    expect(getByText(Footer)).toBeInTheDocument();
    expect(getByText(children)).toBeInTheDocument();
  });
});
