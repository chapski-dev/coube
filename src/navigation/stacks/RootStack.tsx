import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { CounterOfferScreen } from '@src/screens/CounterOfferScreen';
import { FiltersForOrdersScreen } from '@src/screens/FiltersForOrdersScreen';
import { FromWhereScreen } from '@src/screens/FromWhereScreen';
import { IdentityScreen } from '@src/screens/IdentityScreen';
import { InvoiceSentScreen } from '@src/screens/InvoiceSentScreen';
import { OrderAcceptedScreen } from '@src/screens/OrderAcceptedScreen';
import { PowerOfAttorneyScreen } from '@src/screens/PowerOfAttorneyScreen';
import { ProfileDataScreen } from '@src/screens/ProfileDataScreen';
import { SearchForNewOrder } from '@src/screens/SearchForOrdersScreen/SearchForNewOrderScreen';
import { TechnicalPassportScreen } from '@src/screens/TechnicalPassportScreen';
import { TransportationDetailsScreen } from '@src/screens/TransportationsDetailsScreen';
import UploadInvoiseForGoodsScreen from '@src/screens/UploadInvoiseForGoodsScreen';
import { useAppTheme } from '@src/theme/theme';
import { useLocalization } from '@src/translations/i18n';

import { DocumentsScreen } from '../../screens/DocumentsScreen';
import { Tabs } from '../Tabs';
import { RootStackParamList } from '../types';
import { OrderScreen } from '@src/screens/OrderScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStack = () => {
  const { t } = useLocalization();
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
        options={{ headerTitle: t('technical-passport') }}
      />
      <Stack.Screen
        name="power-of-attorney"
        component={PowerOfAttorneyScreen}
        options={{ headerTitle: t('power-of-attorney') }}
      />
      <Stack.Screen
        options={{ headerTitle: t('power-of-attorney') }}
        name="profile-data"
        component={ProfileDataScreen}
      />
      <Stack.Screen
        options={{ headerTitle: t('identity') }}
        name="identity"
        component={IdentityScreen}
      />
      <Stack.Screen
        options={{ headerTitle: t('search-for-order') }}
        name="search-for-new-order"
        component={SearchForNewOrder}
      />
      <Stack.Screen
        options={{ headerTitle: t('filters') }}
        name="filters-for-orders"
        component={FiltersForOrdersScreen}
      />
      <Stack.Screen
        options={{ headerTitle: t('from-where') }}
        name="from-where"
        component={FromWhereScreen}
      />
      <Stack.Screen
        options={{ headerTitle: '' }}
        name="transportation-details"
        component={TransportationDetailsScreen}
      />
      <Stack.Screen
        options={{ headerTitle: t('counter-offer') }}
        name="counter-offer"
        component={CounterOfferScreen}
      />
      <Stack.Screen
        options={{ headerShown: false, headerTitle: '', presentation: 'modal' }}
        name="order-accepted"
        component={OrderAcceptedScreen}
      />
      <Stack.Screen
        options={{ headerTitle: 'Накладная на товар' }}
        name="upload-invoise-for-goods"
        component={UploadInvoiseForGoodsScreen}
      />
      <Stack.Screen
        options={{ headerTitle: 'Накладная на товар' }}
        name="invoice-sent"
        component={InvoiceSentScreen}
      />
      <Stack.Screen
        options={({ route }) => ({
          headerTitle: route.params?.headerTitle,
        })}
        name="order-screen"
        component={OrderScreen}
      />
    </Stack.Navigator>
  );
};
