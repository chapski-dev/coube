import React, { forwardRef, useCallback } from 'react';
import {
  ImageLibraryOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import ImageFillIcon from '@assets/svg/image-fill.svg';
import PhotoCameraIcon from '@assets/svg/photo-camera.svg';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

import { useAppTheme } from '@src/theme/theme';
import { Box, Text } from '@src/ui';

type ImagePickerModalProps = Omit<BottomSheetModalProps, 'children'> & {
  modalClose: () => void;
  setPickerResponse: (val: ImagePickerResponse | null) => void;
  galeryOptions?: ImageLibraryOptions;
};

const ImagePickerModal = forwardRef<BottomSheetModal, ImagePickerModalProps>(
  ({ modalClose, setPickerResponse, galeryOptions = {} }, ref) => {
    const { colors, insets } = useAppTheme();

    const openGalary = useCallback(() => {
      modalClose();
      const options: any = {
        includeBase64: true,
        mediaType: 'photo',
        selectionLimit: 1,
      };
      launchImageLibrary({ ...options, ...galeryOptions }, (val) =>
        val?.assets ? setPickerResponse(val) : null,
      );
    }, []);

    const openCamera = useCallback(() => {
      modalClose();
      const options = {
        includeBase64: true,
        mediaType: 'photo',
        saveToPhotos: true,
      };
      launchCamera(options, (val) =>
        val?.assets ? setPickerResponse(val) : null,
      );
    }, []);

    return (
      <BottomSheetModal
        ref={ref}
        animateOnMount
        snapPoints={[190]}
        enablePanDownToClose
        keyboardBlurBehavior="restore"
        android_keyboardInputMode="adjustResize"
        backgroundStyle={{ backgroundColor: colors.background }}
        backdropComponent={(backdropProps) => (
          <BottomSheetBackdrop {...backdropProps} disappearsOnIndex={-1} />
        )}
      >
        <BottomSheetView>
          <Box flex={1} px={24} pb={insets.bottom}>
            <Box row h={52} alignItems="center" gap={10} onPress={openCamera}>
              <PhotoCameraIcon />
              <Text children="Сделать фото" />
            </Box>
            <Box row h={52} alignItems="center" gap={10} onPress={openGalary}>
              <ImageFillIcon />
              <Text children="Загрузить из галерии" />
            </Box>
          </Box>
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

export default ImagePickerModal;
