
import React, { useEffect } from 'react'
import { ScreenProps } from '@src/navigation/types'
import { Box, Button, Text } from '@src/ui'
import { useAppTheme } from '@src/theme/theme'


const PersonalIdentifier = ({ navigation, route }: ScreenProps<'personal-identifier'>) => {
  const resident = route.params.resident;
  const { colors } = useAppTheme();


  useEffect(() => {
    navigation.setOptions({
      headerTitle: !resident ? "Паспорт" : "Удостоверение личности",
      headerBackButtonDisplayMode: 'minimal'
    })

  }, [navigation, resident])

  return (
    <Box p={16} gap={20}>
      <Box gap={8} mb={31}>
        <Box gap={4} style={{ borderBottomWidth: 1 }} borderColor={colors.border} pb={8} pt={8}>
          <Text fontSize={12} color={colors.label} children="ФИО" />
          <Text fontWeight='700' uppercase children="Сергей Крылов дмитриевич" />
        </Box>
        <Box gap={4} style={{ borderBottomWidth: 1 }} borderColor={colors.border} pb={8} pt={8}>
          {route.params.resident ? (
            <>
              <Text fontSize={12} color={colors.label} children="ИИН" />
              <Text fontWeight='700' children="88121155548946" />
            </>
          ) : (
            <>
              <Text fontSize={12} color={colors.label} children="Номер паспорта" />
              <Text fontWeight='700' children="88121155548946" />
            </>
          )}
        </Box>
        <Box row gap={4}>
          <Box gap={4} style={{ borderBottomWidth: 1 }} borderColor={colors.border} pb={8} pt={8}>
            <Text fontSize={12} color={colors.label} children="Дата выдачи" />
            <Text fontWeight='700' uppercase children="12.08.2014" />
          </Box>

          <Box gap={4} style={{ borderBottomWidth: 1 }} borderColor={colors.border} pb={8} pt={8}>
            <Text fontSize={12} color={colors.label} children="Срок действия" />
            <Text fontWeight='700' uppercase children="12.08.2034" />
          </Box>
        </Box>
        <Box gap={4} style={{ borderBottomWidth: 1 }} borderColor={colors.border} pb={8} pt={8}>
          <Text fontSize={12} color={colors.label} children="Выдан" />
          <Text fontWeight='700' uppercase children="МВД РК" />
        </Box>
      </Box>
      <Button children="Загрузить фото" onPress={() => null} backgroundColor='main_light' textColor='textDefault' />
    </Box>
  )
}

export default PersonalIdentifier