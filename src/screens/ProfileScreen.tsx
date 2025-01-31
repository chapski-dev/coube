import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ActivityIndicator, Switch } from 'react-native';
import ArrowIcon from '@assets/svg/arrow-right.svg'
import NoAvatarIcon from '@assets/svg/no-avatar.svg'
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { setNotificationSettings } from '@src/api';
import { NotificationSettings } from '@src/api/types';
import { ScreenProps } from '@src/navigation/types';
import app from '@src/service/app';
import messaging from '@src/service/messaging';
import { useAppTheme } from '@src/theme/theme';
import { useLocalization } from '@src/translations/i18n';
import { Box, Button, Text } from '@src/ui';
import { wait } from '@src/utils';
import { handleCatchError } from '@src/utils/handleCatchError';
import SelectLanguageModal from '@src/widgets/SelectLanguageModal';


export enum NotifictationOption {
  push_notifications = 'push_notifications',
}

const isAvatarExist = false

export const ProfileScreen = ({ navigation }: ScreenProps<'profile'>) => {
  const { t } = useLocalization()

  const [loading, setLoading] = useState(false)
  const form = useForm({
    defaultValues: {
      settings: {
        [NotifictationOption.push_notifications]: messaging.isEnabled(),
      },
    },
  })
  const { setValue, getValues, watch } = form


  const valuesWithPermission = (val: NotificationSettings['settings']) => {
    const push_notifications = messaging.isEnabled() ?
      val[NotifictationOption.push_notifications] :
      false
    return { ...val, [NotifictationOption.push_notifications]: push_notifications }
  }

  const togglePushNotification = async (val: NotificationSettings['settings']) => {
    const newValues = valuesWithPermission(val)
    await handleSubmitForm(newValues)
  }
  const handleSubmitForm = async (values: NotificationSettings['settings']) => {
    try {
      setLoading(true)
      await wait(1000)
      await setNotificationSettings({ settings: values })
      setValue('settings', values)
    } catch (e) {
      handleCatchError(e)
    } finally {
      setLoading(false)
    }
  }


  const openProfileData = () => navigation.navigate('profile-data')
  const openIdentityData = () => navigation.push('identity')

  const { colors } = useAppTheme()
  const modal = useRef<BottomSheetModal>(null);
  const modalClose = () => modal?.current?.forceClose();
  const modalOpen = () => modal?.current?.present();


  return (
    <>
      <Box
        flex={1}
        alignItems='center'
        justifyContent='space-between'
        backgroundColor={colors.background}
        pb={250}
        pt={20}
      >
        <Box
          onPress={openProfileData}
          w='full'
          h={50}
          px={15}
          row
          alignItems='center'
          justifyContent='space-between'
        >
          <Box row alignItems='center' gap={15} >
            {isAvatarExist ? <NoAvatarIcon /> : <NoAvatarIcon />}
            <Text type='body_500' fontSize={18} children='Сергей' />
          </Box>
          <ArrowIcon />
        </Box>

        <Box row w='full' gap={5} px={15} >
          <Box
            backgroundColor={colors.grey}
            borderRadius={9}
            justifyContent='center'
            alignItems='flex-start'
            gap={3} p={10} w={126} h={72} >
            <Box
              backgroundColor={colors.green}
              borderRadius={35}
              px={10}
              py={3}
              alignItems='center'
              justifyContent='center' >
              <Text color={colors.white} fontWeight={700} children='4.5' />
            </Box>
            <Text fontSize={10} fontWeight={400} children={t('my_rating')} />
          </Box>

          <Box
            backgroundColor={colors.grey}
            borderRadius={9}
            justifyContent='center'
            alignItems='flex-start'
            gap={3}
            p={10} w={126} h={72} >
            <Box
              backgroundColor={colors.dark_grey}
              borderRadius={35}
              px={10}
              py={3}
              alignItems='center'
              justifyContent='center' >
              <Text color={colors.white} fontWeight={700} children='115' />
            </Box>
            <Text fontSize={10} fontWeight={400} children={t('transportations')} />
          </Box>

          <Box
            backgroundColor={colors.grey}
            borderRadius={9}
            justifyContent='center'
            alignItems='flex-start'
            gap={3} p={10} w={126} h={72} >
            <Box
              backgroundColor={colors.dark_grey}
              borderRadius={35}
              px={10}
              py={3}
              alignItems='center'
              justifyContent='center'
            >
              <Text color={colors.white} fontWeight={700} children='351 тыс.' />
            </Box>
            <Text fontSize={10} fontWeight={400} children={t('traveled_kilometers')} />
          </Box>
        </Box>

        <Box w='full' h={50} px={15} row alignItems='center' justifyContent='space-between' >
          <Text type={'body_500'} children={t('reports')} />
          <ArrowIcon />
        </Box>

        <Box>
          <Box w='full' h={50} px={15} row alignItems='center' justifyContent='space-between' >
            <Text type={'body_500'} children={t('identification_card')} />
            <ArrowIcon onPress={openIdentityData} />
          </Box>

          <Box w='full' h={50} px={15} row alignItems='center' justifyContent='space-between' >
            <Text type={'body_500'} children={t('drivers_licence')} />
            <ArrowIcon />
          </Box>
        </Box>

        <Box>
          <Box
            w='full'
            h={50}
            px={15}
            row
            alignItems='center'
            justifyContent='space-between'
            onPress={modalOpen}
          >
            <Text type={'body_500'} children={t('apps_language')} />
            <ArrowIcon />
          </Box>

          <Box w='full' h={50} px={15} row alignItems='center' justifyContent='space-between' >
            <Text type={'body_500'} children={t('push_notifications')} />
            {loading ? <Box mr={20} ><ActivityIndicator /></Box> : (
              <Switch
                trackColor={{ false: colors.grey, true: colors.main }}
                thumbColor={colors.white}
                onValueChange={(val) => togglePushNotification({
                  ...getValues().settings,
                  [NotifictationOption.push_notifications]: val
                })}
                value={watch('settings.push_notifications')}
              />
            )}
          </Box>
        </Box>

        <Button backgroundColor='white' textColor='red' children='Выйти' onPress={app.logout} />

        <Button type='clear' textColor='textSecondary' children='Удалить аккаунт' />

      </Box>
      <SelectLanguageModal ref={modal} modalClose={modalClose} />
    </>
  );
}

