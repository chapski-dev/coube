import React from 'react';
import { Controller,useForm } from 'react-hook-form';

import { ScreenProps } from '@src/navigation/types';
import { useLocalization } from '@src/translations/i18n';
import { Box, Button, Input } from '@src/ui';

interface BankDetailsFormData {
  accountNumber: string;
  bank: string;
  bik: string;
}

export const BankDetailsScreen = ({
  navigation,
}: ScreenProps<'bank-details'>) => {
  const { t } = useLocalization();
  
  const { control, handleSubmit } = useForm<BankDetailsFormData>();

  const onSubmit = (data: BankDetailsFormData) => {
    console.log(data);
  };

  return (
    <Box px={15} py={20} gap={10}>
      <Controller
        control={control}
        name="accountNumber"
        defaultValue=""
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label={t('account-number')}
            placeholder="KZ12345677889965"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Controller
        control={control}
        name="bank"
        defaultValue=""
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label={t('bank')}
            placeholder="AO «KaspiBank»"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Controller
        control={control}
        name="bik"
        defaultValue=""
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label={t('bik')}
            placeholder="153255366844"
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
