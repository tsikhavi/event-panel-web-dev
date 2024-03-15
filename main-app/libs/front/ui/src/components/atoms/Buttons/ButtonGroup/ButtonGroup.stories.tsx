import { Meta, StoryObj } from '@storybook/react';

import Button from '../Button/Button';

import ButtonGroup, { ButtonGroupProps } from './ButtonGroup';

export default {
  component: ButtonGroup,
} as Meta<ButtonGroupProps>;

type Story = StoryObj<ButtonGroupProps>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: '500px' }}>
      <ButtonGroup {...args}>
        <Button fullWidth label="I'm Button" />
        <Button fullWidth label="Click me" variant="outlined" />
      </ButtonGroup>
    </div>
  ),
};
