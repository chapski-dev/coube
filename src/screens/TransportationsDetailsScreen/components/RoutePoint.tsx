import React, { FC } from 'react';

import { useAppTheme } from '@src/theme/theme';
import { useLocalization } from '@src/translations/i18n';
import { Box, Text } from '@src/ui';

import { RouteObjectType } from '../TransportationDetailsScreen';

export const RoutePoint: FC<RouteObjectType> = (data) => {
  const { t } = useLocalization();
  const { colors } = useAppTheme();
  return (
    <Box pb={15} gap={8}>
      <Box gap={2}>
        <Text
          color={colors.textSecondary}
          children={`${t('point')} ${t(data.placeType)}`}
        />
        <Text type="body_500" children={data.action_address} />
      </Box>

      <Box gap={2}>
        <Text
          color={colors.textSecondary}
          children={t('date-and-place-of-unloading')}
        />
        <Text type="body_500" children={data.date_and_place_of_operation} />
      </Box>

      <Box row gap={25}>
        <Box gap={2}>
          <Text color={colors.textSecondary} children={t('cargo-weight')} />
          <Text type="body_500" children={data.cargo_weight_gross} />
        </Box>
        <Box gap={2}>
          <Text color={colors.textSecondary} children={t('cargo-volume')} />
          <Text type="body_500" children={data.cargo_volume_gross} />
        </Box>
      </Box>

      <Box gap={2}>
        <Text color={colors.textSecondary} children={t('loading-method')} />
        <Text type="body_500" children={data.loading_method} />
      </Box>
    </Box>
  );
};
