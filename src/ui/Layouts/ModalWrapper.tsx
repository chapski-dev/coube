import React, { FC, ReactElement } from 'react';
import { Modal, StyleSheet, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';

import { useAppTheme } from '@src/theme/theme';

import { Box } from '../Box';

interface IModalWrapperProps {
  visible: boolean
  children: ReactElement | null
  justifyContent: ViewStyle['justifyContent']
  closeModal: () => void
  marginHorizontal?: number
  marginVertical?: number
}

const styles = StyleSheet.create({
  modalOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
});

export const ModalWrapper: FC<IModalWrapperProps> = ({
  closeModal,
  visible,
  children,
  justifyContent,
  marginHorizontal,
  marginVertical,
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
          mt={marginVertical || 0}
          mb={marginVertical || 0}
          mr={marginHorizontal || 0}
          ml={marginHorizontal || 0}
          borderRadius={25}
          backgroundColor={colors.textDefault}
        >
          {children}
        </Box>
      </Box>
    </Modal>
  );
};
