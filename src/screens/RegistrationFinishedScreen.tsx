import React from 'react'
import AppIcon from '@assets/svg/app-icon.svg'

import { ScreenProps } from '@src/navigation/types'
import { dispatchAuth } from '@src/providers/auth'
import { AuthActionType } from '@src/providers/reducers/authReducer'
import { Box, Button, Text } from '@src/ui'

const RegistrationFinishedScreen = ({ navigation }: ScreenProps<'registration-finished'>) => {
  const handleSignIn = async () => dispatchAuth?.({ type: AuthActionType.setReady });


  return (
    <Box flex={1} px={23} alignItems='center' justifyContent='center' gap={47}>
      <Box alignItems='center' justifyContent='center' gap={4}>
        <AppIcon />
        <Text type='h2' center children="Регистрация завершена!" />
        <Text
          center
          children="Добро пожаловать в Coube - единое приложение для управления вашими заказами по грузоперевозкам."
        />
      </Box>

      <Button
        children="Начало работы"
        onPress={handleSignIn}
      />
    </Box>
  )
}

export default RegistrationFinishedScreen