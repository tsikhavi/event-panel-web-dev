import { customRender } from '../../../../test-utils';

import { getGroups } from './__test-data__';
import GroupsTable from './GroupsTable';

describe('GroupsTable', () => {
  it('should render default', () => {
    const groups = getGroups(1);
    const { getByText } = customRender(<GroupsTable groups={groups} />);

    //Table Header
    expect(getByText('Name')).toBeInTheDocument();
    expect(getByText('Amount of Categories')).toBeInTheDocument();
    expect(getByText('Amount of Events')).toBeInTheDocument();

    //Table Content
    expect(getByText(groups[0].name)).toBeInTheDocument();
    expect(getByText(groups[0].description)).toBeInTheDocument();
  });
});
