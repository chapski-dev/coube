import { ScreenProps } from '@src/navigation/types';
import { useAppTheme } from '@src/theme/theme'
import { useLocalization } from '@src/translations/i18n';
import { Box, Button, Text } from '@src/ui'
import React from 'react'

const SettingsProfileScreen = ({ navigation, route }: ScreenProps<'settings-profile'>) => {
  const { colors } = useAppTheme();

  const { t } = useLocalization()

  const goToPersonalIdScreen = () => {
    navigation.navigate('personal-identifier', { resident: route.params.resident })
  }
  return (
    <>
      <Box pl={16} pr={16} pt={25}>
        <Box gap={12} justifyContent='center' alignItems='center' mb={12}>
          <Box w={90} h={90} backgroundColor={colors.green} borderRadius={50} />
          <Button textColor='main' type='clear' wrapperStyle={{ width: 150 }} children={t('add-photo')} />
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
            {route.params.resident ? (
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
        {route.params.resident ?
          <Text children={t('identification_card')} /> :
          <Text children={t('passport')} />}
        <Text children='>' />
      </Box>
      <Box gap={16}>
        <Box backgroundColor='#A1A1A11A' p={8} pr={16} pl={16}>
          <Text
            center
            children={t('you_need_to_add_a_drivers_license_to_use_the_app_correctly_want_to_do_it_now')}
          />
        </Box>
        <Box gap={16} pl={16} pr={16}>
          <Button children={t('add')} />
          <Button children={t('later')} type='clear' />
        </Box>
      </Box>
    </>
  )
}

export default SettingsProfileScreen