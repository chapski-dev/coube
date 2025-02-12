import React from 'react';
import { Controller,useForm } from 'react-hook-form';

import { ScreenProps } from '@src/navigation/types';
import { useLocalization } from '@src/translations/i18n';
import { Box, Button, Input, Text } from '@src/ui';

interface PerformerRegistrationFormData {
  iin: string;
  organizationName: string;
  generalDirector: string;
  email: string;
  phone: string;
}

export const PerformerRegistrationScreen = ({
  navigation,
}: ScreenProps<'bank-details'>) => {
  const { t } = useLocalization();

  const { control, handleSubmit } = useForm<PerformerRegistrationFormData>();

  const onSubmit = (data: PerformerRegistrationFormData) => {
    console.log(data);
  };

  return (
    <Box px={15} py={20} gap={10}>
      <Box w='full' alignItems='center' >
        <Text mb={15} type='body_500' fontSize={24} children={t('performer-registration')} />
      </Box>

      <Controller
        control={control}
        name="iin"
        defaultValue=""
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label={t('iin')}
            placeholder="895 522 622 622"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Controller
        control={control}
        name="organizationName"
        defaultValue=""
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label={t('organization-name')}
            placeholder="ТОО «ТрансЛогистик»"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Controller
        control={control}
        name="generalDirector"
        defaultValue=""
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label={t('general-director')}
            placeholder="Костин Макар Дамирович"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Box row gap={5}>
        <Text children={t('enter-email')} /> 
        <Text color='red' children='*' />
      </Box>

      <Controller
        control={control}
        name="email"
        defaultValue=""
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder=""
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Box row gap={5}>
        <Text children={t('enter-phone')} /> 
        <Text color='red' children='*' />
      </Box>

      <Controller
        control={control}
        name="phone"
        defaultValue=""
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder=""
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Button onPress={handleSubmit(onSubmit)} children={t('continue')} />
    </Box>
  );
};
