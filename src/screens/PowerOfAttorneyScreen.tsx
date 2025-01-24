import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@src/navigation/types';
import { useLocalization } from '@src/translations/i18n';
import { Box, Text } from '@src/ui';
import React from 'react';

type Props = NativeStackScreenProps<RootStackParamList, 'power-of-attorney'>;

export const PowerOfAttorneyScreen = (props: Props) => {
  const { t } = useLocalization()
  
  return (
    <Box>
      <Text children={t('power_of_attorney')} />
    </Box>
  );
};
