import React from 'react';
import { Controller, useForm } from 'react-hook-form';

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

interface PerformerRegistrationScreenProps extends ScreenProps<'performer-registration'> {
  initialValues?: PerformerRegistrationFormData;
}

export const PerformerRegistrationScreen = ({
  navigation,
  initialValues = { iin: '', organizationName: '', generalDirector: '', email: '', phone: '' },
}: PerformerRegistrationScreenProps) => {
  const { t } = useLocalization();

  const { control, handleSubmit } = useForm<PerformerRegistrationFormData>({
    defaultValues: initialValues,
  });

  const onSubmit = (data: PerformerRegistrationFormData) => {
    console.log(data);
  };

  return (
    <Box px={15} py={20} gap={10}>
      <Box w='full' alignItems='center'>
        <Text mb={15} type='body_500' fontSize={24} children={t('performer-registration')} />
      </Box>

      <Controller
        control={control}
        name="iin"
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

      <Controller
        rules={{required: true}}
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label={t('enter-email')}
            required
            placeholder=""
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Controller
        rules={{required: true}}
        control={control}
        name="phone"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder=""
            label={t('enter-phone')}
            required
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