import React, { FC, ReactElement, useCallback, useEffect, useState } from 'react';
import { Keyboard, ViewStyle } from 'react-native';

import { useKeyboard } from '@src/hooks/useKeyboard';
import { ModalWrapper } from './ModalWrapper';

export interface IModalParams {
  element: ReactElement | null
  justifyContent: ViewStyle['justifyContent']
  marginHorizontal?: number
}

let setupModalRef: ((modalData: IModalParams) => void) | undefined;
let closeModalRef: (() => void) | undefined;

export const modal = () => {
  return {
    setupModal: setupModalRef,
    closeModal: closeModalRef,
  };
};

export const ModalLayout: FC = () => {

  const { keyboardShown } = useKeyboard();
  const [modalVisible, setModalVisible] = useState(false);
  const [_modalVisible, _setModalVisible] = useState(false);

  const [modal, setModal] = useState<IModalParams>({
    element: null,
    justifyContent: 'flex-end',
  });

  setupModalRef = useCallback((modalData: IModalParams) => {
    Keyboard.dismiss();

    setModal(modalData);
    setModalVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    Keyboard.dismiss();

    setModalVisible(false);
    _setModalVisible(false);
  }, []);

  closeModalRef = closeModal;

  useEffect(() => {
    // TODO check interactions
    if (!keyboardShown && modalVisible && !_modalVisible) {
      setTimeout(() => {
        _setModalVisible(true);
      }, 200);
    }
  }, [keyboardShown, modalVisible, _modalVisible]);

  return (
    <ModalWrapper
      closeModal={closeModal}
      visible={_modalVisible}
      justifyContent={modal.justifyContent}
      marginHorizontal={modal.marginHorizontal}
    >
      {modal.element}
    </ModalWrapper>
  );
};
