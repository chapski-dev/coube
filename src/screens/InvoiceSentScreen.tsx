import { ScreenProps } from '@src/navigation/types';
import { Box, Button, Text } from '@src/ui';
import Waybill from '@assets/svg/waydill.svg';
import React from 'react';
import { useAppTheme } from '@src/theme/theme';

export const InvoiceSentScreen = ({
  navigation,
}: ScreenProps<'InvoiceSent'>) => {
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
        <Waybill color={colors.main} />
        <Box gap={4}>
          <Text
            type="h2"
            color={colors.invoice_text}
            style={{ textAlign: 'center' }}
            children={'Накладная на товар отправлена!'}
          />
          <Text
            type="h3"
            style={{ textAlign: 'center' }}
            color={colors.dark_grey}
            children={'Погрузка груза завершена!'}
          />
        </Box>
      </Box>
      <Box
        w={'full'}
        py={12}
        px={16}
        style={{ borderTopWidth: 1, borderColor: colors.border }}
      >
        <Button
          children={'Перейти к заказу'}
          type="filled"
          backgroundColor="main"
          textColor="white"
        />
      </Box>
    </Box>
  );
};
