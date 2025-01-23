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

function App(): React.JSX.Element {
  const isAuth = true;
  const { theme } = useAppColorTheme();

  return (
    <GestureHandlerRootView>
      <NavigationContainer onReady={onNavigationReady} theme={theme}>
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
