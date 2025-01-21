import React, { FC, ReactElement } from 'react';
import { Modal, StyleSheet,  TouchableWithoutFeedback, View, ViewStyle } from 'react-native';

import { useAppTheme } from '@src/theme/theme';
import { Box } from '../Box';

interface IModalWrapperProps {
  visible: boolean
  children: ReactElement | null
  justifyContent: ViewStyle['justifyContent']
  closeModal: () => void
  marginHorizontal?: number
}

const styles = StyleSheet.create({
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
});

export const ModalWrapper: FC<IModalWrapperProps> = ({
  closeModal,
  visible,
  children,
  justifyContent,
  marginHorizontal,
}) => {
  const { colors } = useAppTheme();

  return (
    <Modal
      animationType="fade"
      supportedOrientations={['portrait']}
      transparent={true}
      visible={visible}
      onRequestClose={closeModal}
    >
      <Box flex justifyContent={justifyContent}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <Box
          m={24}
          mr={marginHorizontal || 16}
          ml={marginHorizontal || 16}
          borderRadius={25}
          backgroundColor={colors.textDefault}
        >
          {children}
        </Box>
      </Box>
    </Modal>
  );
};
