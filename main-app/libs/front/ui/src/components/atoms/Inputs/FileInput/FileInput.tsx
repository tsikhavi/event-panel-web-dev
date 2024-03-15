import React, { ChangeEvent, FC, useState } from 'react';

import { Cross, Gallery } from '../../../../assets/images';
import IconButton from '../../Buttons/IconButton/IconButton';
import Icon from '../../Icon/Icon';
import Label from '../Label/Label';

import useStyles from './FileInput.styles';

export type FileInputProps = {
  label?: string;
  name?: string;
};

const FileInput: FC<FileInputProps> = ({ label, name }) => {
  const [image, setImage] = useState<string | null>(null);

  const { classes } = useStyles({ isSelected: Boolean(image) });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const image = event.target.files[0];
      const reader = new FileReader();

      reader.readAsDataURL(image);

      reader.onloadend = () => {
        setImage(reader.result as string);
      };
    }
  };

  const handleClose = (event: React.MouseEvent) => {
    event.preventDefault();
    setImage(null);
  };

  return (
    <div>
      <label htmlFor={name} className={classes.label}>
        {label && <Label label={label} />}

        <div className={classes.wrapper}>
          {image ? (
            <>
              <img className={classes.image} src={image} alt="Preview" />
              <div className={classes.closeBlock} onClick={handleClose}>
                <IconButton className={classes.closeBtn} icon={Cross} />
              </div>
            </>
          ) : (
            <Icon icon={Gallery} size={'lg'} />
          )}
          <input
            className={classes.input}
            id={name}
            name={name}
            type={'file'}
            accept="image/*"
            onChange={handleChange}
          />
        </div>
      </label>
    </div>
  );
};

export default FileInput;
