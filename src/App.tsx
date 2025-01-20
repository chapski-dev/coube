import { NavigationContainer } from '@react-navigation/native';
import { RootStack } from '@src/navigation/RootStack';
import React from 'react';
import { onNavigationReady } from './actions/onNavigationReady';


function App(): React.JSX.Element {

  return (
    <NavigationContainer onReady={onNavigationReady}>
      <RootStack />
    </NavigationContainer>
  );
}

export default App;
