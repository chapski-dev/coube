import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  DarkTheme,
  DefaultTheme,
  Theme as NavigationTheme,
  useTheme,
} from '@react-navigation/native';

import { darkColors, lightColors } from './colors';

const navigationLightColors: NavigationTheme['colors'] = {
  ...DefaultTheme.colors,
  background: '#fff',
} as const;

const navigationDarkColors: NavigationTheme['colors'] = {
  ...DarkTheme.colors,
  background: '#111111',
  text: darkColors.white,
};

export const AppLightTheme = {
  colors: {
    ...navigationLightColors,
    ...lightColors,
    customYellow: '#FAB54D26',
    customGrey: '#494D4E',
  },
  dark: false,
  fonts: DefaultTheme.fonts,
} as const;

export const AppDarkTheme = {
  colors: {
    ...navigationDarkColors,
    ...darkColors,
  },
  dark: true,
  fonts: DefaultTheme.fonts,
} as const;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type CheckForValidColors =
  keyof typeof AppLightTheme.colors extends keyof typeof AppDarkTheme.colors
    ? keyof typeof AppDarkTheme.colors extends keyof typeof AppLightTheme.colors
      ? true
      : false
    : false;

declare global {
  namespace App {
    type Theme = (typeof AppLightTheme | typeof AppDarkTheme) & {
      insets: ReturnType<typeof useSafeAreaInsets>;
    };
  }
}

export const useAppTheme = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return { ...theme, insets } as App.Theme;
};
