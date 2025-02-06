import { useState } from 'react';

import { ScreenProps } from '@src/navigation/types';
import { useAppTheme } from '@src/theme/theme';
import { useLocalization } from '@src/translations/i18n';
import { Box, Input, Text } from '@src/ui';

export const FromWhereScreen = ({ navigation }: ScreenProps<'from-where'>) => {
  const { colors } = useAppTheme();
  const { t } = useLocalization();

  const [inputValue, setInputValue] = useState('');

  return (
    <Box p={15}>
      <Input
        placeholder={t('city')}
        type="search"
        value={inputValue}
        onChangeText={setInputValue}
        color={colors.grey}
      />
      <Box onPress={() => null} h={36} justifyContent='center' >
        <Text children={t('whole-kazakstan')} />
      </Box>
      <Box onPress={() => null} h={36} justifyContent='center'>
        <Text children={t('astana')} />
      </Box>
      <Box onPress={() => null} h={36} justifyContent='center'>
        <Text children={t('almaty')} />
      </Box>
      <Box onPress={() => null} h={36} justifyContent='center'>
        <Text children={t('shimkent')} />
      </Box>
      <Box onPress={() => null} h={36} justifyContent='center'>
        <Text children={t('almatynskaya-oblast')} />
      </Box>
      <Box onPress={() => null} h={36} justifyContent='center'>
        <Text children={t('akmolinskaya-oblast')} />
      </Box>
    </Box>
  );
};
