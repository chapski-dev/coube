import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '@src/screens/Home';
import { IdentityScreen } from '@src/screens/IdentityScreen';
import { ProfileDataScreen } from '@src/screens/ProfileDataScreen';
import { ProfileScreen } from '@src/screens/ProfileScreen';
import { RootStackParamList } from '../types';
import React from 'react'
import { Tabs } from '../Tabs';
import { DocumentsScreen } from '../../screens/DocumentsScreen';
import { TechnicalPassportScreen } from '@src/screens/TechnicalPassportScreen';
import { PowerOfAttorneyScreen } from '@src/screens/PowerOfAttorneyScreen';
import { useAppTheme } from '@src/theme/theme';
import { SearchForNewOrder } from '@src/screens/SearchForOrdersScreen/SearchForNewOrderScreen';
import { FiltersForOrdersScreen } from '@src/screens/FiltersForOrdersScreen';
import { FromWhereScreen } from '@src/screens/FromWhereScreen';
import { TransportationDetailsScreen } from '@src/screens/TransportationsDetailsScreen/TransportationDetailsScreen';
import { CounterOfferScreen } from '@src/screens/CounterOfferScreen';
import { useLocalization } from '@src/translations/i18n';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStack = () => {
  const { t } = useLocalization()
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
        name='tabs'
        component={Tabs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name='documents'
        component={DocumentsScreen}
        options={({ route }) => ({ headerTitle: route.params.carModel, })}
      />
      <Stack.Screen
        name='technical-passport'
        component={TechnicalPassportScreen}
        options={{ headerTitle: t('technical-passport'), }}
      />
      <Stack.Screen
        name='power-of-attorney'
        component={PowerOfAttorneyScreen}
        options={{ headerTitle: t('power-of-attorney'), }}
      />
      <Stack.Screen options={{ headerTitle: t('power-of-attorney') }} name="profile-data" component={ProfileDataScreen} />
      <Stack.Screen options={{ headerTitle: t('identity') }} name="identity" component={IdentityScreen} />
      <Stack.Screen options={{ headerTitle: t('search-for-order') }} name="search-for-new-order" component={SearchForNewOrder} />
      <Stack.Screen options={{ headerTitle: t('filters') }} name="filters-for-orders" component={FiltersForOrdersScreen} />
      <Stack.Screen options={{ headerTitle: t('from-where') }} name="from-where" component={FromWhereScreen} />
      <Stack.Screen options={{ headerTitle: '' }} name="transportation-details" component={TransportationDetailsScreen} />
      <Stack.Screen options={{ headerTitle: t('counter-offer') }} name="counter-offer" component={CounterOfferScreen} />
    </Stack.Navigator>
  );
};
