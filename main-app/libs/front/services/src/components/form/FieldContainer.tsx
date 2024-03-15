import { MutableRefObject, useState } from 'react';

import { FormInterface } from './Form';

export type FieldContainerRenderProps<FORM> = {
  name: keyof FORM;
  value: FORM[keyof FORM];
  onChange: (value: FORM[keyof FORM]) => void;
  error: string | null;
};

type ContainerProps<FORM> = {
  name: keyof FORM;
  control: MutableRefObject<FormInterface<FORM>>;
  render: (props: FieldContainerRenderProps<FORM>) => JSX.Element;
} & Partial<{
  isSubmitted: boolean;
}>;

const FieldContainer = <FORM,>({ name, control, isSubmitted, render }: ContainerProps<FORM>) => {
  const [value, setValue] = useState(control.current.getValue(name));
  const [error, setError] = useState(control.current.getError(name));

  const handleChange = (value: FORM[keyof FORM]) => {
    setValue(control.current.setValue(name, value));
    setError(control.current.getError(name));
  };

  return render({ name, value, error: isSubmitted ? error : null, onChange: handleChange });
};

export default FieldContainer;
