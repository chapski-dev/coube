import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { FinanceScreen } from '@src/screens/FinanceScreen';
import { MyOrdersScreen } from '@src/screens/MyOrdersScreen';
import { MyVehicleScreen } from '@src/screens/MyVehicleScreen/MyVehicleScreen';
import { NotificationScreen } from '@src/screens/NotificationScreen';
import { ProfileScreen } from '@src/screens/ProfileScreen';
import { useAppTheme } from '@src/theme/theme';

import FinanceIcon from '../../assets/svg/finance.svg';
import NotificationIcon from '../../assets/svg/notification.svg';
import OrderIcon from '../../assets/svg/orders.svg';
import ProfileIcon from '../../assets/svg/profile-outline.svg';
import TransportIcon from '../../assets/svg/transport.svg';

import { TabsParamList } from './types';

const Tab = createBottomTabNavigator<TabsParamList>();

export const Tabs = () => {
  const { colors } = useAppTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.main,
        tabBarInactiveTintColor: colors.text,
        tabBarLabelStyle: { color: 'black' },
      }}
    >
      <Tab.Screen
        name="orders"
        component={MyOrdersScreen}
        options={{
          headerTitleAlign: 'center',
          tabBarIcon: ({ color }) => <OrderIcon color={color} />,
          title: 'Мои заказы',
        }}
      />
      <Tab.Screen
        name="transport"
        component={MyVehicleScreen}
        options={{
          headerTitleAlign: 'center',
          tabBarIcon: ({ color }) => <TransportIcon color={color} />,
          title: 'Мои ТС',
        }}
      />
      <Tab.Screen
        name="finance"
        component={FinanceScreen}
        options={{
          headerTitleAlign: 'center',
          tabBarIcon: ({ color }) => <FinanceIcon color={color} />,
          title: 'Финансы',
        }}
      />
      <Tab.Screen
        name="notifications"
        component={NotificationScreen}
        options={{
          headerTitleAlign: 'center',
          tabBarIcon: ({ color }) => <NotificationIcon color={color} />,
          title: 'Уведомление',
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          headerTitleAlign: 'center',
          tabBarIcon: ({ color }) => <ProfileIcon color={color} />,
          tabBarLabel: 'Профиль',
          title: 'Профиль',
        }}
      />
    </Tab.Navigator>
  );
};
