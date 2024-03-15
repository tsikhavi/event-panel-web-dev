import React, { FC, useCallback, useEffect, useState } from 'react';

import Popover from '../../../Popover/Popover';
import Menu from '../../Menu/Menu';
import FilterButton from '../FilterButton/FilterButton';
import SearchField from '../SearchField/SearchField';

import useStyles from './Filter.styles';

type Option = {
  id: string;
  label: string;
};

export type FilterProps = {
  label: string;
  value: string[];
  options: Record<string, Option>;
  onChange: (value: string[]) => void;
} & Partial<{
  withSearch: boolean;
  withFocus: boolean;
  placeholder?: string;
  onSearch: (value: string) => void;
}>;

const Filter: FC<FilterProps> = ({
  label: baseLabel,
  value,
  options,
  placeholder,
  onChange,
  withSearch,
  onSearch,
  withFocus,
}) => {
  const { classes } = useStyles();
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [label, setLabel] = useState(baseLabel);

  useEffect(() => {
    isOpen && setSearch('');
  }, [isOpen]);

  useEffect(() => {
    // ToDo Add debounce
    onSearch?.(search);
  }, [onSearch, search]);

  useEffect(() => {
    setLabel(() => {
      if (value.length === 0) return baseLabel;
      else return `${baseLabel} (${value.length})`;
    });
    setSearch('');
  }, [baseLabel, options, value]);

  const handleChange = useCallback(
    (id: string) => {
      if (value.includes(id)) {
        const index = value.findIndex((val) => val === id);
        onChange([...value.slice(0, index), ...value.slice(index + 1)]);
      } else {
        onChange([...value, id]);
      }
    },
    [onChange, value]
  );

  const filterOptions = (option: Option) => {
    if (search.length === 0) {
      return true;
    }
    return option.label.toLowerCase().includes(search.trim().toLocaleLowerCase());
  };

  return (
    <Popover
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      anchor={<FilterButton label={label} onClick={() => setIsOpen((old) => !old)} isActive={Boolean(value.length)} />}
    >
      <div className={classes.dropdown}>
        {Boolean(withSearch) && (
          <div className={classes.searchFieldContainer}>
            <SearchField
              value={search}
              onChange={setSearch}
              placeholder={placeholder}
              fullWidth
              autoFocus
              withFocus={withFocus}
            />
          </div>
        )}

        <Menu className={classes.list}>
          {Object.values(options)
            .filter(filterOptions)
            .map(({ id, label }) => (
              <Menu.MenuItem
                key={id}
                checkbox
                label={label}
                checked={value.includes(id)}
                onClick={() => handleChange(id)}
              />
            ))}
        </Menu>
      </div>
    </Popover>
  );
};

export default Filter;
