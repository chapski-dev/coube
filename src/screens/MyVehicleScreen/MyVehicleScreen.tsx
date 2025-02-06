import React, { useState } from 'react';
import { RefreshControl, ScrollView } from 'react-native';

import { wait } from '@src/utils';

import { TransportCard } from './components/TransportCard';

export const MyVehicleScreen = () => {
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
    <ScrollView 
    contentContainerStyle={{ gap: 16 }}
    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <TransportCard />
      <TransportCard />
      <TransportCard />
    </ScrollView>
  );
};
