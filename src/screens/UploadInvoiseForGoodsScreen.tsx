import React, { useRef, useState } from 'react';
import { Dimensions, Image } from 'react-native';
import { ImagePickerResponse } from 'react-native-image-picker';
import WaybillIcon from '@assets/svg/sheet.svg';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { ScreenProps } from '@src/navigation/types';
import { useAppTheme } from '@src/theme/theme';
import { Box, Button, Text } from '@src/ui';
import ImagePickerModal from '@src/widgets/ImagePickerModal';

const UploadInvoiseForGoodsScreen = ({
  navigation,
}: ScreenProps<'upload-invoise-for-goods'>) => {
  const { colors } = useAppTheme();

  const [pickerResponse, setPickerResponse] =
    useState<ImagePickerResponse | null>(null);
  const uri = pickerResponse?.assets && pickerResponse.assets[0].uri;
  const modal = useRef<BottomSheetModal>(null);
  const modalClose = () => modal?.current?.forceClose();
  const modalOpen = () => modal?.current?.present();

  return (
    <>
      <Box px={16} py={45} alignItems="center" flex={1} gap={27}>
        {pickerResponse?.assets ? (
          <Image
            source={{ uri }}
            width={Dimensions.get('screen').width - 32}
            height={Dimensions.get('screen').height * 0.4}
            style={{ alignSelf: 'center' }}
            resizeMode="contain"
          />
        ) : (
          <Box
            w={90}
            h={90}
            backgroundColor={colors.disabled}
            borderRadius={50}
          >
            <WaybillIcon color={colors.disabled} />
          </Box>
        )}

        <Box px={40} gap={4}>
          <Text type="h2" center children="Накладная на товар" />
          <Text
            center
            children="Загрузите документ, подтверждающий отпуска товара"
          />
        </Box>
        <Button
          children="Загрузить"
          backgroundColor="main_light"
          textColor="dark_grey"
          onPress={modalOpen}
        />
      </Box>
      <ImagePickerModal
        ref={modal}
        modalClose={modalClose}
        setPickerResponse={setPickerResponse}
      />
    </>
  );
};

export default UploadInvoiseForGoodsScreen;
