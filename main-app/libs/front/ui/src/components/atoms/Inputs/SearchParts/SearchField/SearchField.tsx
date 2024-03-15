import React, { FC, useRef } from 'react';

import Icon from '../../../Icon/Icon';

import useStyles from './SearchField.styles';

export type SearchFieldProps = {
  value: string;
  placeholder?: string;
  icon?: React.FunctionComponent;
  fullWidth?: boolean;
  withFocus?: boolean;
  autoFocus?: boolean;
  onKeyDown?: () => void;
  onChange?: (value: string) => void;
};

const SearchField: FC<SearchFieldProps> = ({
  value,
  icon,
  placeholder,
  fullWidth,
  withFocus,
  autoFocus,
  onChange,
  onKeyDown,
}) => {
  const { classes, cx } = useStyles();

  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className={cx(classes.root, { [classes.fullWidth]: Boolean(fullWidth) })}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        autoFocus={autoFocus}
        onKeyDown={() => onKeyDown?.()}
        onChange={(event) => onChange?.(event.target.value)}
        className={cx(classes.field, { [classes.focus]: Boolean(withFocus) })}
        ref={inputRef}
      />

      <div className={classes.icons}>{icon && <Icon size="sm" icon={icon} />}</div>
    </div>
  );
};

export default SearchField;
