// import { useColorScheme } from 'react-native';
import { AppDarkTheme, AppLightTheme } from '@src/theme/theme';
import { ASYNC_STORAGE_KEYS } from '@src/vars/async_storage_keys';
import { useCustomAsyncStorage } from './useAsyncStorage';

export const useAppColorTheme = () => {
  const [appThemeKey] = useCustomAsyncStorage(ASYNC_STORAGE_KEYS.ThemeKey);
  // const deviceColorScheme = useColorScheme();

  let theme: Omit<App.Theme, 'insets'> = AppLightTheme;

  switch (appThemeKey) {
    case 'dark': {
      theme = AppDarkTheme;
      break;
    }
    case 'light': {
      theme = AppLightTheme;
      break;
    }
    default: {
      // theme = deviceColorScheme === 'dark' ? AppDarkTheme : AppLightTheme;
      theme = AppLightTheme;
      break;
    }
  }

  return { theme, appThemeKey };
};
