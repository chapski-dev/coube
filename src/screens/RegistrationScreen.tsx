import { ScreenProps } from '@src/navigation/types';
import { useAppTheme } from '@src/theme/theme';
import { Box, Button } from '@src/ui';
import React, { useState } from 'react';
import LogoIcon from '@assets/svg/logo.svg';
import Select from '@src/ui/Select';


const RegistrationScreen = ({ navigation }: ScreenProps<'registration'>) => {

  const { insets } = useAppTheme();
  const [isResident, setIsResident] = useState(true);

  const goAhead = () => {
    navigation.navigate('registration-user-data', { resident: isResident });
  };
  return (
    <Box pt={insets.top} pr={16} pl={16} flexGrow={1} alignItems="center" gap={24} justifyContent="center">
      <LogoIcon />
      <Box gap={16} w="full">
        <Select selected={isResident} onPress={() => setIsResident(true)} children="Я Резидент РК" />
        <Select selected={!isResident} onPress={() => setIsResident(false)} children="Не Резидент РК " />
      </Box>
      <Button children="Далее" onPress={goAhead} />
    </Box>
  );
};

export default RegistrationScreen;
