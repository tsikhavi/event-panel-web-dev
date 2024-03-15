import React, { useRef, useState } from 'react';
import { ClassConstructor } from 'class-transformer';

import { Form } from './Form';

type UseFormArgs<FORM> = {
  initForm: FORM;
  Resolver: ClassConstructor<FORM>;
};

export function useForm<FORM extends object>({ initForm, Resolver }: UseFormArgs<FORM>) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const control = useRef(new Form({ initForm, Resolver }));

  const handleSubmit = (callback: (args: FORM) => void) => (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (!control.current.hasError()) {
      callback(control.current.getForm());
    }

    setIsSubmitted(true);
  };

  return { control, isSubmitted, handleSubmit };
}
