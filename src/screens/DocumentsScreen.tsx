import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@src/navigation/types';
import { Box, Text } from '@src/ui';
import { TouchableOpacity } from 'react-native';
import RightArrow from '../../assets/icon/rightArrow.svg';

type Props = NativeStackScreenProps<RootStackParamList, 'Documents'>;

export const DocumentsScreen = ({ route, navigation }: Props) => {
  const navigations = useNavigation();
  const { carModel } = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: carModel,
    });
  }, [navigation, carModel]);

  return (
    <Box>
      <Text
        type="h3"
        color="#494D4E"
        style={{ paddingHorizontal: 16, paddingVertical: 16 }}
      >
        {carModel}
      </Text>
      <TouchableOpacity
        style={{
          paddingVertical: 17,
          paddingHorizontal: 16,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        onPress={() => navigations.navigate('TechnicalPassport')}
      >
        <Text type="label" color="#494D4E" fontWeight={500}>
          Техпаспорт ТС
        </Text>
        <RightArrow />
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          paddingVertical: 17,
          paddingHorizontal: 16,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        onPress={() => navigations.navigate('PowerOfAttorney')}
      >
        <Text type="label" color="#494D4E" fontWeight={500}>
          Доверенность на ТС
        </Text>
        <RightArrow />
      </TouchableOpacity>
    </Box>
  );
};
