import { ScreenProps } from '@src/navigation/types';
import { Box, Button, Text } from '@src/ui';
import Waybill from '@assets/svg/waydill.svg';
import React from 'react';
import { useAppTheme } from '@src/theme/theme';

export const ScreenInvoiceForGoods = ({
  navigation,
}: ScreenProps<'InvoiceForGoods'>) => {
  const { colors } = useAppTheme();
  return (
    <Box px={16} py={45} alignItems="center" flex={1} gap={27}>
      <Box>
        <Waybill color={colors.invoice_icon} />
      </Box>
      <Box px={40} gap={4}>
        <Text
          type="h2"
          color={colors.invoice_text}
          style={{ textAlign: 'center' }}
          children={'Накладная на товар'}
        />
        <Text
          style={{ textAlign: 'center' }}
          color={colors.invoice_text}
          children={'Загрузите документ, подтверждающий отпуска товара'}
        />
      </Box>
      <Button
        children={'Загрузить'}
        type="filled"
        backgroundColor="customYellow"
        textColor="customGrey"
      />
    </Box>
  );
};
