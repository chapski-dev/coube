import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, Image } from 'react-native'
import { ImagePickerResponse } from 'react-native-image-picker'
import { BottomSheetModal } from '@gorhom/bottom-sheet'

import { ScreenProps } from '@src/navigation/types'
import regService from '@src/service/registration-service'
import { useAppTheme } from '@src/theme/theme'
import { useLocalization } from '@src/translations/i18n'
import { Box, Button, Text } from '@src/ui'
import ImagePickerModal from '@src/widgets/ImagePickerModal'


const PersonalIdentifier = ({ navigation }: ScreenProps<'personal-identifier'>) => {
  const isResident = regService.getIsRezident()

  const { colors } = useAppTheme();
  const { t } = useLocalization()


  useEffect(() => {
    navigation.setOptions({
      headerBackButtonDisplayMode: 'minimal',
      headerTitle: !isResident ? t('passport') : t('identity')
    })

  }, [navigation, isResident])


  const [pickerResponse, setPickerResponse] = useState<ImagePickerResponse | null>(
    regService.getPersonalIdentifierPhotoUri() ? {
      assets: [{ uri: regService.getPersonalIdentifierPhotoUri() }]
    } : null);
  const modal = useRef<BottomSheetModal>(null);
  const modalClose = () => modal?.current?.forceClose();
  const modalOpen = () => modal?.current?.present();

  const handleAddPhoto = (val: ImagePickerResponse | null) => {
    setPickerResponse(val)
    val?.assets && regService.setPersonalIdentifierPhotoBase64(val.assets[0].base64 as string)
    val?.assets && regService.setPersonalIdentifierPhotoUri(val.assets[0].uri as string)
  }

  const uri = pickerResponse?.assets && pickerResponse.assets[0].uri;

  return (
    <>
      <Box p={16} gap={20}>
        <Box gap={8} mb={31}>
          <Box gap={4} style={{ borderBottomWidth: 1 }} borderColor={colors.border} pb={8} pt={8}>
            <Text fontSize={12} color={colors.label} children={t('full_name')} />
            <Text fontWeight='700' uppercase children="Сергей Крылов дмитриевич" />
          </Box>
          <Box gap={4} style={{ borderBottomWidth: 1 }} borderColor={colors.border} pb={8} pt={8}>
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
          <Box row gap={4}>
            <Box gap={4} style={{ borderBottomWidth: 1 }} borderColor={colors.border} pb={8} pt={8}>
              <Text fontSize={12} color={colors.label} children={t('date_of_issue')} />
              <Text fontWeight='700' uppercase children="12.08.2014" />
            </Box>

            <Box gap={4} style={{ borderBottomWidth: 1 }} borderColor={colors.border} pb={8} pt={8}>
              <Text fontSize={12} color={colors.label} children={t('validity_period')} />
              <Text fontWeight='700' uppercase children="12.08.2034" />
            </Box>
          </Box>
          <Box gap={4} style={{ borderBottomWidth: 1 }} borderColor={colors.border} pb={8} pt={8}>
            <Text fontSize={12} color={colors.label} children={t('issued')} />
            <Text fontWeight='700' uppercase children="МВД РК" />
          </Box>
        </Box>
        {uri && <Image
          source={{ uri }}
          width={Dimensions.get('screen').width - 32}
          height={Dimensions.get('screen').height * 0.4}
          style={{ alignSelf: 'center' }}
          resizeMode='contain'
        />}
        <Button
          children={pickerResponse?.assets ? t('choose-different-photo') : t('upload-photo')}
          onPress={modalOpen}
          backgroundColor='main_light'
          textColor='textDefault'
        />
      </Box>
      <ImagePickerModal ref={modal} modalClose={modalClose} setPickerResponse={handleAddPhoto} />
    </>
  )
}

export default PersonalIdentifier