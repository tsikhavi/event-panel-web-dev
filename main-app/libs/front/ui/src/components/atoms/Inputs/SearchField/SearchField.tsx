import React, { FC, useEffect, useRef, useState } from 'react';

import { Search } from '../../../../assets/images';
import Icon from '../../Icon/Icon';
import Dropdown from '../Dropdown/Dropdown';
import DropdownField from '../DropdownField/DropdownField';

import useStyles from './SearchField.styles';

export type Suggestion = {
  id: string;
  name: string;
};

export type SearchFieldProps = {
  selected: string[];
  onChange: (id: string) => void;
  suggestions: Suggestion[];
} & Partial<{
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  withCreate?: boolean;
}>;

const SearchField: FC<SearchFieldProps> = ({ suggestions, selected, onChange, label, placeholder, withCreate }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  const inputRef = useRef<HTMLInputElement>(null);

  const { classes } = useStyles();

  const handleItemClick = (suggestion: Suggestion) => {
    onChange(suggestion.id);
    setIsOpen(false);
    setValue('');
  };

  useEffect(() => {
    if (!isOpen) {
      inputRef.current?.blur();
    }
  }, [isOpen]);

  return (
    <Dropdown
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      label={label}
      withAnchorWidth
      anchor={
        <DropdownField
          value={value}
          onChange={setValue}
          ref={inputRef}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          isActive={isOpen}
          iconStart={<Icon icon={Search} size={'sm'} />}
        />
      }
    >
      <>
        {suggestions
          .filter((suggestion) => !selected.some((selectedItem) => selectedItem === suggestion.id))
          .filter((suggestion) => suggestion.name.toLowerCase().includes(value.toLowerCase()))
          .map((suggestion) => (
            <div key={suggestion.id} className={classes.item} onClick={() => handleItemClick(suggestion)}>
              {suggestion.name}
            </div>
          ))}
        {withCreate && value !== '' && (
          <div
            className={classes.item}
            onClick={() => {
              setValue('');
            }}
          >
            {value} (New value)
          </div>
        )}
      </>
    </Dropdown>
  );
};

export default SearchField;
