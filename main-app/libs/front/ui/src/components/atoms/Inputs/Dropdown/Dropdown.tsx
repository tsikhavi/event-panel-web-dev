import React, { FC } from 'react';
import { autoUpdate, flip, offset, size, useDismiss, useFloating, useInteractions } from '@floating-ui/react';

import Label from '../Label/Label';

import useStyles from './Dropdown.styles';

export type DropdownProps = {
  anchor: JSX.Element;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  label?: string;
  withAnchorWidth?: boolean;
};

const Dropdown: FC<DropdownProps> = ({ isOpen, onClose, anchor, children, label, withAnchorWidth }) => {
  const { classes } = useStyles();

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: onClose,
    middleware: [
      offset(4),
      withAnchorWidth &&
        size({
          apply({ rects, elements }) {
            Object.assign(elements.floating.style, {
              width: `${rects.reference.width + 2}px`,
            });
          },
        }),
      flip({
        boundary: document.getElementById('sidemodal-main') || undefined,
        padding: 4,
      }),
    ],
    whileElementsMounted: autoUpdate,
    placement: 'bottom',
  });

  const dismiss = useDismiss(context, {
    outsidePressEvent: 'click',
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([dismiss]);

  return (
    <>
      {label ? (
        <label>
          {label && <Label label={label} />}
          <div ref={refs.setReference} {...getReferenceProps()}>
            {anchor}
          </div>
        </label>
      ) : (
        <div ref={refs.setReference} {...getReferenceProps()}>
          {anchor}
        </div>
      )}
      {isOpen && (
        <div ref={refs.setFloating} {...getFloatingProps()} style={floatingStyles} className={classes.dropdown}>
          {children}
        </div>
      )}
    </>
  );
};

export default Dropdown;
