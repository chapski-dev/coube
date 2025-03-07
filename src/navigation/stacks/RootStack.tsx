import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { CounterOfferScreen } from '@src/screens/CounterOfferScreen';
import DamageToCargoScreen from '@src/screens/DamageToCargoScreen';
import { FiltersForOrdersScreen } from '@src/screens/FiltersForOrdersScreen';
import { FromWhereScreen } from '@src/screens/FromWhereScreen';
import { IdentityScreen } from '@src/screens/IdentityScreen';
import { OrderAcceptedScreen } from '@src/screens/OrderAcceptedScreen';
import { OrderScreen } from '@src/screens/OrderScreen';
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

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStack = () => {
  const { t } = useLocalization();
  const { colors } = useAppTheme();
  return (
    <Stack.Navigator
      initialRouteName="tabs"
      screenOptions={{
        headerTintColor: colors.main,
        headerTitleStyle: { color: colors.textDefault },
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
        options={{ headerTitle: t('profile-data') }}
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
        options={{ headerTitle: t('from-where'), presentation: 'modal' }}
        name="from-where"
        component={FromWhereScreen}
      />
      <Stack.Screen
        options={({ route }) => ({
          headerTitle: route.params.transportationMainInfoResponse.id
            ? `${t('order')} № ${route.params.transportationMainInfoResponse.id}`
            : '',
        })}
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
        options={{ headerTitle: t('bill-of-lading') }}
        name="upload-invoise-for-goods"
        component={UploadInvoiseForGoodsScreen}
      />
      <Stack.Screen
        options={({ route }) => ({
          headerTitle: `Заказ № ${route.params.transportationMainInfoResponse.id}`,
        })}
        name="order-screen"
        component={OrderScreen}
      />
      <Stack.Screen
        options={{ headerTitle: 'Повреждение груза', presentation: 'modal' }}
        name='damage-to-cargo'
        component={DamageToCargoScreen}
      />

    </Stack.Navigator>
  );
};
