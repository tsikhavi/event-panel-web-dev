import { fireEvent, render } from '../../../jest.setup';

import { errorMessage, TestDto, testForm } from './__test-data__';
import FieldContainer, { FieldContainerRenderProps } from './FieldContainer';
import FormContainer from './FormContainer';

function Field<FORM extends object>({ name, error, value, onChange }: FieldContainerRenderProps<FORM>) {
  return (
    <div>
      <label>
        {name as string}
        <input
          type="text"
          name={name as string}
          value={value as string}
          onChange={(e) => onChange(e.target.value as FORM[keyof FORM])}
        />
      </label>
      {error}
    </div>
  );
}

function Form() {
  return (
    <FormContainer
      Resolver={TestDto}
      initForm={testForm}
      onSubmit={jest.fn()}
      render={(props) => <FieldContainer {...props} name="firstName" render={(props) => <Field {...props} />} />}
    />
  );
}

describe('FieldContainer', () => {
  it('should render field', () => {
    const { getByLabelText } = render(<Form />);

    expect(getByLabelText('firstName')).toBeInTheDocument();
  });

  it('should change field value', () => {
    const value = 'Morty';
    const { getByLabelText, getByDisplayValue } = render(<Form />);

    fireEvent.change(getByLabelText('firstName'), { target: { value } });
    expect(getByDisplayValue(value)).toBeInTheDocument();
  });

  it('should display error', () => {
    const value = '!';
    const { getByText, queryByText, getByRole, getByLabelText } = render(<Form />);

    fireEvent.change(getByLabelText('firstName'), { target: { value } });
    expect(queryByText(errorMessage)).not.toBeInTheDocument();

    fireEvent.submit(getByRole('form'));
    expect(getByText(errorMessage)).toBeInTheDocument();
  });
});
