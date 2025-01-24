import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '@src/screens/Home';
import { IdentityScreen } from '@src/screens/ProfileScreen/IdentityScreen';
import { ProfileDataScreen } from '@src/screens/ProfileScreen/ProfileDataScreen';
import { ProfileScreen } from '@src/screens/ProfileScreen/ProfileScreen';
import { RootStackParamList } from '../types';
import React from 'react'
import { Tabs } from '../Tabs';
import { DocumentsScreen } from '../../screens/DocumentsScreen';
import { TechnicalPassportScreen } from '@src/screens/TechnicalPassportScreen';
import { PowerOfAttorneyScreen } from '@src/screens/PowerOfAttorneyScreen';
import { useAppTheme } from '@src/theme/theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStack = () => {
  const { colors } = useAppTheme();
  return (
    <Stack.Navigator 
      initialRouteName="profile"
      screenOptions={{
        headerTintColor: colors.main,
        headerTitleStyle: { color: colors.text },
        title: '',
      }}
    >
      <Stack.Screen options={{ headerShown: true, title: 'Профиль' }} name="profile" component={ProfileScreen} />
      <Stack.Screen options={{ headerShown: true, title: 'Данные профиля' }} name="profile-data" component={ProfileDataScreen} />
      <Stack.Screen options={{ headerShown: true, title: 'Удостоверение личности' }} name="identity" component={IdentityScreen} />
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
