import React, { useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';

import { useAppTheme } from '@src/theme/theme';
import { wait } from '@src/utils';

import { TransportCard } from './components/TransportCard';

export const MyVehicleScreen = () => {
  const { insets } = useAppTheme();

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await wait(1000);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <FlatList
      contentContainerStyle={{ gap: 15, paddingBottom: insets.bottom || 15 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      data={Array.from({ length: 3 })}
      renderItem={() => <TransportCard />}
    />
  );
};
