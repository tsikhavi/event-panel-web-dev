import React from 'react';
import { autoUpdate, flip, useDismiss, useFloating, useInteractions } from '@floating-ui/react';

import useStyles from './Popover.styles';

export type PopoverProps = {
  isOpen: boolean;
  anchor: React.ReactNode;
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
};

const Popover: React.FC<PopoverProps> = ({ isOpen, anchor, onClose, children, className }) => {
  const { classes } = useStyles();

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: onClose,
    middleware: [
      flip({
        boundary: document.getElementById('sidemodal-main') || undefined,
      }),
    ],
    whileElementsMounted: autoUpdate,
    placement: 'bottom-start',
  });

  const dismiss = useDismiss(context, {
    outsidePressEvent: 'click',
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([dismiss]);

  return (
    <div className={className}>
      <div ref={refs.setReference} {...getReferenceProps()}>
        {anchor}
      </div>
      {isOpen && (
        <div ref={refs.setFloating} {...getFloatingProps()} style={floatingStyles} className={classes.popover}>
          {children}
        </div>
      )}
    </div>
  );
};

export default Popover;
