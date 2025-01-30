import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabsParamList } from './types';
import { MyVehicleScreen } from '@src/screens/MyVehicleScreen/MyVehicleScreen';
import { FinanceScreen } from '@src/screens/FinanceScreen';
import { NotificationScreen } from '@src/screens/NotificationScreen';
import { ProfileScreen } from '@src/screens/ProfileScreen';
import OrderIcon from '../../assets/svg/orders.svg';
import NotificationIcon from '../../assets/svg/notification.svg';
import TransportIcon from '../../assets/svg/transport.svg';
import FinanceIcon from '../../assets/svg/finance.svg';
import ProfileIcon from '../../assets/svg/profile-outline.svg';
import { useAppTheme } from '@src/theme/theme';
import { MyOrdersScreen } from '@src/screens/MyOrdersScreen/MyOrdersScreen';
import { useLocalization } from '@src/translations/i18n';

const Tab = createBottomTabNavigator<TabsParamList>();

export const Tabs = () => {
  const { t } = useLocalization()
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
          tabBarIcon: ({ color }) => <OrderIcon color={color} />,
          title: t('my-orders'),
          headerTitleAlign: 'center',
        }}
      />
      <Tab.Screen
        name="transport"
        component={MyVehicleScreen}
        options={{
          tabBarIcon: ({ color }) => <TransportIcon color={color} />,
          title: t('my-vehicles'),
          headerTitleAlign: 'center',
        }}
      />
      <Tab.Screen
        name="finance"
        component={FinanceScreen}
        options={{
          tabBarIcon: ({ color }) => <FinanceIcon color={color} />,
          title: t('finances'),
          headerTitleAlign: 'center',
        }}
      />
      <Tab.Screen
        name="notifications"
        component={NotificationScreen}
        options={{
          tabBarIcon: ({ color }) => <NotificationIcon color={color} />,
          title: t('notification'),
          headerTitleAlign: 'center',
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => <ProfileIcon color={color} />,
          tabBarLabel: t('profile'),
          title: t('profile'),
          headerTitleAlign: 'center',
        }}
      />
    </Tab.Navigator>
  );
};
