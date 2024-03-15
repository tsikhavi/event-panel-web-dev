import React, { FC, useCallback, useLayoutEffect, useRef, useState } from 'react';

import { Cross } from '../../../../assets/images';
import IconButton from '../../Buttons/IconButton/IconButton';
import Modal from '../Modal/Modal';

import useStyles from './SideModal.styles';

export type SideModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
} & Partial<{
  Header: React.ReactNode;
  Footer: React.ReactNode;
}>;

const SideModal: FC<SideModalProps> = ({ isOpen, onClose, Header, Footer, children }) => {
  const [isHeaderBorder, setIsHeaderBorder] = useState<boolean>(false);
  const [isFooterBorder, setIsFooterBorder] = useState<boolean>(false);

  const { classes } = useStyles({ hasHeader: Boolean(Header), isHeaderBorder, isFooterBorder });

  const containerRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const scrollTop = containerRef.current.scrollTop;
    const scrollHeight = containerRef.current.scrollHeight;
    const clientHeight = containerRef.current.clientHeight;

    if (scrollTop === 0) {
      setIsHeaderBorder(false);
    } else if (!isHeaderBorder) setIsHeaderBorder(true);

    if (scrollTop + clientHeight + 5 >= scrollHeight) {
      setIsFooterBorder(false);
    } else if (!isFooterBorder) setIsFooterBorder(true);
  }, [isHeaderBorder, isFooterBorder]);

  useLayoutEffect(() => {
    if (!mainRef.current) return;
    const resizeObserver = new ResizeObserver(() => {
      if (!containerRef.current) return;
      const scrollHeight = containerRef.current.scrollHeight;
      const clientHeight = containerRef.current.clientHeight;

      setIsFooterBorder(scrollHeight > clientHeight);
    });
    resizeObserver.observe(mainRef.current);
    return () => resizeObserver.disconnect();
  }, [children]);

  useLayoutEffect(() => {
    window.addEventListener('resize', handleScroll);
    return () => window.removeEventListener('resize', handleScroll);
  }, [handleScroll]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} className={classes.root}>
      <div className={classes.modal}>
        <div className={classes.header}>
          {Header}
          <IconButton size="md" icon={Cross} onClick={() => onClose()} />
        </div>
        <div ref={containerRef} className={classes.mainContainer} id="sidemodal-main" onScroll={handleScroll}>
          <div ref={mainRef} className={classes.main}>
            {children}
          </div>
        </div>
        {Footer && <div className={classes.footer}>{Footer}</div>}
      </div>
    </Modal>
  );
};

export default SideModal;
