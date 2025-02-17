import React, { useRef, useState } from 'react';
import { Image } from 'react-native';
import { ImagePickerResponse } from 'react-native-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { ScreenProps } from '@src/navigation/types';
import { useAppTheme } from '@src/theme/theme';
import { Box, Button, Input } from '@src/ui';
import ImagePickerModal from '@src/widgets/ImagePickerModal';

const DamageToCargoScreen = ({
  navigation,
  route,
}: ScreenProps<'damage-to-cargo'>) => {
  const { insets } = useAppTheme();
  const [pickerResponse, setPickerResponse] =
    useState<ImagePickerResponse | null>(null);
  const uri = pickerResponse?.assets && pickerResponse.assets[0].uri;
  const modal = useRef<BottomSheetModal>(null);
  const modalClose = () => modal?.current?.forceClose();
  const modalOpen = () => modal?.current?.present();

  const handleSubmit = () => {
    navigation.goBack();
  };

  return (
    <>
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flex: 1,
          paddingBottom: insets.bottom,
          paddingHorizontal: 16,
        }}
      >
        <Box flex={1}>
          <Box gap={14} flexGrow={1}>
            <Box>
              <Input label="Опишите повреждение" required multiline />
            </Box>
            {uri && (
            <Box alignItems='center' justifyContent='center' py={20}>
              <Image source={{uri}} width={200} height={200} borderRadius={10}/>
            </Box>
            )}
            <Button
              backgroundColor="main_light"
              children="Сделать фото"
              textColor="text"
              onPress={modalOpen}
            />
          </Box>
          <Button onPress={handleSubmit} children="Отправить" />
        </Box>
        <ImagePickerModal
          ref={modal}
          modalClose={modalClose}
          setPickerResponse={setPickerResponse}
        />
      </KeyboardAwareScrollView>
    </>
  );
};

export default DamageToCargoScreen;
