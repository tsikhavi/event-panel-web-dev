import { customRender } from '../../../../test-utils';

import { getPropertiesList } from './__test-data__';
import PropertiesTable from './PropertiesTable';

describe('PropertiesTable', () => {
  it('should render default', () => {
    const properties = getPropertiesList(1);
    const { getByText } = customRender(<PropertiesTable properties={properties} />);

    //Table Header
    expect(getByText('Name')).toBeInTheDocument();
    expect(getByText('Property Type')).toBeInTheDocument();
    expect(getByText('Events')).toBeInTheDocument();
    expect(getByText('Constraints')).toBeInTheDocument();
    expect(getByText('Optionality')).toBeInTheDocument();

    //Table Content
    expect(getByText(properties[0].name)).toBeInTheDocument();
    expect(getByText(properties[0].description)).toBeInTheDocument();
  });
});
