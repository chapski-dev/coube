import React from 'react';
import WaybillIcon from '@assets/svg/sheet.svg';

import { ScreenProps } from '@src/navigation/types';
import { useAppTheme } from '@src/theme/theme';
import { Box, Button, Text } from '@src/ui';

export const InvoiceSentScreen = ({
  navigation,
}: ScreenProps<'invoice-sent'>) => {
  const { colors } = useAppTheme();

  return (
    <Box
      pt={45}
      alignItems="center"
      justifyContent="space-between"
      flex={1}
      gap={27}
    >
      <Box gap={27} alignItems="center">
        <WaybillIcon color={colors.main} />
        <Box gap={4}>
          <Text type="h2" center children="Накладная на товар отправлена!" />
          <Text type="h3" center children="Погрузка груза завершена!" />
        </Box>
      </Box>
      <Box
        w="full"
        py={12}
        px={16}
        borderColor={colors.border}
        style={{ borderTopWidth: 1 }}
      >
        <Button children="Перейти к заказу" onPress={navigation.goBack} />
      </Box>
    </Box>
  );
};
