import { Meta, StoryObj } from '@storybook/react';

import { getCategories } from './__test-data__';
import CategoriesTable, { CategoriesTableProps } from './CategoriesTable';

export default {
  component: CategoriesTable,
  args: {
    categoriesAmount: 3,
  },
} as Meta<CategoriesTableProps>;

type Story = StoryObj<CategoriesTableProps>;

export const Default: Story = {
  render: ({ categoriesAmount = 0, ...args }) => (
    <>
      <div style={{ width: '100%' }}>
        <CategoriesTable {...args} categories={getCategories(categoriesAmount)} />
      </div>

      <div style={{ width: '100%' }}>
        <CategoriesTable
          {...args}
          groupName="Taxi"
          categoriesAmount={categoriesAmount}
          categories={getCategories(categoriesAmount)}
        />
      </div>
    </>
  ),
};
