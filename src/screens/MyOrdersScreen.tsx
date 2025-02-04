import React, { useState } from 'react';
import { Dimensions, RefreshControl, ScrollView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import SosModal from '@src/components/SosModal';
import SwipeButton from '@src/components/SwipeButton';
import { useAppTheme } from '@src/theme/theme';
import { useLocalization } from '@src/translations/i18n';
import { modal } from '@src/ui/Layouts/ModalLayout';
import { wait } from '@src/utils';

const Tabs = createMaterialTopTabNavigator();

export const MyOrdersScreen = () => {
  const { colors } = useAppTheme();

  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarAllowFontScaling: true,
        tabBarIndicatorStyle: { backgroundColor: colors.main },
        tabBarLabelStyle: { fontWeight: '500' },
      }}
      initialLayout={{ width: Dimensions.get('window').width }}
    >
      <Tabs.Screen
        name="active"
        component={Active}
        options={() => ({ title: 'Активные' })}
      />
      <Tabs.Screen
        name="сomplited"
        component={Complited}
        options={{ title: 'Завершенные' }}
      />
    </Tabs.Navigator >
  );
};

const Active = () => {
  const { t } = useLocalization();
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await wait(1000);
    } finally {
      setRefreshing(false);
    }
  };

  const [loading, setLoading] = useState(false);

  const openModal = () => {
    const Element = <SosModal />;

    modal().setupModal?.({
      element: Element,
      justifyContent: 'center',
      marginHorizontal: 10,
    });
  };

  const onSwipe = async () => {
    setLoading(true);
    await wait(1000);
    setLoading(false);
    openModal();
  };

  return (
    <ScrollView
      contentContainerStyle={{ gap: 16, padding: 16 }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <SwipeButton onSwipe={onSwipe} loading={loading} />
      <SwipeButton onSwipe={onSwipe} loading={loading} />
      <SwipeButton onSwipe={onSwipe} loading={loading} />
      <SwipeButton onSwipe={onSwipe} loading={loading} />
      <SwipeButton onSwipe={onSwipe} loading={loading} />
      <SwipeButton onSwipe={onSwipe} loading={loading} />
      <SwipeButton onSwipe={onSwipe} loading={loading} />
      <SwipeButton onSwipe={onSwipe} loading={loading} />
      <SwipeButton onSwipe={onSwipe} loading={loading} />
      <SwipeButton onSwipe={onSwipe} loading={loading} />
      <SwipeButton onSwipe={onSwipe} loading={loading} />
      <SwipeButton onSwipe={onSwipe} loading={loading} />
      <SwipeButton onSwipe={onSwipe} loading={loading} />
      <SwipeButton onSwipe={onSwipe} loading={loading} />
      <SwipeButton onSwipe={onSwipe} loading={loading} />
      <SwipeButton onSwipe={onSwipe} loading={loading} />
      <SwipeButton onSwipe={onSwipe} loading={loading} />
      <SwipeButton onSwipe={onSwipe} loading={loading} />
      <SwipeButton onSwipe={onSwipe} loading={loading} />
      <SwipeButton onSwipe={onSwipe} loading={loading} />
      <SwipeButton onSwipe={onSwipe} loading={loading} />
      <SwipeButton onSwipe={onSwipe} loading={loading} />
      <SwipeButton onSwipe={onSwipe} loading={loading} />
      <SwipeButton onSwipe={onSwipe} loading={loading} />
      <SwipeButton onSwipe={onSwipe} loading={loading} />
      <SwipeButton onSwipe={onSwipe} loading={loading} />
      <SwipeButton onSwipe={onSwipe} loading={loading} />
      <SwipeButton onSwipe={onSwipe} loading={loading} />
      <SwipeButton onSwipe={onSwipe} loading={loading} />
      <SwipeButton onSwipe={onSwipe} loading={loading} />
      <SwipeButton onSwipe={onSwipe} loading={loading} />
      <SwipeButton onSwipe={onSwipe} loading={loading} />
      <SwipeButton onSwipe={onSwipe} loading={loading} />
      <SwipeButton onSwipe={onSwipe} loading={loading} />
      <SwipeButton onSwipe={onSwipe} loading={loading} />
      <SwipeButton onSwipe={onSwipe} loading={loading} />
    </ScrollView>
  )
}
const Complited = () => {
  const { t } = useLocalization();
  const [loading, setLoading] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await wait(1000);
    } finally {
      setRefreshing(false);
    }
  };

  const openModal = () => {
    const Element = <SosModal />;

    modal().setupModal?.({
      element: Element,
      justifyContent: 'center',
      marginHorizontal: 10,
    });
  };

  const onSwipe = async () => {
    setLoading(true);
    await wait(1000);
    setLoading(false);
    openModal();
  };

  return (
    <ScrollView
      contentContainerStyle={{ gap: 16, padding: 16 }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <SwipeButton onSwipe={onSwipe} loading={loading} />
      <SwipeButton onSwipe={onSwipe} loading={loading} />
      <SwipeButton onSwipe={onSwipe} loading={loading} />
      <SwipeButton onSwipe={onSwipe} loading={loading} />
      <SwipeButton onSwipe={onSwipe} loading={loading} />
      <SwipeButton onSwipe={onSwipe} loading={loading} />
      <SwipeButton onSwipe={onSwipe} loading={loading} />
      <SwipeButton onSwipe={onSwipe} loading={loading} />
      <SwipeButton onSwipe={onSwipe} loading={loading} />
      <SwipeButton onSwipe={onSwipe} loading={loading} />
      <SwipeButton onSwipe={onSwipe} loading={loading} />
      <SwipeButton onSwipe={onSwipe} loading={loading} />
      <SwipeButton onSwipe={onSwipe} loading={loading} />
      <SwipeButton onSwipe={onSwipe} loading={loading} />
      <SwipeButton onSwipe={onSwipe} loading={loading} />
      <SwipeButton onSwipe={onSwipe} loading={loading} />
      <SwipeButton onSwipe={onSwipe} loading={loading} />
      <SwipeButton onSwipe={onSwipe} loading={loading} />
      <SwipeButton onSwipe={onSwipe} loading={loading} />
      <SwipeButton onSwipe={onSwipe} loading={loading} />
      <SwipeButton onSwipe={onSwipe} loading={loading} />
      <SwipeButton onSwipe={onSwipe} loading={loading} />
      <SwipeButton onSwipe={onSwipe} loading={loading} />
      <SwipeButton onSwipe={onSwipe} loading={loading} />
      <SwipeButton onSwipe={onSwipe} loading={loading} />
      <SwipeButton onSwipe={onSwipe} loading={loading} />
      <SwipeButton onSwipe={onSwipe} loading={loading} />
      <SwipeButton onSwipe={onSwipe} loading={loading} />
      <SwipeButton onSwipe={onSwipe} loading={loading} />
      <SwipeButton onSwipe={onSwipe} loading={loading} />
      <SwipeButton onSwipe={onSwipe} loading={loading} />
      <SwipeButton onSwipe={onSwipe} loading={loading} />
      <SwipeButton onSwipe={onSwipe} loading={loading} />
      <SwipeButton onSwipe={onSwipe} loading={loading} />
      <SwipeButton onSwipe={onSwipe} loading={loading} />
      <SwipeButton onSwipe={onSwipe} loading={loading} />
    </ScrollView>
  )
}
