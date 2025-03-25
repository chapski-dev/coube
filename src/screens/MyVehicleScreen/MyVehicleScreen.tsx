import React, { useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import EmptyBox from '@assets/svg/empty-box.svg';

import { useAppTheme } from '@src/theme/theme';
import { useLocalization } from '@src/translations/i18n';
import { Box, Text } from '@src/ui';
import { wait } from '@src/utils';

import { TransportCard } from './components/TransportCard';

export const MyVehicleScreen = () => {
  const { insets, colors } = useAppTheme();

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await wait(1000);
    } finally {
      setRefreshing(false);
    }
  };
  const { t } = useLocalization();

  return (
    <FlatList
      contentContainerStyle={{ flexGrow: 1, gap: 15, paddingBottom: insets.bottom || 15 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      data={[]}
      renderItem={() => <TransportCard />}
      ListEmptyComponent={
        <Box pt={20} flex={1} justifyContent="center" gap={10} alignItems="center">
          <EmptyBox color={colors.disabled} width={50} height={50} />
          <Box maxWidth={183}>
            <Text
              center
              children={t('the_list_of_vehicles_is_empty')}
            />
          </Box>
        </Box>
      }
    />
  );
};
