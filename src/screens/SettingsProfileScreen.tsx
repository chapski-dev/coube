import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Image } from 'react-native';
import { ImagePickerResponse } from 'react-native-image-picker';
import UserIcon from '@assets/svg/no-avatar.svg'
import { BottomSheetModal, } from '@gorhom/bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ScreenProps } from '@src/navigation/types';
import { AuthActionType } from '@src/providers/reducers/authReducer';
import registrationService from '@src/service/registration-service';
import { useAppTheme } from '@src/theme/theme'
import { useLocalization } from '@src/translations/i18n';
import { Box, Button, Text } from '@src/ui'
import { wait } from '@src/utils';
import { ASYNC_STORAGE_KEYS } from '@src/vars/async_storage_keys';
import ImagePickerModal from '@src/widgets/ImagePickerModal';

export let setIsDriverLicenceSendedRef: React.Dispatch<React.SetStateAction<boolean>> | null = null
const SettingsProfileScreen = ({ navigation }: ScreenProps<'settings-profile'>) => {
  const { colors } = useAppTheme();
  const isResident = registrationService.getIsRezident()
  const [isDriverLicenceSended, setIsDriverLicenceSended] = useState(false);

  useEffect(() => {
    setIsDriverLicenceSendedRef = setIsDriverLicenceSended
    return () => {
      setIsDriverLicenceSendedRef = null
    }
  }, [])

  const { t } = useLocalization()

  const goToPersonalIdScreen = () => {
    navigation.navigate('personal-identifier')
  }

  const [pickerResponse, setPickerResponse] = useState<ImagePickerResponse | null>(null);
  const uri = pickerResponse?.assets && pickerResponse.assets[0].uri;
  const modal = useRef<BottomSheetModal>(null);
  const modalClose = () => modal?.current?.forceClose();
  const modalOpen = () => modal?.current?.present();

  const [loading, setLoading] = useState(false)

  const handleFinishRegistration = async () => {
    setLoading(true)
    wait(1000)
    setLoading(false)
    await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.AUTH_STATE, AuthActionType.setReady)
    navigation.reset({
      index: 0,
      'routes': [{ name: 'registration-finished' }]
    })
  }

  const goToAddDriverLicence = () => navigation.navigate('add-drivers-license')

  return loading ? <ActivityIndicator color={colors.main} /> : <>
    <Box pl={16} pr={16} pt={25}>
      <Box gap={12} justifyContent='center' alignItems='center' mb={12}>
        {pickerResponse?.assets ?
          <Image style={{ borderRadius: 50, height: 90, width: 90 }} source={{ uri }} /> :
          <Box w={90} h={90} backgroundColor={colors.disabled} borderRadius={50} >
            <UserIcon width={90} height={90} />
          </Box>
        }
        <Button
          textColor='main'
          type='clear'
          wrapperStyle={{ width: 150 }}
          children={t('add-photo')}
          onPress={modalOpen}
        />
      </Box>

      <Box gap={16} mb={31}>
        <Box gap={4}>
          <Text fontSize={12} color={colors.label} children={t('full_name')} />
          <Text fontWeight='700' uppercase children="Сергей Крылов дмитриевич" />
        </Box>
        <Box gap={4}>
          <Text fontSize={12} color={colors.label} children={t('phone')} />
          <Box row justifyContent='space-between' w='full' >
            <Text fontWeight='700' uppercase children="+7 777 777 77 77" />
            <Box onPress={() => null}>
              <Text color={colors.main} children={t('add_phone_number')} />
            </Box>
          </Box>
        </Box>
        <Box gap={4}>
          {isResident ? (
            <>
              <Text fontSize={12} color={colors.label} children={t('iin')} />
              <Text fontWeight='700' children="88121155548946" />
            </>
          ) : (
            <>
              <Text fontSize={12} color={colors.label} children={t('passport_number')} />
              <Text fontWeight='700' children="88121155548946" />
            </>
          )}
        </Box>
      </Box>
    </Box>
    <Box onPress={goToPersonalIdScreen}
      backgroundColor={colors.white}
      row h={50}
      pl={16}
      pr={16}
      alignItems='center'
      justifyContent='space-between'
      mb={16}
    >
      {isResident ?
        <Text children={t('identity')} /> :
        <Text children={t('passport')} />}
      <Text children='>' />
    </Box>
    {isDriverLicenceSended ? (
      <Box px={16} pt={20}>
        <Button
          children={t('finish-registration')}
          loading={loading}
          disabled={loading}
          onPress={handleFinishRegistration}
        />
      </Box>
    ) : (
      <Box gap={16}>
        <Box backgroundColor='#A1A1A11A' p={8} pr={16} pl={16}>
          <Text
            center
            children={t('you_need_to_add_a_drivers_license_to_use_the_app_correctly_want_to_do_it_now')}
          />
        </Box>
        <Box gap={16} px={16}>
          <Button children={t('add')} onPress={goToAddDriverLicence} />
          <Button
            children={t('later')}
            type='clear' loading={loading}
            disabled={loading}
            onPress={handleFinishRegistration}
          />
        </Box>
      </Box>
    )}
    <ImagePickerModal
      ref={modal}
      modalClose={modalClose}
      setPickerResponse={setPickerResponse}
    />
  </>
}

export default SettingsProfileScreen