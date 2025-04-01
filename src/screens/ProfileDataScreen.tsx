import React, { useRef, useState } from 'react';
import { Alert, Image } from 'react-native';
import { ImagePickerResponse } from 'react-native-image-picker';
import NoAvatarIcon from '@assets/svg/no-avatar.svg';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { ScreenProps } from '@src/navigation/types';
import { useAuth } from '@src/providers/auth';
import { useAppTheme } from '@src/theme/theme';
import { useLocalization } from '@src/translations/i18n';
import { Box, Button, Text } from '@src/ui';
import ImagePickerModal from '@src/widgets/ImagePickerModal';

export const ProfileDataScreen = ({ navigation }: ScreenProps<'profile-data'>) => {
  const { t } = useLocalization();
  const { colors } = useAppTheme();
  const { onLogout, user } = useAuth();

  const [pickerResponse, setPickerResponse] = useState<ImagePickerResponse | null>(null);
  const uri = pickerResponse?.assets && pickerResponse.assets[0].uri;
  const modal = useRef<BottomSheetModal>(null);
  const modalClose = () => modal?.current?.forceClose();
  // const modalOpen = () => modal?.current?.present();

  const onDeleteAccountPress = () =>
    Alert.alert(t('do-you-want-to-delete-your-account?'), undefined, [
      {
        onPress: () => null,
        text: t('cancel')
      },
      {
        onPress: onLogout,
        style: 'destructive',
        text: t('delete')
      }
    ]);

  return (
    <>
      <Box px={16} gap={24} pt={24}>
        <Box row gap={15} alignItems="center">
          {pickerResponse?.assets ? (
            <Image style={{ borderRadius: 50, height: 90, width: 90 }} source={{ uri }} />
          ) : (
            <Box w={90} h={90} backgroundColor={colors.disabled} borderRadius={50}>
              <NoAvatarIcon width={90} height={90} />
            </Box>
          )}

          {/* <Box w={152}>
            <Button
              backgroundColor="grey"
              textColor="black"
              children="Добавить фото"
              onPress={modalOpen}
            />
          </Box> */}
        </Box>

        <Box gap={16}>
          <Box>
            <Text type="label" children={t('full_name')} />
            <Text
              type="body_500"
              uppercase
              children={`${user?.firstName || ''} ${user?.middleName || ''} ${user?.lastName || ''}`}
            />
          </Box>

          <Box row justifyContent="space-between">
            <Box flex={1}>
              <Text type="label" children={t('phone')} />
              <Text type="body_500" children={'+7 777 777 77 77'} />
            </Box>
            {/* <Button
              wrapperStyle={{ flex: 1 }}
              type="clear"
              children={t('add_phone_number')}
              textStyle={{ fontSize: 14 }}
              textColor="dark_grey"
            /> */}
          </Box>

          <Box>
            <Text type="label" children={t('iin')} />
            <Text type="body_500" children="88121155548946" />
          </Box>
        </Box>

        <Button
          type="clear"
          textColor="red"
          children={t('delete-account')}
          onPress={onDeleteAccountPress}
        />
      </Box>

      <ImagePickerModal ref={modal} modalClose={modalClose} setPickerResponse={setPickerResponse} />
    </>
  );
};
