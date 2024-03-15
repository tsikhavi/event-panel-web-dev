import React, { FC, useEffect, useRef } from 'react';

import useStyles from './Modal.styles';

export type ModalContainerProps = {
  isOpen: boolean;
  children: React.ReactNode;
} & Partial<{
  className: string;
  onClose: () => void;
}>;

const Modal: FC<ModalContainerProps> = ({ isOpen, children, onClose, className }) => {
  const { classes, cx } = useStyles();
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current === event.target) {
        onClose?.();
      }
    };
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [onClose, ref]);

  if (!isOpen) return null;

  return (
    <div ref={ref} className={cx(classes.root, classes.center, className)}>
      {children}
    </div>
  );
};

export default Modal;
