import React, { FC, useState } from 'react';

import { Eye, EyeSlash } from '../../../../assets/images';
import IconButton from '../../Buttons/IconButton/IconButton';
import Label from '../Label/Label';
import TextArea from '../TextArea/TextArea';
import TextInput, { Types } from '../TextInput/TextInput';

import useStyles from './TextField.styles';

export type TextFieldProps = {
  value: string | null;
  onChange: (value: string) => void;
} & Partial<{
  name: string;
  type: Types;
  label: string;
  className: string;
  placeholder: string;
  autoFocus: boolean;
  error: string | null;
  success: string | null;
  textArea: boolean;
  onFocus: () => void;
}>;

const TextField: FC<TextFieldProps> = ({
  label,
  error,
  success,
  type: initType = 'text',
  name,
  textArea = false,
  ...other
}) => {
  const { classes, cx } = useStyles();

  const [type, setType] = useState<Types>(initType);

  const handleIconClick = (event: React.MouseEvent | React.TouchEvent) => {
    event.preventDefault();
    setType((old) => (old === 'text' ? 'password' : 'text'));
  };

  return (
    <div className={classes.root}>
      <label>
        {label && <Label label={label} />}
        <div className={classes.inputContainer}>
          {textArea ? (
            <TextArea {...other} name={name} error={Boolean(error)} success={Boolean(success)} />
          ) : (
            <TextInput {...other} name={name} type={type} error={Boolean(error)} success={Boolean(success)} />
          )}

          {initType === 'password' ? (
            <div className={classes.buttonContainer} onMouseDown={handleIconClick} onTouchStart={handleIconClick}>
              <IconButton icon={type === 'text' ? EyeSlash : Eye} />
            </div>
          ) : null}
        </div>
      </label>
      {error && <span className={cx(classes.message, classes.error)}>{error}</span>}
      {success && <span className={cx(classes.message, classes.success)}>{success}</span>}
    </div>
  );
};

export default TextField;
