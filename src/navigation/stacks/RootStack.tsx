import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Tabs } from '../Tabs';
import { DocumentsScreen } from '../../screens/DocumentsScreen';
import { RootStackParamList } from '@src/navigation/types';
import { Text } from '@src/ui';
import { TechnicalPassportScreen } from '@src/screens/TechnicalPassportScreen';
import { PowerOfAttorneyScreen } from '@src/screens/PowerOfAttorneyScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'tabs'}
        options={{ headerShown: false }}
        component={Tabs}
      />
      <Stack.Screen
        name={'Documents'}
        component={DocumentsScreen}
        options={({ route }) => ({
          headerTintColor: '#FAB54D',
          headerTitle: route.params.carModel,
          headerTitleStyle: { color: '#494D4E' },
          headerTitleAlign: 'center',
        })}
      />
      <Stack.Screen
        name={'TechnicalPassport'}
        component={TechnicalPassportScreen}
        options={{
          headerTintColor: '#FAB54D',
          headerTitle: 'Техпаспорт',
          headerTitleStyle: { color: '#494D4E' },
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name={'PowerOfAttorney'}
        component={PowerOfAttorneyScreen}
        options={{
          headerTintColor: '#FAB54D',
          headerTitle: 'Доверенность',
          headerTitleStyle: { color: '#494D4E' },
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};
