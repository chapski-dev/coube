import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Toasts } from '@backpackapp-io/react-native-toast';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { NavigationContainer } from '@react-navigation/native';

import { RootStack } from '@src/navigation/stacks/RootStack';

import '@src/translations/i18n';

import { onNavigationReady } from './actions/onNavigationReady';
import { useAppColorTheme } from './hooks/useAppColorTheme';
import { navigationRef } from './navigation/navigationRef';
import { UnauthorizedStack } from './navigation/stacks/UnauthorizedStack';
import { AuthProvider, AuthState, useAuth } from './providers/auth';
import { ModalLayout } from './ui/Layouts/ModalLayout';

function App(): React.JSX.Element {
  const { theme } = useAppColorTheme();

  return (
    <AuthProvider>
      <GestureHandlerRootView>
        <SafeAreaProvider style={{ flex: 1 }}>
          <NavigationContainer
            onReady={onNavigationReady}
            theme={theme}
            ref={navigationRef}
          >
            <BottomSheetModalProvider>
              <Content />
              <Toasts />
              <ModalLayout />
            </BottomSheetModalProvider>
          </NavigationContainer>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </AuthProvider>
  );
}

const Content = () => {
  const { authState } = useAuth();

  return authState === AuthState.ready ? <RootStack /> : <UnauthorizedStack />;
};

export default App;
