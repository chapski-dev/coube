import React, { useState } from 'react';
import LogoIcon from '@assets/svg/logo.svg';

import { ScreenProps } from '@src/navigation/types';
import registrationService from '@src/service/registration-service';
import { useAppTheme } from '@src/theme/theme';
import { Box, Button } from '@src/ui';
import Select from '@src/ui/Select';
import { useLocalization } from '@src/translations/i18n';


const RegistrationScreen = ({ navigation, route }: ScreenProps<'registration'>) => {
  const { t } = useLocalization()

  const { insets } = useAppTheme();
  const [isResident, setIsResident] = useState(registrationService.getIsRezident());
  
  const [isInvited, setIsInvited] = useState(true);

  const handleSetIsResident = (val: boolean) => () => {
    setIsResident(val)
    registrationService.setIsRezident(val)
  }
  
  const goAhead = () => {
    if (route.params.step === 'driver_performer_or_invaitetion') {
      if (isInvited) {
        navigation.navigate('otp-verify', { action: 'invite' });
        return
      } else {
        navigation.navigate('registration', { step: 'residency' });
        return
      }
    } else {
      navigation.navigate('registration-user-data');
      return
    }
  };


  return (
    <Box
      pt={insets.top}
      pr={16}
      pl={16}
      flexGrow={1}
      alignItems="center"
      gap={24}
      justifyContent="center"
    >
      <LogoIcon />
      <Box gap={16} w="full">
        {route.params.step === 'driver_performer_or_invaitetion' ? (
          <>
            <Select
              selected={isInvited}
              onPress={() => setIsInvited(true)}
              children="Я получил приглашение"
            />
            <Select
              selected={!isInvited}
              onPress={() => setIsInvited(false)}
              children="Я Исполнитель-водитель "
            />
          </>
        ) : (
          <>
            <Select
              selected={isResident}
              onPress={handleSetIsResident(true)}
              children="Я Резидент РК"
            />
            <Select
              selected={!isResident}
              onPress={handleSetIsResident(false)}
              children="Не Резидент РК "
            />
          </>
        )}
      </Box>
      <Button children={t('next')} onPress={goAhead} />
    </Box>
  );
};

export default RegistrationScreen;
