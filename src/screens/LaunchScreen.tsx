import React, { useState } from 'react';
import LogoIcon from '@assets/svg/logo.svg';

import { ScreenProps } from '@src/navigation/types';
import { useAppTheme } from '@src/theme/theme';
import { saveLanguageAsyncStorage, useLocalization } from '@src/translations/i18n';
import { AppLangEnum } from '@src/translations/types';
import { Box, Button, Text } from '@src/ui';

const LaunchScreen = ({ navigation }: ScreenProps<'launch'>) => {
  const { insets, colors } = useAppTheme();
  const { t, i18n } = useLocalization();
  const [showChangeLang, setShowChangeLang] = useState(false)

  const onChangeLanguage = (language: AppLangEnum) => async () => {
    await i18n.changeLanguage(language);
    await saveLanguageAsyncStorage(language);
    setShowChangeLang(false)
  };

  return (
    <>
      <Box
        flexGrow={1}
        pt={insets.top}
        pb={insets.bottom}
        pl={16}
        pr={16}
        alignItems="center"
        justifyContent="center"
      >
        <Box flexGrow={1} alignItems="center" justifyContent="center">
          <LogoIcon />
          <Text
            type="h2"
            center
            children={t('orders_for_cargo_transportation_quickly_and_conveniently')}
          />
        </Box>
        <Box flexGrow={1} w='full'>
          {showChangeLang ? (
            <>
              <Box flex={1} />
              <Text
                center
                fontSize={16}
                fontWeight='500'
                children="Выберите язык/Тілді таңдаңыз"
                mb={16}
              />
              <Box gap={12} w="full" alignSelf="flex-end" mb={36}>
                <Button
                  backgroundColor='main_light'
                  textColor='textDefault'
                  children="Русский"
                  onPress={onChangeLanguage(AppLangEnum.RU)}
                />
                <Button
                  backgroundColor='main_light'
                  textColor='textDefault'
                  children="Қазақша"
                  onPress={onChangeLanguage(AppLangEnum.KZ)}
                />
              </Box>
            </>
          ) : (
            <>
              <Box flex={1} />
              <Box gap={12} w="full" alignSelf="flex-end" mb={36} flexGrow={1}>
                <Button
                  children={t('continue_in_language', {
                    language: t(`languages.${i18n.language}`)
                  })}
                  onPress={() => navigation.push('login')} />
                <Button
                  type="clear"
                  children={t('change_language')}
                  onPress={() => setShowChangeLang(true)}
                />
              </Box>
              <Text center>
                <Text children={t('by_continuing_you_agree_to')} />
                <Text onPress={() => null} children={t('user_agreement')} color={colors.main} />
              </Text>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default LaunchScreen;

