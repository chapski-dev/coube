import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AddDriversLicenseScreen from '@src/screens/AddDriversLicenseScreen';
import LaunchScreen from '@src/screens/LaunchScreen';
import LoginScreen from '@src/screens/LoginScreen';
import LoginViaPhoneScreen from '@src/screens/LoginViaPhoneScreen';
import OtpVerifyScreen from '@src/screens/OtpVerifyScreen';
import PersonalIdentifier from '@src/screens/PersonalIdentifierScreen';
import PickCountryScreen from '@src/screens/PickCountryScreen';
import RegistrationFinishedScreen from '@src/screens/RegistrationFinishedScreen';
import RegistrationScreen from '@src/screens/RegistrationScreen';
import RegistrationUserData from '@src/screens/RegistrationUserData';
import SettingsProfileScreen from '@src/screens/SettingsProfileScreen';
import { useAppTheme } from '@src/theme/theme';

import { UnauthorizedStackParamList } from '../types';

const Stack = createNativeStackNavigator<UnauthorizedStackParamList>();

export const UnauthorizedStack = () => {
  const { colors } = useAppTheme();
  return (
    <Stack.Navigator screenOptions={{
      headerTintColor: colors.main,
      headerTitleStyle: { color: colors.text },
      title: ''
    }}>
      <Stack.Screen
        options={{ headerShown: false, }}
        name="launch"
        component={LaunchScreen}
      />
      <Stack.Screen
        options={{ headerShown: false, }}
        name="login" component={LoginScreen}
      />
      <Stack.Screen
        options={{ headerShown: false, }}
        name="registration"
        component={RegistrationScreen} />
      <Stack.Screen
        name="registration-user-data"
        component={RegistrationUserData}
      />
      <Stack.Screen
        options={{ presentation: 'modal' }}
        name='otp-verify'
        component={OtpVerifyScreen}
      />
      <Stack.Screen
        options={{ headerTitle: 'Выберите страну' }}
        name='pick-country'
        component={PickCountryScreen}
      />
      <Stack.Screen
        options={{ headerTitle: 'Войти в аккаунт' }}
        name='login-via-phone'
        component={LoginViaPhoneScreen}
      />
      <Stack.Screen
        options={{ headerTitle: 'Настройка профиля', title: '' }}
        name='settings-profile'
        component={SettingsProfileScreen}
      />
      <Stack.Screen
        name='personal-identifier'
        component={PersonalIdentifier}
      />
      <Stack.Screen
        name='add-drivers-license'
        component={AddDriversLicenseScreen}
        options={{ headerTitle: 'В.У. Лицевая сторона', title: '' }}
      />
      <Stack.Screen
        name='registration-finished'
        component={RegistrationFinishedScreen}
        options={{ headerShown: false, title: '' }}
      />


    </Stack.Navigator>
  );
};
