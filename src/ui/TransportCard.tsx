import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PhotoCar from '../../assets/photoCar.svg';
import RightArrow from '../../assets/icon/rightArrow.svg';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@src/navigation/types';
import { Text } from './Text';
import { Box } from './Box';

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Documents'
>;

export const TransportCard = () => {
  const navigation = useNavigation();
  const carModel = 'FAW J7';

  return (
    <Box>
      <Box row gap={16} py={16} px={16}>
        <Box h={150} borderRadius={12} overflow="hidden">
          <PhotoCar />
        </Box>
        <Box>
          <Text type="h3" color="#494D4E">
            {carModel}
          </Text>
          <Box my={8}>
            <Text type="label" color="#494D4E">
              Гос. номер:
            </Text>
            <Text type="body" fontWeight={500} color="#494D4E">
              123 BOK 02
            </Text>
          </Box>
          <Box my={8}>
            <Text type="label" color="#494D4E">
              Грузоподъемность:
            </Text>
            <Text type="body" fontWeight={500} color="#494D4E">
              15.5 т
            </Text>
          </Box>
          <Box my={8}>
            <Text type="label" color="#494D4E">
              Цвет авто:
            </Text>
            <Text type="body" fontWeight={500} color="#494D4E">
              Белый
            </Text>
          </Box>
          <Box my={8}>
            <Text type="label" color="#494D4E">
              Модель полуприцепа:
            </Text>
            <Text type="body" fontWeight={500} color="#494D4E">
              Krone
            </Text>
          </Box>
          <Box my={8}>
            <Text type="label" color="#494D4E">
              Госномер полуприцепа:
            </Text>
            <Text type="body" fontWeight={500} color="#494D4E">
              123 BOK 02
            </Text>
          </Box>
        </Box>
      </Box>
      <TouchableOpacity
        style={{
          borderBottomWidth: 1,
          borderTopWidth: 1,
          paddingVertical: 17,
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
          borderColor: '#EDEDED',
          flexDirection: 'row',
        }}
        onPress={() => navigation.navigate('Documents', { carModel })}
      >
        <Text type="label" color="#494D4E" fontWeight={500}>
          Документы
        </Text>
        <RightArrow />
      </TouchableOpacity>
    </Box>
  );
};
