import { ComponentProps } from 'react';
import { fireEvent } from '@eventpanel/front/ui/test-utils';

import { render } from '../../../jest.setup';

import { TestDto, testForm } from './__test-data__';
import FormContainer from './FormContainer';

const children = 'children';

const getProps = (props: Partial<ComponentProps<typeof FormContainer>> = {}): ComponentProps<typeof FormContainer> => ({
  Resolver: TestDto,
  initForm: testForm,
  onSubmit: jest.fn(),
  render: () => <div>{children}</div>,
  ...props,
});

describe('FormContainer', () => {
  it('should render children', () => {
    const { getByText } = render(<FormContainer {...getProps()} />);

    expect(getByText(children)).toBeInTheDocument();
  });

  describe('onSubmit', () => {
    it('should call onSubmit by form submit', () => {
      const onSubmit = jest.fn();
      const { getByRole } = render(<FormContainer {...getProps({ onSubmit })} />);

      fireEvent.submit(getByRole('form'));

      expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    it('should call onSubmit on button click', () => {
      const button = 'Submit';
      const onSubmit = jest.fn();
      const { getByRole } = render(
        <FormContainer
          {...getProps({
            onSubmit,
            render: () => <button>{button}</button>,
          })}
        />
      );

      fireEvent.click(getByRole('button', { name: button }));

      expect(onSubmit).toHaveBeenCalledTimes(1);
    });
  });
});
