import { Meta, StoryObj } from '@storybook/react';

import PageLayout, { PageLayoutProps } from './PageLayout';

export default {
  component: PageLayout,
  args: {
    contentHeight: 500,
    Header: 'Header',
  },
  argTypes: {
    Header: { control: false },
    Content: { control: false },
  },
} as Meta<PageLayoutProps & { contentHeight: number }>;

type Story = StoryObj<PageLayoutProps & { contentHeight: number }>;

export const Default: Story = {
  render: ({ contentHeight: height, ...args }) => (
    <PageLayout
      {...args}
      Content={
        <div
          style={{
            height,
            padding: '30px',

            fontSize: '50px',
            textAlign: 'center',

            borderRadius: '24px',
            backgroundColor: '#FAFAFF',
            boxShadow: '0px 4px 8px 0px rgba(3, 4, 44, 0.08)',
          }}
        >
          Content with height: {height}px
        </div>
      }
    />
  ),
};
