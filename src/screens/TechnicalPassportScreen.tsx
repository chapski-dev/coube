import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@src/navigation/types';
import { Box } from '@src/ui';
import React from 'react';
import TechicalPassport from '@assets/PhotoTechnicalPassport.svg';

type Props = NativeStackScreenProps<RootStackParamList, 'TechnicalPassport'>;

export const TechnicalPassportScreen = () => {
  return (
    <Box alignItems="center">
      <TechicalPassport />
    </Box>
  );
};
