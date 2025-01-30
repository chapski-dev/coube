import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { IdentityScreen } from '@src/screens/IdentityScreen';
import { PowerOfAttorneyScreen } from '@src/screens/PowerOfAttorneyScreen';
import { ProfileDataScreen } from '@src/screens/ProfileDataScreen';
import { TechnicalPassportScreen } from '@src/screens/TechnicalPassportScreen';
import { useAppTheme } from '@src/theme/theme';

import { DocumentsScreen } from '../../screens/DocumentsScreen';
import { Tabs } from '../Tabs';
import { RootStackParamList } from '../types';
import { ScreenInvoiceForGoods } from '@src/screens/ScreenInvoiceForGoods';
import { InvoiceSentScreen } from '@src/screens/InvoiceSentScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStack = () => {
  const { colors } = useAppTheme();
  return (
    <Stack.Navigator
      initialRouteName="tabs"
      screenOptions={{
        headerTintColor: colors.main,
        headerTitleStyle: { color: colors.text },
        title: '',
      }}
    >
      <Stack.Screen
        name="tabs"
        component={Tabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="documents"
        component={DocumentsScreen}
        options={({ route }) => ({ headerTitle: route.params.carModel })}
      />
      <Stack.Screen
        name="technical-passport"
        component={TechnicalPassportScreen}
        options={{ headerTitle: 'Техпаспорт' }}
      />
      <Stack.Screen
        name="power-of-attorney"
        component={PowerOfAttorneyScreen}
        options={{ headerTitle: 'Доверенность' }}
      />
      <Stack.Screen
        name="invoice-for-goods"
        component={ScreenInvoiceForGoods}
        options={{
          headerTitle: 'Накладная на товар',
        }}
      />
      <Stack.Screen
        name="invoice-sent"
        component={InvoiceSentScreen}
        options={{
          headerTitle: 'Накладная на товар',
        }}
      />
      <Stack.Screen
        options={{ headerTitle: 'Данные профиля' }}
        name="profile-data"
        component={ProfileDataScreen}
      />
      <Stack.Screen
        options={{ headerTitle: 'Удостоверение личности' }}
        name="identity"
        component={IdentityScreen}
      />
    </Stack.Navigator>
  );
};
