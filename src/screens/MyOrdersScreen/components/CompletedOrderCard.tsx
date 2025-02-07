import { useAppTheme } from '@src/theme/theme';
import { Box, Button, Text } from '@src/ui';
import RightArrowIcon from '@assets/svg/arrow-right.svg';
import React from 'react';

export const CompletedOrderCard = () => {
  const { colors } = useAppTheme();

  return (
    <Box
      p={12}
      borderColor={colors.grey}
      style={{ borderBottomWidth: 1, borderTopWidth: 1 }}
    >
      <Box row justifyContent={'space-between'}>
        <Box row gap={4} alignItems={'center'}>
          <Text children={'№'} />
          <Text type="body_500" fontWeight={700} children={'15-020342'} />
        </Box>
        <Box p={4} backgroundColor={colors.border} borderRadius={8}>
          <Text
            type="body_500"
            color={colors.textSecondary}
            children={'Завершен'}
          />
        </Box>
      </Box>
      <Box gap={12}>
        <Box gap={4}>
          <Text children={'Наименование груза'} />
          <Text type="body_500" children={'Медицинское оборудование'} />
        </Box>
        <Box gap={4}>
          <Text children={'Срок перевозки'} />
          <Text type="body_500" children={'12.07.2024-30.07.2024'} />
        </Box>
        <Button backgroundColor="border">
          <Box row alignItems={'center'} gap={10}>
            <Text
              type="body_500"
              color={colors.dark_grey}
              children={'Детали заказа'}
            />
            <RightArrowIcon />
          </Box>
        </Button>
      </Box>
    </Box>
  );
};
