import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Tabs } from '../Tabs';

const Stack = createNativeStackNavigator();

export const RootStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'tabs'}
        options={{ headerShown: false }}
        component={Tabs}
      />
    </Stack.Navigator>
  );
};
