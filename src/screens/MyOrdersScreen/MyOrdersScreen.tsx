import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  RefreshControl,
} from 'react-native';
import ArrowIcon from '@assets/svg/arrow-right.svg';
import SearchIcon from '@assets/svg/search.svg';
import SheetIcon from '@assets/svg/sheet.svg';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { EventBusEvents } from '@src/events';
import { ScreenProps } from '@src/navigation/types';
import ordersService from '@src/service/orders';
import { ITransportationOrderData } from '@src/service/transportation-service';
import { useAppTheme } from '@src/theme/theme';
import { useLocalization } from '@src/translations/i18n';
import { Box, Text } from '@src/ui';
import { wait } from '@src/utils';

import { CompletedOrderCard } from './components/CompletedOrderCard';
import { Order } from './components/Order';

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
        options={() => ({ lazy: true, title: 'Активные' })}
      />
      <Tabs.Screen
        name="сomplited"
        component={Complited}
        options={{ lazy: true, title: 'Завершенные' }}
      />
    </Tabs.Navigator>
  );
};

const Active = ({ navigation }: ScreenProps<'orders'>) => {
  const { t } = useLocalization();
  const { colors, insets } = useAppTheme();
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    ordersService.refresh();
    try {
      setRefreshing(true);
      await wait(1000);
    } finally {
      setRefreshing(false);
    }
  };

  const [orders, setOrders] = useState(ordersService.orders);

  useEffect(() => {
    return ordersService.subscribe<ITransportationOrderData[]>(
      EventBusEvents.getOrders,
      ({ payload }) => {
        payload && setOrders(payload);
      }
    ).unsubscribe;
  }, []);

  const [searchOrderLoading, setSearchOrderLoading] = useState(false);
  const openSearchForNewOrder = async () => {
    setSearchOrderLoading(true);
    await wait(200);
    navigation.push('search-for-new-order');
    setSearchOrderLoading(false);
  };

  return (
    <FlatList
      ListHeaderComponent={() => (
        <Box
          row
          justifyContent="space-between"
          px={10}
          h={50}
          alignItems="center"
          backgroundColor={colors.white}
          onPress={openSearchForNewOrder}
          activeOpacity={0.9}
          disabled={searchOrderLoading}
        >
          <Box row gap={10} alignItems="center">
            <SearchIcon />
            <Text type="body_500" children={t('new-orders-search')} />
          </Box>

          {searchOrderLoading ? <ActivityIndicator /> : <ArrowIcon />}
        </Box>
      )}
      contentContainerStyle={{ gap: 16, paddingBottom: insets.bottom }}
      stickyHeaderIndices={[0]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListEmptyComponent={
        <Box justifyContent="center" gap={16} alignItems="center">
          <SheetIcon color={colors.disabled} width={40} height={40} />
          <Box maxWidth={183}>
            <Text center children="На данный момент активных заказов нет!" />
          </Box>
        </Box>
      }
      renderItem={({ item }) => <Order {...item} />}
      data={orders}
      stickyHeaderHiddenOnScroll={false}
    />
  );
};

const Complited = ({ navigation }: ScreenProps<'orders'>) => {
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
      contentContainerStyle={{ gap: 16 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      renderItem={() => <CompletedOrderCard />}
      data={Array.from({ length: 5 })}
    />
  );
};
