import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@src/navigation/types';
import { Box } from '@src/ui';
import React from 'react';
import { Image } from 'react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'technical-passport'>;

export const TechnicalPassportScreen = () => {
  return (
    <Box alignItems="center">
      <Image source={require('@assets/png/tech-pasport.png')}  />
    </Box>
  );
};
