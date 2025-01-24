import React from 'react';
import { ScreenProps } from '@src/navigation/types';
import { Box, Text } from '@src/ui';
import RightArrow from '@assets/svg/arrow-right.svg';
import { useAppTheme } from '@src/theme/theme';


export const DocumentsScreen = ({ navigation }: ScreenProps<'documents'>) => {
  const { colors } = useAppTheme();
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
        <Text fontWeight={500} children="Техпаспорт ТС" />
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
        <Text fontWeight={500} children="Доверенность на ТС" />
        <RightArrow />
      </Box>
    </Box>
  );
};
