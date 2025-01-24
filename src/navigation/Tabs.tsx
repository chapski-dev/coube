import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabsParamList } from './types';
import { MyOrdersScreen } from '@src/screens/MyOrdersScreen';
import { MyVehicleScreen } from '@src/screens/MyVehicleScreen';
import { FinanceScreen } from '@src/screens/FinanceScreen';
import { NotificationScreen } from '@src/screens/NotificationScreen';
import { ProfileScreen } from '@src/screens/ProfileScreen';
import OrderIcon from '../../assets/icon/orders.svg';
import NotificationIcon from '../../assets/icon/notification.svg';
import TransportIcon from '../../assets/icon/transport.svg';
import FinanceIcon from '../../assets/icon/finance.svg';
import ProfileIcon from '../../assets/icon/profile.svg';
import { useAppTheme } from '@src/theme/theme';

const Tab = createBottomTabNavigator<TabsParamList>();

export const Tabs = () => {
  const { colors } = useAppTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.main,
        tabBarInactiveTintColor: '#494D4E',
        tabBarLabelStyle: {
          color: 'black',
        },
      }}
    >
      <Tab.Screen
        name="orders"
        component={MyOrdersScreen}
        options={{
          tabBarIcon: ({ color }) => <OrderIcon color={color} />,
          title: 'Мои заказы',
          headerTitleAlign: 'center',
        }}
      />
      <Tab.Screen
        name="transport"
        component={MyVehicleScreen}
        options={{
          tabBarIcon: ({ color }) => <TransportIcon color={color} />,
          title: 'Мои ТС',
          headerTitleAlign: 'center',
        }}
      />
      <Tab.Screen
        name="finance"
        component={FinanceScreen}
        options={{
          tabBarIcon: ({ color }) => <FinanceIcon color={color} />,
          title: 'Финансы',
          headerTitleAlign: 'center',
        }}
      />
      <Tab.Screen
        name="notifications"
        component={NotificationScreen}
        options={{
          tabBarIcon: ({ color }) => <NotificationIcon color={color} />,
          title: 'Уведомление',
          headerTitleAlign: 'center',
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => <ProfileIcon color={color} />,
          tabBarLabel: 'Профиль',
          title: 'Профиль',
          headerTitleAlign: 'center',
        }}
      />
    </Tab.Navigator>
  );
};
