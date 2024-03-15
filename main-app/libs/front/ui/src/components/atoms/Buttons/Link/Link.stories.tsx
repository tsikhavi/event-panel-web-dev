import { BrowserRouter } from 'react-router-dom';
import { Meta, StoryObj } from '@storybook/react';

import Typography from '../../Typography/Typography';

import Link from './Link';

export default {
  component: Link,
  argTypes: {
    to: { control: false },
  },
} as Meta<typeof Link>;

type Story = StoryObj<typeof Link>;

export const Default: Story = {
  render: (args) => (
    <BrowserRouter>
      <Typography variant="h1">
        This font is inherited by this <Link {...args}>link</Link>
      </Typography>

      <Typography variant="h2">
        This font is inherited by this <Link {...args}>link</Link>
      </Typography>

      <Typography variant="h3">
        This font is inherited by this <Link {...args}>link</Link>
      </Typography>

      <Typography variant="bodyXL">
        This font is inherited by this <Link {...args}>link</Link>
      </Typography>

      <Typography variant="bodyL">
        This font is inherited by this <Link {...args}>link</Link>
      </Typography>

      <Typography variant="bodyM">
        This font is inherited by this <Link {...args}>link</Link>
      </Typography>

      <Typography variant="bodyS">
        This font is inherited by this <Link {...args}>link</Link>
      </Typography>

      <Typography variant="bodyXS">
        This font is inherited by this <Link {...args}>link</Link>
      </Typography>

      <Typography variant="bodyXXS">
        This font is inherited by this <Link {...args}>link</Link>
      </Typography>
    </BrowserRouter>
  ),
};
