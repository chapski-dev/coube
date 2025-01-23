import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@src/navigation/types';
import { Box, Text } from '@src/ui';
import React from 'react';

type Props = NativeStackScreenProps<RootStackParamList, 'PowerOfAttorney'>;

export const PowerOfAttorneyScreen = () => {
  return (
    <Box>
      <Text>PowerOfAttorneyScreen</Text>
    </Box>
  );
};
