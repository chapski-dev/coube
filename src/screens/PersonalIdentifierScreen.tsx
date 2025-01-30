
import React, { useEffect } from 'react'
import { ScreenProps } from '@src/navigation/types'
import { Box, Button, Text } from '@src/ui'
import { useAppTheme } from '@src/theme/theme'
import { useLocalization } from '@src/translations/i18n'


const PersonalIdentifier = ({ navigation, route }: ScreenProps<'personal-identifier'>) => {
  const resident = route.params.resident;
  const { colors } = useAppTheme();
  const { t } = useLocalization()


  useEffect(() => {
    navigation.setOptions({
      headerTitle: !resident ? t('passport')  : t('identification_card'),
      headerBackButtonDisplayMode: 'minimal'
    })

  }, [navigation, resident])

  return (
    <Box p={16} gap={20}>
      <Box gap={8} mb={31}>
        <Box gap={4} style={{ borderBottomWidth: 1 }} borderColor={colors.border} pb={8} pt={8}>
          <Text fontSize={12} color={colors.label} children={t('full_name')} />
          <Text fontWeight='700' uppercase children="Сергей Крылов дмитриевич" />
        </Box>
        <Box gap={4} style={{ borderBottomWidth: 1 }} borderColor={colors.border} pb={8} pt={8}>
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
      <Button children={t('upload-photo')} onPress={() => null} backgroundColor='main_light' textColor='textDefault' />
    </Box>
  )
}

export default PersonalIdentifier