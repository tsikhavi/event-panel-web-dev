import { BrowserRouter } from 'react-router-dom';
import { Meta, StoryObj } from '@storybook/react';

import Logo, { LogoProps } from './Logo';

export default {
  component: Logo,
  args: {
    onlyImage: false,
  },
  argTypes: {
    invert: { control: false },
  },
} as Meta<LogoProps>;

type Story = StoryObj<typeof Logo>;

const styles = { display: 'flex', width: '100%', padding: '8px 0' };
export const Default: Story = {
  render: (args) => (
    <BrowserRouter>
      <div style={{ ...styles, backgroundColor: '#001054' }}>
        <Logo {...args} invert />
      </div>

      <div style={{ ...styles }}>
        <Logo {...args} />
      </div>
    </BrowserRouter>
  ),
};
