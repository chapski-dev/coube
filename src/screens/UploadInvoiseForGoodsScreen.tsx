import React, { useRef, useState } from 'react';
import { Dimensions, Image } from 'react-native';
import { ImagePickerResponse } from 'react-native-image-picker';
import WaybillIcon from '@assets/svg/sheet.svg';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { ScreenProps } from '@src/navigation/types';
import { useAppTheme } from '@src/theme/theme';
import { useLocalization } from '@src/translations/i18n';
import { Box, Button, Text } from '@src/ui';
import { wait } from '@src/utils';
import { handleCatchError } from '@src/utils/handleCatchError';
import ImagePickerModal from '@src/widgets/ImagePickerModal';

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

  const [loading, setLoading] = useState(false);

  const handleSendInvoce = async () => {
    try {
      setIsInvoceSended(true);
      await wait(1000)
    } catch (error) {
      handleCatchError(error);
    } finally {
      setLoading(false);
    }

    navigation.navigate('invoice-sent');
  };

  const [isInvoceSended, setIsInvoceSended] = useState(false);

  const renderContent = () => {
    if (pickerResponse?.assets) {
      return (
        <>
          <Image
            source={{ uri }}
            width={Dimensions.get('screen').width - 32}
            height={Dimensions.get('screen').height * 0.7}
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
                disabled={loading}
                loading={loading}
              />
            </Box>
            <Box flex={1}>
              <Button
                children={t('to-send')}
                backgroundColor="main"
                textColor={'white'}
                onPress={handleSendInvoce}
                disabled={loading}
                loading={loading}
              />
            </Box>
          </Box>
        </>
      );
    }
    if (isInvoceSended) {
      return (
        <Box
          pt={45}
          alignItems="center"
          justifyContent="space-between"
          flex={1}
          gap={27}
        >
          <Box gap={27} alignItems="center">
            <WaybillIcon color={colors.main} />
            <Box gap={4}>
              <Text
                type="h2"
                center
                children="Накладная на товар отправлена!"
              />
              <Text type="h3" center children="Погрузка груза завершена!" />
            </Box>
          </Box>
          <Box
            w="full"
            py={12}
            px={16}
            borderColor={colors.border}
            style={{ borderTopWidth: 1 }}
          >
            <Button children="Перейти к заказу" onPress={navigation.goBack} />
          </Box>
        </Box>
      );
    }
    return (
      <>
        <WaybillIcon color={colors.disabled} />
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
    );
  };
  return (
    <>
      <Box px={16} py={uri ? 15 : 45} alignItems="center" flex={1} gap={27}>
        {renderContent()}
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
