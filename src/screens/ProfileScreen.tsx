import React, { useRef, useState } from 'react';
import { Switch } from 'react-native';
import ArrowIcon from '@assets/svg/arrow-right.svg'
import NoAvatarIcon from '@assets/svg/no-avatar.svg'
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { ScreenProps } from '@src/navigation/types';
import app from '@src/service/app';
import { useAppTheme } from '@src/theme/theme';
import { useLocalization } from '@src/translations/i18n';
import { Box, Button, Text } from '@src/ui';
import SelectLanguageModal from '@src/widgets/SelectLanguageModal';

export const ProfileScreen = ({ navigation }: ScreenProps<'profile'>) => {
  const { t } = useLocalization()
  const isAvatarExist = false

  const [isToggleEnabled, setIsToggleEnabled] = useState(false);
  const toggleSwitch = () => setIsToggleEnabled(previousState => !previousState);

  const openProfileData = () => { }
  const openIdentityData = () => { navigation.push('identity') }

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
            <Switch
              trackColor={{ false: colors.grey, true: colors.main }}
              thumbColor={colors.white}
              onValueChange={toggleSwitch}
              value={isToggleEnabled}
            />
          </Box>
        </Box>

        <Button backgroundColor='white' textColor='red' children='Выйти' onPress={app.logout} />

        <Button type='clear' textColor='textSecondary' children='Удалить аккаунт' />

      </Box>
      <SelectLanguageModal ref={modal} modalClose={modalClose} />
    </>
  );
}

