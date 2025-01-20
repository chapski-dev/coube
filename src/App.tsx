import { NavigationContainer } from '@react-navigation/native';
import { RootStack } from '@src/navigation/RootStack';
import React from 'react';
import { onNavigationReady } from './actions/onNavigationReady';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';


function App(): React.JSX.Element {

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <NavigationContainer onReady={onNavigationReady}>
          <RootStack />
        </NavigationContainer>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

export default App;
