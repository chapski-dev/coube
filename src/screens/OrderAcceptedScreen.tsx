import React from 'react';
import OrdersIcon from '@assets/svg/orders.svg';

import { ScreenProps } from '@src/navigation/types';
import { useAppTheme } from '@src/theme/theme';
import { Box, Button, Text } from '@src/ui';

export const OrderAcceptedScreen = ({
  navigation,
}: ScreenProps<'order-accepted'>) => {
  const { colors } = useAppTheme();

  return (
    <Box px={16} flex={1} justifyContent="center" alignItems="center" gap={8}>
      <Box
        borderRadius={9}
        backgroundColor={colors.green}
        px={13}
        py={13}
        alignSelf="center"
      >
        <Box w={45} h={45}>
          <OrdersIcon width="100%" height="100%" color={colors.white} />
        </Box>
      </Box>
      <Text type="h2" children="Заказ принят!" />
      <Box row>
        <Text children="Номер заказа: 15-020342 " />
      </Box>
      <Box mb={16} alignItems="center">
        <Text center children="Дата и время погрузки:" />
        <Text center children=" 12.07.2024, 15:40" />
      </Box>
      <Button
        children="Отлично !"
        backgroundColor="green"
        onPress={() => navigation.goBack()}
      />
    </Box>
  );
};
