import React, { MutableRefObject, useState } from 'react';
import { ClassConstructor } from 'class-transformer';

import { FormInterface } from './Form';
import { useForm } from './useForm';

export type FormContainerRenderProps<FORM> = {
  isSubmitted: boolean;
  isFilled: boolean;
  control: MutableRefObject<FormInterface<FORM>>;
};

type FormContainerProps<FORM> = {
  initForm: FORM;
  onSubmit: (data: FORM) => void;
  Resolver: ClassConstructor<FORM>;
  render: (props: FormContainerRenderProps<FORM>) => JSX.Element;
};

const FormContainer = <FORM extends object>({ initForm, onSubmit, Resolver, render }: FormContainerProps<FORM>) => {
  const { control, handleSubmit, isSubmitted } = useForm({ initForm, Resolver });
  const [isFilled, setIsFilled] = useState<boolean>(false);

  const checkIsFilled = () => {
    setIsFilled(Object.values(control.current.getForm()).every((value) => value !== ''));
  };

  return (
    <form
      id={'sidemodal-form'}
      noValidate
      aria-label="form"
      onSubmit={handleSubmit(onSubmit)}
      onChange={() => checkIsFilled()}
    >
      {render({ control, isSubmitted, isFilled })}
    </form>
  );
};

export default FormContainer;
