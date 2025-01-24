import React from 'react';
import { useNavigation } from '@react-navigation/native';
import RightArrow from '@assets/svg/arrow-right.svg';
import { Text } from './Text';
import { Box } from './Box';
import { useAppTheme } from '@src/theme/theme';
import { Image } from 'react-native';

export const TransportCard = () => {
  const navigation = useNavigation();
  const carModel = 'FAW J7';
  const { colors } = useAppTheme();
  return (
    <Box>
      <Box row gap={16} py={16} px={16}>
        <Box h={150} borderRadius={12} overflow="hidden">
          <Image source={require('@assets/png/car.png')}  />
        </Box>
        <Box>
          <Text type="h3" children={carModel} />
          <Box my={8}>
            <Text type="label" children="Гос. номер:" />
            <Text fontWeight={500} children="123 BOK 02" />
          </Box>
          <Box my={8}>
            <Text type="label" children="Грузоподъемность:" />
            <Text fontWeight={500} children={'15.5 т'} />
          </Box>
          <Box my={8}>
            <Text type="label" children="Цвет авто:" />
            <Text fontWeight={500} children="Белый" />
          </Box>
          <Box my={8}>
            <Text type="label" children="Модель полуприцепа:" />
            <Text fontWeight={500} children="Krone" />
          </Box>
          <Box my={8}>
            <Text type="label" children=" Госномер полуприцепа:" />
            <Text fontWeight={500} children="123 BOK 02" />
          </Box>
        </Box>
      </Box>
      <Box
        p={17}
        alignItems="center"
        justifyContent="center"
        borderColor={colors.border}
        gap={16}
        row
        style={{ borderBottomWidth: 1, borderTopWidth: 1, }}
        onPress={() => navigation.navigate('documents', { carModel })}
      >
        <Text fontWeight={500} children="Документы" />
        <RightArrow />
      </Box>
    </Box>
  );
};
