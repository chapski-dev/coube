import React, { FC, useMemo } from 'react';

import { TransportationStatusEnum } from '@src/api/types';
import { useAppTheme } from '@src/theme/theme';
import { useLocalization } from '@src/translations/i18n';
import { Box, Text } from '@src/ui';

interface PropsType {
  status: TransportationStatusEnum;
}

export const OrderStatusLabel: FC<PropsType> = ({ status }) => {
  const { colors } = useAppTheme();
  const { t } = useLocalization();
  const colorStatus = useMemo(() => {
     switch (status) {
      case TransportationStatusEnum.WAITING_DRIVER_CONFIRMATION:
         return colors.green;
      case TransportationStatusEnum.DRIVER_ACCEPTED:
      case TransportationStatusEnum.ON_THE_WAY:
        return colors.blue;
      default:
        return colors.disabled
     }

  }, [colors.blue, colors.disabled, colors.green, status]);

  const statusToLocalizationKey: Partial<Record<TransportationStatusEnum, string>> = {
    [TransportationStatusEnum.WAITING_DRIVER_CONFIRMATION]:
      'order_status.waiting_driver_confirmation',
    [TransportationStatusEnum.DRIVER_ACCEPTED]: 'order_status.driver_accepted',
    [TransportationStatusEnum.ON_THE_WAY]: 'order_status.on_the_way',
    [TransportationStatusEnum.FINISHED]: 'order_status.finished',
  };

  return (
    <Box backgroundColor={colorStatus} py={4} px={8} borderRadius={8}>
      <Text color="white" children={t(statusToLocalizationKey[status])} />
    </Box>
  );
};
