import { Meta, StoryObj } from '@storybook/react';

import Grid, { GridProps } from './Grid';

export default {
  component: Grid,
} as Meta<GridProps>;

type Story = StoryObj<GridProps>;

const Card = () => {
  return (
    <div
      style={{
        flex: 1,
        padding: '24px',

        borderRadius: '12px',
        backgroundColor: '#EFEFF2',
        boxShadow: '0px 4px 8px 0px rgba(3, 4, 44, 0.08)',
      }}
    >
      Card
    </div>
  );
};

export const Default: Story = {
  render: () => (
    <>
      <div style={{ width: '100%' }}>
        <Grid container gap={10}>
          <Grid item size={3}>
            <Card />
          </Grid>
          <Grid item size={2}>
            <Card />
          </Grid>
        </Grid>
      </div>

      <Grid container gap={10} direction="column">
        <Grid item size={1}>
          <Card />
        </Grid>
        <Grid item size={2}>
          <Card />
        </Grid>
      </Grid>
    </>
  ),
};
