import { ScreenProps } from '@src/navigation/types'
import { Box, Button, Input, Text } from '@src/ui'
import { phoneMask } from '@src/utils';
import React, { useState } from 'react'
import { useMaskedInputProps } from 'react-native-mask-input';

const LoginViaPhoneScreen = ({ navigation, route }: ScreenProps<'login-via-phone'>) => {
  const handleSubmit = () => {
    navigation.navigate('otp-verify', { action: 'login' })
  };

  const [phone, setPhone] = useState('');

  const maskedInputProps = useMaskedInputProps({
    mask: phoneMask,
    onChangeText: setPhone,
    value: phone,
  });

  return (
    <Box pr={16} pl={16} gap={24} pt={54} >
      <Box alignItems='center' justifyContent='center'>
        <Text center type='h2' children="Введите номер телефона" />
        <Text center children="И мы пришлем код для авторизации" />
      </Box>
      <Box gap={16}>
        <Input label='Email' required {...maskedInputProps} />
        <Input label='Пароль' required {...maskedInputProps} />
      </Box>
      <Button children="Далее" onPress={handleSubmit} />
    </Box>
  )
}

export default LoginViaPhoneScreen