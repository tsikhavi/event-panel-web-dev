import React, { FC, useRef, useState } from 'react';

import { Cross, Search } from '../../../../../assets/images';
import IconButton from '../../../Buttons/IconButton/IconButton';
import Icon from '../../../Icon/Icon';

import useStyles from './RoundedSearchField.styles';

export type SearchFieldProps = {
  value: string;
  onChange: (value: string) => void;
} & Partial<{
  placeholder: string;
  fullWidth: boolean;
  withFocus: boolean;
  autoFocus: boolean;
  onKeyDown: () => void;
}>;

const RoundedSearchField: FC<SearchFieldProps> = ({
  value,
  placeholder,
  fullWidth,
  autoFocus,
  withFocus,
  onChange,
  onKeyDown,
}) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const { classes, cx } = useStyles({
    isActive: Boolean(isFocus && withFocus),
  });
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClear = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    onChange?.('');
  };

  return (
    <div className={cx(classes.root, { [classes.fullWidth]: Boolean(fullWidth) })}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        autoFocus={autoFocus}
        onKeyDown={() => onKeyDown?.()}
        onChange={(event) => onChange(event.target.value)}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        className={classes.field}
        ref={inputRef}
      />

      <div className={classes.icons}>
        <Icon className={classes.icon} size="sm" icon={Search} />
        {value && <IconButton size="sm" icon={Cross} onClick={handleClear} className={classes.iconButton} />}
      </div>
    </div>
  );
};

export default RoundedSearchField;
