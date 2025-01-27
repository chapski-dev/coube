import { initReactI18next, useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n, { TFunction } from 'i18next';

import { ASYNC_STORAGE_KEYS } from '@src/vars/async_storage_keys';

import kzTranslation from './kk-KZ.json';
import RNLanguageDetector from './LanguageDetector';
import ruTranslation from './ru-RU.json';
import { AppLangEnum } from './types';

export const resources = {
  [AppLangEnum.KZ]: {
    translation: kzTranslation,
  },
  [AppLangEnum.RU]: {
    translation: ruTranslation,
  },
} as const


type TFunctionOptions = Parameters<TFunction>[1]

export const useLocalization = useTranslation as (...p: Parameters<typeof useTranslation>) => Omit<
  ReturnType<typeof useTranslation>,
  't'
> & {
  t: (k: LocalizationKeys, opts?: TFunctionOptions) => string
}

export type LocalizationKeys = keyof (typeof resources)[AppLangEnum.RU]['translation']

export const saveLanguageAsyncStorage = async (language: AppLangEnum) => {
  await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.CURRENT_LANG, language);
};


(async () => {
  i18n
    .use(RNLanguageDetector)
    .use(initReactI18next)
    .init({
      defaultNS: undefined,
      fallbackLng: AppLangEnum.RU,
      lng: (await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.CURRENT_LANG)) || AppLangEnum.RU,
      ns: [],
      parseMissingKeyHandler: (key) => `[MISSING KEY] ${key}`,
      resources,
    });
})();

export default i18n;
