import React, { useRef, useState } from 'react';
import { Image, ScrollView } from 'react-native';
import { ImagePickerResponse } from 'react-native-image-picker';
import ArrowIcon from '@assets/svg/arrow-right.svg';
import UploadIcon from '@assets/svg/upload-logo.svg';
import WarningIcon from '@assets/svg/warning.svg';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { ScreenProps } from '@src/navigation/types';
import { useAppTheme } from '@src/theme/theme';
import { useLocalization } from '@src/translations/i18n';
import { Box, Button, Text } from '@src/ui';
import ImagePickerModal from '@src/widgets/ImagePickerModal';

export const CompanyConfigurationScreen = ({
  navigation,
}: ScreenProps<'company-configuration'>) => {
  const { t } = useLocalization();
  const { colors } = useAppTheme();

  const [pickerResponse, setPickerResponse] =
    useState<ImagePickerResponse | null>(null);
  const uri = pickerResponse?.assets && pickerResponse.assets[0].uri;
  const modal = useRef<BottomSheetModal>(null);
  const modalClose = () => modal?.current?.forceClose();
  const modalOpen = () => modal?.current?.present();

  const openBankDetails = () => navigation.push('bank-details');

  const openContactDetails = () => navigation.push('contact-details');

  return (
    <ScrollView>
      <Box pt={20} gap={15} pb={25}>
        <Box w="full" alignItems="center">
          {pickerResponse?.assets ? (
            <Image
              style={{ borderRadius: 50, height: 90, width: 90 }}
              source={{ uri }}
            />
          ) : (
            <UploadIcon onPress={modalOpen} />
          )}
        </Box>

        <Box gap={7}>
          <Box pl={15}>
            <Text children={t('iin')} />
            <Text type="body_500" children="895 522 622 622" />
          </Box>
          <Box w="full" h={1} backgroundColor={colors.grey} />
          <Box pl={15}>
            <Text children={t('oragnization-name')} />
            <Text type="body_500" children="ТОО «ТрансЛогистик»" />
          </Box>
          <Box w="full" h={1} backgroundColor={colors.grey} />
          <Box pl={15}>
            <Text children={t('general-director')} />
            <Text type="body_500" children="Костин Макар Дамирович" />
          </Box>
          <Box w="full" h={1} backgroundColor={colors.grey} />
          <Box pl={15}>
            <Text children="E-mail" />
            <Text type="body_500" children="Testemail@mail.ru" />
          </Box>
          <Box w="full" h={1} backgroundColor={colors.grey} />
          <Box pl={15}>
            <Text children={t('phone')} />
            <Text type="body_500" children="+7 777 777 77 77" />
          </Box>
          <Box w="full" h={1} backgroundColor={colors.grey} />
        </Box>

        <Box
          row
          justifyContent="space-between"
          alignItems="center"
          p={15}
          backgroundColor={colors.white}
          gap={15}
          onPress={openBankDetails}
        >
          <Text color="black" children={t('bank-details')} fontSize={17} />
          <Box row gap={13} alignItems="center">
            <WarningIcon />
            <ArrowIcon />
          </Box>
        </Box>

        <Box
          row
          justifyContent="space-between"
          alignItems="center"
          p={15}
          backgroundColor={colors.white}
          gap={15}
          onPress={openContactDetails}
        >
          <Text color="black" children={t('contact-details')} fontSize={17} />
          <Box row gap={13} alignItems="center">
            <WarningIcon />
            <ArrowIcon />
          </Box>
        </Box>

        <Box px={15} gap={15}>
          <Box gap={3}>
            <Box row gap={6}>
              <Text color="black" children={t('certificate-of-registration')} />
              <Text color="red" children="*" />
            </Box>
            {pickerResponse?.assets ? (
              <Image
                style={{ borderRadius: 50, height: 90, width: 90 }}
                source={{ uri }}
              />
            ) : (
              <Box gap={3}>
                <Text
                  color="red"
                  children={t('document-has-not-been-uploaded')}
                />
                <Button
                  onPress={modalOpen}
                  type="outline"
                  children={t('upload-file')}
                />
              </Box>
            )}
          </Box>
          <Box w="full" h={1} backgroundColor={colors.grey} />
          <Box gap={3}>
            <Box row gap={6}>
              <Text
                color="black"
                children={t('order-on-appointment-of-the-general-director')}
              />
              <Text color="red" children="*" />
            </Box>
            {pickerResponse?.assets ? (
              <Image
                style={{ borderRadius: 50, height: 90, width: 90 }}
                source={{ uri }}
              />
            ) : (
              <Box gap={3}>
                <Text
                  color="red"
                  children={t('document-has-not-been-uploaded')}
                />
                <Button
                  onPress={modalOpen}
                  type="outline"
                  children={t('upload-file')}
                />
              </Box>
            )}
          </Box>
          <Box w="full" h={1} backgroundColor={colors.grey} />
          <Box gap={3}>
            <Box row gap={6}>
              <Text color="black" children={t('articles-of-association')} />
              <Text color="red" children="*" />
            </Box>
            {pickerResponse?.assets ? (
              <Image
                style={{ borderRadius: 50, height: 90, width: 90 }}
                source={{ uri }}
              />
            ) : (
              <Box gap={3}>
                <Text
                  color="red"
                  children={t('document-has-not-been-uploaded')}
                />
                <Button
                  onPress={modalOpen}
                  type="outline"
                  children={t('upload-file')}
                />
              </Box>
            )}
          </Box>

          <Box w="full" h={1} backgroundColor={colors.grey} />
        </Box>

        <Box px={15}>
          <Button type="filled" children={t('finalize-the-configuration')} />
        </Box>
      </Box>

      <ImagePickerModal
        ref={modal}
        modalClose={modalClose}
        setPickerResponse={setPickerResponse}
      />
    </ScrollView>
  );
};
