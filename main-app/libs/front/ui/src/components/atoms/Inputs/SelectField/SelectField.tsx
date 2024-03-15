import React, { FC, useEffect, useState } from 'react';

import { ArrowDown } from '../../../../assets/images';
import Icon from '../../Icon/Icon';
import Checkbox from '../Checkbox/Checkbox';
import Dropdown from '../Dropdown/Dropdown';
import DropdownField from '../DropdownField/DropdownField';
import { Suggestion } from '../SearchField/SearchField';

import useStyles from './SelectField.styles';

export type SelectFieldProps = {
  selected: string[];
  onChange: (ids: string[]) => void;
  suggestions: Suggestion[];
} & Partial<{
  label: string;
  name: string;
  placeholder: string;
  multiple: boolean;
}>;

const SelectField: FC<SelectFieldProps> = ({ suggestions, label, name, placeholder, multiple, selected, onChange }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState('');

  const { classes, cx } = useStyles({ isOpen });

  const handleChange = (event: React.MouseEvent<HTMLDivElement>, option: Suggestion) => {
    event.stopPropagation();
    event.preventDefault();
    if (multiple) {
      if (selected.some((id) => id === option.id)) {
        onChange(selected.filter((id) => id !== option.id));
      } else {
        onChange([...selected, option.id]);
      }
    } else {
      onChange([option.id]);
      setIsOpen(false);
    }
  };

  const handleInputClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (selected.length === 0) setValue(label || '');
    setValue(
      suggestions
        .filter((sug) => selected.includes(sug.id))
        .map((sug) => sug.name)
        .join(', ')
    );
  }, [label, selected, onChange, suggestions]);

  return (
    <Dropdown
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      label={label}
      withAnchorWidth
      anchor={
        <DropdownField
          className={classes.input}
          value={value}
          onChange={setValue}
          name={name}
          onFocus={() => setIsOpen(true)}
          onClick={handleInputClick}
          placeholder={placeholder}
          isActive={isOpen}
          iconEnd={<Icon icon={ArrowDown} size={'lg'} />}
          readOnly={true}
        />
      }
    >
      {multiple
        ? suggestions.map((sug) => (
            <div key={sug.id} className={classes.option} onClick={(event) => handleChange(event, sug)}>
              <Checkbox label={sug.name} checked={Boolean(selected.indexOf(sug.id) + 1)} />
            </div>
          ))
        : suggestions.map((sug) => (
            <div
              key={sug.id}
              className={cx(classes.option, { [classes.optionActive]: sug.id === selected[0] })}
              onClick={(event) => handleChange(event, sug)}
            >
              {sug.name}
            </div>
          ))}
    </Dropdown>
  );
};

export default SelectField;
