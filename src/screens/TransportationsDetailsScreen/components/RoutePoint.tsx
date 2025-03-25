import React, { FC } from 'react';

import { CargoLoadings } from '@src/api/types';
import { useAppTheme } from '@src/theme/theme';
import { useLocalization } from '@src/translations/i18n';
import { Box, Text } from '@src/ui';
import { dateFormat } from '@src/utils/date-format';

export const RoutePoint: FC<CargoLoadings> = (data) => {
  const { t } = useLocalization();
  const { colors } = useAppTheme();
  return (
    <Box pb={15} gap={8}>
      <Box gap={2}>
        <Text
          color={colors.textSecondary}
          children={`${t('point')}`}
        />
        <Text type="body_500" children={data.address} />
      </Box>

      <Box gap={2}>
        <Text
          color={colors.textSecondary}
          children={t('date-and-place-of-unloading')}
        />
        <Text type="body_500" children={dateFormat('DD.MM.yyyy, HH:mm',data.loadingDateTime)} />
      </Box>

      <Box row gap={25}>
        <Box gap={2}>
          <Text color={colors.textSecondary} children={t('cargo-weight')} />
          <Text type="body_500" children={`${data.weight} ${data.weightUnit.nameRu}`} />
        </Box>
        <Box gap={2}>
          <Text color={colors.textSecondary} children={t('cargo-volume')} />
          <Text type="body_500" children={data.volume} />
        </Box>
      </Box>

      <Box gap={2}>
        <Text color={colors.textSecondary} children={t('loading-method')} />
        <Text type="body_500" children={data.loadingMethod.nameRu} />
      </Box>
    </Box>
  );
};
