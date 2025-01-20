import { NavigationContainer } from '@react-navigation/native';
import { RootStack } from '@src/navigation/RootStack';
import React from 'react';


function App(): React.JSX.Element {

  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}

export default App;
