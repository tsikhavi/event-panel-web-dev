import { customRender } from '../../../../test-utils';

import AuthLayout from './AuthLayout';

describe('AuthLayout', () => {
  it('should render default', () => {
    const children = 'children';
    const { getByText } = customRender(
      <AuthLayout>
        <AuthLayout.Form>{children}</AuthLayout.Form>
      </AuthLayout>
    );

    expect(getByText(children)).toBeInTheDocument();
  });
});
