import { isIOS } from '@src/vars/platform'
import { LanguageDetectorModule } from 'i18next'
import { NativeModules } from 'react-native'


const RNLanguageDetector: LanguageDetectorModule = {
  type: 'languageDetector',
  init: () => {},
  detect: () => {
    const locale = isIOS
      ? NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0]
      : NativeModules.I18nManager.localeIdentifier
    return locale.split('_')[0]
  },
  cacheUserLanguage: () => {},
}

export default RNLanguageDetector
