import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '@src/screens/Home';
import { IdentityScreen } from '@src/screens/ProfileScreen/IdentityScreen';
import { ProfileDataScreen } from '@src/screens/ProfileScreen/ProfileDataScreen';
import { ProfileScreen } from '@src/screens/ProfileScreen/ProfileScreen';
import { RootStackParamList } from '../types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStack = () => {
  return (
    <Stack.Navigator initialRouteName="profile">
      <Stack.Screen options={{ headerShown: true, title: 'профиль' }} name="profile" component={ProfileScreen} />
      <Stack.Screen options={{ headerShown: true, title: 'данные профиля' }} name="profile-data" component={ProfileDataScreen} />
      <Stack.Screen options={{ headerShown: true, title: 'удостоверение личности' }} name="identity" component={IdentityScreen} />
    </Stack.Navigator>
  );
};
