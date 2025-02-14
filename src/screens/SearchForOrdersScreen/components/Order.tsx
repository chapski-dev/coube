import React, { FC } from 'react';
import Circle from '@assets/svg/circle.svg';

import { ITransportationOrderData } from '@src/service/transportation-service';
import { useAppTheme } from '@src/theme/theme';
import { useLocalization } from '@src/translations/i18n';
import { Box, Button, Chip, Text } from '@src/ui';

type OrderPropsTypes = ITransportationOrderData & {
  openTransportationDetails?: () => void;
  rating?: string;
  category: string[]
  company_name: string
  price: string;
};

export const Order: FC<OrderPropsTypes> = ({
  openTransportationDetails,
  company_name,
  rating,
  name_of_cargo,
  category,
  route,
  price
}) => {
  const { t } = useLocalization();
  const { colors } = useAppTheme();

  return (
    <Box backgroundColor={colors.white} p={15} gap={5}>
      <Box row gap={5}>
        <Text type="body_500" children={company_name} />
        <Text type="body_500" color="green" children={rating} />
      </Box>

      <Text type="body_500" children={name_of_cargo} />

      <Box row flexWrap="wrap" gap={8}>
        {category?.map((el) => <Chip key={el} children={el} />)}
      </Box>

      <Box row gap={10} alignItems="center">
        <Circle color="dark_grey" />
        <Text children={route[0].action_address} />
      </Box>

      <Box row gap={10} alignItems="center">
        <Circle color="red" />
        <Text children={route[route.length - 1].action_address} />
      </Box>

      <Text color="black" fontSize={18} fontWeight={900} children={price} mb={12} />

      <Button
        backgroundColor="grey"
        textColor="black"
        children={t('transportation-details')}
        onPress={openTransportationDetails}
      />
    </Box>
  );
};
