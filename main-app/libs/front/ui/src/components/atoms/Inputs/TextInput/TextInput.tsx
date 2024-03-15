import React, { forwardRef } from 'react';

import { useStyles } from './TextInput.styles';

export type Types = 'text' | 'email' | 'password';

export type TextInputProps = {
  value: string | null;
  onChange: (value: string) => void;
} & Partial<{
  name: string;
  id: string;
  type: Types;
  placeholder: string;
  error: boolean;
  success: boolean;
  disabled: boolean;
  autoFocus: boolean;
  testId: string;
  readOnly: boolean;
  className: string;
  onFocus: () => void;
}>;

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      name,
      error,
      success,
      disabled,
      autoFocus,
      onChange,
      testId,
      value,
      placeholder,
      type = 'text',
      onFocus,
      readOnly,
      className,
    },
    ref
  ) => {
    const { classes, cx } = useStyles();

    return (
      <input
        ref={ref}
        type={type}
        name={name}
        value={value ?? ''}
        placeholder={placeholder}
        autoFocus={autoFocus}
        disabled={Boolean(disabled)}
        className={cx(classes.root, { [classes.error]: error, [classes.success]: success }, className)}
        onChange={(event) => onChange(event.target.value)}
        data-testid={testId}
        autoComplete="off"
        onFocus={onFocus}
        readOnly={readOnly}
      />
    );
  }
);

export default TextInput;
