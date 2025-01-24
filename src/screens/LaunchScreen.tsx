import React, { useState } from 'react';
import { Box, Button, Text } from '@src/ui';
import { ScreenProps } from '@src/navigation/types';

import LogoIcon from '@assets/svg/logo.svg';
import { useAppTheme } from '@src/theme/theme';

const LaunchScreen = ({ navigation }: ScreenProps<'launch'>) => {
  const { insets, colors } = useAppTheme();

  const [showChangeLang, setShowChangeLang] = useState(false)


  return (
    <Box flexGrow={1} pt={insets.top} pb={insets.bottom} pl={16} pr={16} alignItems="center" justifyContent="center" >
      <Box flexGrow={1} alignItems="center" justifyContent="center">
        <LogoIcon />
        <Text type="h2" center>Заказы на грузоперевозку быстро и удобно</Text>
      </Box>
      <Box flexGrow={1} w='full'>
        {showChangeLang ? (
          <>
            <Box flex={1} />
            <Text center fontSize={16} fontWeight='500' children="Выберите язык/Тілді таңдаңыз" mb={16} />
            <Box gap={12} w="full" alignSelf="flex-end" mb={36}>
              <Button backgroundColor='main_light' textColor='textDefault' children="Русский" onPress={() => setShowChangeLang(false)} />
              <Button backgroundColor='main_light' textColor='textDefault' children="Қазақша" onPress={() => setShowChangeLang(false)} />
            </Box>
          </>
        ) : (
          <>
            <Box flex={1} />
            <Box gap={12} w="full" alignSelf="flex-end" mb={36} flexGrow={1}>
              <Button children="Продолжить на русском" onPress={() => navigation.push('login')} />
              <Button type="clear" children="Сменить язык" onPress={() => setShowChangeLang(true)} />
            </Box>
            <Text center>
              <Text children="Продолжая вы соглашаетесь с " />
              <Text onPress={() => null} children="Пользовательским соглашением" color={colors.main} />
            </Text>
          </>
        )}
      </Box>
    </Box>
  );
};

export default LaunchScreen;

