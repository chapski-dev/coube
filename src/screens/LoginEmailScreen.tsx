import React, { useState } from 'react';
import { useMaskedInputProps } from 'react-native-mask-input';

import { ScreenProps } from '@src/navigation/types';
import { useLocalization } from '@src/translations/i18n';
import { Box, Button, Input, Text } from '@src/ui';
import { phoneMask } from '@src/utils/masks';

const LoginViaPhoneScreen = ({ navigation, route }: ScreenProps<'login-via-phone'>) => {
  const { t } = useLocalization();

  const handleSubmit = () => {
    navigation.navigate('otp-verify', { action: 'login' });
  };

  const [phone, setPhone] = useState('');

  const maskedInputProps = useMaskedInputProps({
    mask: phoneMask,
    onChangeText: setPhone,
    value: phone
  });

  return (
    <Box pr={16} pl={16} gap={24} pt={54}>
      <Box alignItems="center" justifyContent="center">
        <Text center type="h2" children={t('enter_phone_number')} />
        <Text center children={t('and_well_send_you_an_authorization_code')} />
      </Box>
      <Box gap={16}>
        <Input label="Email" required {...maskedInputProps} />
        <Input label={t('password')} required {...maskedInputProps} />
      </Box>
      <Button children={t('next')} onPress={handleSubmit} />
    </Box>
  );
};

export default LoginViaPhoneScreen;
