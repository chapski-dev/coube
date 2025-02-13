import React from 'react';
import OrdersIcon from '@assets/svg/orders.svg';

import { ScreenProps } from '@src/navigation/types';
import { useAppTheme } from '@src/theme/theme';
import { Box, Button, Text } from '@src/ui';
import { useLocalization } from '@src/translations/i18n';

export const OrderAcceptedScreen = ({
  navigation,
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
        <Text children={`${t('order-number')}: 15-020342 `} />
      </Box>
      <Box mb={16} alignItems="center">
        <Text center children={`${t('date-and-time-of-loading')}:`} />
        <Text center children=" 12.07.2024, 15:40" />
      </Box>
      <Button
        children={t('perfectly')}
        backgroundColor="green"
        onPress={navigation.goBack}
      />
    </Box>
  );
};
