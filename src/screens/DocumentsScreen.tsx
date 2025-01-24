import React from 'react';
import { ScreenProps } from '@src/navigation/types';
import { Box, Text } from '@src/ui';
import RightArrow from '@assets/svg/arrow-right.svg';
import { useAppTheme } from '@src/theme/theme';
import { useLocalization } from '@src/translations/i18n';


export const DocumentsScreen = ({ navigation }: ScreenProps<'documents'>) => {
  const { colors } = useAppTheme();

  const { t } = useLocalization()

  return (
    <Box pt={16} gap={16}>
      <Box
        p={16}
        alignItems='center'
        row
        justifyContent='space-between'
        onPress={() => navigation.navigate('technical-passport')}
        backgroundColor={colors.white}
      >
        <Text fontWeight={500} children={t('vehicle_registration_certificate')} />
        <RightArrow />
      </Box>

      <Box
        p={16}
        alignItems='center'
        row
        justifyContent='space-between'
        onPress={() => navigation.navigate('power-of-attorney')}
        backgroundColor={colors.white}
      >
        <Text fontWeight={500} children={t('power_of_attorney_for_the_vehicle')} />
        <RightArrow />
      </Box>
    </Box>
  );
};
