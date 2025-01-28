import { Box, Button, Text } from '@src/ui';
import React from 'react';
import Orders from '@assets/svg/orders.svg';
import { useAppTheme } from '@src/theme/theme';
import { ScreenProps } from '@src/navigation/types';

export const ScreenOrderAccepted = ({
  navigation,
}: ScreenProps<'OrderAccepted'>) => {
  const { colors } = useAppTheme();

  return (
    <Box px={16} justifyContent="center" alignItems="center" flex={1} gap={8}>
      <Box
        borderRadius={9}
        backgroundColor={colors.green}
        px={13}
        py={13}
        alignSelf="center"
      >
        <Box w={45} h={45}>
          <Orders width="100%" height="100%" color={colors.white} />
        </Box>
      </Box>
      <Text type="h2" children={'Заказ принят!'} />
      <Box row>
        <Text color={colors.dark_grey} children={'Номер заказа: '} />
        <Text color={colors.dark_grey} children={'15-020342'} />
      </Box>
      <Box mb={16} alignItems="center">
        <Text color={colors.dark_grey} children={'Дата и время погрузки:'} />
        <Text color={colors.dark_grey} children={'12.07.2024, 15:40'} />
      </Box>
      <Button
        children={'Отлично !'}
        type="filled"
        backgroundColor="green"
        textColor="white"
      />
    </Box>
  );
};
