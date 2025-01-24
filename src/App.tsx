import { NavigationContainer } from '@react-navigation/native';
import { RootStack } from '@src/navigation/stacks/RootStack';
import React from 'react';
import { onNavigationReady } from './actions/onNavigationReady';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { UnauthorizedStack } from './navigation/stacks/UnauthorizedStack';
import { useAppColorTheme } from './hooks/useAppColorTheme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ModalLayout } from './ui/Layouts/ModalLayout';
import { navigationRef } from './navigation/navigationRef';


function App(): React.JSX.Element {
  const isAuth = false;
  const { theme } = useAppColorTheme();

  return (
    <GestureHandlerRootView>
      <NavigationContainer onReady={onNavigationReady} theme={theme} ref={navigationRef}>
        <SafeAreaProvider style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            {isAuth ? <RootStack /> : <UnauthorizedStack />}
            <ModalLayout />
          </BottomSheetModalProvider>
        </SafeAreaProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
