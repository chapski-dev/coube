import React, { useState } from 'react';

import { ScreenProps } from '@src/navigation/types';
import { useAppTheme } from '@src/theme/theme';
import { useLocalization } from '@src/translations/i18n';
import { Box, Input, Text } from '@src/ui';

import { setSearchingRegionRef } from './SearchForOrdersScreen/SearchForNewOrderScreen';

export enum RegionsValue {
  wholeKazakstan = 'whole-kazakstan',
  astana = 'astana',
  almaty = 'almaty',
  shimkent = 'shimkent',
  almatynskayaOblast = 'almatynskaya-oblast',
  akmolinskayaOblast = 'akmolinskaya-oblast',
}

const REGIONS = [
  {
    point: {
      lat: 51.143964,
      lon: 71.435819
    },
    title: 'whole-kazakstan',
    value: RegionsValue.wholeKazakstan
  },
  {
    point: {
      lat: 51.128201,
      lon: 71.430429
    },
    title: 'astana',
    value: RegionsValue.astana,
  },
  {
    point: {
      lat: 43.273564,
      lon: 76.914860
    },
    title: 'almaty',
    value: RegionsValue.almaty,
  },
  {
    point: {
      lat: 42.368009,
      lon: 69.612769
    },
    title: 'shimkent',
    value: RegionsValue.shimkent,
  },
  {
    point: {
      lat: 43.854849,
      lon:  77.061581
    },
    title: 'almatynskaya-oblast',
    value: RegionsValue.almatynskayaOblast,
  },
  {
    point: {
      lat: 53.285152,
      lon:  69.375533
    },
    title: 'akmolinskaya-oblast',
    value: RegionsValue.akmolinskayaOblast,
  },
];

export const FromWhereScreen = ({ navigation }: ScreenProps<'from-where'>) => {
  const { colors } = useAppTheme();
  const { t } = useLocalization();

  const [inputValue, setInputValue] = useState('');

  const handlePick = (value: RegionsValue) => {
    setSearchingRegionRef && setSearchingRegionRef(value)
    navigation.goBack()
  }
  
  return (
    <Box p={15}>
      <Input
        placeholder={t('city')}
        type="search"
        value={inputValue}
        onChangeText={setInputValue}
        color={colors.grey}
      />
      {REGIONS.map((el) => (
        <Box
          key={el.value}
          onPress={() => handlePick(el)}
          h={36}
          justifyContent="center"
        >
          <Text children={t(el.title)} />
        </Box>
      ))}
    </Box>
  );
};
