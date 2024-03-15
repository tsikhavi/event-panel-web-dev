import type { Meta, StoryObj } from '@storybook/react';

import Typography, { Colors, TypographyProps } from './Typography';

export default {
  component: Typography,
  args: {
    color: 'primary',
  },
  argTypes: {
    color: {
      control: { type: 'radio' },
      options: ['primary', 'secondary'] as Colors[],
    },

    variant: { control: false },
  },
} as Meta<TypographyProps>;

type Story = StoryObj<typeof Typography>;

export const Default: Story = {
  render: (args) => (
    <>
      <Typography {...args} variant="h1">
        This variant is h1
      </Typography>
      <Typography {...args} variant="h2">
        This variant is h2
      </Typography>
      <Typography {...args} variant="h3">
        This variant is h3
      </Typography>
      <Typography {...args} variant="bodyXL">
        This variant is bodyXl
      </Typography>
      <Typography {...args} variant="bodyL">
        This variant is bodyL
      </Typography>
      <Typography {...args} variant="bodyM">
        This variant is bodyM
      </Typography>
      <Typography {...args} variant="bodyS">
        This variant is bodyS
      </Typography>
      <Typography {...args} variant="bodyXS">
        This variant is bodyXS
      </Typography>
      <Typography {...args} variant="bodyXXS">
        This variant is bodyXXS
      </Typography>
    </>
  ),
};
