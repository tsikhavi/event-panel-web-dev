import React, { FC, useEffect, useRef } from 'react';

import { TextInputProps } from '../TextInput/TextInput';

import { useStyles } from './TextArea.styles';

export type TextAreaProps = Omit<TextInputProps, 'type'>;

const TextArea: FC<TextAreaProps> = ({ value, disabled, error, success, onChange, ...other }) => {
  const { classes, cx } = useStyles();

  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = `${ref.current.scrollHeight}px`;
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
    event.target.style.height = 'inherit';
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  return (
    <textarea
      {...other}
      ref={ref}
      value={value ?? ''}
      disabled={Boolean(disabled)}
      className={cx(classes.root, { [classes.error]: error, [classes.success]: success })}
      onChange={handleChange}
      autoComplete="off"
      rows={1}
    ></textarea>
  );
};

export default TextArea;
