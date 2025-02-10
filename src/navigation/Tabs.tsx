import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { FinanceScreen } from '@src/screens/FinanceScreen';
import { MyOrdersScreen } from '@src/screens/MyOrdersScreen/MyOrdersScreen';
import { MyVehicleScreen } from '@src/screens/MyVehicleScreen/MyVehicleScreen';
import { NotificationScreen } from '@src/screens/NotificationScreen';
import { ProfileScreen } from '@src/screens/ProfileScreen';
import { useAppTheme } from '@src/theme/theme';
import { useLocalization } from '@src/translations/i18n';

import FinanceIcon from '../../assets/svg/finance.svg';
import NotificationIcon from '../../assets/svg/notification.svg';
import OrderIcon from '../../assets/svg/orders.svg';
import ProfileIcon from '../../assets/svg/profile-outline.svg';
import TransportIcon from '../../assets/svg/transport.svg';

import { TabsParamList } from './types';
import { CompanyConfigurationScreen } from '@src/screens/CompanyConfigurationScreen';

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
        // component={MyOrdersScreen}
        component={CompanyConfigurationScreen}
        options={{
          tabBarIcon: ({ color }) => <OrderIcon color={color} />,
          title: t('my-orders'),
        }}
      />
      <Tab.Screen
        name="transport"
        component={MyVehicleScreen}
        options={{
          tabBarIcon: ({ color }) => <TransportIcon color={color} />,
          title: t('my-vehicles'),
        }}
      />
      <Tab.Screen
        name="finance"
        component={FinanceScreen}
        options={{
          tabBarIcon: () => <FinanceIcon color={colors.disabled} />,
          tabBarLabelStyle: { color: colors.disabled },
          title: t('finances'),
        }}
        listeners={{ tabPress: (e) => e.preventDefault() }}
      />
      <Tab.Screen
        name="notifications"
        component={NotificationScreen}
        options={{
          tabBarIcon: ({ color }) => <NotificationIcon color={color} />,
          title: t('notification'),
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => <ProfileIcon color={color} />,
          title: t('profile'),
        }}
      />
    </Tab.Navigator>
  );
};
