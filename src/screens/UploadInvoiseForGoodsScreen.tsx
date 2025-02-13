import React, { useRef, useState } from 'react';
import { Dimensions, Image } from 'react-native';
import { ImagePickerResponse } from 'react-native-image-picker';
import WaybillIcon from '@assets/svg/sheet.svg';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { ScreenProps } from '@src/navigation/types';
import { useAppTheme } from '@src/theme/theme';
import { Box, Button, Text } from '@src/ui';
import ImagePickerModal from '@src/widgets/ImagePickerModal';
import { useLocalization } from '@src/translations/i18n';

const UploadInvoiseForGoodsScreen = ({
  navigation,
}: ScreenProps<'upload-invoise-for-goods'>) => {
  const { colors } = useAppTheme();
  const { t } = useLocalization();

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
          <>
            <Image
              source={{ uri }}
              width={Dimensions.get('screen').width - 32}
              height={Dimensions.get('screen').height * 0.6}
              style={{ alignSelf: 'center' }}
              resizeMode="contain"
            />
            <Box row gap={10}>
              <Box flex={1}>
                <Button
                  children={t('to-replace')}
                  backgroundColor="main_light"
                  textColor="dark_grey"
                  onPress={modalOpen}
                />
              </Box>
              <Box flex={1}>
                <Button
                  children={t('to-send')}
                  backgroundColor="main"
                  textColor={'white'}
                  onPress={() => {
                    navigation.navigate('invoice-sent');
                  }}
                />
              </Box>
            </Box>
          </>
        ) : (
          <>
            <Box
              w={90}
              h={90}
              backgroundColor={colors.disabled}
              borderRadius={50}
            >
              <WaybillIcon color={colors.disabled} />
            </Box>
            <Box px={40} gap={4}>
              <Text type="h2" center children={t('bill-of-lading')} />
              <Text
                center
                children={t(
                  'download-the-document-confirming-the-release-of-the-goods',
                )}
              />
            </Box>
            <Button
              children={t('to-download')}
              backgroundColor="main_light"
              textColor="dark_grey"
              onPress={modalOpen}
            />
          </>
        )}
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
