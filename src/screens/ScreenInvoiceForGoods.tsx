import { ScreenProps } from '@src/navigation/types';
import { Box, Button, Text } from '@src/ui';
import WaybillIcon from '@assets/svg/waydill.svg';
import React from 'react';
import { useAppTheme } from '@src/theme/theme';

export const ScreenInvoiceForGoods = ({
  navigation,
}: ScreenProps<'invoice-for-goods'>) => {
  const { colors } = useAppTheme();
  return (
    <Box px={16} py={45} alignItems="center" flex={1} gap={27}>
      <Box>
        <WaybillIcon color={colors.invoice_icon} />
      </Box>
      <Box px={40} gap={4}>
        <Text
          type="h2"
          color={colors.invoice_text}
          center
          children={'Накладная на товар'}
        />
        <Text
          color={colors.invoice_text}
          center
          children={'Загрузите документ, подтверждающий отпуска товара'}
        />
      </Box>
      <Button
        children={'Загрузить'}
        backgroundColor="main_light"
        textColor="dark_grey"
      />
    </Box>
  );
};
