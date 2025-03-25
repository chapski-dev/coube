import React, { useState } from 'react';
import { useMaskedInputProps } from 'react-native-mask-input';

import { postOtp } from '@src/api';
import { ScreenProps } from '@src/navigation/types';
import { useLocalization } from '@src/translations/i18n';
import { Box, Button, Input, Text } from '@src/ui';
import { handleCatchError } from '@src/utils/handleCatchError';
import { phoneMask } from '@src/utils/masks';

const LoginViaPhoneScreen = ({
  navigation,
  route,
}: ScreenProps<'login-via-phone'>) => {
  const { t } = useLocalization();
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const maskedInputProps = useMaskedInputProps({
    // mask: phoneMask,
    onChangeText: setPhone,
    value: phone,
  });

  const handleSubmit = async () => {
    try {
      setLoading(true)
      await postOtp({ phone: phone.replaceAll(' ', '') });
      navigation.navigate('otp-verify', {
        action: 'login',
        phone: phone,
      });
      
    } catch (error) {
      handleCatchError(error, 'LoginViaPhoneScreen')
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box pr={16} pl={16} gap={24} pt={54}>
      <Box alignItems="center" justifyContent="center">
        <Text center type="h2" children={t('enter_phone_number')} />
        <Text center children={t('and_well_send_you_an_authorization_code')} />
      </Box>
      <Input
        label={t('enter-your-phone')}
        required
        {...maskedInputProps}
        placeholder="+7"
        keyboardType="phone-pad"
        autoFocus
      />
      <Button children={t('next')} onPress={handleSubmit} disabled={loading} loading={loading} />
    </Box>
  );
};

export default LoginViaPhoneScreen;
