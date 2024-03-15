import { customRender } from '../../../../test-utils';

import { getCategories } from './__test-data__';
import CategoriesTable, { CategoriesTableProps } from './CategoriesTable';

const categoriesAmount = 12;
const groupName = 'Group Name';

const categories = getCategories(1);

const getProps = (props: Partial<CategoriesTableProps> = {}): CategoriesTableProps => ({
  categories,
  ...props,
});

describe('CategoriesTable', () => {
  it('should render default', () => {
    const { getByText, queryByText } = customRender(<CategoriesTable {...getProps()} />);

    // Headers
    expect(queryByText('Group')).not.toBeInTheDocument();
    expect(queryByText(groupName)).not.toBeInTheDocument();
    expect(queryByText(`${categoriesAmount} categories`)).not.toBeInTheDocument();

    // Table Headers
    expect(getByText('Name')).toBeInTheDocument();
    expect(getByText('Amount of Events')).toBeInTheDocument();

    // Table Content
    expect(getByText(categories[0].name)).toBeInTheDocument();
    expect(getByText(categories[0].description)).toBeInTheDocument();
  });

  it('should render with groupName', () => {
    const { getByText } = customRender(<CategoriesTable {...getProps({ groupName })} />);

    expect(getByText('Group')).toBeInTheDocument();
    expect(getByText(groupName)).toBeInTheDocument();
  });

  describe('categoriesAmount', () => {
    it('should render when grater than 2', () => {
      const { getByText } = customRender(<CategoriesTable {...getProps({ categoriesAmount })} />);

      expect(getByText(`${categoriesAmount} categories`)).toBeInTheDocument();
    });

    it.each<number>([0, 1])('should NOT render when: %s', (categoriesAmount) => {
      const { queryByText } = customRender(<CategoriesTable {...getProps({ categoriesAmount })} />);

      expect(queryByText(`${categoriesAmount} categories`)).not.toBeInTheDocument();
    });
  });
});
