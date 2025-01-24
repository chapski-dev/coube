import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@src/navigation/types';
import { Box, Text } from '@src/ui';
import React from 'react';

type Props = NativeStackScreenProps<RootStackParamList, 'power-of-attorney'>;

export const PowerOfAttorneyScreen = (props: Props) => {
  return (
    <Box>
      <Text>PowerOfAttorneyScreen</Text>
    </Box>
  );
};
