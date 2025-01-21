import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '@src/screens/Home';

const Stack = createNativeStackNavigator();

export const RootStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};
