import React from 'react';
import { ScreenProps } from '@src/navigation/types';
import { Box, Button, Text } from '@src/ui';
import { useAppTheme } from '@src/theme/theme';
import LogoIcon from '@assets/svg/logo.svg';


const LoginScreen = ({ navigation }: ScreenProps<'login'>) => {
  const { insets } = useAppTheme();

  return (
    <Box flexGrow={1} pt={insets.top} pl={16} pr={16} alignItems="center" gap={24} justifyContent="center">
      <LogoIcon />
      <Text type="h3"
        center
        children="Войдите или зарегистрируйтесь, чтобы управлять своими маршрутами"
      />
      <Box gap={12} w="full" >
        <Button
          children="Войти"
          onPress={() => navigation.navigate('login-via-phone')}

        />
        <Button
          type="clear"
          children="Регистрация"
          textColor="main"
          onPress={() => navigation.navigate('registration', { step: 'driver_performer_or_invaitetion' })}
        />
      </Box>
    </Box>
  );
};

export default LoginScreen;
