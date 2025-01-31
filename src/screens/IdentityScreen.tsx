import React from 'react'
import { Image } from 'react-native';

import { useAppTheme } from '@src/theme/theme';
import { useLocalization } from '@src/translations/i18n';
import { Box } from '@src/ui';
import { Text } from '@src/ui/Text';

export const IdentityScreen = () => {
  const { t } = useLocalization()
  const { colors } = useAppTheme()

  return (
    <Box>

      <Box px={20} py={10} borderColor={colors.grey} style={{ borderBottomWidth: 1 }}>
        <Text type='label' children={t('full_name')} />
        <Text type='body_500' children='СЕРГЕЙ КРЫЛОВ ДМИТРИЕВИЧ' />
      </Box>

      <Box px={20} py={10} borderColor={colors.grey} style={{ borderBottomWidth: 1 }}>
        <Text type='label' children={t('iin')} />
        <Text type='body_500' children='88121155548946' />
      </Box>

      <Box px={20}
        py={10}
        gap={25}
        row
        borderColor={colors.grey}
        style={{ borderBottomWidth: 1 }}>
        <Box>
          <Text type='label' children={t('date_of_issue')} />
          <Text type='body_500' children='12.08.2014' />
        </Box>
        <Box>
          <Text type='label' children={t('validity_period')} />
          <Text type='body_500' children='12.08.2034' />
        </Box>
      </Box>

      <Box px={20} py={10} borderColor={colors.grey} style={{ borderBottomWidth: 1 }}>
        <Text type='label' children={t('issued')} />
        <Text type='body_500' children='МИНИСТЕРСТВО ЮСТИЦИИ' />
      </Box>

      <Box pt={20} alignItems='center' >
        <Image source={require('@assets/png/identity-card-picture.png')} />
      </Box>

    </Box>
  );
};