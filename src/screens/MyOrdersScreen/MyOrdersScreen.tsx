import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, RefreshControl } from 'react-native';
import ArrowIcon from '@assets/svg/arrow-right.svg';
import SearchIcon from '@assets/svg/search.svg';
import SheetIcon from '@assets/svg/sheet.svg';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { EventBusEvents } from '@src/events';
import { orderDetails } from '@src/mocks/order-details';
import { ScreenProps } from '@src/navigation/types';
import ordersService, { SectionData } from '@src/service/orders';
import { useAppTheme } from '@src/theme/theme';
import { useLocalization } from '@src/translations/i18n';
import { Box, Text } from '@src/ui';
import { wait } from '@src/utils';

import { TransportationDetailsParams } from '../TransportationsDetailsScreen';

import { Order } from './components/Order';
import { OrderStatusEnum } from './components/OrderStatus';

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

  const [ordersSections, setTransactionSections] = useState(
    ordersService.orderSections,
  );

  useEffect(() => {
    return ordersService.subscribe<SectionData[]>(
      EventBusEvents.getOrderSections,
      ({ payload }) => {
        payload && setTransactionSections(payload);
      },
    ).unsubscribe;
  }, []);

  const openSearchForNewOrder = () => {
    navigation.push('search-for-new-order');
  };
  const openTransportationDetails = (details: TransportationDetailsParams) =>
    navigation.push('transportation-details', details);

  return (
    <Box pb={insets.bottom} flexGrow={1}>
      <Box
        row
        justifyContent="space-between"
        px={10}
        py={20}
        alignItems="center"
        backgroundColor={colors.white}
        onPress={openSearchForNewOrder}
      >
        <Box row gap={10} alignItems="center">
          <SearchIcon />
          <Text type="body_500" children={t('new-orders-search')} />
        </Box>
        <ArrowIcon />
      </Box>
      <FlatList
        contentContainerStyle={{
          gap: 16,
          paddingBottom: insets.bottom + 30,
          paddingTop: 16,
        }}
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
        renderItem={() => (
          <Order
            openTransportationDetails={() =>
              openTransportationDetails(orderDetails)
            }
            orderStatus={OrderStatusEnum.new}
            orderNumber="15-020342"
            distance="884 км"
            cargoName="Медицинское оборудование"
            transportationRoute={orderDetails.transportationRoute}
            transportationPeriod="12.07.2024-30.07.2024"
          />
        )}
        data={Array.from({ length: 5 })}
      />
    </Box>
  );
};

const Complited = ({ navigation }: ScreenProps<'orders'>) => {
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

  const openTransportationDetails = (details: TransportationDetailsParams) => {
    navigation.push('transportation-details', details);
  };

  return (
    <Box>
      <FlatList
        contentContainerStyle={{ gap: 16 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={() => (
          <Order
            openTransportationDetails={() =>
              openTransportationDetails(orderDetails)
            }
            orderStatus={OrderStatusEnum.new}
            orderNumber="15-020342"
            distance="884 км"
            cargoName="Медицинское оборудование"
            transportationRoute={orderDetails.transportationRoute}
            transportationPeriod="12.07.2024-30.07.2024"
          />
        )}
        data={Array.from({ length: 5 })}
      />
    </Box>
  );
};
