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
    title: 'whole-kazakstan',
    value: RegionsValue.wholeKazakstan,
  },
  {
    title: 'astana',
    value: RegionsValue.astana,
  },
  {
    title: 'almaty',
    value: RegionsValue.almaty,
  },
  {
    title: 'shimkent',
    value: RegionsValue.shimkent,
  },
  {
    title: 'almatynskaya-oblast',
    value: RegionsValue.almatynskayaOblast,
  },
  {
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
          onPress={() => handlePick(el.value)}
          h={36}
          justifyContent="center"
        >
          <Text children={t(el.title)} />
        </Box>
      ))}
    </Box>
  );
};
