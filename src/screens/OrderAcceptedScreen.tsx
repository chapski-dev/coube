import React from 'react';
import OrdersIcon from '@assets/svg/orders.svg';
import dayjs from 'dayjs';

import { ScreenProps } from '@src/navigation/types';
import { useAppTheme } from '@src/theme/theme';
import { useLocalization } from '@src/translations/i18n';
import { Box, Button, Text } from '@src/ui';

export const OrderAcceptedScreen = ({
  navigation,
  route,
}: ScreenProps<'order-accepted'>) => {
  const { colors } = useAppTheme();
  const { t } = useLocalization();

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
      <Text type="h2" children={t('order-accepted')} />
      <Box row>
        <Text children={`${t('order-number')}: ${route.params.order_number}`} />
      </Box>
      <Box mb={16} alignItems="center">
        <Text center children={`${t('date-and-time-of-loading')}:`} />
        <Text center children={dayjs().format('DD.MM.YYYY, HH:mm')} />
      </Box>
      <Button
        children={t('perfectly')}
        backgroundColor="green"
        onPress={navigation.goBack}
      />
    </Box>
  );
};
