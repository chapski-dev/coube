import React from 'react';
import { useNavigation } from '@react-navigation/native';
import RightArrow from '@assets/svg/arrow-right.svg';
import { useAppTheme } from '@src/theme/theme';
import { Image } from 'react-native';
import { Box, Text } from '@src/ui';
import { useLocalization } from '@src/translations/i18n';

export const TransportCard = () => {
  const navigation = useNavigation();
  const carModel = 'FAW J7';
  const { colors } = useAppTheme();

  const { t } = useLocalization()

  return (
    <Box>
      <Box row gap={16} py={16} px={16}>
        <Box h={150} borderRadius={12} overflow="hidden">
          <Image source={require('@assets/png/car.png')} />
        </Box>
        <Box gap={8}>
          <Text type="h3" children={carModel} />
          <Box>
            <Text type="label" children={t('licence-plate')} />
            <Text fontWeight={500} children="123 BOK 02" />
          </Box>
          <Box>
            <Text type="label" children={t('payload')}  />
            <Text fontWeight={500} children={'15.5 т'} />
          </Box>
          <Box>
            <Text type="label" children={t('car-color')} />
            <Text fontWeight={500} children="Белый" />
          </Box>
          <Box>
            <Text type="label" children={t('semi-trailer-model')} />
            <Text fontWeight={500} children="Krone" />
          </Box>
          <Box>
            <Text type="label" children={t('semi-trailer-licence')} />
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
        <Text fontWeight={500} children={t('documents')} />
        <RightArrow />
      </Box>
    </Box>
  );
};
