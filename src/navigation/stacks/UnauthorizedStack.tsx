import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UnauthorizedStackParamList } from '../types';
import LaunchScreen from '@src/screens/LaunchScreen';
import LoginScreen from '@src/screens/LoginScreen';
import RegistrationScreen from '@src/screens/RegistrationScreen';
import RegistrationUserData from '@src/screens/RegistrationUserData';
import { useAppTheme } from '@src/theme/theme';

const Stack = createNativeStackNavigator<UnauthorizedStackParamList>();

export const UnauthorizedStack = () => {
  const { colors } = useAppTheme();
  return (
    <Stack.Navigator screenOptions={{ headerTintColor: colors.main }}>
      <Stack.Screen options={{ headerShown: false, title: '' }} name="launch" component={LaunchScreen} />
      <Stack.Screen options={{ headerShown: false, title: '' }} name="login" component={LoginScreen} />
      <Stack.Screen options={{ headerShown: false, title: '' }} name="registration" component={RegistrationScreen} />
      <Stack.Screen options={{ title: '' }} name="registration-user-data" component={RegistrationUserData} />
    </Stack.Navigator>
  );
};
