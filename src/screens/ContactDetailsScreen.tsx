import React from 'react';
import { useForm, Controller } from 'react-hook-form';

import { ScreenProps } from '@src/navigation/types';
import { useLocalization } from '@src/translations/i18n';
import { Box, Button, Input } from '@src/ui';
interface ContactFormData {
  actualAddress: string;
  phone: string;
  email: string;
  accountingDocuments: string;
}

export const ContactDetails = ({
  navigation,
}: ScreenProps<'contact-details'>) => {
  const { t } = useLocalization();

  const { control, handleSubmit } = useForm();

  const onSubmit = (data: ContactFormData) => {
    console.log(data); 
  };

  return (
    <Box px={15} py={20} gap={10}>
      <Controller
        control={control}
        name="actualAddress"
        defaultValue=""
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label={t('actual-address')}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Controller
        control={control}
        name="phone"
        defaultValue=""
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label={t('phone')}
            placeholder="+ 7 777 777 77 77"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Controller
        control={control}
        name="email"
        defaultValue=""
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label={t('email')}
            placeholder="Cost@mail.ru"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Controller
        control={control}
        name="accountingDocuments"
        defaultValue=""
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label={t('mail-for-accounting-documents')}
            placeholder="Cost@mail.ru"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Button onPress={handleSubmit(onSubmit)} children={t('save')} />
    </Box>
  );
};
