import { ScreenProps } from '@src/navigation/types';
import { useAppTheme } from '@src/theme/theme';
import { Box, Button } from '@src/ui';
import React, { useState } from 'react';
import LogoIcon from '@assets/svg/logo.svg';
import Select from '@src/ui/Select';
import { useLocalization } from '@src/translations/i18n';


const RegistrationScreen = ({ navigation, route }: ScreenProps<'registration'>) => {
  const { t } = useLocalization()

  const { insets } = useAppTheme();
  const [isResident, setIsResident] = useState(true);
  const [isInvited, setIsInvited] = useState(true);


  const goAhead = () => {
    if (route.params.step === 'driver_performer_or_invaitetion') {
      if (isInvited) {
        navigation.navigate('otp-verify', { action: 'invite' });
      } else {
        navigation.navigate('registration', { step: 'residency' });
      }
    } else {
      navigation.navigate('registration-user-data', { resident: isResident });
    }
  };


  return (
    <Box pt={insets.top} pr={16} pl={16} flexGrow={1} alignItems="center" gap={24} justifyContent="center">
      <LogoIcon />
      <Box gap={16} w="full">
        {route.params.step === 'driver_performer_or_invaitetion' ? (
          <>
            <Select selected={isInvited} onPress={() => setIsInvited(true)} children={t('i-got-an-invintaion')}  />
            <Select selected={!isInvited} onPress={() => setIsInvited(false)} children={t('im-the-executive-driver')}  />
          </>
        ) : (
          <>
            <Select selected={isResident} onPress={() => setIsResident(true)} children={t('im-resident-of-rk')} />
            <Select selected={!isResident} onPress={() => setIsResident(false)} children={t('im-not-resident-of-rk')} />
          </>
        )}
      </Box>
      <Button children={t('next')} onPress={goAhead} />
    </Box>
  );
};

export default RegistrationScreen;
