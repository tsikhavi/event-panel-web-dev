import { Meta, StoryObj } from '@storybook/react';

import NotFound, { NotFoundProps } from './NotFound';

export default {
  component: NotFound,
  args: {
    isAuth: true,
    onNavigate: () => {},
  },
} as Meta<typeof NotFound>;

type Story = StoryObj<NotFoundProps>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: '100%' }}>
      <NotFound {...args} />
    </div>
  ),
};
