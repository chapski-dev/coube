import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { NavigationContainer } from '@react-navigation/native';

import { RootStack } from '@src/navigation/stacks/RootStack';

import '@src/translations/i18n';

import { onNavigationReady } from './actions/onNavigationReady';
import { useAppColorTheme } from './hooks/useAppColorTheme';
import { navigationRef } from './navigation/navigationRef';
import { UnauthorizedStack } from './navigation/stacks/UnauthorizedStack';
import { ModalLayout } from './ui/Layouts/ModalLayout';

function App(): React.JSX.Element {
  const isAuth = false;
  const { theme } = useAppColorTheme();

  return (
    <GestureHandlerRootView>
      <NavigationContainer onReady={onNavigationReady} theme={theme} ref={navigationRef}>
        <SafeAreaProvider style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            {!isAuth ? <RootStack /> : <UnauthorizedStack />}
            <ModalLayout />
          </BottomSheetModalProvider>
        </SafeAreaProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
