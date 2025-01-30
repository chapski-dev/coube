import React, { useRef, useState } from 'react'
import { Dimensions, Image } from 'react-native'
import { ImagePickerResponse } from 'react-native-image-picker'
import DriversLicenseIcon from '@assets/svg/drivers-license.svg'
import { BottomSheetModal } from '@gorhom/bottom-sheet'

import { ScreenProps } from '@src/navigation/types'
import regService from '@src/service/registration-service'
import { useAppTheme } from '@src/theme/theme'
import { Box, Button, Text } from '@src/ui'
import { wait } from '@src/utils'
import ImagePickerModal from '@src/widgets/ImagePickerModal'

import { setIsDriverLicenceSendedRef } from './SettingsProfileScreen'

const AddDriversLicenseScreen = ({ navigation }: ScreenProps<'add-drivers-license'>) => {
  const { colors } = useAppTheme();
  const [loading, setLoading] = useState(false);
  const [isDriverLicenceSended, setIsDriverLicenceSended] = useState(regService.getIsDriverLicenceSended())

  const [pickerResponse, setPickerResponse] = useState<ImagePickerResponse | null>(
    regService.getDriversLicencePhotoUri() ? {
      assets: [{ uri: regService.getDriversLicencePhotoUri() }]
    } : null);

  const modal = useRef<BottomSheetModal>(null);
  const modalClose = () => modal?.current?.forceClose();
  const modalOpen = () => modal?.current?.present();

  const handleAddPhoto = (val: ImagePickerResponse | null) => {
    setPickerResponse(val)
    val?.assets && regService.setDriversLicencePhotoBase64(val.assets[0].base64 as string)
    val?.assets && regService.setDriversLicencePhotoUri(val.assets[0].uri as string)
  }

  const uri = pickerResponse?.assets && pickerResponse.assets[0].uri;


  const handleSend = async () => {
    setLoading(true)
    await wait(1000);
    setLoading(false)
    setIsDriverLicenceSended(true)
    regService.setIsDriverLicenceSended(true)
    setIsDriverLicenceSendedRef && setIsDriverLicenceSendedRef(true)
  }

  return isDriverLicenceSended ? (
    <>
      <Box justifyContent='center' alignItems='center' flex={1} gap={25} px={16} >
        <DriversLicenseIcon fill={colors.main} />
        <Text children="Водительское удостоверение отправлено на проверку, это может занять некоторое время" />
      </Box>
    </>
  ) : (
    <>
      <Box justifyContent='center' alignItems='center' pt={45} gap={25} px={16} >
        {pickerResponse?.assets ? (
          <Image
            source={{ uri }}
            width={Dimensions.get('screen').width - 32}
            height={Dimensions.get('screen').height * 0.6}
            style={{ alignSelf: 'center' }}
            resizeMode='contain'
          />) : (
          <>
            <DriversLicenseIcon />
            <Box gap={4}>
              <Text children="В.У. Лицевая сторона" type='h2' center />
              <Text
                children="Должно быть видно, номер, фотографию, фио, дату выдачи и срок действия"
                center
              />
            </Box>
          </>)}
        {pickerResponse?.assets && <Button children="Отправить" onPress={handleSend} loading={loading} disabled={loading} />}
        <Button
          children={pickerResponse?.assets ? 'Выбрать другое фото' : 'Добавить фото'}
          onPress={modalOpen}
          backgroundColor='main_light'
          textColor='text'
          disabled={loading}
        />
      </Box>
      <ImagePickerModal
        ref={modal}
        modalClose={modalClose}
        setPickerResponse={handleAddPhoto}
      />
    </>
  )
}

export default AddDriversLicenseScreen