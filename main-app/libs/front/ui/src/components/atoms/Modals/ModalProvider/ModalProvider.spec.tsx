import React from 'react';

import { customRender, fireEvent, renderHook } from '../../../../test-utils';

import ModalProvider, { useModal } from './ModalProvider';

const modal = 'Modal';
const sideModal = 'Side Modal';
const closeButton = 'Close Button';
const openModalButton = 'Open Modal Button';
const openSideModalButton = 'Open Side Modal Button';

const TestComponent = () => {
  const { openModal, openSideModal, close } = useModal();

  const renderModal = (modal: string) => (
    <>
      <div>{modal}</div>
      <button type="button" onClick={() => close()}>
        {closeButton}
      </button>
    </>
  );

  return (
    <>
      <button type="button" onClick={() => openModal(renderModal(modal))}>
        {openModalButton}
      </button>

      <button type="button" onClick={() => openSideModal(renderModal(sideModal))}>
        {openSideModalButton}
      </button>
    </>
  );
};

describe('ModalProvider', () => {
  it('should render children', () => {
    const children = 'children';
    const { getByText } = customRender(<ModalProvider>{children}</ModalProvider>);

    expect(getByText(children)).toBeInTheDocument();
  });

  describe('useModal', () => {
    it('should throw an error if used outside of the  ModalProvider', () => {
      const { result } = renderHook(() => useModal());

      expect(result.error).toEqual(new Error('useModal must be used within a ModalProvider'));
    });

    describe('openModal', () => {
      it('should close by button click', () => {
        const { getByText, getByRole, queryByText } = customRender(
          <ModalProvider>
            <TestComponent />
          </ModalProvider>
        );

        expect(queryByText(modal)).not.toBeInTheDocument();

        fireEvent.click(getByRole('button', { name: openModalButton }));
        expect(getByText(modal)).toBeInTheDocument();

        fireEvent.click(getByRole('button', { name: closeButton }));
        expect(queryByText(modal)).not.toBeInTheDocument();
      });

      it('should close by MODAL PARENT click', () => {
        const { getByText, getByRole, queryByText } = customRender(
          <ModalProvider>
            <TestComponent />
          </ModalProvider>
        );

        expect(queryByText(modal)).not.toBeInTheDocument();

        fireEvent.click(getByRole('button', { name: openModalButton }));
        fireEvent.click(getByText(modal).parentElement as Element);

        expect(queryByText(modal)).not.toBeInTheDocument();
      });
    });

    describe('openSideModal', () => {
      it('should close by button click', () => {
        const { getByText, getByRole, queryByText } = customRender(
          <ModalProvider>
            <TestComponent />
          </ModalProvider>
        );

        expect(queryByText(sideModal)).not.toBeInTheDocument();

        fireEvent.click(getByRole('button', { name: openSideModalButton }));
        expect(getByText(sideModal)).toBeInTheDocument();

        fireEvent.click(getByRole('button', { name: closeButton }));
        expect(queryByText(sideModal)).not.toBeInTheDocument();
      });

      it('should close by MODAL PARENT click', () => {
        const { getByRole, queryByText } = customRender(
          <ModalProvider>
            <TestComponent />
          </ModalProvider>
        );

        expect(queryByText(sideModal)).not.toBeInTheDocument();

        fireEvent.click(getByRole('button', { name: openSideModalButton }));
        fireEvent.click(queryByText(/cross/) as Element);

        expect(queryByText(sideModal)).not.toBeInTheDocument();
      });
    });
  });
});
