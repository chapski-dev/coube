import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Tabs } from '../Tabs';
import { DocumentsScreen } from '../../screens/DocumentsScreen';
import { RootStackParamList } from '@src/navigation/types';
import { TechnicalPassportScreen } from '@src/screens/TechnicalPassportScreen';
import { PowerOfAttorneyScreen } from '@src/screens/PowerOfAttorneyScreen';
import { useAppTheme } from '@src/theme/theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStack = () => {
  const { colors } = useAppTheme();
  return (
    <Stack.Navigator screenOptions={{
      headerTintColor: colors.main,
      headerTitleStyle: { color: colors.text },
      title: '',
    }}>
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
        options={{ headerTitle: 'Техпаспорт', }}
      />
      <Stack.Screen
        name='power-of-attorney'
        component={PowerOfAttorneyScreen}
        options={{ headerTitle: 'Доверенность', }}
      />
    </Stack.Navigator>
  );
};
